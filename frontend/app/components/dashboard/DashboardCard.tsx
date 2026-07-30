"use client";

import React from "react";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-[28px] border border-gray-100/80 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] ${className}`}
    >
      {children}
    </div>
  );
};
