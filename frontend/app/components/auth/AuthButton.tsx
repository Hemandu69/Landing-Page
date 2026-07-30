"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  isLoading = false,
  variant = "primary",
  disabled,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "relative flex h-[52px] w-full items-center justify-center rounded-full text-[16px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-[#6355DC] text-white shadow-[0_4px_16px_rgba(99,85,220,0.30)] hover:bg-[#5242CC] focus:ring-[#6355DC] disabled:bg-[#B5B3FB] disabled:text-white disabled:shadow-none",
    secondary:
      "bg-[#F3F4F6] text-[#1F2937] hover:bg-[#E5E7EB] focus:ring-gray-300 disabled:opacity-50",
    outline:
      "border border-[#1F2937] bg-white text-[#1F2937] hover:bg-gray-50 focus:ring-gray-200 disabled:opacity-50",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 size={20} className="animate-spin text-current" />
          <span>Please wait...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
