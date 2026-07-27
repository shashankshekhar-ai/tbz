"""
HubSpot contact client.

Feature-flagged like the n8n emitter: without HUBSPOT_API_KEY configured, every
call is skipped and recorded as such — never raises, never blocks the caller's
own lead/form write. Wire this into the same call sites that already emit n8n
events once a real key is available.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Optional

import httpx
from sqlalchemy.orm import Session

from core.config import settings
from models.integration import IntegrationEvent

logger = logging.getLogger(__name__)

HUBSPOT_API_BASE = "https://api.hubapi.com"


def upsert_contact(
    db: Session,
    email: str,
    properties: dict[str, Any],
    lead_id: Optional[int] = None,
) -> Optional[str]:
    """Create or update a HubSpot contact by email. Returns the HubSpot contact id, or None if skipped/failed."""
    event = IntegrationEvent(
        lead_id=lead_id,
        target="hubspot",
        event_type="contact_upsert",
        status="pending",
        payload_json=json.dumps({"email": email, "properties": properties}, default=str),
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    if not settings.hubspot_api_key:
        event.status = "skipped"
        event.error = "hubspot_api_key not configured"
        db.commit()
        return None

    try:
        resp = httpx.post(
            f"{HUBSPOT_API_BASE}/crm/v3/objects/contacts/batch/upsert",
            headers={"Authorization": f"Bearer {settings.hubspot_api_key}"},
            json={"inputs": [{"idProperty": "email", "id": email, "properties": {"email": email, **properties}}]},
            timeout=10,
        )
        if not resp.is_success:
            event.status = "failed"
            event.response_json = json.dumps({"status_code": resp.status_code, "body": resp.text[:2000]})
            db.commit()
            return None

        body = resp.json()
        contact_id = body.get("results", [{}])[0].get("id")
        event.status = "success"
        event.response_json = json.dumps({"status_code": resp.status_code, "contact_id": contact_id})
        db.commit()
        return contact_id
    except httpx.HTTPError as exc:
        logger.warning("hubspot_upsert_failed email=%s error=%s", email, exc)
        event.status = "failed"
        event.error = str(exc)
        db.commit()
        return None


def create_note(
    db: Session,
    contact_id: str,
    body: str,
    lead_id: Optional[int] = None,
) -> Optional[str]:
    """Attach a note engagement to a HubSpot contact. Returns the note id, or None if skipped/failed."""
    event = IntegrationEvent(
        lead_id=lead_id,
        target="hubspot",
        event_type="note_create",
        status="pending",
        payload_json=json.dumps({"contact_id": contact_id, "body": body}),
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    if not settings.hubspot_api_key:
        event.status = "skipped"
        event.error = "hubspot_api_key not configured"
        db.commit()
        return None

    try:
        resp = httpx.post(
            f"{HUBSPOT_API_BASE}/crm/v3/objects/notes",
            headers={"Authorization": f"Bearer {settings.hubspot_api_key}"},
            json={
                "properties": {"hs_note_body": body},
                "associations": [
                    {
                        "to": {"id": contact_id},
                        "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 202}],
                    }
                ],
            },
            timeout=10,
        )
        if not resp.is_success:
            event.status = "failed"
            event.response_json = json.dumps({"status_code": resp.status_code, "body": resp.text[:2000]})
            db.commit()
            return None

        body_json = resp.json()
        note_id = body_json.get("id")
        event.status = "success"
        event.response_json = json.dumps({"status_code": resp.status_code, "note_id": note_id})
        db.commit()
        return note_id
    except httpx.HTTPError as exc:
        logger.warning("hubspot_create_note_failed contact_id=%s error=%s", contact_id, exc)
        event.status = "failed"
        event.error = str(exc)
        db.commit()
        return None
