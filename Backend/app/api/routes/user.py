from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.user import (
    UserProfileResponse,
    UpdateProfileRequest,
    ProfileImageResponse,
    PublicProfileResponse,
)
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])


@router.get(
    "/me",
    response_model=UserProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Get complete authenticated user profile",
    description="Retrieve full authenticated user profile including email, phone, personal details, and timestamps.",
)
async def get_my_profile(
    current_user: User = Depends(get_current_user),
) -> UserProfileResponse:
    """Thin controller returning current user profile."""
    return UserProfileResponse.model_validate(current_user)


@router.patch(
    "/me",
    response_model=UserProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Update authenticated user profile",
    description="Update profile fields including names, bio, country, address, gender, and public visibility.",
)
async def update_my_profile(
    payload: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserProfileResponse:
    """Thin controller updating user profile fields."""
    user_service = UserService(db)
    update_dict = payload.model_dump(exclude_unset=True)

    try:
        updated_user = user_service.update_profile(current_user.id, update_dict)
        return UserProfileResponse.model_validate(updated_user)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.post(
    "/profile-image",
    response_model=ProfileImageResponse,
    status_code=status.HTTP_200_OK,
    summary="Upload profile avatar image",
    description="Upload a profile avatar image (JPEG, JPG, PNG, WEBP, max 5MB).",
)
async def upload_profile_image(
    file: UploadFile = File(..., description="Image file (JPEG, JPG, PNG, WEBP, max 5MB)"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ProfileImageResponse:
    """Thin controller uploading avatar image."""
    user_service = UserService(db)
    file_bytes = await file.read()

    try:
        image_url = user_service.upload_profile_image(
            user_id=current_user.id,
            file_bytes=file_bytes,
            filename=file.filename or "avatar.jpg",
            content_type=file.content_type or "image/jpeg",
        )
        return ProfileImageResponse(
            success=True,
            message="Profile image uploaded successfully",
            profile_image_url=image_url,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.delete(
    "/profile-image",
    status_code=status.HTTP_200_OK,
    summary="Delete profile avatar image",
    description="Remove currently set profile image for authenticated user.",
)
async def delete_profile_image(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Thin controller removing avatar image."""
    user_service = UserService(db)
    user_service.delete_profile_image(current_user.id)
    return {
        "success": True,
        "message": "Profile image removed successfully",
    }


@router.get(
    "/{user_id}",
    response_model=PublicProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Get public user profile",
    description="Retrieve public profile for specified user ID. Returns 404 if profile is set to private or not found.",
)
async def get_public_profile(
    user_id: str,
    db: Session = Depends(get_db),
) -> PublicProfileResponse:
    """Thin controller returning public profile."""
    user_service = UserService(db)

    try:
        data = user_service.get_public_profile(user_id)
        return PublicProfileResponse(**data)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
