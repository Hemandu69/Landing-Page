"use client";

import React, { useState, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Hand,
  HelpCircle,
  FileText,
  Calendar,
  Users,
  Briefcase,
  UserCheck,
  BarChart,
  Monitor,
  Building,
  FileCheck,
  Check,
} from "lucide-react";
import Image from "next/image";
import youthSvg from "../assets/youth.svg";
import partnerOrgSvg from "../assets/Partner_org.svg";
import govOfficialSvg from "../assets/Gov official.svg";

export interface RegistrationStepsRef {
  goBack: () => void;
}

interface RegistrationStepsProps {
  onComplete: (userData: { firstName: string; lastName: string; role: string; interests: string[] }) => void;
  onBackToOtp: () => void;
}

export const RegistrationSteps = forwardRef<RegistrationStepsRef, RegistrationStepsProps>(
  ({ onComplete, onBackToOtp }, ref) => {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

    // Step 1 State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // Step 2 State
    const [selectedRole, setSelectedRole] = useState<string>("Youth");

    // Step 3 State
    const [selectedInterests, setSelectedInterests] = useState<string[]>([
      "Find Internship",
      "Volunteer",
    ]);

    useImperativeHandle(ref, () => ({
      goBack: () => {
        if (currentStep === 3) {
          setCurrentStep(2);
        } else if (currentStep === 2) {
          setCurrentStep(1);
        } else {
          onBackToOtp();
        }
      },
    }));

    const toggleInterest = (interest: string) => {
      setSelectedInterests((prev) =>
        prev.includes(interest)
          ? prev.filter((item) => item !== interest)
          : [...prev, interest]
      );
    };

    const handleNextStep1 = (e: React.FormEvent) => {
      e.preventDefault();
      if (firstName.trim() && lastName.trim()) {
        setCurrentStep(2);
      }
    };

    const handleNextStep2 = () => {
      setCurrentStep(3);
    };

    const handleFinish = () => {
      onComplete({
        firstName,
        lastName,
        role: selectedRole,
        interests: selectedInterests,
      });
    };

    return (
      <div className="flex flex-col gap-5">
        {/* Top Header Step Indicator */}
        <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
          <span className="text-[13px] font-semibold text-[#6B7280]">
            Step {currentStep}/3
          </span>

          {/* 3 Progress Dots */}
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                currentStep === 1 ? "bg-[#6355DC] w-4" : "bg-gray-300"
              }`}
            />
            <span
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                currentStep === 2 ? "bg-[#6355DC] w-4" : "bg-gray-300"
              }`}
            />
            <span
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                currentStep === 3 ? "bg-[#6355DC] w-4" : "bg-gray-300"
              }`}
            />
          </div>
        </div>

        {/* STEP 1/3: Name Input */}
        {currentStep === 1 && (
          <motion.div
            key="reg-step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-[26px] font-bold text-[#111827]">
                Hello! What’s your name?
              </h2>
              <p className="text-[14px] font-medium text-[#6B7280]">
                Answer a few questions to personalize your dashboard
              </p>
            </div>

            <form onSubmit={handleNextStep1} className="flex flex-col gap-6 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3.5 text-[14px] font-medium text-[#111827] placeholder-gray-400 shadow-2xs focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all"
                />
                <input
                  type="text"
                  placeholder="Enter Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3.5 text-[14px] font-medium text-[#111827] placeholder-gray-400 shadow-2xs focus:border-[#6355DC] focus:outline-none focus:ring-2 focus:ring-[#6355DC]/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!firstName.trim() || !lastName.trim()}
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-bold text-white shadow-md transition-all cursor-pointer ${
                  firstName.trim() && lastName.trim()
                    ? "bg-[#6355DC] hover:bg-[#5243C9] active:scale-[0.99]"
                    : "bg-[#B4B5F5] cursor-not-allowed opacity-90"
                }`}
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 2/3: Role Selection */}
        {currentStep === 2 && (
          <motion.div
            key="reg-step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-[26px] font-bold text-[#111827]">
                Tell us who you are?
              </h2>
              <p className="text-[14px] font-medium text-[#6B7280]">
                Choose one or more options that best describe you.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3.5 sm:gap-4">
              {/* Youth Card */}
              <div
                onClick={() => setSelectedRole("Youth")}
                className={`group flex flex-col items-center justify-between rounded-[22px] p-5 text-center cursor-pointer transition-all border-[2.5px] shadow-2xs ${
                  selectedRole === "Youth"
                    ? "border-[#38916B] bg-[#F0FDF4] ring-2 ring-[#38916B]/25 shadow-md"
                    : "border-gray-200/90 bg-white hover:border-gray-300"
                }`}
              >
                <Image
                  src={youthSvg}
                  alt="Youth"
                  width={120}
                  height={120}
                  className="h-28 w-auto object-contain select-none mb-3"
                />
                <span className="text-[14px] font-bold text-[#111827]">
                  Youth
                </span>
              </div>

              {/* Organisation / Partner Card */}
              <div
                onClick={() => setSelectedRole("Organisation")}
                className={`group flex flex-col items-center justify-between rounded-[22px] p-5 text-center cursor-pointer transition-all border-[2.5px] shadow-2xs ${
                  selectedRole === "Organisation"
                    ? "border-[#38916B] bg-[#F0FDF4] ring-2 ring-[#38916B]/25 shadow-md"
                    : "border-gray-200/90 bg-white hover:border-gray-300"
                }`}
              >
                <Image
                  src={partnerOrgSvg}
                  alt="Organisation/ Partner"
                  width={120}
                  height={120}
                  className="h-28 w-auto object-contain select-none mb-3"
                />
                <span className="text-[13px] sm:text-[14px] font-bold leading-snug text-[#111827]">
                  Organisation/<br />Partner
                </span>
              </div>

              {/* Government Official Card */}
              <div
                onClick={() => setSelectedRole("Government")}
                className={`group flex flex-col items-center justify-between rounded-[22px] p-5 text-center cursor-pointer transition-all border-[2.5px] shadow-2xs ${
                  selectedRole === "Government"
                    ? "border-[#38916B] bg-[#F0FDF4] ring-2 ring-[#38916B]/25 shadow-md"
                    : "border-gray-200/90 bg-white hover:border-gray-300"
                }`}
              >
                <Image
                  src={govOfficialSvg}
                  alt="Government Official"
                  width={120}
                  height={120}
                  className="h-28 w-auto object-contain select-none mb-3"
                />
                <span className="text-[13px] sm:text-[14px] font-bold leading-snug text-[#111827]">
                  Government<br />Official
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextStep2}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#6355DC] py-3.5 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#5243C9] active:scale-[0.99] cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {/* STEP 3/3: Interest Chips Selection */}
        {currentStep === 3 && (
          <motion.div
            key="reg-step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-[24px] sm:text-[26px] font-bold text-[#111827]">
                What Would You Like to Explore?
              </h2>
              <p className="text-[14px] font-medium text-[#6B7280]">
                Select your interests to discover opportunities tailored for you
              </p>
            </div>

            {/* Interest Chips Container */}
            <div className="flex flex-col gap-4 mt-2">
              {/* Group 1: Opportunities & Learning */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Find Internship", icon: Search },
                  { label: "Volunteer", icon: Hand },
                  { label: "Play Quiz", icon: HelpCircle },
                  { label: "Build CV", icon: FileText },
                  { label: "Attend Events", icon: Calendar },
                  { label: "Get Mentor", icon: Users },
                ].map((item) => {
                  const isSelected = selectedInterests.includes(item.label);
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleInterest(item.label)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-[2px] border-[#6355DC] bg-[#F5F3FF] text-[#1E293B] shadow-2xs"
                          : "border border-gray-300 bg-white text-[#1E293B] hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent size={15} className={isSelected ? "text-[#6355DC]" : "text-gray-500"} />
                      <span>{item.label}</span>
                      {isSelected && <Check size={14} className="text-[#6355DC] ml-0.5" />}
                    </button>
                  );
                })}
              </div>

              <div className="h-px w-full bg-gray-200/70" />

              {/* Group 2: Management & Leadership */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Create Opportunities", icon: Briefcase },
                  { label: "Manage Volunteers", icon: Users },
                  { label: "Manage Events", icon: Calendar },
                  { label: "Track Participants", icon: UserCheck },
                  { label: "View Analytics", icon: BarChart },
                ].map((item) => {
                  const isSelected = selectedInterests.includes(item.label);
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleInterest(item.label)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-[2px] border-[#6355DC] bg-[#F5F3FF] text-[#1E293B] shadow-2xs"
                          : "border border-gray-300 bg-white text-[#1E293B] hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent size={15} className={isSelected ? "text-[#6355DC]" : "text-gray-500"} />
                      <span>{item.label}</span>
                      {isSelected && <Check size={14} className="text-[#6355DC] ml-0.5" />}
                    </button>
                  );
                })}
              </div>

              <div className="h-px w-full bg-gray-200/70" />

              {/* Group 3: Programmes & Organisations */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Monitor Programmes", icon: Monitor },
                  { label: "Manage Youth Engagement", icon: Users },
                  { label: "Manage Organisations", icon: Building },
                  { label: "Review Applications", icon: FileCheck },
                ].map((item) => {
                  const isSelected = selectedInterests.includes(item.label);
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleInterest(item.label)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-[2px] border-[#6355DC] bg-[#F5F3FF] text-[#1E293B] shadow-2xs"
                          : "border border-gray-300 bg-white text-[#1E293B] hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent size={15} className={isSelected ? "text-[#6355DC]" : "text-gray-500"} />
                      <span>{item.label}</span>
                      {isSelected && <Check size={14} className="text-[#6355DC] ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Go to Dashboard Button (Bottom Right) */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleFinish}
                className="rounded-full bg-[#6355DC] px-8 py-3 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#5243C9] active:scale-[0.98] cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

RegistrationSteps.displayName = "RegistrationSteps";
