"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileForm } from "./ProfileForm";
import { DashboardCard } from "./DashboardCard";

export const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Account");

  return (
    <div className="flex min-h-[calc(100vh-90px)] w-full bg-[#F3F5FC]">
      {/* Left Sidebar */}
      <DashboardSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-[1200px] overflow-x-hidden">
        <ProfileHeader />

        <DashboardCard>
          <ProfileForm />
        </DashboardCard>
      </main>
    </div>
  );
};
