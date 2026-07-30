"use client";

import React from "react";

interface ProfileToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const ProfileToggle: React.FC<ProfileToggleProps> = ({
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex flex-col gap-1 max-w-[500px]">
        <h4 className="text-[15px] font-bold text-[#111827]">
          Your Public Profile
        </h4>
        <p className="text-[13px] font-medium text-[#6B7280] leading-relaxed">
          Making your profile public allows registered organisations to discover your skills and invite you to exclusive opportunities.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? "bg-[#6355DC]" : "bg-gray-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};
