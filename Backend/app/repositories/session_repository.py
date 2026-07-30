from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from sqlalchemy import select, update, delete
from sqlalchemy.orm import Session

from app.models.session import UserSession
from app.repositories.base_repository import BaseRepository


class SessionRepository(BaseRepository[UserSession]):
    """Data access repository for UserSession model operations."""

    def __init__(self, db: Session) -> None:
        super().__init__(model=UserSession, db=db)

    def create_session(self, session_data: Dict[str, Any]) -> UserSession:
        """Create and persist a new user session record."""
        return self.create(session_data)

    def get_by_refresh_token_hash(self, token_hash: str) -> Optional[UserSession]:
        """Fetch an active session by SHA-256 refresh token hash."""
        stmt = select(UserSession).where(
            UserSession.refresh_token_hash == token_hash,
            UserSession.is_active.is_(True),
        )
        return self.db.scalar(stmt)

    def get_active_sessions(self, user_id: Any) -> List[UserSession]:
        """Fetch all active sessions for a specific user ordered by last used time."""
        stmt = (
            select(UserSession)
            .where(
                UserSession.user_id == user_id,
                UserSession.is_active.is_(True),
            )
            .order_by(UserSession.last_used_at.desc())
        )
        return list(self.db.scalars(stmt).all())

    def update_last_used(self, session_id: Any) -> Optional[UserSession]:
        """Update last_used_at timestamp for a session."""
        session = self.get_by_id(session_id)
        if not session:
            return None

        session.last_used_at = datetime.now(timezone.utc)
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def revoke_session(self, session_id: Any, user_id: Optional[Any] = None) -> bool:
        """Deactivate/revoke a specific session."""
        session = self.get_by_id(session_id)
        if not session:
            return False

        if user_id and str(session.user_id) != str(user_id):
            return False

        session.is_active = False
        self.db.add(session)
        self.db.commit()
        return True

    def revoke_all_sessions(self, user_id: Any, except_session_id: Optional[Any] = None) -> int:
        """Revoke all active sessions for a user, optionally preserving one current session."""
        stmt = (
            update(UserSession)
            .where(
                UserSession.user_id == user_id,
                UserSession.is_active.is_(True),
            )
            .values(is_active=False)
        )

        if except_session_id:
            stmt = stmt.where(UserSession.id != except_session_id)

        result = self.db.execute(stmt)
        self.db.commit()
        return result.rowcount

    def delete_expired_sessions(self) -> int:
        """Delete all expired or revoked sessions from database."""
        now = datetime.now(timezone.utc)
        stmt = delete(UserSession).where(
            (UserSession.expires_at < now) | (UserSession.is_active.is_(False))
        )
        result = self.db.execute(stmt)
        self.db.commit()
        return result.rowcount
