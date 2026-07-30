from datetime import datetime, timezone
from typing import Any, Dict, Optional
from sqlalchemy import select, delete
from sqlalchemy.orm import Session

from app.models.otp_request import OTPRequest
from app.repositories.base_repository import BaseRepository


class OTPRepository(BaseRepository[OTPRequest]):
    """Data access repository for OTPRequest model operations."""

    def __init__(self, db: Session) -> None:
        super().__init__(model=OTPRequest, db=db)

    def create_otp(self, otp_data: Dict[str, Any]) -> OTPRequest:
        """Create and persist a new OTP request record."""
        return self.create(otp_data)

    def get_latest_otp(
        self,
        user_identifier: str,
        otp_type: Optional[str] = None,
        purpose: Optional[str] = None,
    ) -> Optional[OTPRequest]:
        """Fetch the most recent OTP request for a given user identifier."""
        stmt = select(OTPRequest).where(
            OTPRequest.user_identifier == user_identifier.strip()
        )

        if otp_type:
            stmt = stmt.where(OTPRequest.otp_type == otp_type)
        if purpose:
            stmt = stmt.where(OTPRequest.purpose == purpose)

        stmt = stmt.order_by(OTPRequest.created_at.desc())
        return self.db.scalar(stmt)

    def mark_verified(self, otp_id: int) -> Optional[OTPRequest]:
        """Mark an OTP request as verified."""
        otp = self.get_by_id(otp_id)
        if not otp:
            return None

        otp.verified = True
        self.db.add(otp)
        self.db.commit()
        self.db.refresh(otp)
        return otp

    def increment_attempt(self, otp_id: int) -> Optional[OTPRequest]:
        """Increment failed attempt counter for an OTP request."""
        otp = self.get_by_id(otp_id)
        if not otp:
            return None

        otp.attempt_count += 1
        self.db.add(otp)
        self.db.commit()
        self.db.refresh(otp)
        return otp

    def increment_resend(self, otp_id: int) -> Optional[OTPRequest]:
        """Increment resend counter for an OTP request."""
        otp = self.get_by_id(otp_id)
        if not otp:
            return None

        otp.resend_count += 1
        self.db.add(otp)
        self.db.commit()
        self.db.refresh(otp)
        return otp

    def delete_expired(self) -> int:
        """Delete all OTP records whose expiration time has passed."""
        now = datetime.now(timezone.utc)
        stmt = delete(OTPRequest).where(OTPRequest.expires_at < now)
        result = self.db.execute(stmt)
        self.db.commit()
        return result.rowcount

    def delete_by_identifier(self, user_identifier: str) -> int:
        """Delete all OTP records associated with a specific user identifier."""
        stmt = delete(OTPRequest).where(
            OTPRequest.user_identifier == user_identifier.strip()
        )
        result = self.db.execute(stmt)
        self.db.commit()
        return result.rowcount
