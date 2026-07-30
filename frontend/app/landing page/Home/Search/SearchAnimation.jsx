"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const SearchAnimation = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
      "
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      >
        <Loader2
          size={52}
          className="text-[#6656D9]"
        />
      </motion.div>

      <h2
        className="
          mt-8
          text-[28px]
          font-semibold
          text-[#111827]
        "
      >
        Finding Opportunities...
      </h2>

      <p
        className="
          mt-3
          text-lg
          text-[#6B7280]
        "
      >
        Please wait while we search across thousands of opportunities.
      </p>
    </motion.div>
  );
};

export default SearchAnimation;