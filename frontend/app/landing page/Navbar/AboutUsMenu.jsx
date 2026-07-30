"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const aboutItems = [
  "About MY Bharat",
  "Public Dashboard",
];

const AboutUsMenu = ({ isOpen, onClose, triggerRef }) => {
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
      aria-label="About Us Menu"
      aria-modal="false"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute right-0 lg:left-0 top-[calc(100%+12px)] z-50 w-[260px] overflow-hidden rounded-[24px] border border-gray-200/90 bg-[#F8F9FE] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
    >
      <div className="flex flex-col gap-4">
        {aboutItems.map((item) => (
          <a
            key={item}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="text-[16px] font-semibold text-[#1F2937] transition-colors hover:text-[#6656D9]"
          >
            {item}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutUsMenu;
