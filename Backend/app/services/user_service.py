import os
import uuid
from pathlib import Path
from typing import Any, Dict, Optional
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services.base_service import BaseService

# Directory configuration for avatar uploads
UPLOAD_DIR = Path("uploads/profile_images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_MIME_TYPES = {"image/jpeg", "image/jpg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


class UserService(BaseService):
    """Service handling user account management, profile updates, avatar uploads, and public profiles."""

    def __init__(self, db: Session) -> None:
        super().__init__(db)
        self.user_repo = UserRepository(db)

    def get_by_id(self, user_id: Any) -> Optional[User]:
        """Find a user by primary key UUID."""
        return self.user_repo.get_by_id(user_id)

    def get_by_email(self, email: str) -> Optional[User]:
        """Find a user by email address."""
        return self.user_repo.get_by_email(email)

    def get_by_phone(self, phone: str) -> Optional[User]:
        """Find a user by phone number."""
        return self.user_repo.get_by_phone(phone)

    def get_by_identifier(self, identifier: str) -> Optional[User]:
        """Find a user matching either email or phone number."""
        return self.user_repo.get_by_email_or_phone(identifier)

    def check_duplicate_email(self, email: str) -> bool:
        """Check if an email address is already registered to another user."""
        return self.user_repo.get_by_email(email) is not None

    def check_duplicate_phone(self, phone: str) -> bool:
        """Check if a phone number is already registered to another user."""
        return self.user_repo.get_by_phone(phone) is not None

    def create_user(self, user_data: Dict[str, Any]) -> User:
        """Create a new user ensuring email and phone uniqueness."""
        email = user_data.get("email")
        if email and self.check_duplicate_email(email):
            raise ValueError(f"User with email '{email}' already exists.")

        phone = user_data.get("phone")
        if phone and self.check_duplicate_phone(phone):
            raise ValueError(f"User with phone number '{phone}' already exists.")

        return self.user_repo.create_user(user_data)

    def update_profile(self, user_id: Any, update_data: Dict[str, Any]) -> User:
        """Update profile information for a user."""
        user = self.get_by_id(user_id)
        if not user:
            raise ValueError(f"User with ID '{user_id}' not found.")

        # Disallow updating immutable / sensitive fields
        forbidden_fields = {"email", "phone", "email_verified", "phone_verified", "created_at", "updated_at"}
        filtered_data = {k: v for k, v in update_data.items() if k not in forbidden_fields and v is not None}

        return self.user_repo.update_user(user, filtered_data)

    def upload_profile_image(
        self, user_id: Any, file_bytes: bytes, filename: str, content_type: str
    ) -> str:
        """Validate avatar image content/size, save file to disk, and update user profile_image URL."""
        user = self.get_by_id(user_id)
        if not user:
            raise ValueError("User not found.")

        # Validate file size
        if len(file_bytes) > MAX_FILE_SIZE:
            raise ValueError("Profile image file size exceeds maximum limit of 5MB.")

        # Validate content type and extension
        ext = os.path.splitext(filename)[1].lower()
        if ext not in ALLOWED_EXTENSIONS or content_type.lower() not in ALLOWED_MIME_TYPES:
            raise ValueError("Invalid image format. Allowed formats: JPEG, JPG, PNG, WEBP.")

        # Save file to upload directory
        unique_filename = f"{user_id}_{uuid.uuid4().hex[:8]}{ext}"
        target_path = UPLOAD_DIR / unique_filename
        with open(target_path, "wb") as f:
            f.write(file_bytes)

        # Update profile image URL in database
        image_url = f"/static/uploads/profile_images/{unique_filename}"
        self.user_repo.update_user(user, {"profile_image": image_url})
        return image_url

    def delete_profile_image(self, user_id: Any) -> bool:
        """Clear profile image URL for a user."""
        user = self.get_by_id(user_id)
        if not user:
            raise ValueError("User not found.")

        self.user_repo.update_user(user, {"profile_image": None})
        return True

    def get_public_profile(self, user_id: Any) -> Dict[str, Any]:
        """Fetch public profile fields for a user. Returns 404 if user not found or profile is private."""
        user = self.get_by_id(user_id)
        if not user or not user.public_profile:
            raise ValueError("Profile not found or set to private.")

        name = " ".join(filter(None, [user.first_name, user.last_name])).strip()
        if not name:
            name = user.email or user.phone or "MY Bharat User"

        return {
            "id": str(user.id),
            "name": name,
            "bio": user.bio,
            "country": user.country,
            "profile_image": user.profile_image,
            "public_profile": user.public_profile,
        }

    def activate_account(self, user_id: Any) -> Optional[User]:
        """Activate a user account."""
        return self.user_repo.activate_user(user_id)

    def deactivate_account(self, user_id: Any) -> Optional[User]:
        """Deactivate a user account."""
        return self.user_repo.deactivate_user(user_id)

    def update_last_login(self, user_id: Any) -> Optional[User]:
        """Record last login timestamp for user."""
        return self.user_repo.update_last_login(user_id)
