import math
from typing import Any, Dict, List, Optional
from sqlalchemy.orm import Session

from app.models.enums import OpportunityMode, OpportunityType, OpportunityStatus
from app.models.opportunity import Opportunity
from app.repositories.opportunity_repository import OpportunityRepository
from app.services.base_service import BaseService


class OpportunityService(BaseService):
    """Service providing business logic for opportunity browsing, filtering, search, and details."""

    def __init__(self, db: Session) -> None:
        super().__init__(db)
        self.opportunity_repo = OpportunityRepository(db)

    def get_by_slug(self, slug: str) -> Opportunity:
        """Fetch opportunity by unique slug or raise ValueError."""
        opp = self.opportunity_repo.get_by_slug(slug)
        if not opp:
            raise ValueError(f"Opportunity with slug '{slug}' not found.")
        return opp

    def get_featured(self, limit: int = 10) -> List[Opportunity]:
        """Fetch featured opportunities."""
        return self.opportunity_repo.get_featured(limit=limit)

    def get_categories(self) -> List[str]:
        """Fetch list of available categories."""
        return self.opportunity_repo.get_categories()

    def get_all(
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
    ) -> Dict[str, Any]:
        """Search, filter, sort, and paginate opportunities returning data items and pagination metadata."""
        items, total_count = self.opportunity_repo.search_and_filter(
            page=page,
            page_size=page_size,
            search=search,
            category=category,
            type=type,
            mode=mode,
            featured=featured,
            status=status,
            sort_by=sort_by,
            sort_order=sort_order,
        )

        total_pages = math.ceil(total_count / page_size) if total_count > 0 else 1
        has_next = page < total_pages
        has_previous = page > 1

        return {
            "items": items,
            "meta": {
                "page": page,
                "page_size": page_size,
                "total": total_count,
                "total_pages": total_pages,
                "has_next": has_next,
                "has_previous": has_previous,
            },
        }
