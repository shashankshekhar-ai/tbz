"""
Bridge from the website's Talk-tab interview to the real Columbus production
automation — a self-hosted n8n workflow that normally only fires from the
ElevenLabs voice agent's own post-call webhook (see
docs/planning/08_INTEGRATIONS.md and the Columbus n8n Workflow Documentation
handed over alongside this feature). That workflow's "Extract Session Data"
node expects an ElevenLabs-shaped payload and its "HMAC Verification" node
checks an `elevenlabs-signature: t=<unix>,v0=<hex hmac-sha256>` header — the
exact same scheme this app's own /columbus/webhook receiver already verifies
(routers/columbus.py::_verify_elevenlabs_signature), just signed with the
n8n workflow's own secret instead of this app's.

Best-effort like every other integration in this codebase (core/clickup.py,
core/integrations.py): records an IntegrationEvent either way, never raises,
a failure here must never lose the interview data already committed to
ColumbusSession.
"""
from __future__ import annotations

import hashlib
import hmac
import json
import logging
import time
from typing import Optional

import httpx
from sqlalchemy.orm import Session

from core.config import settings
from models.integration import IntegrationEvent

logger = logging.getLogger(__name__)

# The production agent id from the n8n workflow doc — used here only as a
# label in the synthetic payload so this event is identifiable in the same
# downstream systems (Sheets, ClickUp) as real ElevenLabs calls.
COLUMBUS_AGENT_ID = "agent_9201kp1axxvdfprb99958h8wd89s"


def _sign(raw_body: bytes, secret: str) -> str:
    timestamp = int(time.time())
    signed_payload = f"{timestamp}.{raw_body.decode('utf-8')}".encode("utf-8")
    signature = hmac.new(secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    return f"t={timestamp},v0={signature}"


def send_readiness_interview(
    db: Session,
    *,
    session_token: str,
    contact_name: Optional[str],
    contact_email: Optional[str],
    contact_company: Optional[str],
    readiness_answers: list[dict[str, str]],
    summary: str,
    call_duration_secs: int,
) -> IntegrationEvent:
    """POST one completed Talk-tab interview to the real n8n workflow, shaped
    like an ElevenLabs post-call webhook payload."""
    data_collection_results = {
        "user_name_spelled": {"value": contact_name or ""},
        "user_email": {"value": contact_email or ""},
        "user_company": {"value": contact_company or ""},
        "user_title": {"value": ""},
        "user_location": {"value": ""},
        "user_phone": {"value": ""},
    }
    for i, qa in enumerate(readiness_answers, start=1):
        data_collection_results[f"Q{i}"] = {"value": qa["answer"]}

    transcript = []
    if contact_name is not None:
        transcript.append({"role": "user", "message": contact_name})
    for qa in readiness_answers:
        transcript.append({"role": "agent", "message": qa["question"]})
        transcript.append({"role": "user", "message": qa["answer"]})

    body = {
        "data": {
            "conversation_id": f"web-talk-{session_token}",
            "agent_id": COLUMBUS_AGENT_ID,
            "metadata": {"call_duration_secs": call_duration_secs},
            "analysis": {
                "transcript_summary": summary,
                "evaluation_criteria_results": {"sentiment": {"result": "n/a"}},
                "data_collection_results": data_collection_results,
            },
            "transcript": transcript,
        }
    }
    payload_json = json.dumps(body, default=str)

    event = IntegrationEvent(
        lead_id=None,
        target="n8n_columbus",
        event_type="columbus_interview_completed",
        status="pending",
        payload_json=payload_json,
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    if not settings.columbus_n8n_webhook_url or not settings.columbus_n8n_webhook_secret:
        event.status = "skipped"
        event.error = "columbus_n8n_webhook_url or columbus_n8n_webhook_secret not configured"
        db.commit()
        return event

    raw_body = payload_json.encode("utf-8")
    signature = _sign(raw_body, settings.columbus_n8n_webhook_secret)

    try:
        resp = httpx.post(
            settings.columbus_n8n_webhook_url,
            content=raw_body,
            headers={"content-type": "application/json", "elevenlabs-signature": signature},
            timeout=15,
        )
        event.status = "success" if resp.is_success else "failed"
        event.response_json = json.dumps({"status_code": resp.status_code, "body": resp.text[:2000]})
    except httpx.HTTPError as exc:
        logger.warning("columbus_n8n_bridge_failed session_token=%s error=%s", session_token, exc)
        event.status = "failed"
        event.error = str(exc)

    db.commit()
    return event
