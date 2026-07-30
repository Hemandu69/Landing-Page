"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const tags = [
  "Nasha Mukti Yuva",
  "Internship In Police Department",
  "Volunteer For Viksit Bharat",
];

const PopularTags = ({ onSelectTag }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-4 mb-4 flex flex-wrap items-center gap-3"
    >
      <span className="text-[13px] font-bold uppercase tracking-wider text-[#2D3748] mr-1">
        POPULAR:
      </span>

      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectTag?.(tag);
          }}
          className="
            flex
            h-[36px]
            items-center
            rounded-[10px]
            bg-[#E8F5EC]
            px-4
            text-[13px]
            font-medium
            text-[#2B6E4F]
            hover:bg-[#DCF0E2]
            transition-colors
            cursor-pointer
          "
        >
          <TrendingUp className="w-4 h-4 mr-2 text-[#2B6E4F] shrink-0" />

          {tag}
        </button>
      ))}
    </motion.div>
  );
};

export default PopularTags;
