from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request

from auth.deps import require_session
from core.aiwebmaster_agent import AIwebmasterError, run_agent_turn
from db.audit import log_event

router = APIRouter(dependencies=[Depends(require_session)])


@router.post("/chat")
def chat(body: dict, request: Request) -> dict:
    messages = body.get("messages") or []
    if not messages:
        raise HTTPException(status_code=400, detail="messages is required")

    try:
        result = run_agent_turn(messages)
    except AIwebmasterError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    for action in result["actions"]:
        log_event(
            event="proposed",
            actor=request.state.user["email"],
            action_type=action["type"],
            action_id=action["id"],
            payload=action["payload"],
        )

    return result
