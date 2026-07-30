export type LoginType = "email" | "phone" | "EMAIL" | "PHONE" | "GOOGLE" | "unknown";
export type OTPType = "EMAIL" | "PHONE";
export type OTPPurpose = "LOGIN" | "REGISTER" | "PASSWORD_RESET";

export interface User {
  id: string;
  email?: string | null;
  phone?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profile_image?: string | null;
  is_active?: boolean;
  date_of_birth?: string | null;
  gender?: string | null;
  country?: string | null;
  bio?: string | null;
  identifier?: string;
  name?: string;
  type?: string;
  createdAt?: string;
}

export interface RequestOTPPayload {
  identifier: string;
  type?: OTPType;
  purpose?: OTPPurpose;
}

export interface RequestOTPResponse {
  success: boolean;
  message: string;
  expires_in?: number;
  expiresInSeconds?: number;
  debug_otp?: string;
}

export type SendOtpResponse = RequestOTPResponse;

export interface VerifyOTPPayload {
  identifier: string;
  otp: string;
  purpose?: OTPPurpose;
}

export interface VerifyOTPResponse {
  success: boolean;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  user?: User;
  message?: string;
  token?: string;
}

export type VerifyOtpResponse = VerifyOTPResponse;

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
}

export type AuthMode = "login" | "register";

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  authMode: AuthMode;
  openLoginModal: (mode?: AuthMode) => void;
  closeLoginModal: () => void;
  setAuthMode: (mode: AuthMode) => void;
  loginWithTokens: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<User | null>;
}
