from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class IntegrationEventOut(BaseModel):
    id: int
    lead_id: Optional[int]
    target: str
    event_type: str
    status: str
    payload_json: Optional[str]
    response_json: Optional[str]
    error: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class AuditLogOut(BaseModel):
    id: int
    actor_id: Optional[str]
    action: str
    resource_type: Optional[str]
    resource_id: Optional[str]
    metadata_json: Optional[str]
    ip_address: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}
