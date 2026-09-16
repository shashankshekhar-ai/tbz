"""
Columbus — the website's Talk-tab readiness interview (/start, /{token}/message,
admin read endpoints), a legacy free-form chat endpoint, and the webhook
receiver for the production Columbus voice agent (ElevenLabs Conversational
AI, agent_9201kp1axxvdfprb99958h8wd89s — embedded separately, on the
WordPress site, not this app).

The website interview (/start, /{token}/message) runs in-browser (Web Speech
API for STT/TTS) against this FastAPI app: a short contact step (name,
email, optional company) followed by the 5 fixed readiness questions,
persisted per session. On completion it compiles a readiness report via the
configured AI provider (core/columbus_report.py), logs it to the audit
trail, upserts a Lead, creates a ClickUp task, and — via
core/columbus_n8n_bridge.py — posts an ElevenLabs-shaped, HMAC-signed
payload directly to the *same* production n8n workflow the real voice agent
uses (Gemini analysis, Paige's internal report email, caller marketing
email, Google Sheets log, ClickUp task), reusing that pipeline instead of
duplicating it. Configured via COLUMBUS_N8N_WEBHOOK_URL /
COLUMBUS_N8N_WEBHOOK_SECRET; best-effort like every other integration here.

The legacy /columbus chat endpoint is stateless (no persistence, free-form
Q&A) and is no longer called by the Talk tab, but is left in place.
"""
import hashlib
import hmac
import json
import logging
import secrets
import time
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

import re

from core.ai_provider import AIProviderError, structured_call
from core.clickup import create_task as clickup_create_task
from core.columbus_n8n_bridge import send_readiness_interview
from core.columbus_report import ColumbusReportError, generate_readiness_report
from core.config import settings
from core.db import get_db
from core.integrations import emit_n8n_event, log_audit
from middleware.auth import CurrentUser, require_admin
from models.columbus import ColumbusSession
from models.lead import Lead, LeadEvent
from schemas.columbus import (
    ColumbusMessageOut,
    ColumbusMessageRequest,
    ColumbusSessionOut,
    ColumbusStartOut,
    ColumbusStartRequest,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/columbus", tags=["columbus"])

# A short contact step, then the 5 fixed readiness questions — in that
# order. Single source of truth server-side; the frontend just displays
# whatever question/phase/index the API returns, it doesn't keep its own
# copy to drift out of sync.
CONTACT_QUESTIONS = [
    "Before we start — what's your name?",
    "And your email, so Paige can send you a copy of your readiness report? (Feel free to add your company too.)",
]
READINESS_QUESTIONS = [
    "What's your role, and who are you speaking for today — yourself, your team, or your whole organization?",
    "What's the biggest AI challenge you're facing right now?",
    "How would you describe your team's current AI knowledge — beginner, developing, or advanced?",
    "What's your top concern about adopting AI — cost, security, adoption, something else?",
    "If we could deliver one quick win in the next 30 days, what would matter most to you?",
]
ALL_QUESTIONS = CONTACT_QUESTIONS + READINESS_QUESTIONS

_EMAIL_RE = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")

_PATH_TITLES = {
    "for-you": "For You Path",
    "for-leaders": "For Leaders Path",
    "for-organizations": "For Organizations Path",
}


def _phase_info(question_index: int) -> tuple[str, int, int]:
    """question_index is the 0-based index of the *next* question to ask."""
    if question_index < len(CONTACT_QUESTIONS):
        return "contact", question_index + 1, len(CONTACT_QUESTIONS)
    return "readiness", question_index - len(CONTACT_QUESTIONS) + 1, len(READINESS_QUESTIONS)

# How old a signed webhook timestamp is allowed to be, guarding against replay
# of a captured request. ElevenLabs sends `t=<unix_seconds>,v0=<hex_hmac>`.
WEBHOOK_SIGNATURE_TOLERANCE_SECS = 30 * 60


def _verify_elevenlabs_signature(raw_body: bytes, signature_header: str | None) -> bool:
    if not settings.columbus_webhook_secret:
        logger.warning("columbus_webhook_secret not configured — skipping signature check")
        return True
    if not signature_header:
        return False

    parts = dict(item.split("=", 1) for item in signature_header.split(",") if "=" in item)
    timestamp, signature = parts.get("t"), parts.get("v0")
    if not timestamp or not signature:
        return False

    try:
        if abs(time.time() - int(timestamp)) > WEBHOOK_SIGNATURE_TOLERANCE_SECS:
            return False
    except ValueError:
        return False

    signed_payload = f"{timestamp}.{raw_body.decode('utf-8')}".encode("utf-8")
    expected = hmac.new(settings.columbus_webhook_secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


def _field(collection: dict, key: str) -> str | None:
    entry = collection.get(key) or {}
    return entry.get("value") or None

SYSTEM_PROMPT = """You are Columbus, the AI executive advisor for The Bradbury Group (TBG), \
a human-centered AI transformation consultancy. TBG offers three engagement paths: \
"For You" (individual executive coaching, personal AI workflows), "For Leaders" (team \
enablement, leadership AI architecture), and "For Organizations" (enterprise-wide AI \
transformation). TBG's philosophy is frameworks over tutorials, people over tech stack, \
proven results over promises.

Answer the visitor's question in 2-4 concise, confident sentences in an executive-advisor \
tone. Suggest 0-3 relevant next steps from: "For You Path" (#for-you), "For Leaders Path" \
(#for-leaders), "For Organizations Path" (#for-organizations), "See Our Resources" \
(#resources), "Read Our Insights" (#insights), "Book Discovery Call" (#book-call). Only \
suggest links that are genuinely relevant to what was asked."""

RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "reply": {"type": "string"},
        "recommendations": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "link": {"type": "string"},
                    "category": {"type": "string"},
                },
                "required": ["title", "link", "category"],
            },
        },
    },
    "required": ["reply", "recommendations"],
}


