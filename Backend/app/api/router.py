from fastapi import APIRouter
from app.api.routes import health, auth, user, profile

api_router = APIRouter()

# Include active health check router
api_router.include_router(health.router)

# Include placeholder routers for future endpoints
api_router.include_router(auth.router)
api_router.include_router(user.router)
api_router.include_router(profile.router)
