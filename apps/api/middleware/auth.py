"""
Clerk JWT validation middleware.

In development (DEBUG=True, no CLERK_SECRET_KEY set), auth is bypassed and
a mock user is injected. In production, a valid Clerk Bearer token is required.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Optional

import httpx
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from core.config import settings

logger = logging.getLogger(__name__)

_bearer_scheme = HTTPBearer(auto_error=False)

# Cache JWKS in memory — refresh on startup or on key-miss
_jwks_cache: dict = {}


@dataclass
class CurrentUser:
    clerk_user_id: str
    email: Optional[str] = None
    is_admin: bool = False


async def _get_jwks() -> dict:
    global _jwks_cache
    if _jwks_cache:
        return _jwks_cache
    if not settings.clerk_jwks_url:
        return {}
    async with httpx.AsyncClient() as client:
        resp = await client.get(settings.clerk_jwks_url, timeout=5)
        resp.raise_for_status()
        _jwks_cache = resp.json()
    return _jwks_cache


async def get_current_user(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer_scheme),
) -> CurrentUser:
    # Dev bypass — no Clerk configured
    if settings.debug and not settings.clerk_secret_key:
        return CurrentUser(clerk_user_id="dev_user", email="dev@tbg.com", is_admin=True)

    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    try:
        jwks = await _get_jwks()
        if jwks:
            payload = jwt.decode(token, jwks, algorithms=["RS256"])
        else:
            # Fallback: validate via Clerk secret key (HS256 dev tokens)
            payload = jwt.decode(token, settings.clerk_secret_key, algorithms=["HS256"])

        clerk_user_id: str = payload.get("sub", "")
        email: str = payload.get("email", "")
        is_admin: bool = "admin" in payload.get("metadata", {}).get("roles", [])

        if not clerk_user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

        return CurrentUser(clerk_user_id=clerk_user_id, email=email or None, is_admin=is_admin)

    except JWTError as exc:
        logger.warning("JWT validation failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc


def require_admin(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    if not user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user
