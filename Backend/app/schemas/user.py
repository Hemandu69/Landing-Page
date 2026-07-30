import uuid
from datetime import date, datetime
from typing import Any, Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator
from app.models.enums import Gender


class UserProfileResponse(BaseModel):
    """Schema for complete authenticated user profile details."""

    id: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    email_verified: bool = False
    phone_verified: bool = False
    profile_image: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[Gender] = None
    country: Optional[str] = None
    address_line_1: Optional[str] = None
    address_line_2: Optional[str] = None
    bio: Optional[str] = None
    public_profile: bool = True
    is_active: bool = True
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @field_validator("id", mode="before")
    @classmethod
    def convert_uuid_to_str(cls, v: Any) -> str:
        if isinstance(v, uuid.UUID):
            return str(v)
        return str(v) if v else ""


class UpdateProfileRequest(BaseModel):
    """Schema for updating user profile information. Strictly excludes sensitive/readonly fields."""

    first_name: Optional[str] = Field(default=None, max_length=100)
    last_name: Optional[str] = Field(default=None, max_length=100)
    date_of_birth: Optional[date] = Field(default=None)
    gender: Optional[Gender] = Field(default=None)
    country: Optional[str] = Field(default=None, max_length=100)
    address_line_1: Optional[str] = Field(default=None, max_length=255)
    address_line_2: Optional[str] = Field(default=None, max_length=255)
    bio: Optional[str] = Field(default=None, max_length=500, description="Short bio (max 500 characters)")
    public_profile: Optional[bool] = Field(default=None, description="Public profile visibility setting")

    @field_validator("bio")
    @classmethod
    def validate_bio_length(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v.strip()) > 500:
            raise ValueError("Bio must not exceed 500 characters.")
        return v.strip() if v else v


class ProfileImageResponse(BaseModel):
    """Response schema returned after uploading a profile image."""

    success: bool = True
    message: str = "Profile image uploaded successfully"
    profile_image_url: str


class PublicProfileResponse(BaseModel):
    """Schema for public user profile view."""

    id: str
    name: str = Field(description="Combined first and last name")
    bio: Optional[str] = None
    country: Optional[str] = None
    profile_image: Optional[str] = None
    public_profile: bool = True

    model_config = ConfigDict(from_attributes=True)

    @field_validator("id", mode="before")
    @classmethod
    def convert_uuid_to_str(cls, v: Any) -> str:
        if isinstance(v, uuid.UUID):
            return str(v)
        return str(v) if v else ""
