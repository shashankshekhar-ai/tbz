"""
Columbus — the site's AI executive-advisor chat widget, plus the webhook
receiver for the production Columbus voice agent (ElevenLabs Conversational
AI, agent_9201kp1axxvdfprb99958h8wd89s). That agent's calls are automated
end-to-end by a separate self-hosted n8n workflow (Gemini analysis, internal
+ marketing email, Google Sheets, ClickUp); this receiver does not duplicate
that pipeline. It exists so this app's own lead DB also gets a record of
every completed Columbus call, independent of n8n.

The chat endpoint below is stateless: each request gets the recent chat
history and site context from the client and returns a single reply plus
optional recommendation links. No conversation is persisted server-side.
"""
import hashlib
import hmac
import json
import logging
import time

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from core.ai_provider import AIProviderError, structured_call
from core.config import settings
from core.db import get_db
from core.integrations import log_audit
from models.lead import Lead, LeadEvent

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/columbus", tags=["columbus"])

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
