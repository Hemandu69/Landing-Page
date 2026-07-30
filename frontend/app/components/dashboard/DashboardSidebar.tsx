"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Briefcase,
  Award,
  Users,
  Building2,
  Trophy,
  User,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import impactImage from "../../dashboard/assets/make today impactfull image.svg";

interface DashboardSidebarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab = "My Account",
  onSelectTab,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (label: string) => {
    setCurrentTab(label);
    if (onSelectTab) onSelectTab(label);
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutGrid },
    { label: "Applications", icon: Briefcase },
    { label: "Certificates", icon: Award },
    { label: "Youth Clubs", icon: Users },
    { label: "Organisations", icon: Building2 },
    { label: "Leaderboard", icon: Trophy },
    { label: "My Account", icon: User },
    { label: "Settings", icon: Settings },
    { label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <aside
      className={`relative flex flex-col justify-between border-r-2 border-[#F5F7FE] bg-[#F3F5FC] p-4 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64 lg:w-72"
      }`}
    >
      {/* Sidebar Toggle Collapse Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-2xs hover:text-gray-900 cursor-pointer transition-transform"
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1.5 mt-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={isCollapsed ? "" : item.label}
            icon={item.icon}
            isActive={currentTab === item.label}
            onClick={() => handleTabClick(item.label)}
          />
        ))}
      </div>

      {/* Bottom Promo Card */}
      {!isCollapsed && (
        <div className="mt-8 overflow-hidden rounded-[24px] bg-[#EAF5EF] p-4 flex flex-col gap-3 shadow-2xs border border-[#D5EBDD]">
          <div className="flex flex-col gap-1">
            <h4 className="text-[14px] font-bold text-[#111827]">
              Make an Impact Today!
            </h4>
            <p className="text-[11px] font-medium text-[#4B5563] leading-snug">
              Opportunities are waiting for you to explore and create a difference.
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-[#6355DC] py-2.5 px-4 text-[13px] font-bold text-white shadow-xs transition-all hover:bg-[#5243C9] active:scale-[0.98] cursor-pointer"
          >
            Explore Opportunities
          </button>

          {/* Impactful Youth Group Illustration */}
          <div className="relative mt-1 flex justify-center w-full">
            <Image
              src={impactImage}
              alt="Make an Impact Today"
              width={200}
              height={100}
              className="w-full h-auto object-contain rounded-[12px]"
            />
          </div>
        </div>
      )}
    </aside>
  );
};
