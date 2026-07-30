from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.config import settings
from app.core.logging import logger
from app.core.exceptions import (
    http_exception_handler,
    validation_exception_handler,
    generic_exception_handler,
)
from app.middleware.cors import setup_cors
from app.api.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle context manager handling application startup and shutdown events."""
    logger.info(f"Application starting: {settings.APP_NAME} v{settings.APP_VERSION}")
    yield
    logger.info(f"Application shutting down: {settings.APP_NAME}")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=settings.DESCRIPTION,
    debug=settings.DEBUG,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# Setup CORS Middleware
setup_cors(app)

# Register Reusable Exception Handlers
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Register API Routers from central router
app.include_router(api_router, prefix="/api")


@app.get("/", summary="Root endpoint", tags=["Root"])
async def root() -> dict:
    """Root endpoint returning service status message."""
    return {
        "message": "Landing Page Backend is running 🚀"
    }
