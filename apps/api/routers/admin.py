"""Read-only admin visibility into audit logs and integration dispatch events."""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from core.db import get_db
from middleware.auth import CurrentUser, require_admin
from models.audit import AuditLog
from models.integration import IntegrationEvent
from schemas.integration import AuditLogOut, IntegrationEventOut

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/audit-logs", response_model=list[AuditLogOut])
def list_audit_logs(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    return db.query(AuditLog).order_by(AuditLog.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/integration-events", response_model=list[IntegrationEventOut])
def list_integration_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status_filter: str | None = Query(None, alias="status"),
    db: Session = Depends(get_db),
    _: CurrentUser = Depends(require_admin),
):
    query = db.query(IntegrationEvent)
    if status_filter:
        query = query.filter(IntegrationEvent.status == status_filter)
    return query.order_by(IntegrationEvent.created_at.desc()).offset(skip).limit(limit).all()
