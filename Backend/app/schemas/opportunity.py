import uuid
from datetime import date, datetime
from typing import Any, List, Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.enums import OpportunityMode, OpportunityType, OpportunityStatus


class OpportunitySummary(BaseModel):
    """Card summary schema representation for opportunity listings."""

    id: str
    title: str
    slug: str
    organization_name: str
    organization_logo: Optional[str] = None
    short_description: str
    category: str
    location: Optional[str] = None
    mode: OpportunityMode
    type: OpportunityType
    registration_deadline: Optional[datetime] = None
    status: OpportunityStatus
    featured: bool = False
    banner_image: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @field_validator("id", mode="before")
    @classmethod
    def convert_uuid_to_str(cls, v: Any) -> str:
        if isinstance(v, uuid.UUID):
            return str(v)
        return str(v) if v else ""


class OpportunityResponse(BaseModel):
    """Complete detail response schema for a single opportunity."""

    id: str
    title: str
    slug: str
    organization_name: str
    organization_logo: Optional[str] = None
    short_description: str
    description: str
    category: str
    location: Optional[str] = None
    mode: OpportunityMode
    type: OpportunityType
    eligibility: Optional[str] = None
    skills_required: Optional[str] = None
    application_link: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    registration_deadline: Optional[datetime] = None
    status: OpportunityStatus
    featured: bool = False
    banner_image: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @field_validator("id", mode="before")
    @classmethod
    def convert_uuid_to_str(cls, v: Any) -> str:
        if isinstance(v, uuid.UUID):
            return str(v)
        return str(v) if v else ""


class PaginationMeta(BaseModel):
    """Pagination metadata details."""

    page: int = Field(default=1, description="Current page number")
    page_size: int = Field(default=10, description="Number of items per page")
    total: int = Field(description="Total matching items count")
    total_pages: int = Field(description="Total calculated pages count")
    has_next: bool = Field(description="Flag indicating if a next page exists")
    has_previous: bool = Field(description="Flag indicating if a previous page exists")


class OpportunityListResponse(BaseModel):
    """Response schema returned for paginated opportunity listings."""

    success: bool = True
    data: List[OpportunitySummary]
    meta: PaginationMeta


class OpportunityCategoriesResponse(BaseModel):
    """Response schema returned for available opportunity categories."""

    success: bool = True
    data: List[str]
