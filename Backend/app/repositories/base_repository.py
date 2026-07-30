from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union, Tuple
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """Generic repository providing reusable CRUD and query operations using SQLAlchemy 2.x."""

    def __init__(self, model: Type[ModelType], db: Session) -> None:
        self.model = model
        self.db = db

    def get_by_id(self, id: Any) -> Optional[ModelType]:
        """Fetch a single record by primary key."""
        return self.db.get(self.model, id)

    def get_all(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        """Fetch multiple records with offset and limit pagination."""
        stmt = select(self.model).offset(skip).limit(limit)
        return list(self.db.scalars(stmt).all())

    def create(self, obj_in: Union[ModelType, Dict[str, Any]]) -> ModelType:
        """Create and persist a new model instance."""
        if isinstance(obj_in, dict):
            db_obj = self.model(**obj_in)
        else:
            db_obj = obj_in

        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def update(self, db_obj: ModelType, obj_in: Union[Dict[str, Any], Any]) -> ModelType:
        """Update an existing model instance with dictionary or object data."""
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = getattr(obj_in, "__dict__", {})

        for field, value in update_data.items():
            if hasattr(db_obj, field) and value is not None:
                setattr(db_obj, field, value)

        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def delete(self, id: Any) -> bool:
        """Delete a record by primary key."""
        obj = self.get_by_id(id)
        if not obj:
            return False

        self.db.delete(obj)
        self.db.commit()
        return True

    def exists(self, id: Any) -> bool:
        """Check if a record exists by primary key."""
        return self.get_by_id(id) is not None

    def count(self) -> int:
        """Count total records for the model."""
        stmt = select(func.count()).select_from(self.model)
        return self.db.scalar(stmt) or 0

    def paginate(self, page: int = 1, page_size: int = 20) -> Tuple[List[ModelType], int]:
        """Paginate records and return (items, total_count)."""
        page = max(1, page)
        page_size = max(1, min(page_size, 100))
        skip = (page - 1) * page_size

        total = self.count()
        items = self.get_all(skip=skip, limit=page_size)
        return items, total

    def commit(self) -> None:
        """Explicitly commit pending database transaction."""
        self.db.commit()

    def refresh(self, db_obj: ModelType) -> ModelType:
        """Refresh model instance state from database."""
        self.db.refresh(db_obj)
        return db_obj
