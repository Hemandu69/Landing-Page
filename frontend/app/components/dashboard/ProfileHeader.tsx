"use client";

import React from "react";

export const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <h1 className="text-[28px] sm:text-[32px] font-bold text-[#111827] tracking-tight">
        Edit Profile
      </h1>
      <p className="text-[14px] font-medium text-[#6B7280]">
        Update your personal details, credentials, and manage your public profile visibility.
      </p>
    </div>
  );
};
