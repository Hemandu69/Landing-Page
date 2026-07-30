import hashlib
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional, Tuple
from sqlalchemy.orm import Session

from app.models.session import UserSession
from app.repositories.session_repository import SessionRepository
from app.services.base_service import BaseService
from app.services.jwt_service import jwt_service


class SessionService(BaseService):
    """Service handling multi-device session creation, refresh token rotation, revocation, and security audit."""

    def __init__(self, db: Session) -> None:
        super().__init__(db)
        self.session_repo = SessionRepository(db)
        self.refresh_token_expire_days = 7

    def hash_refresh_token(self, raw_token: str) -> str:
        """Create a secure SHA-256 hash of a raw refresh token before storing in database."""
        return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()

    def parse_user_agent(self, user_agent_str: Optional[str]) -> Dict[str, Optional[str]]:
        """Extract basic device, browser, and operating system info from User-Agent header."""
        if not user_agent_str:
            return {"device_name": "Unknown Device", "device_type": "Unknown", "browser": "Unknown", "operating_system": "Unknown"}

        ua = user_agent_str.lower()
        device_type = "Desktop"
        if "mobile" in ua or "android" in ua or "iphone" in ua:
            device_type = "Mobile"
        elif "tablet" in ua or "ipad" in ua:
            device_type = "Tablet"

        browser = "Unknown Browser"
        if "chrome" in ua and "edg" not in ua:
            browser = "Chrome"
        elif "edg" in ua:
            browser = "Edge"
        elif "firefox" in ua:
            browser = "Firefox"
        elif "safari" in ua and "chrome" not in ua:
            browser = "Safari"

        os_name = "Unknown OS"
        if "windows" in ua:
            os_name = "Windows"
        elif "macintosh" in ua or "mac os" in ua:
            os_name = "macOS"
        elif "linux" in ua:
            os_name = "Linux"
        elif "android" in ua:
            os_name = "Android"
        elif "iphone" in ua or "ipad" in ua:
            os_name = "iOS"

        device_name = f"{browser} on {os_name}"
        return {
            "device_name": device_name,
            "device_type": device_type,
            "browser": browser,
            "operating_system": os_name,
        }

    def create_session(
        self,
        user_id: Any,
        raw_refresh_token: str,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> UserSession:
        """Hash raw refresh token and store a new active session record."""
        token_hash = self.hash_refresh_token(raw_refresh_token)
        expires_at = datetime.now(timezone.utc) + timedelta(days=self.refresh_token_expire_days)
        device_info = self.parse_user_agent(user_agent)

        session_data = {
            "user_id": user_id,
            "refresh_token_hash": token_hash,
            "device_name": device_info["device_name"],
            "device_type": device_info["device_type"],
            "browser": device_info["browser"],
            "operating_system": device_info["operating_system"],
            "ip_address": ip_address,
            "user_agent": user_agent,
            "is_active": True,
            "expires_at": expires_at,
        }

        return self.session_repo.create_session(session_data)

    def validate_refresh_token(self, raw_refresh_token: str) -> UserSession:
        """Validate JWT signature, decode subject, hash token, and check active session status in DB."""
        user_id = jwt_service.verify_token(raw_refresh_token, expected_type="refresh")
        if not user_id:
            raise ValueError("Invalid or expired refresh token.")

        token_hash = self.hash_refresh_token(raw_refresh_token)
        session = self.session_repo.get_by_refresh_token_hash(token_hash)

        if not session or not session.is_active:
            raise ValueError("Session has been revoked or is no longer active.")

        # Check expiration timestamp
        now = datetime.now(timezone.utc)
        expires_at = session.expires_at
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if now > expires_at:
            self.session_repo.revoke_session(session.id)
            raise ValueError("Session has expired. Please log in again.")

        return session

    def rotate_refresh_token(self, raw_refresh_token: str) -> Dict[str, Any]:
        """Validate current session, rotate refresh token, update session hash, and return new access + refresh tokens."""
        session = self.validate_refresh_token(raw_refresh_token)
        user_id = str(session.user_id)

        # Issue new JWT tokens
        new_access_token = jwt_service.create_access_token(subject=user_id)
        new_refresh_token = jwt_service.create_refresh_token(subject=user_id)
        new_token_hash = self.hash_refresh_token(new_refresh_token)
        new_expires_at = datetime.now(timezone.utc) + timedelta(days=self.refresh_token_expire_days)

        # Rotate refresh token hash on existing session
        self.session_repo.update(
            session,
            {
                "refresh_token_hash": new_token_hash,
                "expires_at": new_expires_at,
                "last_used_at": datetime.now(timezone.utc),
            },
        )

        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "Bearer",
        }

    def logout_session(self, raw_refresh_token: str) -> bool:
        """Revoke session associated with raw refresh token."""
        try:
            token_hash = self.hash_refresh_token(raw_refresh_token)
            session = self.session_repo.get_by_refresh_token_hash(token_hash)
            if session:
                return self.session_repo.revoke_session(session.id)
        except Exception:
            pass
        return True

    def logout_all_sessions(self, user_id: Any) -> int:
        """Revoke all active sessions for a user."""
        return self.session_repo.revoke_all_sessions(user_id)

    def get_user_sessions(self, user_id: Any) -> List[UserSession]:
        """Get all active sessions for a user."""
        return self.session_repo.get_active_sessions(user_id)

    def revoke_session_by_id(self, session_id: Any, user_id: Any) -> bool:
        """Revoke a specific session by ID for a user."""
        return self.session_repo.revoke_session(session_id=session_id, user_id=user_id)

    def delete_expired_sessions(self) -> int:
        """Purge expired and revoked sessions."""
        return self.session_repo.delete_expired_sessions()
