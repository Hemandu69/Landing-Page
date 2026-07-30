import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Boolean, DateTime, Enum, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel
from app.models.enums import OTPType, OTPPurpose
from app.models.user import GUID


class OTPRequest(Base, BaseModel):
    """OTP Request ORM model representing OTP verification requests."""

    __tablename__ = "otp_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True
    )
    user_identifier: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    otp_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    otp_type: Mapped[OTPType] = mapped_column(Enum(OTPType), nullable=False)
    purpose: Mapped[OTPPurpose] = mapped_column(
        Enum(OTPPurpose), default=OTPPurpose.LOGIN, nullable=False
    )

    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    attempt_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    resend_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    # Relationships
    user: Mapped[Optional["User"]] = relationship("User", back_populates="otp_requests")

    def __repr__(self) -> str:
        return f"<OTPRequest(id={self.id}, identifier={self.user_identifier}, type={self.otp_type}, purpose={self.purpose})>"
