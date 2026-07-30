"use client";

import React from "react";

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse p-2">
      {/* Avatar Skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          <div className="h-5 w-36 bg-gray-200 rounded-md" />
          <div className="h-3 w-48 bg-gray-200 rounded-md" />
        </div>
      </div>

      <div className="h-px w-full bg-gray-200/80 my-1" />

      {/* Grid Inputs Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded-md" />
          <div className="h-12 w-full bg-gray-200 rounded-[14px]" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded-md" />
          <div className="h-12 w-full bg-gray-200 rounded-[14px]" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
          <div className="h-12 w-full bg-gray-200 rounded-[14px]" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-200 rounded-md" />
          <div className="h-12 w-full bg-gray-200 rounded-[14px]" />
        </div>
      </div>
    </div>
  );
};
