from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator
from app.models.enums import OTPType, OTPPurpose
from app.utils.validators import is_valid_email, is_valid_indian_mobile


class RequestOTPRequest(BaseModel):
    """Schema for requesting an authentication or registration OTP."""

    identifier: str = Field(
        ...,
        description="Email address or 10-digit mobile number",
        examples=["user@example.com", "9876543210"],
    )
    type: Optional[OTPType] = Field(
        default=OTPType.PHONE,
        description="Delivery channel type (EMAIL or PHONE)",
    )
    purpose: Optional[OTPPurpose] = Field(
        default=OTPPurpose.LOGIN,
        description="Purpose of OTP request (LOGIN, REGISTER, PASSWORD_RESET)",
    )

    @field_validator("identifier")
    @classmethod
    def validate_identifier(cls, v: str) -> str:
        clean = v.strip()
        if "@" in clean:
            if not is_valid_email(clean):
                raise ValueError("Invalid email format.")
        else:
            if not is_valid_indian_mobile(clean):
                raise ValueError("Invalid 10-digit mobile number format.")
        return clean


class RequestOTPResponse(BaseModel):
    """Response schema for successful OTP request."""

    success: bool = True
    message: str = "OTP sent successfully"
    expires_in: int = Field(default=300, description="Expiration time in seconds")
    debug_otp: Optional[str] = Field(
        default=None, description="Plaintext OTP code for local development/testing"
    )

    model_config = ConfigDict(json_schema_extra={
        "example": {
            "success": True,
            "message": "OTP sent successfully",
            "expires_in": 300,
            "debug_otp": "123456"
        }
    })


class VerifyOTPRequest(BaseModel):
    """Schema for verifying OTP and completing sign-in or registration."""

    identifier: str = Field(..., description="Email address or mobile number")
    otp: str = Field(..., min_length=6, max_length=6, description="6-digit numeric OTP code")
    purpose: Optional[OTPPurpose] = Field(
        default=OTPPurpose.LOGIN,
        description="Purpose of OTP request",
    )

    @field_validator("otp")
    @classmethod
    def validate_otp_code(cls, v: str) -> str:
        clean = v.strip()
        if not clean.isdigit() or len(clean) != 6:
            raise ValueError("OTP code must be exactly 6 numeric digits.")
        return clean


class UserResponse(BaseModel):
    """User profile data returned inside authentication responses."""

    id: str
    email: Optional[str] = None
    phone: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: bool = True

    model_config = ConfigDict(from_attributes=True)


class VerifyOTPResponse(BaseModel):
    """Response schema returned upon successful OTP verification."""

    success: bool = True
    access_token: str
    refresh_token: str
    token_type: str = "Bearer"
    user: UserResponse


class ResendOTPRequest(BaseModel):
    """Schema for requesting an OTP resend."""

    identifier: str = Field(..., description="Email address or mobile number")
    purpose: Optional[OTPPurpose] = Field(
        default=OTPPurpose.LOGIN,
        description="Purpose of OTP request",
    )


class ResendOTPResponse(BaseModel):
    """Response schema for successful OTP resend."""

    success: bool = True
    message: str = "OTP resent successfully"
    expires_in: int = 300


class RefreshTokenRequest(BaseModel):
    """Schema for refreshing access tokens."""

    refresh_token: str = Field(..., description="Valid JWT refresh token")


class RefreshTokenResponse(BaseModel):
    """Response schema containing new access token and rotated refresh token."""

    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "Bearer"


class LogoutResponse(BaseModel):
    """Response schema for user logout."""

    success: bool = True
    message: str = "Logged out successfully"
