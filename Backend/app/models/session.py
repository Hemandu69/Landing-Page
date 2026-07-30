import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel
from app.models.user import GUID


class UserSession(Base, BaseModel):
    """UserSession ORM model for multi-device session management and refresh token security."""

    __tablename__ = "user_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )

    refresh_token_hash: Mapped[str] = mapped_column(String(255), index=True, nullable=False)

    device_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    device_type: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    browser: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    operating_system: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    ip_address: Mapped[Optional[str]] = mapped_column(String(45), nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    last_used_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    user: Mapped["User"] = relationship("User", backref="sessions")

    def __repr__(self) -> str:
        return f"<UserSession(id={self.id}, user_id={self.user_id}, active={self.is_active})>"
