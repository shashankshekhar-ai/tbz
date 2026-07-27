from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, EmailStr


class AssessmentStartRequest(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    company: Optional[str] = None
    source: Optional[str] = None


class AssessmentStartOut(BaseModel):
    session_token: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class AssessmentAnswerIn(BaseModel):
    question_id: str
    answer: Any


class AssessmentAnswersSubmit(BaseModel):
    answers: list[AssessmentAnswerIn]


class AssessmentResultOut(BaseModel):
    overall_score: int
    maturity_level: str
    summary: str
    recommendations: list[str]

    model_config = {"from_attributes": True}


class AssessmentSessionOut(BaseModel):
    session_token: str
    status: str
    completed_at: Optional[str]
    result: Optional[AssessmentResultOut] = None

    model_config = {"from_attributes": True}
