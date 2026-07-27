from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class FormSubmissionCreate(BaseModel):
    form_type: str
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None


class FormSubmissionOut(BaseModel):
    id: int
    lead_id: Optional[int]
    form_type: str
    hubspot_synced: bool
    clickup_synced: bool
    email_sent: bool
    n8n_triggered: bool
    created_at: datetime

    model_config = {"from_attributes": True}
