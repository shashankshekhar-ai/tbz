from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class LeadCreate(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    phone: Optional[str] = None
    source: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None
    notes: Optional[str] = None


class LeadUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    phone: Optional[str] = None
    hubspot_contact_id: Optional[str] = None
    clickup_task_id: Optional[str] = None
    notes: Optional[str] = None


class LeadOut(BaseModel):
    id: int
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    company: Optional[str]
    job_title: Optional[str]
    phone: Optional[str]
    source: Optional[str]
    hubspot_contact_id: Optional[str]
    clerk_user_id: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class LeadEventCreate(BaseModel):
    event_type: str
    metadata_json: Optional[str] = None
