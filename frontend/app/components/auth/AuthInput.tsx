"use client";

import React from "react";
import { LoginType } from "../../types/auth";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  detectedType: LoginType;
  error?: string | null;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  value,
  onChange,
  detectedType,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-[13px] font-bold text-[#374151] mb-2">
        Mobile Number/Email
      </label>

      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter mobile or email ID"
          className={`h-[50px] w-full rounded-[14px] border bg-white px-4 text-[15px] font-medium text-[#111827] placeholder:text-[#9CA3AF] outline-none transition-all ${
            error
              ? "border-[#EF4444] text-[#111827] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/15"
              : value && !error
              ? "border-[#6355DC] focus:border-[#6355DC] focus:ring-2 focus:ring-[#6355DC]/15"
              : "border-gray-200 focus:border-[#6355DC] focus:ring-2 focus:ring-[#6355DC]/15"
          }`}
          {...props}
        />
      </div>

      {/* Error Feedback */}
      {error && (
        <p className="text-[12px] font-medium text-[#EF4444] mt-1.5 pl-0.5">
          {error}
        </p>
      )}
    </div>
  );
};
