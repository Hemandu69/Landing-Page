from typing import Any, List, Optional, Tuple
from sqlalchemy import select, or_, func, desc, asc
from sqlalchemy.orm import Session

from app.models.enums import OpportunityMode, OpportunityType, OpportunityStatus
from app.models.opportunity import Opportunity
from app.repositories.base_repository import BaseRepository


class OpportunityRepository(BaseRepository[Opportunity]):
    """Data access repository for Opportunity model query, search, filtering, and pagination."""

    def __init__(self, db: Session) -> None:
        super().__init__(model=Opportunity, db=db)

    def get_by_slug(self, slug: str) -> Optional[Opportunity]:
        """Fetch an opportunity by its unique URL slug."""
        stmt = select(Opportunity).where(Opportunity.slug == slug.strip())
        return self.db.scalar(stmt)

    def get_featured(self, limit: int = 10) -> List[Opportunity]:
        """Fetch published opportunities flagged as featured."""
        stmt = (
            select(Opportunity)
            .where(
                Opportunity.featured.is_(True),
                Opportunity.status == OpportunityStatus.PUBLISHED,
            )
            .order_by(Opportunity.created_at.desc())
            .limit(limit)
        )
        return list(self.db.scalars(stmt).all())

    def get_categories(self) -> List[str]:
        """Fetch a list of distinct category names for published opportunities."""
        stmt = (
            select(Opportunity.category)
            .where(Opportunity.status == OpportunityStatus.PUBLISHED)
            .distinct()
            .order_by(Opportunity.category.asc())
        )
        return list(self.db.scalars(stmt).all())

    def search_and_filter(
        self,
        page: int = 1,
        page_size: int = 10,
        search: Optional[str] = None,
        category: Optional[str] = None,
        type: Optional[OpportunityType] = None,
        mode: Optional[OpportunityMode] = None,
        featured: Optional[bool] = None,
        status: Optional[OpportunityStatus] = OpportunityStatus.PUBLISHED,
        sort_by: str = "created_at",
        sort_order: str = "desc",
    ) -> Tuple[List[Opportunity], int]:
        """Search, filter, sort, and paginate opportunities. Returns (items, total_count)."""
        stmt = select(Opportunity)

        # Filters
        if status:
            stmt = stmt.where(Opportunity.status == status)

        if category:
            stmt = stmt.where(Opportunity.category.ilike(f"%{category.strip()}%"))

        if type:
            stmt = stmt.where(Opportunity.type == type)

        if mode:
            stmt = stmt.where(Opportunity.mode == mode)

        if featured is not None:
            stmt = stmt.where(Opportunity.featured == featured)

        if search:
            query = f"%{search.strip()}%"
            stmt = stmt.where(
                or_(
                    Opportunity.title.ilike(query),
                    Opportunity.organization_name.ilike(query),
                    Opportunity.description.ilike(query),
                    Opportunity.short_description.ilike(query),
                )
            )

        # Count total matching records before pagination
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_count = self.db.scalar(count_stmt) or 0

        # Sorting
        sort_column = getattr(Opportunity, sort_by, Opportunity.created_at)
        if sort_order.lower() == "asc":
            stmt = stmt.order_by(asc(sort_column))
        else:
            stmt = stmt.order_by(desc(sort_column))

        # Pagination
        page = max(1, page)
        page_size = max(1, min(page_size, 100))
        skip = (page - 1) * page_size
        stmt = stmt.offset(skip).limit(page_size)

        items = list(self.db.scalars(stmt).all())
        return items, total_count
