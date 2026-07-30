"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Calendar, FileText } from "lucide-react";

const categories = ["All", "Opportunities", "Events", "Quiz & Essay"];

const groupedResults = [
  {
    category: "OPPORTUNITIES",
    items: [
      {
        id: "o1",
        icon: BriefcaseBusiness,
        title: "Volunteer for Nasha Mukt Bharat Abhiyaan",
        date: "15 July 2026",
      },
      {
        id: "o2",
        icon: BriefcaseBusiness,
        title: "Drug-Free India Awareness Campaign",
        date: "20 July 2026",
      },
    ],
  },
  {
    category: "EVENTS",
    items: [
      {
        id: "e1",
        icon: Calendar,
        title: "Drug-Free Youth Awareness Marathon",
        date: "18 July 2026",
      },
      {
        id: "e2",
        icon: Calendar,
        title: "Community Chabeel Seva Camp",
        date: "22 July 2026",
      },
    ],
  },
  {
    category: "QUIZ & ESSAY",
    items: [
      {
        id: "q1",
        icon: FileText,
        title: "Drug-Free India Awareness Quiz",
        date: "18 July 2026",
      },
    ],
  },
];

const SearchDropdown = ({ heroState }) => {
  const [activeTab, setActiveTab] = useState("All");

  if (heroState !== "results") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mt-3 w-full"
    >
      {/* Category Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-[#E5E9F2] pb-2.5">
        {categories.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-[6px] px-3 py-1 text-[13px] font-semibold transition-all ${
              activeTab === tab
                ? "bg-[#EAE8FF] text-[#6656D9]"
                : "text-gray-700 hover:text-[#6656D9]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Categorized Results */}
      <div className="mt-3 space-y-4">
        {groupedResults.map((group, groupIdx) => (
          <div key={group.category}>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              {group.category}
            </p>

            <div className="space-y-1 divide-y divide-gray-100">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-[#F2F4FF] text-[#6656D9]">
                        <Icon size={18} />
                      </div>
                      <span className="truncate text-[14px] leading-[20px] font-medium text-[#111827]">
                        {item.title}
                      </span>
                    </div>

                    <span className="shrink-0 text-[12px] leading-[18px] text-gray-500">
                      {item.date}
                    </span>
                  </div>
                );
              })}
            </div>

            {groupIdx !== groupedResults.length - 1 && (
              <div className="my-3 h-px w-full bg-[#F0F3F8]" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchDropdown;
