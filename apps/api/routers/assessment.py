"""
AI Readiness Assessment — session/answers/result flow.

Public name decided (doc 14, D1): "AI Readiness Assessment". Route slug
("assessment") already matches, no rename needed.
"""
import json
import logging
import os
import secrets
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from core.ai_scoring import AIScoringError, score_assessment
from core.clickup import create_task as clickup_create_task
from core.db import get_db
from core.hubspot import create_note as hubspot_create_note
from core.hubspot import upsert_contact as hubspot_upsert_contact
from core.integrations import emit_n8n_event, log_audit
from core.lead_agent import LeadAgentError, draft_followup
from core.report_generator import generate_report_pdf
from middleware.auth import CurrentUser, require_admin
from models.assessment import AssessmentAnswer, AssessmentResult, AssessmentSession
from models.lead import Lead, LeadEvent
from schemas.assessment import (
    AssessmentAnswersSubmit,
    AssessmentResultOut,
    AssessmentSessionOut,
    AssessmentStartOut,
    AssessmentStartRequest,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/assessment", tags=["assessment"])


def _session_to_out(session: AssessmentSession, result: AssessmentResult | None) -> AssessmentSessionOut:
    result_out = None
    if result is not None:
        result_out = AssessmentResultOut(
            overall_score=result.overall_score,
            maturity_level=result.maturity_level,
            summary=result.summary or "",
            recommendations=json.loads(result.recommendations_json) if result.recommendations_json else [],
        )
    return AssessmentSessionOut(
        session_token=session.session_token,
        status=session.status,
        completed_at=session.completed_at,
        result=result_out,
    )


@router.post("/start", response_model=AssessmentStartOut, status_code=status.HTTP_201_CREATED)
def start_assessment(payload: AssessmentStartRequest, db: Session = Depends(get_db)):
    lead_id = None
    if payload.email:
        email = payload.email.lower()
        lead = db.query(Lead).filter(Lead.email == email).first()
        lead_fields = {
            "first_name": payload.first_name,
            "company": payload.company,
            "source": payload.source or "assessment",
        }
        lead_fields = {k: v for k, v in lead_fields.items() if v is not None}
        if lead:
            for field, value in lead_fields.items():
                setattr(lead, field, value)
        else:
            lead = Lead(email=email, **lead_fields)
            db.add(lead)
        db.flush()
        lead_id = lead.id
        db.add(LeadEvent(lead_id=lead_id, event_type="assessment_start"))

    session = AssessmentSession(
        lead_id=lead_id,
        session_token=secrets.token_urlsafe(24),
        status="in_progress",
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    logger.info("assessment_started token=%s lead_id=%s", session.session_token, lead_id)
    return session


def _get_session_or_404(db: Session, session_token: str) -> AssessmentSession:
    session = db.query(AssessmentSession).filter(AssessmentSession.session_token == session_token).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assessment session not found")
    return session


@router.post("/{session_token}/answers", status_code=status.HTTP_200_OK)
def submit_answers(session_token: str, payload: AssessmentAnswersSubmit, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_token)
    if session.status != "in_progress":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Session is {session.status}, not accepting answers")

    for answer_in in payload.answers:
        existing = (
            db.query(AssessmentAnswer)
            .filter(AssessmentAnswer.session_id == session.id, AssessmentAnswer.question_id == answer_in.question_id)
            .first()
        )
        encoded = json.dumps(answer_in.answer)
        if existing:
            existing.answer_value = encoded
        else:
            db.add(AssessmentAnswer(session_id=session.id, question_id=answer_in.question_id, answer_value=encoded))

    db.commit()
    return {"status": "ok", "answers_saved": len(payload.answers)}


@router.post("/{session_token}/complete", response_model=AssessmentSessionOut)
def complete_assessment(session_token: str, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_token)
    if session.status == "completed":
        result = db.query(AssessmentResult).filter(AssessmentResult.session_id == session.id).first()
        return _session_to_out(session, result)

    answers = db.query(AssessmentAnswer).filter(AssessmentAnswer.session_id == session.id).all()
    if not answers:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No answers submitted yet")

    answer_map = {a.question_id: json.loads(a.answer_value) for a in answers}

    try:
        score = score_assessment({qid: str(val) for qid, val in answer_map.items()})
    except AIScoringError as exc:
        session.status = "scoring_failed"
        db.commit()
        logger.warning("assessment_scoring_failed token=%s error=%s", session_token, exc)
        log_audit(
            db,
            action="assessment.scoring_failed",
            resource_type="assessment_session",
            resource_id=str(session.id),
            metadata={"error": str(exc)},
        )
        return _session_to_out(session, None)

    result = AssessmentResult(
        session_id=session.id,
        overall_score=score.overall_score,
        maturity_level=score.maturity_level,
        summary=score.summary,
        recommendations_json=json.dumps(score.recommendations),
        ai_output_json=json.dumps(score.model_dump()),
    )
    db.add(result)
    session.status = "completed"
    session.completed_at = datetime.now(timezone.utc).isoformat()
    db.commit()
    db.refresh(result)

    log_audit(
        db,
        action="assessment.completed",
        resource_type="assessment_session",
        resource_id=str(session.id),
        metadata={"overall_score": score.overall_score, "maturity_level": score.maturity_level},
    )
    emit_n8n_event(
        db,
        event_type="assessment_completed",
        lead_id=session.lead_id,
        payload={"session_token": session_token, "overall_score": score.overall_score, "maturity_level": score.maturity_level},
    )

    lead = db.query(Lead).filter(Lead.id == session.lead_id).first() if session.lead_id else None

    if lead:
        contact_id = hubspot_upsert_contact(
            db,
            email=lead.email,
            properties={"ai_readiness_score": score.overall_score, "ai_maturity_level": score.maturity_level},
            lead_id=lead.id,
        )
        if contact_id:
            lead.hubspot_contact_id = contact_id

        task_id = clickup_create_task(
            db,
            name=f"Review AI Readiness result: {lead.email} (score {score.overall_score})",
            description=score.summary,
            lead_id=lead.id,
        )
        if task_id:
            lead.clickup_task_id = task_id

        if contact_id or task_id:
            db.commit()

        try:
            draft = draft_followup(
                first_name=lead.first_name,
                company=lead.company,
                overall_score=score.overall_score,
                maturity_level=score.maturity_level,
                summary=score.summary,
                recommendations=score.recommendations,
            )
            log_audit(
                db,
                action="lead.followup_drafted",
                resource_type="lead",
                resource_id=str(lead.id),
                metadata={"subject": draft.subject, "body": draft.body},
            )
            if lead.hubspot_contact_id:
                hubspot_create_note(
                    db,
                    contact_id=lead.hubspot_contact_id,
                    body=f"{draft.subject}\n\n{draft.body}",
                    lead_id=lead.id,
                )
        except LeadAgentError as exc:
            logger.info("lead_followup_skipped lead_id=%s reason=%s", lead.id, exc)

    try:
        report_path = generate_report_pdf(
            session_token=session_token,
            lead_name=lead.first_name if lead else None,
            company=lead.company if lead else None,
            overall_score=score.overall_score,
            maturity_level=score.maturity_level,
            summary=score.summary,
            recommendations=score.recommendations,
        )
        result.report_file_path = report_path
        db.commit()
        db.refresh(result)
    except Exception as exc:  # pragma: no cover - defensive, must never block completion
        logger.warning("assessment_report_generation_failed token=%s error=%s", session_token, exc)

    logger.info("assessment_completed token=%s score=%s", session_token, score.overall_score)
    return _session_to_out(session, result)


@router.get("/{session_token}/report")
def download_report(session_token: str, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_token)
    result = db.query(AssessmentResult).filter(AssessmentResult.session_id == session.id).first()
    if not result or not result.report_file_path or not os.path.exists(result.report_file_path):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not available")
    return FileResponse(
        result.report_file_path,
        media_type="application/pdf",
        filename=f"ai-readiness-report-{session_token[:8]}.pdf",
    )


@router.get("/{session_token}", response_model=AssessmentSessionOut)
def get_assessment(session_token: str, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_token)
    result = db.query(AssessmentResult).filter(AssessmentResult.session_id == session.id).first()
    return _session_to_out(session, result)


@router.get("", response_model=list[AssessmentSessionOut])
def list_assessments(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    sessions = (
        db.query(AssessmentSession).order_by(AssessmentSession.created_at.desc()).offset(skip).limit(limit).all()
    )
    out = []
    for session in sessions:
        result = db.query(AssessmentResult).filter(AssessmentResult.session_id == session.id).first()
        out.append(_session_to_out(session, result))
    return out
