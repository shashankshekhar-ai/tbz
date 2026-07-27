from __future__ import annotations

from typing import Optional

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin


class FormSubmission(Base, TimestampMixin):
    __tablename__ = "form_submissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[Optional[int]] = mapped_column(ForeignKey("leads.id", ondelete="SET NULL"), index=True)
    form_type: Mapped[str] = mapped_column(String(100), nullable=False)  # contact, newsletter, etc.
    data_json: Mapped[str] = mapped_column(Text, nullable=False)  # full form payload as JSON

    # Integration status
    hubspot_synced: Mapped[bool] = mapped_column(default=False)
    clickup_synced: Mapped[bool] = mapped_column(default=False)
    email_sent: Mapped[bool] = mapped_column(default=False)
    n8n_triggered: Mapped[bool] = mapped_column(default=False)
