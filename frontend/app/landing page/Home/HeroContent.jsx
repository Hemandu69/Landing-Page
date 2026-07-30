"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HERO_STATES } from "./heroState";

const transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

const HeroContent = ({ heroState }) => {
  const collapsed = heroState !== HERO_STATES.DEFAULT;

  return (
    <div
      className={`
        relative
        z-20
        mx-auto
        max-w-[1200px]
        text-center
        ${collapsed ? "min-h-[210px]" : "min-h-[180px]"}
      `}
    >
      <AnimatePresence mode="wait">
        {!collapsed ? (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={transition}
          >
            <h1
              className="
                mt-10
                text-[50px]
                font-bold
                leading-[50px]
                tracking-[-2px]
                text-[#111827]
              "
            >
              Discover Opportunities. Build
              <br />
              Skills.
              <span className="text-[#6656D9]">
                {" "}
                Shape India&apos;s Future.
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-2
                max-w-[800px]
                text-[20px]
                leading-[30px]
                text-[#4B5563]
              "
            >
              Find internships, volunteering, events, competitions, learning
              programs and career opportunities, all in one place.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={transition}
          >
            <h2
              className="
                mt-20
                text-[42px]
                font-bold
                leading-none
                tracking-[-1.8px]
                text-[#111827]
                sm:text-[54px]
                lg:text-[72px]
                xl:whitespace-nowrap
              "
            >
              What are you <span className="text-[#6656D9]">looking</span>{" "}
              for today?
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-[980px]
                text-[18px]
                leading-7
                text-[#596278]
                lg:text-[24px]
                lg:leading-9
              "
            >
              Explore internships, volunteer work, competitions, learning
              programs, scholarships, and more from a single intelligent
              search.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroContent;
