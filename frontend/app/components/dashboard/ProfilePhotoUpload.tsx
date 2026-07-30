"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2, Camera } from "lucide-react";
import avatarsIcon from "../../landing page/Navbar/Assets/Avatars.svg";
import { useProfile, useUploadAvatar, useDeleteAvatar } from "../../hooks/useProfile";
import { Toast, ToastMessage } from "../auth/Toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const ProfilePhotoUpload: React.FC = () => {
  const { data: profile } = useProfile();
  const uploadMutation = useUploadAvatar();
  const deleteMutation = useDeleteAvatar();

  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rawImage = profile?.profile_image;
  const avatarSrc = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${API_BASE_URL}${rawImage}`
    : avatarsIcon;

  const handleFileSelect = async (file: File) => {
    try {
      await uploadMutation.mutateAsync(file);
      setToast({
        id: String(Date.now()),
        type: "success",
        message: "Profile image updated successfully!",
      });
    } catch (err: any) {
      setToast({
        id: String(Date.now()),
        type: "error",
        message: err.message || "Failed to upload image.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      setToast({
        id: String(Date.now()),
        type: "success",
        message: "Profile image removed successfully.",
      });
    } catch (err: any) {
      setToast({
        id: String(Date.now()),
        type: "error",
        message: err.message || "Failed to remove image.",
      });
    }
  };

  const isWorking = uploadMutation.isPending || deleteMutation.isPending;

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Avatar Image Circle with Upload Overlay */}
        <div className="relative group shrink-0">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#6355DC]/30 shadow-sm bg-white">
            <Image
              src={avatarSrc}
              alt="Profile Avatar"
              fill
              className="object-cover"
              unoptimized={typeof avatarSrc === "string" && avatarSrc.startsWith("http")}
            />
            {isWorking && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-white" />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isWorking}
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#6355DC] text-white shadow-md transition-transform hover:scale-110 cursor-pointer disabled:opacity-50"
            aria-label="Upload photo"
          >
            <Camera size={14} />
          </button>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex-1 w-full rounded-2xl border-2 border-dashed p-4 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isDragging
              ? "border-[#6355DC] bg-[#6355DC]/5"
              : "border-gray-200 bg-[#F9FAFB] hover:border-gray-300"
          }`}
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[14px] font-bold text-[#111827]">
              <Upload size={16} className="text-[#6355DC]" />
              <span>Upload new avatar</span>
            </div>
            <p className="text-[12px] font-medium text-[#6B7280]">
              Drag & drop image here or click browse. Max 5MB (JPEG, PNG, WEBP)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isWorking}
              className="rounded-full bg-white border border-gray-300 px-4 py-2 text-[13px] font-bold text-[#1F2937] hover:bg-gray-50 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
            >
              Browse File
            </button>

            {rawImage && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isWorking}
                className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-[13px] font-bold text-red-600 hover:bg-red-100 transition-all cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
