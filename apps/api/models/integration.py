from __future__ import annotations

from typing import Optional

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin


class IntegrationEvent(Base, TimestampMixin):
    __tablename__ = "integration_events"

    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[Optional[int]] = mapped_column(ForeignKey("leads.id", ondelete="SET NULL"), index=True)
    target: Mapped[str] = mapped_column(String(50), nullable=False)  # n8n, hubspot, clickup, ses
    event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="pending")  # pending, success, failed
    payload_json: Mapped[Optional[str]] = mapped_column(Text)
    response_json: Mapped[Optional[str]] = mapped_column(Text)
    error: Mapped[Optional[str]] = mapped_column(Text)
