from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings


def setup_cors(app: FastAPI) -> None:
    """Configure CORS middleware supporting frontend URL and development origins."""
    origins = [settings.FRONTEND_URL]
    if settings.DEBUG:
        origins.extend([
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
        ])

    # Deduplicate while preserving order
    unique_origins = list(dict.fromkeys(origins))

    app.add_middleware(
        CORSMiddleware,
        allow_origins=unique_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )
