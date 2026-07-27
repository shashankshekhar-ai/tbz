"""
AI Readiness scoring helper.

Takes raw assessment answers, calls the configured AI provider (Anthropic or
Gemini, see core/ai_provider.py) with a forced structured-output call so the
model can only respond in the exact shape we validate against, then returns a
schema-validated AssessmentScore. Any bad/missing API key, malformed output,
or API failure raises AIScoringError instead of propagating a raw exception
or returning an unvalidated blob — callers decide the fallback (e.g. mark the
assessment session as scoring_failed) rather than losing data.
"""
from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, ValidationError

from core.ai_provider import AIProviderError, structured_call

MaturityLevel = Literal["exploring", "building", "scaling", "leading"]


class AssessmentScore(BaseModel):
    overall_score: int = Field(ge=0, le=100)
    maturity_level: MaturityLevel
    summary: str = Field(min_length=1, max_length=1000)
    recommendations: list[str] = Field(min_length=1, max_length=6)


class AIScoringError(Exception):
    """Raised whenever scoring can't be trusted — bad key, API failure, or output that fails schema validation."""


_SCORE_TOOL = {
    "name": "submit_assessment_score",
    "description": "Submit the AI readiness assessment score for the given answers.",
    "input_schema": {
        "type": "object",
        "properties": {
            "overall_score": {"type": "integer", "minimum": 0, "maximum": 100},
            "maturity_level": {
                "type": "string",
                "enum": ["exploring", "building", "scaling", "leading"],
            },
            "summary": {"type": "string", "maxLength": 1000},
            "recommendations": {
                "type": "array",
                "items": {"type": "string"},
                "minItems": 1,
                "maxItems": 6,
            },
        },
        "required": ["overall_score", "maturity_level", "summary", "recommendations"],
    },
}

_SYSTEM_PROMPT = (
    "You are an AI readiness assessor. Given a set of question/answer pairs from "
    "an organizational AI maturity questionnaire, call submit_assessment_score "
    "with an honest, calibrated score. Do not inflate scores — most organizations "
    "starting out should land in 'exploring' or 'building'."
)


def score_assessment(answers: dict[str, str]) -> AssessmentScore:
    qa_text = "\n".join(f"- {question}: {answer}" for question, answer in answers.items())

    try:
        raw = structured_call(
            system_prompt=_SYSTEM_PROMPT,
            user_message=f"Assessment answers:\n{qa_text}",
            tool_name=_SCORE_TOOL["name"],
            tool_description=_SCORE_TOOL["description"],
            input_schema=_SCORE_TOOL["input_schema"],
            max_tokens=1024,
        )
    except AIProviderError as exc:
        raise AIScoringError(str(exc)) from exc

    try:
        return AssessmentScore.model_validate(raw)
    except ValidationError as exc:
        raise AIScoringError(f"Model output failed schema validation: {exc}") from exc
