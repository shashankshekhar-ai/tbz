"""
AI provider abstraction.

Every agent in this codebase (scoring, lead follow-up) needs the same thing:
"call an LLM, force it to answer in exactly this JSON shape." This module is
the one place that knows how to do that against either Anthropic or Gemini,
picked at runtime via AI_PROVIDER. Callers pass a JSON-schema-style dict and
get back a raw dict to validate against their own pydantic model — they never
touch either SDK directly.
"""
from __future__ import annotations

import json
from typing import Any

from core.config import settings

ANTHROPIC_MODEL = "claude-sonnet-4-5"
GEMINI_MODEL = "gemini-2.5-flash"

_GEMINI_TYPE_MAP = {
    "object": "OBJECT",
    "string": "STRING",
    "integer": "INTEGER",
    "number": "NUMBER",
    "array": "ARRAY",
    "boolean": "BOOLEAN",
}


class AIProviderError(Exception):
    """Raised when no provider is configured, or the call/response is unusable."""


def _to_gemini_schema(schema: dict[str, Any]) -> dict[str, Any]:
    """Gemini's response_schema uses uppercase OpenAPI-style types and only a
    subset of JSON Schema keywords — drop range/length constraints (those stay
    enforced by pydantic validation on the caller's side) and translate types."""
    out: dict[str, Any] = {}
    if "type" in schema:
        out["type"] = _GEMINI_TYPE_MAP.get(schema["type"], str(schema["type"]).upper())
    if "enum" in schema:
        out["enum"] = schema["enum"]
    if "properties" in schema:
        out["properties"] = {k: _to_gemini_schema(v) for k, v in schema["properties"].items()}
    if "items" in schema:
        out["items"] = _to_gemini_schema(schema["items"])
    if "required" in schema:
        out["required"] = schema["required"]
    return out


def structured_call(
    *,
    system_prompt: str,
    user_message: str,
    tool_name: str,
    tool_description: str,
    input_schema: dict[str, Any],
    max_tokens: int = 1024,
) -> dict[str, Any]:
    """Call the configured provider, forcing a single structured JSON response
    matching input_schema. Returns the raw dict for the caller to validate."""
    provider = settings.ai_provider.lower()
    if provider == "gemini":
        return _call_gemini(system_prompt, user_message, input_schema, max_tokens)
    return _call_anthropic(system_prompt, user_message, tool_name, tool_description, input_schema, max_tokens)


def _call_anthropic(
    system_prompt: str,
    user_message: str,
    tool_name: str,
    tool_description: str,
    input_schema: dict[str, Any],
    max_tokens: int,
) -> dict[str, Any]:
    import anthropic

    if not settings.anthropic_api_key:
        raise AIProviderError("ANTHROPIC_API_KEY is not configured")

    tool = {"name": tool_name, "description": tool_description, "input_schema": input_schema}
    try:
        client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        response = client.messages.create(
            model=ANTHROPIC_MODEL,
            max_tokens=max_tokens,
            system=system_prompt,
            tools=[tool],
            tool_choice={"type": "tool", "name": tool_name},
            messages=[{"role": "user", "content": user_message}],
        )
    except anthropic.APIError as exc:
        raise AIProviderError(f"Anthropic API call failed: {exc}") from exc

    tool_use = next((block for block in response.content if block.type == "tool_use"), None)
    if tool_use is None:
        raise AIProviderError("Anthropic model did not return a tool_use block")
    return tool_use.input


def _call_gemini(
    system_prompt: str,
    user_message: str,
    input_schema: dict[str, Any],
    max_tokens: int,
) -> dict[str, Any]:
    from google import genai
    from google.genai import types

    if not settings.gemini_api_key:
        raise AIProviderError("GEMINI_API_KEY is not configured")

    try:
        client = genai.Client(api_key=settings.gemini_api_key)
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=user_message,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                max_output_tokens=max_tokens,
                response_mime_type="application/json",
                response_schema=_to_gemini_schema(input_schema),
            ),
        )
    except Exception as exc:  # google-genai raises its own SDK-specific error types
        raise AIProviderError(f"Gemini API call failed: {exc}") from exc

    if not response.text:
        raise AIProviderError("Gemini model returned no content")

    try:
        return json.loads(response.text)
    except json.JSONDecodeError as exc:
        raise AIProviderError(f"Gemini response was not valid JSON: {exc}") from exc
