"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Calendar } from "lucide-react";
import { RECENTS } from "./constant";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const SearchRecentList = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-1"
    >
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500">
        RECENTS
      </p>

      <div className="divide-y divide-gray-100">
        {RECENTS.map((item) => {
          const Icon = item.iconType === "calendar" ? Calendar : BriefcaseBusiness;

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-[#F2F4FF]">
                  <Icon className="w-4.5 h-4.5 text-[#6656D9]" />
                </div>
                <span className="truncate text-[14px] leading-[20px] font-medium text-[#111827]">
                  {item.title}
                </span>
              </div>

              <span className="shrink-0 text-[12px] leading-[18px] text-gray-500">
                {item.date}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SearchRecentList;