class ChatHistoryItem(BaseModel):
    sender: str
    text: str


class ColumbusContext(BaseModel):
    activeSection: str = "home"
    visitedSections: list[str] = []
    selectedPath: str = "General"


class ColumbusRequest(BaseModel):
    prompt: str
    context: ColumbusContext = ColumbusContext()
    history: list[ChatHistoryItem] = []


def _load_answers(session: ColumbusSession) -> list[dict[str, str]]:
    return json.loads(session.answers_json) if session.answers_json else []


def _get_session_or_404(db: Session, session_token: str) -> ColumbusSession:
    session = db.query(ColumbusSession).filter(ColumbusSession.session_token == session_token).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Columbus session not found")
    return session


def _session_to_out(s: ColumbusSession) -> ColumbusSessionOut:
    return ColumbusSessionOut(
        session_token=s.session_token,
        status=s.status,
        current_question_index=s.current_question_index,
        answers=_load_answers(s),
        contact_name=s.contact_name,
        contact_email=s.contact_email,
        contact_company=s.contact_company,
        summary=s.summary,
        recommended_path=s.recommended_path,
        recommendations=json.loads(s.recommendations_json) if s.recommendations_json else [],
        completed_at=s.completed_at,
        created_at=s.created_at,
    )


@router.post("/start", response_model=ColumbusStartOut, status_code=status.HTTP_201_CREATED)
def start_interview(payload: ColumbusStartRequest, db: Session = Depends(get_db)):
    session = ColumbusSession(
        session_token=secrets.token_urlsafe(24),
        status="in_progress",
        current_question_index=0,
        answers_json="[]",
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    logger.info("columbus_interview_started token=%s", session.session_token)
    phase, q_index, q_count = _phase_info(0)
    return ColumbusStartOut(
        session_token=session.session_token,
        phase=phase,
        question=ALL_QUESTIONS[0],
        question_index=q_index,
        question_count=q_count,
    )


@router.post("/{session_token}/message", response_model=ColumbusMessageOut)
def answer_question(session_token: str, payload: ColumbusMessageRequest, db: Session = Depends(get_db)):
    session = _get_session_or_404(db, session_token)
    if session.status != "in_progress":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Session is {session.status}, not accepting answers")

    idx = session.current_question_index
    answers = _load_answers(session)
    answers.append({"question": ALL_QUESTIONS[idx], "answer": payload.answer})
    session.answers_json = json.dumps(answers)

    if idx == 0:
        session.contact_name = payload.answer.strip() or None
    elif idx == 1:
        match = _EMAIL_RE.search(payload.answer)
        if match:
            session.contact_email = match.group(0).lower()
            rest = (payload.answer[: match.start()] + payload.answer[match.end() :]).strip(" ,.-")
            session.contact_company = rest or None
        else:
            session.contact_company = payload.answer.strip() or None

    session.current_question_index += 1
    db.commit()

    if session.current_question_index < len(ALL_QUESTIONS):
        db.refresh(session)
        phase, q_index, q_count = _phase_info(session.current_question_index)
        return ColumbusMessageOut(
            reply=ALL_QUESTIONS[session.current_question_index],
            phase=phase,
            question_index=q_index,
            question_count=q_count,
            is_complete=False,
            recommendations=[],
        )

    readiness_answers = answers[len(CONTACT_QUESTIONS) :]

    try:
        report = generate_readiness_report(readiness_answers)
    except ColumbusReportError:
        logger.exception("columbus_report_generation_failed token=%s", session_token)
        session.status = "completed"
        session.completed_at = datetime.now(timezone.utc).isoformat()
        db.commit()
        return ColumbusMessageOut(
            reply="Thanks for sharing all that. I've saved your answers — Paige will follow up personally.",
            phase="complete",
            question_index=len(READINESS_QUESTIONS),
            question_count=len(READINESS_QUESTIONS),
            is_complete=True,
            recommendations=[],
        )

    session.status = "completed"
    session.completed_at = datetime.now(timezone.utc).isoformat()
    session.summary = report.summary
    session.recommended_path = report.recommended_path
    session.recommendations_json = json.dumps(report.recommendations)

    if session.contact_email:
        lead = db.query(Lead).filter(Lead.email == session.contact_email).first()
        name_parts = (session.contact_name or "").split(" ", 1)
        lead_fields = {
            "first_name": name_parts[0] or None,
            "last_name": name_parts[1] if len(name_parts) > 1 else None,
            "company": session.contact_company,
            "source": "columbus_web",
        }
        lead_fields = {k: v for k, v in lead_fields.items() if v}
        if lead:
            for field, value in lead_fields.items():
                setattr(lead, field, value)
        else:
            lead = Lead(email=session.contact_email, **lead_fields)
            db.add(lead)
        db.flush()
        session.lead_id = lead.id
        db.add(LeadEvent(lead_id=lead.id, event_type="columbus_web_interview_completed"))

    db.commit()
    db.refresh(session)

    log_audit(
        db,
        action="columbus.interview_completed",
        resource_type="columbus_session",
        resource_id=str(session.id),
        metadata={"recommended_path": report.recommended_path, "summary": report.summary},
    )
    emit_n8n_event(
        db,
        event_type="columbus_interview_completed",
        lead_id=session.lead_id,
        payload={"session_token": session_token, "recommended_path": report.recommended_path, "summary": report.summary},
    )
    clickup_create_task(
        db,
        name=f"Review Columbus readiness interview {session_token[:8]}",
        description=f"{report.summary}\n\nRecommended path: {report.recommended_path}\n\n" + "\n".join(f"- {r}" for r in report.recommendations),
        lead_id=session.lead_id,
    )
    call_duration_secs = max(1, int((datetime.now(timezone.utc) - session.created_at).total_seconds()))
    send_readiness_interview(
        db,
        session_token=session_token,
        contact_name=session.contact_name,
        contact_email=session.contact_email,
        contact_company=session.contact_company,
        readiness_answers=readiness_answers,
        summary=report.summary,
        call_duration_secs=call_duration_secs,
    )

    recommendations = [
        {"title": _PATH_TITLES.get(report.recommended_path, report.recommended_path), "link": f"#{report.recommended_path}", "category": "path"},
        {"title": "Book Discovery Call", "link": "#book-call", "category": "cta"},
    ]

    return ColumbusMessageOut(
        reply=report.summary + " I've put together your readiness snapshot for Paige's personal review.",
        phase="complete",
        question_index=len(READINESS_QUESTIONS),
        question_count=len(READINESS_QUESTIONS),
        is_complete=True,
        recommendations=recommendations,
    )


@router.get("/sessions", response_model=list[ColumbusSessionOut])
def list_interviews(db: Session = Depends(get_db), _: CurrentUser = Depends(require_admin)):
    """Admin-only: Paige's review queue of completed (and in-progress) readiness interviews."""
    sessions = db.query(ColumbusSession).order_by(ColumbusSession.created_at.desc()).limit(200).all()
    return [_session_to_out(s) for s in sessions]


@router.get("/sessions/{session_token}", response_model=ColumbusSessionOut)
def get_interview(session_token: str, db: Session = Depends(get_db), _: CurrentUser = Depends(require_admin)):
    return _session_to_out(_get_session_or_404(db, session_token))


@router.post("")
def chat(payload: ColumbusRequest):
    history_text = "\n".join(f"{h.sender}: {h.text}" for h in payload.history[-6:])
    user_message = (
        f"Visitor is currently viewing: {payload.context.activeSection}.\n"
        f"Recent conversation:\n{history_text}\n\n"
        f"Visitor's message: {payload.prompt}"
    )

    try:
        result = structured_call(
            system_prompt=SYSTEM_PROMPT,
            user_message=user_message,
            tool_name="columbus_reply",
            tool_description="Reply to the visitor as Columbus with optional recommendations.",
            input_schema=RESPONSE_SCHEMA,
            max_tokens=1024,
        )
    except AIProviderError:
        logger.exception("Columbus AI call failed")
        return {
            "reply": (
                "I'm ready to assist you with executive strategy. "
                "You can explore our paths or book a discovery call directly."
            ),
            "recommendations": [],
        }

    return {
        "reply": result.get("reply", "I am ready to guide your executive strategy."),
        "recommendations": result.get("recommendations", []),
    }


@router.post("/webhook", status_code=status.HTTP_200_OK)
async def elevenlabs_webhook(request: Request, db: Session = Depends(get_db)):
    """Receive a post-call payload from the Columbus ElevenLabs agent.

    Verifies the elevenlabs-signature header, extracts the visitor/assessment
    fields, and upserts a Lead + LeadEvent so the call shows up in this app's
    own lead DB. n8n (configured directly in ElevenLabs) independently owns
    Gemini analysis, email, Sheets, and ClickUp for this same event — this
    handler does not call emit_n8n_event, to avoid double-firing that pipeline.
    """
    raw_body = await request.body()
    if not _verify_elevenlabs_signature(raw_body, request.headers.get("elevenlabs-signature")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid signature")

    payload = json.loads(raw_body)
    data = payload.get("data", {})
    analysis = data.get("analysis", {})
    collected = analysis.get("data_collection_results", {})
    metadata = data.get("metadata", {})

    email = _field(collected, "user_email")
    conversation_id = data.get("conversation_id")

    lead_fields = {
        "first_name": (_field(collected, "user_name_spelled") or "").split(" ")[0] or None,
        "last_name": " ".join((_field(collected, "user_name_spelled") or "").split(" ")[1:]) or None,
        "company": _field(collected, "user_company"),
        "job_title": _field(collected, "user_title"),
        "phone": _field(collected, "user_phone"),
        "source": "columbus",
    }
    lead_fields = {k: v for k, v in lead_fields.items() if v}

    lead = None
    if email:
        email = email.lower()
        lead = db.query(Lead).filter(Lead.email == email).first()
        if lead:
            for field, value in lead_fields.items():
                setattr(lead, field, value)
        else:
            lead = Lead(email=email, **lead_fields)
            db.add(lead)
        db.flush()

    event_metadata = {
        "conversation_id": conversation_id,
        "agent_id": data.get("agent_id"),
        "call_duration_secs": metadata.get("call_duration_secs"),
        "call_summary": analysis.get("transcript_summary"),
        "sentiment": (analysis.get("evaluation_criteria_results") or {}).get("sentiment", {}).get("result"),
        "location": _field(collected, "user_location"),
        "answers": {
            f"Q{i}": _field(collected, f"Q{i}")
            for i in range(1, 6)
            if _field(collected, f"Q{i}")
        },
    }

    if lead:
        db.add(
            LeadEvent(
                lead_id=lead.id,
                event_type="columbus_call_completed",
                metadata_json=json.dumps(event_metadata, default=str),
            )
        )

    db.commit()
    logger.info("columbus_webhook_received conversation_id=%s email=%s", conversation_id, email or "unknown")

    log_audit(
        db,
        action="columbus.call_completed",
        resource_type="lead_event",
        resource_id=conversation_id,
        metadata={"email": email, "agent_id": data.get("agent_id")},
    )

    return {"status": "received"}
