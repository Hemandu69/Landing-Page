from typing import Any, Dict, Optional
from sqlalchemy.orm import Session

from app.models.enums import OTPType, OTPPurpose, LoginType
from app.repositories.login_history_repository import LoginHistoryRepository
from app.services.base_service import BaseService
from app.services.jwt_service import jwt_service
from app.services.otp_service import OTPService
from app.services.user_service import UserService
from app.services.session_service import SessionService


class AuthService(BaseService):
    """Orchestration service coordinating authentication, OTP generation, verification, user creation, session tracking, and JWT issuance."""

    def __init__(self, db: Session) -> None:
        super().__init__(db)
        self.user_service = UserService(db)
        self.otp_service = OTPService(db)
        self.session_service = SessionService(db)
        self.login_history_repo = LoginHistoryRepository(db)

    def request_otp(
        self,
        user_identifier: str,
        otp_type: str = OTPType.PHONE.value,
        purpose: str = OTPPurpose.LOGIN.value,
    ) -> Dict[str, Any]:
        """Request a new OTP for authentication or registration."""
        clean_identifier = user_identifier.strip()
        user = self.user_service.get_by_identifier(clean_identifier)

        record, plain_otp = self.otp_service.create_otp_request(
            user_identifier=clean_identifier,
            otp_type=otp_type,
            purpose=purpose,
            user_id=user.id if user else None,
        )

        return {
            "success": True,
            "message": f"OTP generated successfully for {clean_identifier}.",
            "otp_id": record.id,
            "expires_at": record.expires_at,
            "debug_otp": plain_otp,
        }

    def resend_otp(self, user_identifier: str, purpose: str = OTPPurpose.LOGIN.value) -> Dict[str, Any]:
        """Resend an OTP for an active flow."""
        return self.request_otp(user_identifier=user_identifier, purpose=purpose)

    def verify_otp_and_login(
        self,
        user_identifier: str,
        otp_code: str,
        login_type: str = LoginType.PHONE.value,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
        device: Optional[str] = None,
        browser: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Verify input OTP, register/login user, record login history, create session, and issue JWT tokens."""
        clean_id = user_identifier.strip()

        # Step 1: Validate OTP
        is_valid, msg = self.otp_service.validate_and_verify_otp(
            user_identifier=clean_id,
            plain_otp=otp_code,
        )

        if not is_valid:
            raise ValueError(msg)

        # Step 2: Retrieve or create user
        user = self.user_service.get_by_identifier(clean_id)

        if not user:
            user_data = {}
            if "@" in clean_id:
                user_data["email"] = clean_id
                user_data["email_verified"] = True
            else:
                user_data["phone"] = clean_id
                user_data["phone_verified"] = True

            user = self.user_service.create_user(user_data)
        else:
            update_flags = {}
            if "@" in clean_id and not user.email_verified:
                update_flags["email_verified"] = True
            elif "@" not in clean_id and not user.phone_verified:
                update_flags["phone_verified"] = True

            if update_flags:
                self.user_service.update_profile(user.id, update_flags)

        # Step 3: Update last login
        self.user_service.update_last_login(user.id)

        # Step 4: Record login history audit log
        self.login_history_repo.create_login_record({
            "user_id": user.id,
            "login_type": login_type,
            "ip_address": ip_address,
            "user_agent": user_agent,
            "device": device,
            "browser": browser,
        })

        # Step 5: Issue JWT access & refresh tokens
        access_token = jwt_service.create_access_token(subject=str(user.id))
        refresh_token = jwt_service.create_refresh_token(subject=str(user.id))

        # Step 6: Create active session storing hashed refresh token and device metadata
        self.session_service.create_session(
            user_id=user.id,
            raw_refresh_token=refresh_token,
            user_agent=user_agent,
            ip_address=ip_address,
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "id": str(user.id),
                "email": user.email,
                "phone": user.phone,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_active": user.is_active,
            },
        }

    def refresh_access_token(self, refresh_token: str) -> Dict[str, Any]:
        """Rotate refresh token and issue new access token via SessionService."""
        return self.session_service.rotate_refresh_token(refresh_token)

    def logout_session(self, refresh_token: Optional[str] = None) -> bool:
        """Revoke session for provided refresh token."""
        if refresh_token:
            return self.session_service.logout_session(refresh_token)
        return True

    def logout_all_sessions(self, user_id: Any) -> int:
        """Revoke all sessions for a user."""
        return self.session_service.logout_all_sessions(user_id)
