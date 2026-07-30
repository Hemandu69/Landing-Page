import uuid
from typing import Optional
from sqlalchemy import String, Enum, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel
from app.models.enums import LoginType
from app.models.user import GUID


class LoginHistory(Base, BaseModel):
    """LoginHistory ORM model tracking user sign-in audit history."""

    __tablename__ = "login_history"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[uuid.UUID] = mapped_column(
        GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    login_type: Mapped[LoginType] = mapped_column(Enum(LoginType), nullable=False)

    ip_address: Mapped[Optional[str]] = mapped_column(String(45), nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    browser: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    device: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="login_history")

    def __repr__(self) -> str:
        return f"<LoginHistory(id={self.id}, user_id={self.user_id}, type={self.login_type})>"
