from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin


class Lead(Base, TimestampMixin):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    first_name: Mapped[Optional[str]] = mapped_column(String(100))
    last_name: Mapped[Optional[str]] = mapped_column(String(100))
    company: Mapped[Optional[str]] = mapped_column(String(255))
    job_title: Mapped[Optional[str]] = mapped_column(String(255))
    phone: Mapped[Optional[str]] = mapped_column(String(50))

    # Source tracking
    source: Mapped[Optional[str]] = mapped_column(String(100))  # contact_form, resource_gate, assessment
    utm_source: Mapped[Optional[str]] = mapped_column(String(100))
    utm_medium: Mapped[Optional[str]] = mapped_column(String(100))
    utm_campaign: Mapped[Optional[str]] = mapped_column(String(100))
    referrer: Mapped[Optional[str]] = mapped_column(Text)

    # CRM
    hubspot_contact_id: Mapped[Optional[str]] = mapped_column(String(100), index=True)
    clickup_task_id: Mapped[Optional[str]] = mapped_column(String(100))

    # Clerk auth link (optional — only if lead registers)
    clerk_user_id: Mapped[Optional[str]] = mapped_column(String(100), unique=True, index=True)

    notes: Mapped[Optional[str]] = mapped_column(Text)

    events: Mapped[list[LeadEvent]] = relationship(back_populates="lead", cascade="all, delete-orphan")

    __table_args__ = (Index("ix_leads_email_lower", "email"),)


class LeadEvent(Base, TimestampMixin):
    __tablename__ = "lead_events"

    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id", ondelete="CASCADE"), nullable=False, index=True)
    event_type: Mapped[str] = mapped_column(String(100), nullable=False)  # form_submit, download, assessment_start, etc.
    metadata_json: Mapped[Optional[str]] = mapped_column(Text)  # JSON blob for extra context

    lead: Mapped[Lead] = relationship(back_populates="events")
