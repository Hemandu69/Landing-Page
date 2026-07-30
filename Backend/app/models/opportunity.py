import uuid
from datetime import date, datetime
from typing import Optional
from sqlalchemy import String, Boolean, Date, DateTime, Enum, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base
from app.models.base_model import BaseModel
from app.models.enums import OpportunityMode, OpportunityType, OpportunityStatus
from app.models.user import GUID


class Opportunity(Base, BaseModel):
    """Opportunity ORM model representing internships, jobs, events, and training programs."""

    __tablename__ = "opportunities"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)

    organization_name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    organization_logo: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    short_description: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(100), index=True, nullable=False)

    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    mode: Mapped[OpportunityMode] = mapped_column(
        Enum(OpportunityMode), default=OpportunityMode.ONLINE, nullable=False
    )
    type: Mapped[OpportunityType] = mapped_column(
        Enum(OpportunityType), nullable=False
    )

    eligibility: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    skills_required: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    application_link: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    start_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    end_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    registration_deadline: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    status: Mapped[OpportunityStatus] = mapped_column(
        Enum(OpportunityStatus), default=OpportunityStatus.PUBLISHED, index=True, nullable=False
    )
    featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True, nullable=False)
    banner_image: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    created_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID(), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Opportunity(id={self.id}, title='{self.title}', slug='{self.slug}')>"
