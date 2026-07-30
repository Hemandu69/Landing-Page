"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Loader2, Save } from "lucide-react";
import { useProfile, useUpdateProfile } from "../../hooks/useProfile";
import { profileSchema, ProfileFormValues } from "../../schemas/profileSchema";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";
import { ProfileToggle } from "./ProfileToggle";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { Toast, ToastMessage } from "../auth/Toast";

export const ProfileForm: React.FC = () => {
  const { data: profile, isLoading: isFetchingProfile, isError, error } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const [toast, setToast] = React.useState<ToastMessage | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      gender: "",
      country: "India",
      address_line_1: "",
      address_line_2: "",
      bio: "",
      public_profile: true,
    },
  });

  const publicProfileValue = watch("public_profile");

  // Populate form values when user profile data is loaded from GET /api/users/me
  useEffect(() => {
    if (profile) {
      let day = "";
      let month = "";
      let year = "";
      if (profile.date_of_birth) {
        const parts = profile.date_of_birth.split("-");
        if (parts.length === 3) {
          year = parts[0];
          month = parts[1];
          day = parts[2];
        }
      }

      reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        dobDay: day,
        dobMonth: month,
        dobYear: year,
        gender: profile.gender || "",
        country: profile.country || "India",
        address_line_1: profile.address_line_1 || "",
        address_line_2: profile.address_line_2 || "",
        bio: profile.bio || "",
        public_profile: profile.public_profile ?? true,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      let date_of_birth: string | null = null;
      if (values.dobYear && values.dobMonth && values.dobDay) {
        const y = values.dobYear.padStart(4, "20");
        const m = values.dobMonth.padStart(2, "0");
        const d = values.dobDay.padStart(2, "0");
        date_of_birth = `${y}-${m}-${d}`;
      }

      const payload = {
        first_name: values.first_name.trim(),
        last_name: values.last_name ? values.last_name.trim() : null,
        date_of_birth,
        gender: values.gender || null,
        country: values.country || "India",
        address_line_1: values.address_line_1 ? values.address_line_1.trim() : null,
        address_line_2: values.address_line_2 ? values.address_line_2.trim() : null,
        bio: values.bio ? values.bio.trim() : null,
        public_profile: values.public_profile,
      };

      await updateProfileMutation.mutateAsync(payload);

      setToast({
        id: String(Date.now()),
        type: "success",
        message: "Profile information saved successfully!",
      });
    } catch (err: any) {
      setToast({
        id: String(Date.now()),
        type: "error",
        message: err.message || "Failed to update profile details.",
      });
    }
  };

  if (isFetchingProfile) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center flex flex-col items-center gap-3">
        <p className="text-[14px] font-bold text-red-700">
          {(error as Error)?.message || "Failed to load user profile."}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-full bg-red-600 text-white font-bold text-[13px]"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Profile Photo Upload Section */}
        <ProfilePhotoUpload />

        <div className="h-px w-full bg-gray-200/80 my-1" />

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              First Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name")}
              className={`w-full rounded-[14px] border bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:outline-none focus:ring-2 transition-all shadow-2xs ${
                errors.first_name
                  ? "border-[#EF4444] focus:ring-[#EF4444]/20"
                  : "border-gray-200 focus:border-[#6355DC] focus:ring-[#6355DC]/20"
              }`}
            />
            {errors.first_name && (
              <span className="text-[12px] font-medium text-[#EF4444]">
                {errors.first_name.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name")}
              className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
            />
          </div>

          {/* Date of Birth (Day, Month, Year) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              Date of Birth
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <input
                type="text"
                placeholder="dd"
                maxLength={2}
                {...register("dobDay")}
                className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 text-center focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
              />
              <input
                type="text"
                placeholder="mm"
                maxLength={2}
                {...register("dobMonth")}
                className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 text-center focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
              />
              <input
                type="text"
                placeholder="yyyy"
                maxLength={4}
                {...register("dobYear")}
                className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 text-center focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              Gender
            </label>
            <div className="relative">
              <select
                {...register("gender")}
                className="w-full appearance-none rounded-[14px] border border-gray-200 bg-white px-4 py-3 pr-10 text-[14px] font-medium text-[#111827] focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs cursor-pointer"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">
            Bio (Max 500 characters)
          </label>
          <textarea
            rows={3}
            placeholder="Tell us a little bit about yourself..."
            {...register("bio")}
            className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs resize-none"
          />
          {errors.bio && (
            <span className="text-[12px] font-medium text-[#EF4444]">
              {errors.bio.message}
            </span>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">
            Country
          </label>
          <div className="relative">
            <select
              {...register("country")}
              className="w-full appearance-none rounded-[14px] border border-gray-200 bg-white px-4 py-3 pr-10 text-[14px] font-medium text-[#111827] focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs cursor-pointer"
            >
              <option value="India">India</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Address Line 1 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">
            Address Line 1
          </label>
          <input
            type="text"
            placeholder="Address Line 1"
            {...register("address_line_1")}
            className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
          />
        </div>

        {/* Address Line 2 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">
            Address Line 2 (Landmark / Location)
          </label>
          <input
            type="text"
            placeholder="Address Line 2"
            {...register("address_line_2")}
            className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
          />
        </div>

        <div className="h-px w-full bg-gray-200/80 my-2" />

        {/* Public Profile Toggle */}
        <ProfileToggle
          enabled={publicProfileValue}
          onChange={(val) => setValue("public_profile", val)}
        />

        {/* Save Button (Bottom Right) */}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="flex items-center gap-2 rounded-full bg-[#6355DC] px-9 py-3 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#5243C9] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {updateProfileMutation.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            <span>{updateProfileMutation.isPending ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </>
  );
};
