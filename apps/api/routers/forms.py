import json
import logging

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from core.clickup import create_task as clickup_create_task
from core.db import get_db
from core.hubspot import upsert_contact as hubspot_upsert_contact
from core.integrations import emit_n8n_event, log_audit
from middleware.auth import CurrentUser, require_admin
from models.form import FormSubmission
from models.lead import Lead, LeadEvent
from schemas.form import FormSubmissionCreate, FormSubmissionOut

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/forms", tags=["forms"])


@router.post("", response_model=FormSubmissionOut, status_code=status.HTTP_201_CREATED)
def submit_form(payload: FormSubmissionCreate, db: Session = Depends(get_db)):
    """Upsert lead by email, record the raw submission, log a lead event."""
    email = payload.email.lower()
    lead = db.query(Lead).filter(Lead.email == email).first()
    lead_fields = {
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "company": payload.company,
        "phone": payload.phone,
        "source": payload.source or payload.form_type,
        "utm_source": payload.utm_source,
        "utm_medium": payload.utm_medium,
        "utm_campaign": payload.utm_campaign,
        "referrer": payload.referrer,
    }
    lead_fields = {k: v for k, v in lead_fields.items() if v is not None}

    if lead:
        for field, value in lead_fields.items():
            setattr(lead, field, value)
    else:
        lead = Lead(email=email, **lead_fields)
        db.add(lead)
    db.flush()

    submission = FormSubmission(
        lead_id=lead.id,
        form_type=payload.form_type,
        data_json=json.dumps(payload.model_dump(mode="json")),
    )
    db.add(submission)

    db.add(
        LeadEvent(
            lead_id=lead.id,
            event_type="form_submit",
            metadata_json=json.dumps({"form_type": payload.form_type}),
        )
    )

    db.commit()
    db.refresh(submission)
    logger.info("form_submitted form_type=%s email=%s lead_id=%s", payload.form_type, email, lead.id)

    log_audit(
        db,
        action="form.submitted",
        resource_type="form_submission",
        resource_id=str(submission.id),
        metadata={"form_type": payload.form_type, "email": email},
    )
    emit_n8n_event(
        db,
        event_type="form_submitted",
        lead_id=lead.id,
        payload={"form_type": payload.form_type, "email": email, "submission_id": submission.id},
    )

    contact_id = hubspot_upsert_contact(
        db,
        email=email,
        properties={k: v for k, v in {"firstname": lead.first_name, "lastname": lead.last_name, "company": lead.company}.items() if v},
        lead_id=lead.id,
    )
    if contact_id:
        lead.hubspot_contact_id = contact_id
        submission.hubspot_synced = True

    task_id = clickup_create_task(
        db,
        name=f"New {payload.form_type} form: {email}",
        description=payload.message or "",
        lead_id=lead.id,
    )
    if task_id:
        lead.clickup_task_id = task_id
        submission.clickup_synced = True

    if contact_id or task_id:
        db.commit()
        db.refresh(submission)

    return submission


@router.get("", response_model=list[FormSubmissionOut])
def list_form_submissions(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    return (
        db.query(FormSubmission)
        .order_by(FormSubmission.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
