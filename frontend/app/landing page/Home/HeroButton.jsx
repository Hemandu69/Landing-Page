"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO_STATES } from "./heroState";

const HeroButtons = ({ heroState }) => {
  const visible = heroState === HERO_STATES.DEFAULT;

  return (
    <div className="min-h-[88px]">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            layout
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.82,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-3
              flex
              justify-center
              gap-4
            "
          >
            <motion.button
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
                delay: 0,
              }}
              className="
                group
                flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-white
                px-8
                py-4
                text-[17px]
                font-semibold
                text-[#2B3648]
                shadow-[0_8px_24px_rgba(15,23,42,0.06)]
                transition-all
                duration-300
                hover:bg-[#6656D9]
                hover:text-white
                hover:border-[#6656D9]
                hover:shadow-[0_14px_35px_rgba(102,86,217,0.30)]
                cursor-pointer
              "
            >
              Explore Opportunities

              <motion.div
                className="flex items-center"
                initial={false}
                whileHover={{
                  x: 4,
                }}
              >
                <ArrowRight
                  size={20}
                  strokeWidth={2.5}
                />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
                delay: 0.05,
              }}
              className="
                rounded-full
                border
                border-gray-200
                bg-white
                px-8
                py-4
                text-[17px]
                font-semibold
                text-[#2B3648]
                shadow-[0_8px_24px_rgba(15,23,42,0.06)]
                transition-all
                duration-300
                hover:bg-[#6656D9]
                hover:text-white
                hover:border-[#6656D9]
                hover:shadow-[0_14px_35px_rgba(102,86,217,0.30)]
                cursor-pointer
              "
            >
              Learn More
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroButtons;