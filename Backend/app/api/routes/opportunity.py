from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.enums import OpportunityMode, OpportunityType, OpportunityStatus
from app.schemas.opportunity import (
    OpportunitySummary,
    OpportunityResponse,
    OpportunityListResponse,
    OpportunityCategoriesResponse,
)
from app.services.opportunity_service import OpportunityService

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])


@router.get(
    "",
    response_model=OpportunityListResponse,
    status_code=status.HTTP_200_OK,
    summary="Browse and search opportunities",
    description="Fetch paginated list of opportunities supporting keyword search, category, type, mode, status, and sorting filters.",
)
async def list_opportunities(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search keyword matching title, organization, or description"),
    category: Optional[str] = Query(None, description="Filter by category (e.g. Technology, Design)"),
    type: Optional[OpportunityType] = Query(None, description="Filter by type (INTERNSHIP, JOB, VOLUNTEERING, EVENT, SCHOLARSHIP, COURSE)"),
    mode: Optional[OpportunityMode] = Query(None, description="Filter by attendance mode (ONLINE, OFFLINE, HYBRID)"),
    featured: Optional[bool] = Query(None, description="Filter featured opportunities"),
    status: Optional[OpportunityStatus] = Query(OpportunityStatus.PUBLISHED, description="Filter by status"),
    sort_by: str = Query("created_at", description="Field to sort by (created_at, title, registration_deadline)"),
    sort_order: str = Query("desc", description="Sort direction (asc or desc)"),
    db: Session = Depends(get_db),
) -> OpportunityListResponse:
    """Thin controller searching, filtering, and paginating opportunities."""
    service = OpportunityService(db)
    result = service.get_all(
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

    summaries = [OpportunitySummary.model_validate(item) for item in result["items"]]
    return OpportunityListResponse(
        success=True,
        data=summaries,
        meta=result["meta"],
    )


@router.get(
    "/featured",
    response_model=List[OpportunitySummary],
    status_code=status.HTTP_200_OK,
    summary="Get featured opportunities",
    description="Fetch list of top featured active opportunities.",
)
async def get_featured_opportunities(
    limit: int = Query(10, ge=1, le=50, description="Number of featured items to return"),
    db: Session = Depends(get_db),
) -> List[OpportunitySummary]:
    """Thin controller returning featured opportunities."""
    service = OpportunityService(db)
    items = service.get_featured(limit=limit)
    return [OpportunitySummary.model_validate(item) for item in items]


@router.get(
    "/categories",
    response_model=OpportunityCategoriesResponse,
    status_code=status.HTTP_200_OK,
    summary="Get available opportunity categories",
    description="Fetch distinct list of categories for published opportunities.",
)
async def get_opportunity_categories(
    db: Session = Depends(get_db),
) -> OpportunityCategoriesResponse:
    """Thin controller returning distinct opportunity categories."""
    service = OpportunityService(db)
    categories = service.get_categories()
    return OpportunityCategoriesResponse(
        success=True,
        data=categories,
    )


@router.get(
    "/{slug}",
    response_model=OpportunityResponse,
    status_code=status.HTTP_200_OK,
    summary="Get opportunity details by slug",
    description="Retrieve full opportunity details using unique URL slug.",
)
async def get_opportunity_by_slug(
    slug: str,
    db: Session = Depends(get_db),
) -> OpportunityResponse:
    """Thin controller returning opportunity details by slug."""
    service = OpportunityService(db)
    try:
        opp = service.get_by_slug(slug)
        return OpportunityResponse.model_validate(opp)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
