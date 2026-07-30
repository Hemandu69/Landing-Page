"use client";

import React, { useRef, useEffect } from "react";

interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  length?: number;
  hasError?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  hasError = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const otpDigits = Array.from({ length }, (_, i) => value[i] || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const digit = val.slice(-1);
    const newOtp = otpDigits.map((d, i) => (i === index ? digit : d)).join("");
    onChange(newOtp);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pastedData) {
      onChange(pastedData);
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2.5 sm:gap-3 my-3">
      {otpDigits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          placeholder="-"
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={`h-[50px] w-[46px] sm:w-[52px] rounded-[14px] border text-center text-[20px] font-bold text-[#111827] placeholder:text-gray-300 outline-none transition-all focus:bg-white focus:ring-2 ${
            hasError
              ? "border-[#EF4444] bg-[#FEF2F2] focus:ring-[#EF4444]/15"
              : digit
              ? "border-[#6355DC] bg-white focus:border-[#6355DC] focus:ring-[#6355DC]/15"
              : "border-gray-200 bg-white focus:border-[#6355DC] focus:ring-[#6355DC]/15"
          }`}
        />
      ))}
    </div>
  );
};
