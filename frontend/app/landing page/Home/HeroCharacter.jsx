"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import AnimatedAll from "./Assets/AnimatedAll.png";
import { HERO_STATES } from "./heroState";

const characterTransition = {
  duration: 0.85,
  ease: [0.16, 1, 0.3, 1],
};

const HeroCharacters = ({ heroState }) => {
  const isDefault = heroState === HERO_STATES.DEFAULT;

  return (
    <div className="relative w-full">
      {/* Default Characters Group */}
      <AnimatePresence>
        {isDefault && (
          <motion.div
            key="group"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72 }}
            transition={characterTransition}
            style={{ transformOrigin: "bottom center" }}
            className="relative mx-auto mt-1 flex justify-center origin-bottom"
          >
            <Image
              src={AnimatedAll}
              alt="Hero Characters"
              width={800}
              height={600}
              priority
              draggable={false}
              className="select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroCharacters;
