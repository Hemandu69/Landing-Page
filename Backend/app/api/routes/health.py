from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()


@router.get("/health", summary="Health check endpoint", tags=["Health"])
async def health_check() -> dict:
    """Health check endpoint returning service status, service name, and version."""
    return {
        "status": "ok",
        "service": "backend",
        "version": settings.APP_VERSION,
    }
