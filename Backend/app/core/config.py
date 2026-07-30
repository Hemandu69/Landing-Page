from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration settings loaded from environment variables."""

    APP_NAME: str = "MY Bharat API"
    APP_VERSION: str = "1.0.0"
    DESCRIPTION: str = "Backend API for MY Bharat Landing Page & Portal"
    DEBUG: bool = True

    DATABASE_URL: str = "mysql+pymysql://root:password@localhost:3306/landing_page_db"
    SECRET_KEY: str = "super-secret-key-change-in-production-1234567890!"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    OTP_EXPIRY_SECONDS: int = 300

    FRONTEND_URL: str = "http://localhost:3000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True,
    )


settings = Settings()
