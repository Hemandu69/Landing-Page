import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional
from jose import JWTError, jwt
from app.core.config import settings


class JWTService:
    """Service handling JWT access and refresh token generation, decoding, and verification."""

    def __init__(self) -> None:
        self.secret_key = settings.SECRET_KEY
        self.algorithm = settings.ALGORITHM
        self.access_token_expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
        self.refresh_token_expire_days = 7

    def create_access_token(
        self, subject: str, extra_claims: Optional[Dict[str, Any]] = None
    ) -> str:
        """Generate a signed JWT access token for a subject (user ID / identifier)."""
        now = datetime.now(timezone.utc)
        expires_delta = timedelta(minutes=self.access_token_expire_minutes)
        expire = now + expires_delta

        to_encode = {
            "sub": str(subject),
            "type": "access",
            "jti": uuid.uuid4().hex,
            "iat": int(now.timestamp()),
            "exp": int(expire.timestamp()),
        }
        if extra_claims:
            to_encode.update(extra_claims)

        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)

    def create_refresh_token(
        self, subject: str, extra_claims: Optional[Dict[str, Any]] = None
    ) -> str:
        """Generate a long-lived signed JWT refresh token for a subject with unique JTI nonce."""
        now = datetime.now(timezone.utc)
        expires_delta = timedelta(days=self.refresh_token_expire_days)
        expire = now + expires_delta

        to_encode = {
            "sub": str(subject),
            "type": "refresh",
            "jti": uuid.uuid4().hex,
            "iat": int(now.timestamp()),
            "exp": int(expire.timestamp()),
        }
        if extra_claims:
            to_encode.update(extra_claims)

        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)

    def decode_token(self, token: str) -> Dict[str, Any]:
        """Decode and parse JWT payload using secret key."""
        try:
            return jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
        except JWTError as exc:
            raise ValueError(f"Invalid JWT token: {str(exc)}")

    def verify_token(self, token: str, expected_type: str = "access") -> Optional[str]:
        """Verify token signature and return subject ID if valid and unexpired."""
        try:
            payload = self.decode_token(token)
            token_type = payload.get("type")
            sub = payload.get("sub")

            if not sub or token_type != expected_type:
                return None

            return sub
        except ValueError:
            return None


jwt_service = JWTService()
