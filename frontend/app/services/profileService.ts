import { apiClient } from "./apiClient";
import {
  UserProfile,
  UpdateProfilePayload,
  ProfileImageUploadResponse,
} from "../types/profile";

class ProfileService {
  /**
   * Fetch complete profile details for the authenticated user from GET /api/users/me.
   */
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>("/api/users/me");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Failed to fetch user profile.";
      throw new Error(message);
    }
  }

  /**
   * Update allowed profile fields via PATCH /api/users/me.
   */
  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    try {
      const response = await apiClient.patch<UserProfile>(
        "/api/users/me",
        payload
      );
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Failed to update profile information.";
      throw new Error(message);
    }
  }

  /**
   * Upload user avatar profile picture via POST /api/users/profile-image.
   * Validates JPEG, JPG, PNG, WEBP and max 5MB.
   */
  async uploadAvatar(file: File): Promise<ProfileImageUploadResponse> {
    // Validate client-side image size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error("Profile image must be less than 5MB.");
    }

    // Validate client-side file type
    const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      throw new Error(
        "Invalid file format. Only JPEG, JPG, PNG, and WEBP images are supported."
      );
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post<ProfileImageUploadResponse>(
        "/api/users/profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Failed to upload profile image.";
      throw new Error(message);
    }
  }

  /**
   * Remove profile image via DELETE /api/users/profile-image.
   */
  async deleteAvatar(): Promise<void> {
    try {
      await apiClient.delete("/api/users/profile-image");
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Failed to remove profile image.";
      throw new Error(message);
    }
  }
}

export const profileService = new ProfileService();
