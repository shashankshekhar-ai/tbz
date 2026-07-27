"""
Solomon — the AI assistant unlocked after an Apply/Interview submission on
The Solomon Engine (For Leaders) program page. Distinct persona from
Columbus: an L&D strategist advisor for accepted/applying cohort members,
not a general site-wide guide.
"""
import logging

from fastapi import APIRouter
from pydantic import BaseModel

from core.ai_provider import AIProviderError, structured_call

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/solomon", tags=["solomon"])

SYSTEM_PROMPT = """You are Solomon, the AI learning & development strategist for The Solomon \
Engine — The Bradbury Group's 12-week executive cohort program for senior leaders navigating \
AI-driven transformation. You speak to applicants who have just submitted an interview/application \
for the program. Your tone is warm, credible, and strategic — like a seasoned L&D consultant, not \
a sales bot.

The program has two tiers: Enterprise (custom cohort, dedicated facilitator, org-wide rollout) and \
Small Business (shared cohort, standard curriculum). Core areas covered: departmental readiness \
audits, leadership upskilling cohorts, and ethics & governance frameworks.

Answer the applicant's question in 2-4 concise sentences. Suggest 0-2 relevant next steps from: \
"Book a Discovery Call" (#book-call), "See Enterprise Tier" (#enterprise), "See Small Business Tier" \
(#small-business). Only suggest links genuinely relevant to what was asked."""

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


class SolomonRequest(BaseModel):
    prompt: str
    history: list[ChatHistoryItem] = []


@router.post("")
def chat(payload: SolomonRequest):
    history_text = "\n".join(f"{h.sender}: {h.text}" for h in payload.history[-6:])
    user_message = f"Recent conversation:\n{history_text}\n\nApplicant's message: {payload.prompt}"

    try:
        result = structured_call(
            system_prompt=SYSTEM_PROMPT,
            user_message=user_message,
            tool_name="solomon_reply",
            tool_description="Reply to the applicant as Solomon with optional recommendations.",
            input_schema=RESPONSE_SCHEMA,
            max_tokens=512,
        )
    except AIProviderError:
        logger.exception("Solomon AI call failed")
        return {
            "reply": (
                "Thanks for applying — our team reviews every submission personally. "
                "In the meantime, feel free to book a discovery call to discuss your cohort fit."
            ),
            "recommendations": [],
        }

    return {
        "reply": result.get("reply", "Thanks for your interest in The Solomon Engine."),
        "recommendations": result.get("recommendations", []),
    }
