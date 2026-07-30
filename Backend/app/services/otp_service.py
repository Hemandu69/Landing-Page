import hashlib
import re
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any, Optional, Tuple
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.otp_request import OTPRequest
from app.repositories.otp_repository import OTPRepository
from app.services.base_service import BaseService


class OTPService(BaseService):
    """Service providing secure 6-digit OTP generation, hashing, format validation, and expiration checks."""

    def __init__(self, db: Session) -> None:
        super().__init__(db)
        self.otp_repo = OTPRepository(db)
        self.otp_length = 6
        self.otp_expiry_seconds = settings.OTP_EXPIRY_SECONDS
        self.max_attempts = 5
        self.max_resends = 3

    def generate_otp_code(self) -> str:
        """Generate a cryptographically secure 6-digit numeric OTP code string."""
        return "".join(str(secrets.randbelow(10)) for _ in range(self.otp_length))

    def hash_otp(self, otp_code: str) -> str:
        """Create SHA-256 hash of plaintext OTP code for secure database storage."""
        return hashlib.sha256(otp_code.encode("utf-8")).hexdigest()

    def verify_otp_hash(self, plain_otp: str, hashed_otp: str) -> bool:
        """Compare plaintext OTP against stored SHA-256 hash."""
        return secrets.compare_digest(self.hash_otp(plain_otp), hashed_otp)

    def is_valid_otp_format(self, otp_code: str) -> bool:
        """Check if OTP string is exactly 6 numeric digits."""
        clean_code = otp_code.strip()
        pattern = rf"^\d{{{self.otp_length}}}$"
        return bool(re.match(pattern, clean_code))

    def get_expiry_timestamp(self) -> datetime:
        """Generate datetime expiration timestamp based on settings configuration."""
        return datetime.now(timezone.utc) + timedelta(seconds=self.otp_expiry_seconds)

    def is_expired(self, otp_record: OTPRequest) -> bool:
        """Check if an OTP request record has passed its expiration time."""
        now = datetime.now(timezone.utc)
        # Handle naive vs aware datetime comparison
        expires_at = otp_record.expires_at
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        return now > expires_at

    def create_otp_request(
        self,
        user_identifier: str,
        otp_type: str,
        purpose: str,
        user_id: Optional[Any] = None,
    ) -> Tuple[OTPRequest, str]:
        """Generate a new OTP, persist hashed record, and return (record, plain_otp)."""
        plain_otp = self.generate_otp_code()
        otp_hash = self.hash_otp(plain_otp)
        expires_at = self.get_expiry_timestamp()

        otp_data = {
            "user_id": user_id,
            "user_identifier": user_identifier.strip(),
            "otp_hash": otp_hash,
            "otp_type": otp_type,
            "purpose": purpose,
            "expires_at": expires_at,
            "verified": False,
            "attempt_count": 0,
            "resend_count": 0,
        }

        record = self.otp_repo.create_otp(otp_data)
        return record, plain_otp

    def validate_and_verify_otp(
        self,
        user_identifier: str,
        plain_otp: str,
        otp_type: Optional[str] = None,
        purpose: Optional[str] = None,
    ) -> Tuple[bool, str]:
        """Validate input OTP against active record and check attempt/resend limits.
        
        Returns (is_valid: bool, error_or_success_message: str).
        """
        if not self.is_valid_otp_format(plain_otp):
            return False, "Invalid OTP format. Must be 6 digits."

        record = self.otp_repo.get_latest_otp(
            user_identifier=user_identifier,
            otp_type=otp_type,
            purpose=purpose,
        )

        if not record:
            return False, "No OTP request found for this identifier."

        if record.verified:
            return False, "OTP has already been verified."

        if self.is_expired(record):
            return False, "OTP has expired. Please request a new code."

        if record.attempt_count >= self.max_attempts:
            return False, "Maximum verification attempts exceeded. Please request a new OTP."

        # Verify hash match
        if not self.verify_otp_hash(plain_otp, record.otp_hash):
            self.otp_repo.increment_attempt(record.id)
            remaining = self.max_attempts - (record.attempt_count + 1)
            return False, f"Incorrect OTP code. {remaining} attempts remaining."

        # Success: mark verified
        self.otp_repo.mark_verified(record.id)
        return True, "OTP verified successfully."

    def cleanup_expired(self) -> int:
        """Purge all expired OTP records from database."""
        return self.otp_repo.delete_expired()
