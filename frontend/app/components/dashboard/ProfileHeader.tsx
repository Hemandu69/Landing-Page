"use client";

import React from "react";
import { useProfile } from "../../hooks/useProfile";
import { CheckCircle2, Calendar, ShieldCheck, User } from "lucide-react";

export const ProfileHeader: React.FC = () => {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="mb-6 flex flex-col gap-2 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
        <div className="h-4 w-72 bg-gray-200 rounded-lg" />
      </div>
    );
  }

  const fullName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ""}`.trim()
    : profile?.email || profile?.phone || "Registered Youth";

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-[26px] font-extrabold text-[#111827]">
            {fullName}
          </h1>
          {profile?.is_active && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[12px] font-bold text-emerald-700 border border-emerald-200/80">
              <CheckCircle2 size={13} />
              <span>Active Account</span>
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-[#6B7280]">
          {profile?.email && (
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#6355DC]" />
              <span>{profile.email}</span>
            </span>
          )}
          {profile?.phone && (
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#6355DC]" />
              <span>{profile.phone}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            <span>Member since {memberSince}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
