"use client";

import { motion } from "framer-motion";

const FloatingCard = ({
  title,
  subtitle,
  icon,
  className = "",
  duration = 4,
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-[#E8ECF5]
        bg-white/90
        px-5
        py-4
        shadow-[0_20px_40px_rgba(15,23,42,0.08)]
        backdrop-blur-md
        ${className}
      `}
    >
      <div className="text-3xl">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-[#1F2937]">
          {title}
        </h3>

        <p className="text-sm text-[#6B7280]">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default FloatingCard;