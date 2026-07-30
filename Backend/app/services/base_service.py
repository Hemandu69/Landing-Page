from typing import Any
from sqlalchemy.orm import Session


class BaseService:
    """Base service class providing database session injection and common helper utilities."""

    def __init__(self, db: Session) -> None:
        self.db = db
