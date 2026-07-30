"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Badge from "./Badge";

const leftNavItems = [
  "Internships",
  "Volunteering",
  "Quiz",
  "Essays",
  "Events",
];

const popularOpportunities = [
  {
    id: 1,
    title: "Public Distribution System Internship",
    badge: "new",
    badgeText: "New",
  },
  {
    id: 2,
    title: "Kriya Mahotsav National Digital Creator Fellowship",
    badge: "popular",
    badgeText: "Popular",
  },
  {
    id: 3,
    title: "Nasha Mukt Bharat Abhiyan 2026",
    badge: null,
  },
  {
    id: 4,
    title: "National Level Personality Development Workshop",
    badge: null,
  },
];

const OpportunitiesMenu = ({ isOpen, onClose, triggerRef }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        triggerRef?.current?.focus();
      }
    };

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  return (
    <motion.div
      ref={menuRef}
      role="dialog"
      aria-label="Opportunities Mega Menu"
      aria-modal="false"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-0 top-[calc(100%+12px)] z-50 w-[720px] overflow-hidden rounded-[26px] border border-gray-200/90 bg-[#F8F9FE] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
    >
      <div className="grid grid-cols-[200px_1fr] gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-5 border-r border-gray-200/80 pr-6">
          {leftNavItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="text-[17px] font-bold text-[#1F2937] transition-colors hover:text-[#6656D9]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 pl-2">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#6B7280]">
              Popular Opportunities
            </span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="text-[14px] font-bold text-[#1F2937] transition-colors hover:text-[#6656D9]"
            >
              View All
            </a>
          </div>

          {/* Opportunities List */}
          <div className="flex flex-col gap-4 mt-1">
            {popularOpportunities.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="group flex flex-col items-start gap-1"
              >
                {item.badge && (
                  <Badge variant={item.badge}>{item.badgeText}</Badge>
                )}
                <span className="text-[15px] font-bold leading-snug text-[#111827] transition-colors group-hover:text-[#6656D9]">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OpportunitiesMenu;
