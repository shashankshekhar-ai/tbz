from __future__ import annotations

from typing import Optional

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin


class ResourceDownload(Base, TimestampMixin):
    __tablename__ = "resource_downloads"

    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[Optional[int]] = mapped_column(ForeignKey("leads.id", ondelete="SET NULL"), index=True)
    resource_slug: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    resource_title: Mapped[Optional[str]] = mapped_column(String(500))
    access_token: Mapped[Optional[str]] = mapped_column(String(255), unique=True, index=True)  # for signed URL
    ip_address: Mapped[Optional[str]] = mapped_column(String(50))
