"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import profilePic from "../../dashboard/assets/profile-pic.svg";

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string;
  onPhotoChange?: (file: File | null) => void;
}

export const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  currentPhotoUrl,
  onPhotoChange,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, JPEG or PNG files are allowed.");
      return;
    }

    // Validate file size (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onPhotoChange) onPhotoChange(file);
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onPhotoChange) onPhotoChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-5">
        {/* Avatar Display Container */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gray-100 bg-[#EBF0FF] shadow-xs">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile Photo"
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={profilePic}
              alt="Default Avatar"
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Upload Actions & Instructions */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-[12px] bg-[#6355DC] px-5 py-2 text-[14px] font-bold text-white shadow-2xs transition-all hover:bg-[#5243C9] active:scale-[0.98] cursor-pointer"
            >
              Upload Photo
            </button>

            <button
              type="button"
              onClick={handleRemovePhoto}
              className="rounded-[12px] border border-gray-300 bg-white px-4 py-2 text-[14px] font-semibold text-[#374151] shadow-2xs transition-all hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
            >
              Remove
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <p className="text-[12px] font-medium text-[#9CA3AF]">
            Allowed JPG, JPEG or PNG. Max size of 2MB
          </p>
        </div>
      </div>

      {error && (
        <p className="text-[12px] font-semibold text-[#EF4444] mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
