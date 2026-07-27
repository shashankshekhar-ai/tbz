import json
import logging
import secrets

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy.orm import Session

from core.db import get_db
from core.hubspot import upsert_contact as hubspot_upsert_contact
from core.integrations import emit_n8n_event, log_audit
from middleware.auth import CurrentUser, require_admin
from models.lead import Lead, LeadEvent
from models.resource import ResourceDownload
from schemas.resource import ResourceDownloadCreate, ResourceDownloadOut

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/resources", tags=["resources"])


@router.post("/download", response_model=ResourceDownloadOut, status_code=status.HTTP_201_CREATED)
def request_resource_download(
    payload: ResourceDownloadCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    """Gate a resource behind email capture: upsert lead, issue an access token."""
    email = payload.email.lower()
    lead = db.query(Lead).filter(Lead.email == email).first()
    lead_fields = {
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "company": payload.company,
        "source": payload.source or "resource_gate",
        "utm_source": payload.utm_source,
        "utm_medium": payload.utm_medium,
        "utm_campaign": payload.utm_campaign,
    }
    lead_fields = {k: v for k, v in lead_fields.items() if v is not None}

    if lead:
        for field, value in lead_fields.items():
            setattr(lead, field, value)
    else:
        lead = Lead(email=email, **lead_fields)
        db.add(lead)
    db.flush()

    download = ResourceDownload(
        lead_id=lead.id,
        resource_slug=payload.resource_slug,
        resource_title=payload.resource_title,
        access_token=secrets.token_urlsafe(32),
        ip_address=request.client.host if request.client else None,
    )
    db.add(download)

    db.add(
        LeadEvent(
            lead_id=lead.id,
            event_type="resource_download",
            metadata_json=json.dumps({"resource_slug": payload.resource_slug}),
        )
    )

    db.commit()
    db.refresh(download)
    logger.info(
        "resource_download_requested slug=%s email=%s lead_id=%s",
        payload.resource_slug,
        email,
        lead.id,
    )

    log_audit(
        db,
        action="resource.download_requested",
        resource_type="resource_download",
        resource_id=str(download.id),
        metadata={"resource_slug": payload.resource_slug, "email": email},
        ip_address=download.ip_address,
    )
    emit_n8n_event(
        db,
        event_type="resource_download_requested",
        lead_id=lead.id,
        payload={"resource_slug": payload.resource_slug, "email": email, "download_id": download.id},
    )

    contact_id = hubspot_upsert_contact(
        db,
        email=email,
        properties={k: v for k, v in {"firstname": lead.first_name, "lastname": lead.last_name, "company": lead.company}.items() if v},
        lead_id=lead.id,
    )
    if contact_id:
        lead.hubspot_contact_id = contact_id
        db.commit()

    return download


@router.get("/access/{access_token}", response_model=ResourceDownloadOut)
def verify_resource_access(access_token: str, db: Session = Depends(get_db)):
    """Validate a signed access token before serving the actual asset."""
    download = db.query(ResourceDownload).filter(ResourceDownload.access_token == access_token).first()
    if not download:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid or expired access token")
    return download


@router.get("", response_model=list[ResourceDownloadOut])
def list_resource_downloads(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    return (
        db.query(ResourceDownload)
        .order_by(ResourceDownload.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
