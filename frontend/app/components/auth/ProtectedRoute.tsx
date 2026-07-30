"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, openLoginModal } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      openLoginModal("login");
      router.push("/");
    }
  }, [isLoading, isAuthenticated, openLoginModal, router]);

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F5FC]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#6355DC] border-t-transparent" />
            <p className="text-[14px] font-semibold text-[#6B7280]">
              Authenticating session...
            </p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
