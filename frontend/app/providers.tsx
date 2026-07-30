"use client";

import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { LoginModal } from "./components/auth/LoginModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <LoginModal />
    </AuthProvider>
  );
}
