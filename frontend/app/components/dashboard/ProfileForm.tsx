"use client";

import React, { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";
import { ProfileToggle } from "./ProfileToggle";
import { Toast, ToastMessage } from "../auth/Toast";

export const ProfileForm: React.FC = () => {
  // Form State initialized to empty strings for clean placeholders
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    referralCode: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
    casteCategory: "",
    pwd: "No",
    country: "India",
    addressLine1: "",
    addressLine2: "",
    consentTerms: false,
    consentNcs: false,
    publicProfile: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    }
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      newErrors.dob = "Complete Date of Birth is required.";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
    }
    if (!formData.casteCategory) {
      newErrors.casteCategory = "Caste Category is required.";
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        id: String(Date.now()),
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setIsLoading(true);

    // Mock API Save request with delay
    setTimeout(() => {
      setIsLoading(false);
      setToast({
        id: String(Date.now()),
        type: "success",
        message: "Profile updated successfully!",
      });
    }, 1000);
  };

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
            />
            {errors.firstName && (
              <span className="text-[12px] font-medium text-[#EF4444]">
                {errors.firstName}
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
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
            />
          </div>

          {/* Referral Code */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              Referral Code
            </label>
            <input
              type="text"
              name="referralCode"
              placeholder="Referral Code"
              value={formData.referralCode}
              onChange={handleInputChange}
              className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
            />
          </div>

          {/* Date of Birth (3 inputs: Day, Month, Year) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              Date of Birth <span className="text-[#EF4444]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <input
                type="text"
                name="dobDay"
                placeholder="dd"
                maxLength={2}
                value={formData.dobDay}
                onChange={handleInputChange}
                className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 text-center focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
              />
              <input
                type="text"
                name="dobMonth"
                placeholder="mm"
                maxLength={2}
                value={formData.dobMonth}
                onChange={handleInputChange}
                className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 text-center focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
              />
              <input
                type="text"
                name="dobYear"
                placeholder="yyyy"
                maxLength={4}
                value={formData.dobYear}
                onChange={handleInputChange}
                className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 text-center focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
              />
            </div>
            {errors.dob && (
              <span className="text-[12px] font-medium text-[#EF4444]">
                {errors.dob}
              </span>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              Gender <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full appearance-none rounded-[14px] border border-gray-200 bg-white px-4 py-3 pr-10 text-[14px] font-medium focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs cursor-pointer ${
                  formData.gender ? "text-[#111827]" : "text-gray-400/60"
                }`}
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Caste Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#374151]">
              Caste Category <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <select
                name="casteCategory"
                value={formData.casteCategory}
                onChange={handleInputChange}
                className={`w-full appearance-none rounded-[14px] border border-gray-200 bg-white px-4 py-3 pr-10 text-[14px] font-medium focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs cursor-pointer ${
                  formData.casteCategory ? "text-[#111827]" : "text-gray-400/60"
                }`}
              >
                <option value="" disabled hidden>Select Caste Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* PwD (Disability) */}
        <div className="flex flex-col gap-2 mt-1">
          <label className="text-[13px] font-bold text-[#374151]">
            PwD (Disability) <span className="text-[#EF4444]">*</span>
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-[14px] font-medium text-[#111827] cursor-pointer">
              <input
                type="radio"
                name="pwd"
                value="Yes"
                checked={formData.pwd === "Yes"}
                onChange={handleInputChange}
                className="h-4 w-4 accent-[#6355DC] cursor-pointer"
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center gap-2 text-[14px] font-medium text-[#111827] cursor-pointer">
              <input
                type="radio"
                name="pwd"
                value="No"
                checked={formData.pwd === "No"}
                onChange={handleInputChange}
                className="h-4 w-4 accent-[#6355DC] cursor-pointer"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">
            Country <span className="text-[#EF4444]">*</span>
          </label>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
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
            Address Line 1 <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            required
            className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
          />
          {errors.addressLine1 && (
            <span className="text-[12px] font-medium text-[#EF4444]">
              {errors.addressLine1}
            </span>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">
            Address Line 2 (Landmark)
          </label>
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2 (Landmark)"
            value={formData.addressLine2}
            onChange={handleInputChange}
            className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] placeholder-gray-400/60 focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all shadow-2xs"
          />
        </div>

        {/* Consent Checkboxes */}
        <div className="flex flex-col gap-3 mt-2">
          <label className="flex items-center gap-2.5 text-[13px] font-medium text-[#4B5563] cursor-pointer">
            <input
              type="checkbox"
              name="consentTerms"
              checked={formData.consentTerms}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 accent-[#6355DC] cursor-pointer"
            />
            <span>
              I consent to terms of use{" "}
              <a
                href="https://mybharat.gov.in/pages/terms_of_use"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EF4444] underline font-semibold hover:text-[#DC2626]"
              >
                * terms of use
              </a>
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-[13px] font-medium text-[#4B5563] cursor-pointer">
            <input
              type="checkbox"
              name="consentNcs"
              checked={formData.consentNcs}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 accent-[#6355DC] cursor-pointer"
            />
            <span>I consent to provide my data to NCS</span>
          </label>
        </div>

        <div className="h-px w-full bg-gray-200/80 my-2" />

        {/* Your Public Profile Toggle */}
        <ProfileToggle
          enabled={formData.publicProfile}
          onChange={(val) => setFormData((prev) => ({ ...prev, publicProfile: val }))}
        />

        {/* Save Button (Bottom Right) */}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-full bg-[#6355DC] px-9 py-3 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#5243C9] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            <span>{isLoading ? "Saving..." : "Save"}</span>
          </button>
        </div>
      </form>
    </>
  );
};
