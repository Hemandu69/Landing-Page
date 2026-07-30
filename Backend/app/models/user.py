import uuid
from datetime import date, datetime
from typing import List, Optional
from sqlalchemy import String, Boolean, Date, DateTime, Enum, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.types import TypeDecorator, CHAR
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import BaseModel
from app.models.enums import Gender


class GUID(TypeDecorator):
    """Platform-independent GUID/UUID type for MySQL and PostgreSQL."""

    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_UUID())
        else:
            return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == "postgresql":
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return str(uuid.UUID(value))
            else:
                return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                return uuid.UUID(value)
            return value


class User(Base, BaseModel):
    """User ORM model representing platform users with UUID primary key."""

    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(), primary_key=True, default=uuid.uuid4
    )

    first_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    last_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), unique=True, index=True, nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(20), unique=True, index=True, nullable=True)

    email_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    phone_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    profile_image: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    date_of_birth: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    gender: Mapped[Optional[Gender]] = mapped_column(Enum(Gender), nullable=True)

    country: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    address_line_1: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    address_line_2: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    public_profile: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_login: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    otp_requests: Mapped[List["OTPRequest"]] = relationship(
        "OTPRequest", back_populates="user", cascade="all, delete-orphan"
    )
    login_history: Mapped[List["LoginHistory"]] = relationship(
        "LoginHistory", back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email}, phone={self.phone})>"
