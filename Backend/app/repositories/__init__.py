from app.repositories.base_repository import BaseRepository
from app.repositories.user_repository import UserRepository
from app.repositories.otp_repository import OTPRepository
from app.repositories.login_history_repository import LoginHistoryRepository
from app.repositories.opportunity_repository import OpportunityRepository
from app.repositories.session_repository import SessionRepository

__all__ = [
    "BaseRepository",
    "UserRepository",
    "OTPRepository",
    "LoginHistoryRepository",
    "OpportunityRepository",
    "SessionRepository",
]
