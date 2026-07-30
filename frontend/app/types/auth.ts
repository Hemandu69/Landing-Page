export type LoginType = "email" | "phone" | "unknown";

export interface User {
  id: string;
  identifier: string;
  type: LoginType;
  name?: string;
  avatar?: string;
  createdAt: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  expiresInSeconds: number;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export type AuthMode = "login" | "register";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  authMode: AuthMode;
  openLoginModal: (mode?: AuthMode) => void;
  closeLoginModal: () => void;
  setAuthMode: (mode: AuthMode) => void;
  logout: () => void;
  setAuthenticatedUser: (user: User) => void;
}
