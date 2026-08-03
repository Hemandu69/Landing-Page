import { apiClient } from "../apiClient";
import {
  RequestOTPResponse,
  VerifyOTPResponse,
  RefreshTokenResponse,
  User,
  OTPType,
  OTPPurpose,
} from "../../types/auth";

class AuthService {
  /**
   * Request a 6-digit OTP to be sent via Email or Phone.
   */
  async requestOTP(
    identifier: string,
    type: OTPType = "PHONE",
    purpose: OTPPurpose = "LOGIN"
  ): Promise<RequestOTPResponse> {
    try {
      const response = await apiClient.post<RequestOTPResponse>("/api/auth/request-otp", {
        identifier,
        type,
        purpose,
      });
      return response.data;
    } catch (error: any) {
const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        "Failed to send OTP. Please check your details and try again.";
      const apiError = new Error(message) as Error & { status?: number };
      apiError.status = error.response?.status || 0;
      throw apiError;
    }
  }

  /**
   * Verify the 6-digit OTP code and obtain JWT access and refresh tokens.
   */
  async verifyOTP(
    identifier: string,
    otp: string,
    purpose: OTPPurpose = "LOGIN"
  ): Promise<VerifyOTPResponse> {
    try {
      const response = await apiClient.post<VerifyOTPResponse>("/api/auth/verify-otp", {
        identifier,
        otp,
        purpose,
      });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Invalid OTP code entered. Please try again.";
      throw new Error(message);
    }
  }

  /**
   * Exchange an existing refresh token for a new access token.
   */
  async refresh(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post<RefreshTokenResponse>("/api/auth/refresh", {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Session expired. Please log in again.";
      throw new Error(message);
    }
  }

  /**
   * Fetch current authenticated user profile details from /api/auth/me.
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>("/api/auth/me");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.detail || "Failed to fetch user session.";
      throw new Error(message);
    }
  }

  /**
   * Invalidate current user session and revoke refresh token.
   */
  async logout(): Promise<void> {
    try {
      const refreshToken =
        typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
      await apiClient.post("/api/auth/logout", {
        refresh_token: refreshToken || undefined,
      });
    } catch (error) {
      // Non-blocking logout error logging
      console.warn("Server logout request encountered an error:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }
}

export const authService = new AuthService();
