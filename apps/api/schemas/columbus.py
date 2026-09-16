from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class ColumbusStartRequest(BaseModel):
    activeSection: str = "home"


class ColumbusStartOut(BaseModel):
    session_token: str
    phase: str  # "contact" | "readiness"
    question: str
    question_index: int
    question_count: int


class ColumbusMessageRequest(BaseModel):
    answer: str


class ColumbusRecommendationOut(BaseModel):
    title: str
    link: str
    category: str


class ColumbusMessageOut(BaseModel):
    reply: str
    phase: str  # "contact" | "readiness" | "complete"
    question_index: int
    question_count: int
    is_complete: bool
    recommendations: list[ColumbusRecommendationOut] = []


class ColumbusSessionOut(BaseModel):
    session_token: str
    status: str
    current_question_index: int
    answers: list[dict[str, Any]]
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_company: Optional[str] = None
    summary: Optional[str] = None
    recommended_path: Optional[str] = None
    recommendations: list[str] = []
    completed_at: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
