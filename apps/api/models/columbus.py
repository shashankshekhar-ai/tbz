from __future__ import annotations

from typing import Optional

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin


class ColumbusSession(Base, TimestampMixin):
    """One Talk-tab readiness interview. Answers accumulate turn by turn;
    the report fields are filled in once, when the last question is answered."""

    __tablename__ = "columbus_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[Optional[int]] = mapped_column(ForeignKey("leads.id", ondelete="SET NULL"), index=True)
    session_token: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(50), default="in_progress")  # in_progress, completed
    current_question_index: Mapped[int] = mapped_column(Integer, default=0)
    answers_json: Mapped[Optional[str]] = mapped_column(Text)  # JSON list of {question, answer}

    contact_name: Mapped[Optional[str]] = mapped_column(String(255))
    contact_email: Mapped[Optional[str]] = mapped_column(String(255))
    contact_company: Mapped[Optional[str]] = mapped_column(String(255))

    summary: Mapped[Optional[str]] = mapped_column(Text)
    recommended_path: Mapped[Optional[str]] = mapped_column(String(100))
    recommendations_json: Mapped[Optional[str]] = mapped_column(Text)  # JSON array of {title, link, category}
    completed_at: Mapped[Optional[str]] = mapped_column(String(50))
