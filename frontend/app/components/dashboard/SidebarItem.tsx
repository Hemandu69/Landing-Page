"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  badge?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  isActive = false,
  onClick,
  badge,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center justify-between rounded-full px-4 py-2.5 text-[14px] transition-all cursor-pointer ${
        isActive
          ? "border-[1.5px] border-[#6355DC] bg-[#F5F3FF] text-[#6355DC] font-bold shadow-2xs"
          : "border border-transparent text-[#4B5563] font-medium hover:bg-white hover:text-[#111827] hover:shadow-2xs"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={18}
          className={`shrink-0 transition-colors ${
            isActive ? "text-[#6355DC]" : "text-[#6B7280] group-hover:text-[#111827]"
          }`}
          strokeWidth={isActive ? 2.2 : 1.8}
        />
        <span>{label}</span>
      </div>

      {badge && (
        <span className="rounded-full bg-[#6355DC] px-2 py-0.5 text-[11px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
};
