from __future__ import annotations

from typing import Optional

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin


class AssessmentSession(Base, TimestampMixin):
    __tablename__ = "assessment_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[Optional[int]] = mapped_column(ForeignKey("leads.id", ondelete="SET NULL"), index=True)
    session_token: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(50), default="in_progress")  # in_progress, completed, abandoned
    completed_at: Mapped[Optional[str]] = mapped_column(String(50))  # ISO datetime string

    answers: Mapped[list[AssessmentAnswer]] = relationship(back_populates="session", cascade="all, delete-orphan")
    result: Mapped[Optional[AssessmentResult]] = relationship(back_populates="session", uselist=False, cascade="all, delete-orphan")


class AssessmentAnswer(Base, TimestampMixin):
    __tablename__ = "assessment_answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("assessment_sessions.id", ondelete="CASCADE"), nullable=False, index=True)
    question_id: Mapped[str] = mapped_column(String(100), nullable=False)
    answer_value: Mapped[str] = mapped_column(Text, nullable=False)  # JSON-encoded answer

    session: Mapped[AssessmentSession] = relationship(back_populates="answers")


class AssessmentResult(Base, TimestampMixin):
    __tablename__ = "assessment_results"

    id: Mapped[int] = mapped_column(primary_key=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("assessment_sessions.id", ondelete="CASCADE"), nullable=False, unique=True)
    overall_score: Mapped[int] = mapped_column(Integer, nullable=False)  # 0-100
    maturity_level: Mapped[str] = mapped_column(String(50), nullable=False)  # exploring, building, scaling, leading
    summary: Mapped[Optional[str]] = mapped_column(Text)
    recommendations_json: Mapped[Optional[str]] = mapped_column(Text)  # JSON array
    ai_output_json: Mapped[Optional[str]] = mapped_column(Text)  # raw AI scoring response
    report_file_path: Mapped[Optional[str]] = mapped_column(Text)  # S3 key or local path

    session: Mapped[AssessmentSession] = relationship(back_populates="result")
