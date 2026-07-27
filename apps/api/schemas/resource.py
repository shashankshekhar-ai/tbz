from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class ResourceDownloadCreate(BaseModel):
    email: EmailStr
    resource_slug: str
    resource_title: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    source: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None


class ResourceDownloadOut(BaseModel):
    id: int
    lead_id: Optional[int]
    resource_slug: str
    resource_title: Optional[str]
    access_token: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}
