from datetime import datetime, timezone
from typing import Any, Dict, Optional
from sqlalchemy import select, or_
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.base_repository import BaseRepository


class UserRepository(BaseRepository[User]):
    """Data access repository for User model operations."""

    def __init__(self, db: Session) -> None:
        super().__init__(model=User, db=db)

    def get_by_email(self, email: str) -> Optional[User]:
        """Fetch a user record by email address."""
        stmt = select(User).where(User.email == email.strip().lower())
        return self.db.scalar(stmt)

    def get_by_phone(self, phone: str) -> Optional[User]:
        """Fetch a user record by phone number."""
        stmt = select(User).where(User.phone == phone.strip())
        return self.db.scalar(stmt)

    def get_by_email_or_phone(self, identifier: str) -> Optional[User]:
        """Fetch a user record matching either email or phone number."""
        clean_id = identifier.strip()
        stmt = select(User).where(
            or_(
                User.email == clean_id.lower(),
                User.phone == clean_id,
            )
        )
        return self.db.scalar(stmt)

    def create_user(self, user_data: Dict[str, Any]) -> User:
        """Create and persist a new user instance."""
        return self.create(user_data)

    def update_user(self, user: User, update_data: Dict[str, Any]) -> User:
        """Update fields on an existing user instance."""
        return self.update(user, update_data)

    def update_last_login(self, user_id: Any) -> Optional[User]:
        """Update last_login timestamp for a user."""
        user = self.get_by_id(user_id)
        if not user:
            return None

        user.last_login = datetime.now(timezone.utc)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def activate_user(self, user_id: Any) -> Optional[User]:
        """Set is_active flag to True for a user."""
        user = self.get_by_id(user_id)
        if not user:
            return None

        user.is_active = True
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def deactivate_user(self, user_id: Any) -> Optional[User]:
        """Set is_active flag to False for a user."""
        user = self.get_by_id(user_id)
        if not user:
            return None

        user.is_active = False
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
