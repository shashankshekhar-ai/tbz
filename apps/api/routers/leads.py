import json
import logging

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from core.db import get_db
from middleware.auth import CurrentUser, get_current_user, require_admin
from models.lead import Lead, LeadEvent
from schemas.lead import LeadCreate, LeadEventCreate, LeadOut, LeadUpdate

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)):
    """Create or upsert a lead by email."""
    existing = db.query(Lead).filter(Lead.email == payload.email.lower()).first()
    if existing:
        for field, value in payload.model_dump(exclude_none=True, exclude={"email"}).items():
            setattr(existing, field, value)
        db.commit()
        db.refresh(existing)
        logger.info("lead_updated email=%s", existing.email)
        return existing

    data = payload.model_dump()
    data["email"] = payload.email.lower()
    lead = Lead(**data)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    logger.info("lead_created email=%s source=%s", lead.email, lead.source)
    return lead


@router.get("", response_model=list[LeadOut])
def list_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    return db.query(Lead).order_by(Lead.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{lead_id}", response_model=LeadOut)
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    return lead


@router.patch("/{lead_id}", response_model=LeadOut)
def update_lead(
    lead_id: int,
    payload: LeadUpdate,
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(lead, field, value)
    db.commit()
    db.refresh(lead)
    return lead


@router.post("/{lead_id}/events", status_code=status.HTTP_201_CREATED)
def add_lead_event(
    lead_id: int,
    payload: LeadEventCreate,
    db: Session = Depends(get_db),
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    event = LeadEvent(lead_id=lead_id, **payload.model_dump())
    db.add(event)
    db.commit()
    logger.info("lead_event lead_id=%s type=%s", lead_id, payload.event_type)
    return {"status": "ok"}
