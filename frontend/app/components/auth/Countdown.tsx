"use client";

import React from "react";
import { RotateCw } from "lucide-react";

interface CountdownProps {
  formattedTime: string;
  canResend: boolean;
  onResend: () => void;
  isResending?: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({
  formattedTime,
  canResend,
  onResend,
  isResending = false,
}) => {
  return (
    <div className="flex items-center justify-end text-[13px] font-medium my-1">
      {!canResend ? (
        <span className="text-[#6B7280]">
          Resend in <span className="font-bold text-[#6355DC]">{formattedTime}</span>
        </span>
      ) : (
        <button
          type="button"
          disabled={isResending}
          onClick={onResend}
          className="flex items-center gap-1.5 font-bold text-[#6355DC] hover:text-[#5242CC] disabled:text-gray-400 cursor-pointer"
        >
          {isResending && <RotateCw size={14} className="animate-spin" />}
          <span>Resend OTP</span>
        </button>
      )}
    </div>
  );
};
