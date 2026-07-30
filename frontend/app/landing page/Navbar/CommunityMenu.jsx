"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import uttarPradeshLogo from "./Assets/Govt of Uttar Pradesh.svg";
import uttrakhandLogo from "./Assets/uttrakhand Gov.svg";
import aryavartLogo from "./Assets/Aryavat Uni.svg";

const leftNavItems = [
  "Youth Center",
  "All Organisations",
  "Gallery",
];

const popularOrganisations = [
  {
    id: 1,
    name: "Govt. of Uttar Pradesh",
    logo: uttarPradeshLogo,
  },
  {
    id: 2,
    name: "Uttarakhand Government",
    logo: uttrakhandLogo,
  },
  {
    id: 3,
    name: "Aryavart University",
    logo: aryavartLogo,
  },
];

const CommunityMenu = ({ isOpen, onClose, triggerRef }) => {
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
      aria-label="Community Mega Menu"
      aria-modal="false"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-0 top-[calc(100%+12px)] z-50 w-[720px] overflow-hidden rounded-[26px] border border-gray-200/90 bg-[#F8F9FE] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
    >
      <div className="grid grid-cols-[200px_1fr] gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6 border-r border-gray-200/80 pr-6 pt-1">
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
              Popular Organisations
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

          {/* Organisations Cards List */}
          <div className="flex flex-col gap-3.5 mt-1">
            {popularOrganisations.map((org) => (
              <a
                key={org.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="group flex items-center gap-4 rounded-[18px] border border-gray-300/80 bg-white p-3.5 shadow-2xs transition-all hover:border-[#6656D9]/50 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-1">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <span className="text-[16px] font-bold text-[#111827] transition-colors group-hover:text-[#6656D9]">
                  {org.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityMenu;
