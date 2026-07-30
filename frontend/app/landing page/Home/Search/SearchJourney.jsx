"use client";

import { motion } from "framer-motion";
import useSearchJourney from "./useSearchJourney";
import SearchCard from "./SearchCard";

const SearchJourney = () => {
  const animation = useSearchJourney();

  return (
    <section className="relative h-[220vh] bg-[#EEF0FF]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{
            opacity: animation.heroOpacity,
            y: animation.heroY,
          }}
          className="absolute inset-0"
        >
          {/* Hero */}
        </motion.div>

        <motion.div
          style={{
            opacity: animation.characterOpacity,
            y: animation.characterY,
            scale: animation.characterScale,
          }}
          className="absolute bottom-0"
        >
          {/* Character */}
        </motion.div>

        <motion.div
          style={{
            y: animation.searchY,
            scale: animation.searchScale,
          }}
          className="relative z-20 w-full flex justify-center px-8"
        >
          <SearchCard
            cardHeight={animation.cardHeight}
            dividerOpacity={animation.dividerOpacity}
            recentsOpacity={animation.recentsOpacity}
            recentsY={animation.recentsY}
            inputHeight={animation.inputHeight}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SearchJourney;