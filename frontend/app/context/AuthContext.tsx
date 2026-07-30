"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, AuthContextType, AuthMode } from "../types/auth";
import { authService } from "../services/auth/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  // Fetch current user from backend /api/auth/me
  const fetchCurrentUser = useCallback(async (): Promise<User | null> => {
    try {
      const storedAccessToken = localStorage.getItem("access_token");
      if (!storedAccessToken) {
        setUser(null);
        setLoading(false);
        return null;
      }

      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setAccessToken(storedAccessToken);
      setRefreshTokenState(localStorage.getItem("refresh_token"));
      return currentUser;
    } catch (error) {
      console.warn("Failed to restore authenticated user session:", error);
      setUser(null);
      setAccessToken(null);
      setRefreshTokenState(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize and restore session on application load
  useEffect(() => {
    fetchCurrentUser();

    const handleUnauthorized = () => {
      setUser(null);
      setAccessToken(null);
      setRefreshTokenState(null);
      setIsLoginModalOpen(true);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [fetchCurrentUser]);

  const openLoginModal = (mode: AuthMode = "login") => {
    setAuthMode(mode);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Store tokens and set authenticated user upon login / OTP verification
  const loginWithTokens = (
    newUser: User,
    newAccessToken: string,
    newRefreshToken: string
  ) => {
    setUser(newUser);
    setAccessToken(newAccessToken);
    setRefreshTokenState(newRefreshToken);
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
  };

  // Revoke session and clear local state
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshTokenState(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: !!user,
        isLoading: loading,
        isLoginModalOpen,
        authMode,
        openLoginModal,
        closeLoginModal,
        setAuthMode,
        loginWithTokens,
        logout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
