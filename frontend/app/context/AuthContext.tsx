"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType, AuthMode } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  useEffect(() => {
    // Read persisted mock user session if any
    const savedUser = localStorage.getItem("mybharat_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("mybharat_user");
      }
    }
  }, []);

  const openLoginModal = (mode: AuthMode = "login") => {
    setAuthMode(mode);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const setAuthenticatedUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("mybharat_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mybharat_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginModalOpen,
        authMode,
        openLoginModal,
        closeLoginModal,
        setAuthMode,
        logout,
        setAuthenticatedUser,
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
