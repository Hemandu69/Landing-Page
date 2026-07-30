from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List
from sqlalchemy import select, delete
from sqlalchemy.orm import Session

from app.models.login_history import LoginHistory
from app.repositories.base_repository import BaseRepository


class LoginHistoryRepository(BaseRepository[LoginHistory]):
    """Data access repository for LoginHistory model operations."""

    def __init__(self, db: Session) -> None:
        super().__init__(model=LoginHistory, db=db)

    def create_login_record(self, record_data: Dict[str, Any]) -> LoginHistory:
        """Create and persist a new user sign-in history audit record."""
        return self.create(record_data)

    def get_user_history(
        self, user_id: Any, limit: int = 20, skip: int = 0
    ) -> List[LoginHistory]:
        """Fetch audit log history for a specific user ordered by newest first."""
        stmt = (
            select(LoginHistory)
            .where(LoginHistory.user_id == user_id)
            .order_by(LoginHistory.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(self.db.scalars(stmt).all())

    def delete_old_records(self, days: int = 90) -> int:
        """Purge login history records older than specified days limit."""
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=days)
        stmt = delete(LoginHistory).where(LoginHistory.created_at < cutoff_date)
        result = self.db.execute(stmt)
        self.db.commit()
        return result.rowcount
