"""
AIwebmaster — the propose-then-approve ops+content agent.

Mirrors apps/api/core/lead_agent.py's shape (system prompt + forced tool call
via core/ai_provider.structured_call), but the "tool" here is a list of typed
actions rather than a single object, since one request can bundle e.g. a
content change + a nav link + a redeploy.

Executable action types (get a Run button once approved): content, nav_link,
git, docker, sql — see core/executors.py.
Draft-only action types (text explanation only, never wired to Run — the host
runs 60+ unrelated containers and system-level changes are too risky to
automate): nginx, system.
"""
from __future__ import annotations

import uuid
from typing import Any, Literal

from core.ai_provider import AIProviderError, structured_call
from core.context import build_site_context

EXECUTABLE_TYPES = {"content", "nav_link", "git", "docker", "sql", "user_management", "publish", "rollback", "code_edit"}
DRAFT_ONLY_TYPES = {"nginx", "system"}
ALL_TYPES = EXECUTABLE_TYPES | DRAFT_ONLY_TYPES

ActionType = Literal[
    "content", "nav_link", "git", "docker", "sql", "user_management", "publish", "rollback", "code_edit", "nginx", "system"
]


class AIwebmasterError(Exception):
    pass


_SYSTEM_PROMPT = """You are AIwebmaster, an ops+content assistant for The Bradbury Group's website.
You help the site owner make content changes and run infrastructure operations, by proposing a
list of concrete actions — never executing anything yourself. A human reviews and clicks Run on
each action individually.

Action types you can propose:
- content: create/update a Page, Post/Insight, Resource, or Case Study. payload: {kind: "page"|"post"|"resource"|"case-study", docId?: string, fields: {...}}
- nav_link: add/update a header or footer navigation entry. payload: {label, href, location: "header"|"footer", footerGroup?, order?, enabled?, openInNewTab?}
- git: stage, commit, and push. payload: {message: string, push: boolean}
- docker: rebuild and redeploy one or more compose services. payload: {services: string[]} (e.g. ["web"], ["cms","web"])
- sql: run a raw SQL statement against the cms or api database. payload: {database: "cms"|"api", statement: string}
- user_management: create or update an AIwebmaster account (only super_admin can run this). payload: {email: string, role: "docker_ops"|"ui_editor"|"infra_admin"|"super_admin", password?: string}
- publish: promote the dev stack's CMS content + current code to the production stack (only super_admin can run this). A backup of the current prod DB is always taken first. payload: {target: "prod"}
- rollback: restore production's CMS database from the most recent pre-publish backup, then restart cms-prod (only super_admin can run this). Use when a publish turns out to be wrong. payload: {}
- code_edit: edit or create a source file in the repo (only infra_admin/super_admin can run this). payload for editing an existing file: {file: "apps/web/components/layout/HeaderNav.tsx", mode: "edit", old_string: "...", new_string: "..."} — old_string must be exact, unique, minimal-but-sufficient context from the real current file content (ask to see the file first if you don't already have it in context). payload for a new file or full overwrite: {file: "...", mode: "write", content: "..."} (full file contents). After a code_edit, usually also propose a docker action to rebuild the affected service, and optionally a git action to commit — as separate actions, not bundled into code_edit's payload.
- nginx: explain/draft an nginx reload or config-check command. payload: {command: string, note: string} — DRAFT ONLY, never executed by you, the human runs it manually.
- system: explain/draft an OS package-update command. payload: {command: string, note: string} — DRAFT ONLY, never executed by you.

Rules:
- Always reply conversationally in plain text explaining what you're proposing or asking a clarifying question.
- Only call propose_actions when you're actually proposing something to run. If just answering a question, reply with text only.
- For git/docker/sql actions, be conservative — one clear action per intent, not speculative bundles.
- For sql, only propose statements the user actually asked for or that are a direct, obvious consequence of their request. Never propose destructive statements (DROP, TRUNCATE, DELETE without a WHERE clause) unless the user explicitly asked for exactly that.
- nginx and system actions are always draft-only — say so in your reply so the human knows they must run it by hand.
- You have no file-reading tool. If you don't already know a file's exact current content (from earlier in this conversation or from what the user pasted), ask them to paste the relevant lines rather than guessing old_string — a wrong guess fails cleanly with no match (safe), but asking first is faster than a failed round-trip.
"""

_ACTION_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"type": "string", "enum": sorted(ALL_TYPES)},
        "description": {"type": "string"},
        "payload": {"type": "object"},
    },
    "required": ["type", "description", "payload"],
}

_PROPOSE_ACTIONS_SCHEMA = {
    "type": "object",
    "properties": {
        "actions": {"type": "array", "items": _ACTION_SCHEMA},
    },
    "required": ["actions"],
}

_TOOL_NAME = "propose_actions"
_TOOL_DESCRIPTION = (
    "Propose one or more concrete actions for the human to review and individually approve. "
    "Does not execute anything."
)


def run_agent_turn(history: list[dict[str, str]]) -> dict[str, Any]:
    """history: [{role: 'user'|'assistant', content: str}, ...]. Returns
    {reply: str, actions: [{id, type, description, payload, executable}]}."""
    conversation = "\n\n".join(f"{m['role']}: {m['content']}" for m in history)
    context = build_site_context()
    if context:
        conversation = f"{context}\n\n---\n\n{conversation}"
    try:
        result = structured_call(
            system_prompt=_SYSTEM_PROMPT,
            user_message=conversation,
            tool_name=_TOOL_NAME,
            tool_description=_TOOL_DESCRIPTION,
            input_schema=_PROPOSE_ACTIONS_SCHEMA,
        )
    except AIProviderError as exc:
        raise AIwebmasterError(str(exc)) from exc

    raw_actions = (result.get("proposal") or {}).get("actions", []) if result.get("proposal") else []
    actions = []
    for raw in raw_actions:
        action_type = raw.get("type")
        if action_type not in ALL_TYPES:
            continue
        actions.append(
            {
                "id": str(uuid.uuid4()),
                "type": action_type,
                "description": raw.get("description", ""),
                "payload": raw.get("payload", {}),
                "executable": action_type in EXECUTABLE_TYPES,
            }
        )

    reply = result.get("reply", "") or ""
    if not reply.strip() and actions:
        reply = "Here's what I'm proposing — review each action and click Run to apply it."
    return {"reply": reply, "actions": actions}
