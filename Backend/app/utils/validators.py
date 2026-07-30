import re
from typing import Optional


def is_valid_email(email: str) -> bool:
    """Validate email format using standard regex."""
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email.strip())) if email else False


def is_valid_indian_mobile(mobile: str) -> bool:
    """Validate 10-digit Indian mobile number format."""
    clean_mobile = re.sub(r"\D", "", mobile)
    pattern = r"^[6-9]\d{9}$"
    return bool(re.match(pattern, clean_mobile))


def sanitize_string(text: Optional[str]) -> str:
    """Strip whitespace and sanitize basic string inputs."""
    if not text:
        return ""
    return text.strip()
