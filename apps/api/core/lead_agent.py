"""
Lead follow-up agent.

After an assessment scores a lead, this drafts a short, personalized outreach
note referencing their score and one concrete recommendation, for a human rep
to review before sending. Feature-flagged like ai_scoring: no provider key
configured (see core/ai_provider.py) -> LeadAgentError, and callers
skip/record rather than blocking the assessment flow.
"""
from __future__ import annotations

from pydantic import BaseModel, Field, ValidationError

from core.ai_provider import AIProviderError, structured_call


class FollowupDraft(BaseModel):
    subject: str = Field(min_length=1, max_length=200)
    body: str = Field(min_length=1, max_length=2000)


class LeadAgentError(Exception):
    """Raised when a follow-up draft can't be trusted — bad key, API failure, or bad schema output."""


_DRAFT_TOOL = {
    "name": "submit_followup_draft",
    "description": "Submit a short personalized follow-up note for this lead.",
    "input_schema": {
        "type": "object",
        "properties": {
            "subject": {"type": "string", "maxLength": 200},
            "body": {"type": "string", "maxLength": 2000},
        },
        "required": ["subject", "body"],
    },
}

_SYSTEM_PROMPT = (
    "You are a sales development assistant for The Bradbury Group, an AI executive "
    "coaching and transformation firm. Given a lead's AI readiness assessment result, "
    "call submit_followup_draft with a short (under 150 words), warm, non-salesy note "
    "a human rep can review and send as-is or edit. Reference their maturity level and "
    "one specific recommendation. No generic filler, no exclamation-point energy."
)


def draft_followup(
    *,
    first_name: str | None,
    company: str | None,
    overall_score: int,
    maturity_level: str,
    summary: str,
    recommendations: list[str],
) -> FollowupDraft:
    context = (
        f"Name: {first_name or 'there'}\n"
        f"Company: {company or 'unknown'}\n"
        f"Overall score: {overall_score}/100\n"
        f"Maturity level: {maturity_level}\n"
        f"Summary: {summary}\n"
        f"Recommendations: {'; '.join(recommendations)}"
    )

    try:
        raw = structured_call(
            system_prompt=_SYSTEM_PROMPT,
            user_message=context,
            tool_name=_DRAFT_TOOL["name"],
            tool_description=_DRAFT_TOOL["description"],
            input_schema=_DRAFT_TOOL["input_schema"],
            max_tokens=512,
        )
    except AIProviderError as exc:
        raise LeadAgentError(str(exc)) from exc

    try:
        return FollowupDraft.model_validate(raw)
    except ValidationError as exc:
        raise LeadAgentError(f"Model output failed schema validation: {exc}") from exc
