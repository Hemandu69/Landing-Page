import enum


class OTPType(str, enum.Enum):
    """Enumeration for OTP delivery channels."""

    EMAIL = "EMAIL"
    PHONE = "PHONE"


class OTPPurpose(str, enum.Enum):
    """Enumeration for OTP request purposes."""

    LOGIN = "LOGIN"
    REGISTER = "REGISTER"
    PASSWORD_RESET = "PASSWORD_RESET"


class LoginType(str, enum.Enum):
    """Enumeration for user login authentication methods."""

    EMAIL = "EMAIL"
    PHONE = "PHONE"
    GOOGLE = "GOOGLE"


class Gender(str, enum.Enum):
    """Enumeration for user gender identities."""

    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"


class OpportunityMode(str, enum.Enum):
    """Enumeration for opportunity attendance modes."""

    ONLINE = "ONLINE"
    OFFLINE = "OFFLINE"
    HYBRID = "HYBRID"


class OpportunityType(str, enum.Enum):
    """Enumeration for opportunity classification types."""

    INTERNSHIP = "INTERNSHIP"
    JOB = "JOB"
    VOLUNTEERING = "VOLUNTEERING"
    EVENT = "EVENT"
    SCHOLARSHIP = "SCHOLARSHIP"
    COURSE = "COURSE"


class OpportunityStatus(str, enum.Enum):
    """Enumeration for opportunity publication status."""

    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    CLOSED = "CLOSED"
