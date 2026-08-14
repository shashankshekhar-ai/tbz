from __future__ import annotations

from typing import Any

from fastapi import HTTPException, Request

from auth.models import get_user_by_id
from auth.sessions import COOKIE_NAME, read_session_token


def require_session(request: Request) -> dict[str, Any]:
    token = request.cookies.get(COOKIE_NAME)
    data = read_session_token(token) if token else None
    user = get_user_by_id(data["user_id"]) if data else None
    if not user or user["session_epoch"] != data["epoch"]:
        raise HTTPException(status_code=401, detail="Unauthorized")
    request.state.user = user
    return user
