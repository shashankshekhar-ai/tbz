"""
n8n webhook emitter and audit logging.

Both are best-effort: a failed webhook or audit write must never lose the
underlying lead/form/resource record. Callers should invoke these after their
own commit, and any exception here is caught and recorded, not raised.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Optional

import httpx
from sqlalchemy.orm import Session

from core.config import settings
from models.audit import AuditLog
from models.integration import IntegrationEvent

logger = logging.getLogger(__name__)


def emit_n8n_event(
    db: Session,
    event_type: str,
    payload: dict[str, Any],
    lead_id: Optional[int] = None,
) -> IntegrationEvent:
    """Record the event, then best-effort POST it to the configured n8n webhook."""
    event = IntegrationEvent(
        lead_id=lead_id,
        target="n8n",
        event_type=event_type,
        status="pending",
        payload_json=json.dumps(payload, default=str),
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    if not settings.n8n_webhook_url:
        event.status = "skipped"
        event.error = "n8n_webhook_url not configured"
        db.commit()
        return event

    try:
        resp = httpx.post(
            settings.n8n_webhook_url,
            json={"event_type": event_type, "lead_id": lead_id, **payload},
            timeout=5,
        )
        event.status = "success" if resp.is_success else "failed"
        event.response_json = json.dumps({"status_code": resp.status_code, "body": resp.text[:2000]})
    except httpx.HTTPError as exc:
        logger.warning("n8n_webhook_failed event_type=%s error=%s", event_type, exc)
        event.status = "failed"
        event.error = str(exc)

    db.commit()
    return event


def log_audit(
    db: Session,
    action: str,
    actor_id: str = "system",
    resource_type: Optional[str] = None,
    resource_id: Optional[str] = None,
    metadata: Optional[dict[str, Any]] = None,
    ip_address: Optional[str] = None,
) -> AuditLog:
    entry = AuditLog(
        actor_id=actor_id,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        metadata_json=json.dumps(metadata, default=str) if metadata else None,
        ip_address=ip_address,
    )
    db.add(entry)
    db.commit()
    return entry
