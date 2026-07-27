"""
Columbus — the site's AI executive-advisor chat widget.

Stateless: each request gets the recent chat history and site context from
the client and returns a single reply plus optional recommendation links.
No conversation is persisted server-side.
"""
import logging

from fastapi import APIRouter
from pydantic import BaseModel

from core.ai_provider import AIProviderError, structured_call

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/columbus", tags=["columbus"])

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
            max_tokens=512,
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
