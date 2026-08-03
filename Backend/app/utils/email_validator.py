"""
app/utils/email_validator.py

Production-ready email validation utilities.

Features:
- Syntax validation
- Email normalization
- MX record validation
"""

from __future__ import annotations

import re

import dns.exception
import dns.resolver


EMAIL_REGEX = re.compile(
    r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
)


def normalize_email(email: str) -> str:
    """
    Normalize email before validation.

    Example:
        " John@Gmail.Com "
        ->
        "john@gmail.com"
    """
    return email.strip().lower()


def is_valid_email_format(email: str) -> bool:
    """
    Checks email syntax.

    Returns:
        True if format is valid.
    """
    email = normalize_email(email)

    if len(email) > 254:
        return False

    if ".." in email:
        return False

    if not EMAIL_REGEX.fullmatch(email):
        return False

    local_part, domain = email.split("@")

    if local_part.startswith(".") or local_part.endswith("."):
        return False

    if domain.startswith(".") or domain.endswith("."):
        return False

    return True


def has_valid_mx_record(email: str) -> bool:
    """
    Checks whether the email domain has MX records.

    Example:

        gmail.com      -> True
        openai.com     -> True
        fake.fake      -> False
    """

    email = normalize_email(email)

    if not is_valid_email_format(email):
        return False

    domain = email.split("@")[1]

    try:
        answers = dns.resolver.resolve(domain, "MX")

        return len(answers) > 0

    except (
        dns.resolver.NXDOMAIN,
        dns.resolver.NoAnswer,
        dns.resolver.NoNameservers,
        dns.exception.Timeout,
    ):
        return False

    except Exception:
        return False


def validate_email(email: str) -> tuple[bool, str]:
    """
    Complete email validation.

    Returns:
        (True, "")

    or

        (False, "Reason")
    """

    email = normalize_email(email)

    if not is_valid_email_format(email):
        return False, "Invalid email format."

    if not has_valid_mx_record(email):
        return False, "Email domain does not exist."

    return True, ""
