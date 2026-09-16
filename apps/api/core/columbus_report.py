"""
Columbus readiness-interview report synthesis.

Takes the 5 Q&A pairs from a completed Talk-tab interview, calls the
configured AI provider with a forced structured-output call, and returns a
schema-validated ColumbusReadinessReport for Paige's review. Mirrors
core/ai_scoring.py's pattern: any bad/missing key, malformed output, or API
failure raises ColumbusReportError instead of propagating a raw exception or
returning an unvalidated blob.
"""
from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, ValidationError

from core.ai_provider import AIProviderError, structured_call

RecommendedPath = Literal["for-you", "for-leaders", "for-organizations"]


class ColumbusReadinessReport(BaseModel):
    summary: str = Field(min_length=1, max_length=1000)
    recommended_path: RecommendedPath
    recommendations: list[str] = Field(min_length=1, max_length=4)


class ColumbusReportError(Exception):
    """Raised whenever the readiness report can't be trusted — bad key, API failure, or output that fails schema validation."""


_REPORT_TOOL = {
    "name": "submit_readiness_report",
    "description": "Submit the compiled AI-readiness report for this visitor, for Paige Bradbury's review.",
    "input_schema": {
        "type": "object",
        "properties": {
            "summary": {"type": "string", "maxLength": 1000},
            "recommended_path": {
                "type": "string",
                "enum": ["for-you", "for-leaders", "for-organizations"],
            },
            "recommendations": {
                "type": "array",
                "items": {"type": "string"},
                "minItems": 1,
                "maxItems": 4,
            },
        },
        "required": ["summary", "recommended_path", "recommendations"],
    },
}

_SYSTEM_PROMPT = (
    "You are compiling an internal executive briefing for Paige Bradbury at The Bradbury "
    "Group, from a visitor's answers to Columbus's 5-question AI-readiness interview "
    "(role, biggest AI challenge, team knowledge level, top concerns, one quick win). "
    "Call submit_readiness_report with a concise, honest summary (not a sales pitch), "
    "the single best-fit engagement path, and 1-4 concrete next-step recommendations for "
    "Paige's follow-up."
)


def generate_readiness_report(answers: list[dict[str, str]]) -> ColumbusReadinessReport:
    qa_text = "\n".join(f"- {a['question']}: {a['answer']}" for a in answers)

    try:
        raw = structured_call(
            system_prompt=_SYSTEM_PROMPT,
            user_message=f"Interview answers:\n{qa_text}",
            tool_name=_REPORT_TOOL["name"],
            tool_description=_REPORT_TOOL["description"],
            input_schema=_REPORT_TOOL["input_schema"],
            max_tokens=1024,
        )
    except AIProviderError as exc:
        raise ColumbusReportError(str(exc)) from exc

    try:
        return ColumbusReadinessReport.model_validate(raw)
    except ValidationError as exc:
        raise ColumbusReportError(f"Model output failed schema validation: {exc}") from exc
