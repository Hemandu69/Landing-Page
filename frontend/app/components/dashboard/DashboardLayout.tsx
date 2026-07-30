"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileForm } from "./ProfileForm";
import { DashboardCard } from "./DashboardCard";
import { Menu, X } from "lucide-react";

export const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Account");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-90px)] w-full bg-[#F3F5FC]">
      {/* Mobile Top Sub-bar with Drawer Toggle */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <span className="text-[15px] font-bold text-[#111827]">{activeTab}</span>
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-[#F3F5FC] px-3.5 py-1.5 text-[13px] font-semibold text-[#374151] cursor-pointer"
        >
          {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Menu</span>
        </button>
      </div>

      {/* Desktop Sidebar (inline) */}
      <div className="hidden md:flex shrink-0">
        <DashboardSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      </div>

      {/* Mobile Off-canvas Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/40 backdrop-blur-xs">
          <div className="relative w-72 h-full bg-[#F3F5FC] shadow-2xl flex flex-col">
            <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-white">
              <span className="text-[14px] font-bold text-[#111827]">Dashboard Menu</span>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <DashboardSidebar
                activeTab={activeTab}
                onSelectTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileSidebarOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1200px] overflow-x-hidden">
        <ProfileHeader />

        <DashboardCard>
          <ProfileForm />
        </DashboardCard>
      </main>
    </div>
  );
};
