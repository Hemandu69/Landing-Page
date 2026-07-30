from fastapi import APIRouter
from app.api.routes import health, auth, user, profile, opportunity

api_router = APIRouter()

# Include API routers
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(user.router)
api_router.include_router(profile.router)
api_router.include_router(opportunity.router)
