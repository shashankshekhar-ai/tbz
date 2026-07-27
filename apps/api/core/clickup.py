"""
ClickUp task client.

Same feature-flag pattern as core/hubspot.py: without CLICKUP_API_KEY (and
CLICKUP_LIST_ID) configured, calls are skipped and recorded, never raised.
"""
from __future__ import annotations

import json
import logging
from typing import Optional

import httpx
from sqlalchemy.orm import Session

from core.config import settings
from models.integration import IntegrationEvent

logger = logging.getLogger(__name__)

CLICKUP_API_BASE = "https://api.clickup.com/api/v2"


def create_task(
    db: Session,
    name: str,
    description: str = "",
    lead_id: Optional[int] = None,
) -> Optional[str]:
    """Create a ClickUp task in the configured list. Returns the task id, or None if skipped/failed."""
    event = IntegrationEvent(
        lead_id=lead_id,
        target="clickup",
        event_type="task_create",
        status="pending",
        payload_json=json.dumps({"name": name, "description": description}),
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    if not settings.clickup_api_key or not settings.clickup_list_id:
        event.status = "skipped"
        event.error = "clickup_api_key or clickup_list_id not configured"
        db.commit()
        return None

    try:
        resp = httpx.post(
            f"{CLICKUP_API_BASE}/list/{settings.clickup_list_id}/task",
            headers={"Authorization": settings.clickup_api_key},
            json={"name": name, "description": description},
            timeout=10,
        )
        if not resp.is_success:
            event.status = "failed"
            event.response_json = json.dumps({"status_code": resp.status_code, "body": resp.text[:2000]})
            db.commit()
            return None

        body = resp.json()
        task_id = body.get("id")
        event.status = "success"
        event.response_json = json.dumps({"status_code": resp.status_code, "task_id": task_id})
        db.commit()
        return task_id
    except httpx.HTTPError as exc:
        logger.warning("clickup_create_task_failed name=%s error=%s", name, exc)
        event.status = "failed"
        event.error = str(exc)
        db.commit()
        return None
