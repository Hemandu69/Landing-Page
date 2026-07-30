from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.config import settings
from app.database.session import get_db
from app.models.user import User
from app.schemas.auth import (
    RequestOTPRequest,
    RequestOTPResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
    ResendOTPRequest,
    ResendOTPResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    LogoutResponse,
    UserResponse,
)
from app.schemas.session import SessionResponse, SessionListResponse
from app.services.auth_service import AuthService
from app.services.session_service import SessionService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/request-otp",
    response_model=RequestOTPResponse,
    status_code=status.HTTP_200_OK,
    summary="Request authentication OTP",
    description="Request a 6-digit OTP code sent to specified email address or mobile number.",
)
async def request_otp(
    payload: RequestOTPRequest,
    db: Session = Depends(get_db),
) -> RequestOTPResponse:
    """Thin controller endpoint requesting OTP generation."""
    auth_service = AuthService(db)
    result = auth_service.request_otp(
        user_identifier=payload.identifier,
        otp_type=payload.type.value if payload.type else "PHONE",
        purpose=payload.purpose.value if payload.purpose else "LOGIN",
    )

    return RequestOTPResponse(
        success=True,
        message=f"OTP sent successfully to {payload.identifier}",
        expires_in=settings.OTP_EXPIRY_SECONDS,
        debug_otp=result.get("debug_otp"),
    )


@router.post(
    "/verify-otp",
    response_model=VerifyOTPResponse,
    status_code=status.HTTP_200_OK,
    summary="Verify OTP and obtain JWT tokens",
    description="Verify 6-digit OTP code, complete sign-in or auto-registration, store active session, and return JWT tokens.",
)
async def verify_otp(
    payload: VerifyOTPRequest,
    request: Request,
    db: Session = Depends(get_db),
) -> VerifyOTPResponse:
    """Thin controller endpoint verifying OTP, establishing session, and issuing JWT tokens."""
    auth_service = AuthService(db)
    user_agent = request.headers.get("User-Agent")
    client_ip = request.client.host if request.client else None

    try:
        data = auth_service.verify_otp_and_login(
            user_identifier=payload.identifier,
            otp_code=payload.otp,
            user_agent=user_agent,
            ip_address=client_ip,
        )
        return VerifyOTPResponse(
            success=True,
            access_token=data["access_token"],
            refresh_token=data["refresh_token"],
            token_type=data["token_type"],
            user=UserResponse.model_validate(data["user"]),
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.post(
    "/resend-otp",
    response_model=ResendOTPResponse,
    status_code=status.HTTP_200_OK,
    summary="Resend OTP code",
    description="Resend a fresh 6-digit OTP code to specified email address or mobile number.",
)
async def resend_otp(
    payload: ResendOTPRequest,
    db: Session = Depends(get_db),
) -> ResendOTPResponse:
    """Thin controller endpoint resending OTP code."""
    auth_service = AuthService(db)
    auth_service.resend_otp(
        user_identifier=payload.identifier,
        purpose=payload.purpose.value if payload.purpose else "LOGIN",
    )

    return ResendOTPResponse(
        success=True,
        message=f"OTP resent successfully to {payload.identifier}",
        expires_in=settings.OTP_EXPIRY_SECONDS,
    )


@router.post(
    "/refresh",
    response_model=RefreshTokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Refresh JWT access token with token rotation",
    description="Exchange a valid refresh token for a new access token and rotated refresh token, updating session last_used timestamp.",
)
async def refresh_token(
    payload: RefreshTokenRequest,
    db: Session = Depends(get_db),
) -> RefreshTokenResponse:
    """Thin controller endpoint rotating refresh token and returning new access token."""
    session_service = SessionService(db)
    try:
        data = session_service.rotate_refresh_token(payload.refresh_token)
        return RefreshTokenResponse(
            access_token=data["access_token"],
            refresh_token=data["refresh_token"],
            token_type=data["token_type"],
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post(
    "/logout",
    response_model=LogoutResponse,
    status_code=status.HTTP_200_OK,
    summary="Logout current device session",
    description="Invalidate current device session using refresh token.",
)
async def logout(
    payload: Optional[RefreshTokenRequest] = None,
    db: Session = Depends(get_db),
) -> LogoutResponse:
    """Thin controller endpoint revoking current session."""
    if payload and payload.refresh_token:
        session_service = SessionService(db)
        session_service.logout_session(payload.refresh_token)

    return LogoutResponse(
        success=True,
        message="Logged out successfully",
    )


@router.post(
    "/logout-all",
    response_model=LogoutResponse,
    status_code=status.HTTP_200_OK,
    summary="Logout from all devices",
    description="Revoke all active sessions across all devices for the authenticated user.",
)
async def logout_all(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> LogoutResponse:
    """Thin controller endpoint revoking all active sessions for authenticated user."""
    session_service = SessionService(db)
    session_service.logout_all_sessions(current_user.id)
    return LogoutResponse(
        success=True,
        message="Logged out from all devices successfully",
    )


@router.get(
    "/sessions",
    response_model=SessionListResponse,
    status_code=status.HTTP_200_OK,
    summary="Get active login sessions",
    description="Retrieve list of all active login sessions for the authenticated user across devices.",
)
async def get_active_sessions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> SessionListResponse:
    """Thin controller endpoint listing active sessions for authenticated user."""
    session_service = SessionService(db)
    sessions = session_service.get_user_sessions(current_user.id)
    session_responses = [SessionResponse.model_validate(s) for s in sessions]
    return SessionListResponse(
        success=True,
        data=session_responses,
    )


@router.delete(
    "/sessions/{session_id}",
    status_code=status.HTTP_200_OK,
    summary="Revoke a specific login session",
    description="Revoke a specific device session by session ID for the authenticated user.",
)
async def revoke_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Thin controller endpoint revoking a specific user session."""
    session_service = SessionService(db)
    success = session_service.revoke_session_by_id(session_id, current_user.id)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found or already revoked.",
        )

    return {
        "success": True,
        "message": "Session revoked successfully",
    }


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current user profile",
    description="Retrieve full profile details of currently authenticated user using Bearer token.",
)
async def get_me(
    current_user: User = Depends(get_current_user),
) -> UserResponse:
    """Thin controller endpoint returning authenticated user profile."""
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        phone=current_user.phone,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        is_active=current_user.is_active,
    )
