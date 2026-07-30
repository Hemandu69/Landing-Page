import uuid
from datetime import datetime
from typing import Any, List, Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator


class SessionResponse(BaseModel):
    """Response schema representing an active user session."""

    id: str
    device_name: Optional[str] = None
    device_type: Optional[str] = None
    browser: Optional[str] = None
    operating_system: Optional[str] = None
    ip_address: Optional[str] = None
    is_active: bool = True
    expires_at: datetime
    last_used_at: datetime
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @field_validator("id", mode="before")
    @classmethod
    def convert_uuid_to_str(cls, v: Any) -> str:
        if isinstance(v, uuid.UUID):
            return str(v)
        return str(v) if v else ""


class SessionListResponse(BaseModel):
    """Response schema returning list of user sessions."""

    success: bool = True
    data: List[SessionResponse]
