"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SearchGuy from "../Assets/SearchGuy.png";
import SearchBar from "./SearchBar";
import PopularTags from "./PopularTags";
import SearchRecentList from "./SearchRecentList";
import SearchDropdown from "./SearchDropdown";

const SearchCard = ({ startTimeline, triggerSearch, closeTimeline, showResults, setShowResults, expanded }) => (
  <div className="hero-search-card relative mx-auto w-full max-w-[1240px] xl:max-w-[1320px] border-[6px] lg:border-[8px] border-[#58B98C] rounded-[24px] lg:rounded-[28px] bg-white shadow-[0_12px_32px_rgba(21,26,57,0.06)]">
    {/* Green Search Tab protruding top-left */}
    <div className="absolute left-0 top-0 -translate-y-full">
      <div className="flex h-[44px] sm:h-[48px] items-center justify-center rounded-t-[18px] rounded-b-none bg-[#58B98C] px-5 sm:px-6">
        <span className="text-[15px] sm:text-[16px] font-semibold text-white">Search</span>
      </div>
    </div>

    {/* Search Guy attached to top-right corner when expanded matching Figma */}
    <AnimatePresence>
      {expanded && (
        <motion.div
          key="search-guy"
          initial={{ opacity: 0, scale: 0.7, x: -180, y: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, x: -180, y: 30 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -right-[100px] lg:-right-[118px] xl:-right-[126px] -top-[160px] lg:-top-[190px] xl:-top-[210px] -z-10 hidden lg:block pointer-events-none"
        >
          <Image
            src={SearchGuy}
            alt="Search Character"
            width={700}
            height={550}
            priority
            draggable={false}
            className="h-auto w-[200px] lg:w-[250px] xl:w-[280px] select-none"
          />
        </motion.div>
      )}
    </AnimatePresence>

    <div className="relative z-20 flex h-full flex-col p-4 sm:p-6 lg:p-7">
      <SearchBar
        startTimeline={startTimeline}
        triggerSearch={triggerSearch}
        closeTimeline={closeTimeline}
        showResults={showResults}
        setShowResults={setShowResults}
        expanded={expanded}
      />

      <AnimatePresence>
        {!showResults && (
          <motion.div
            key="popular-tags-wrapper"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <PopularTags onSelectTag={() => triggerSearch?.()} />
          </motion.div>
        )}
      </AnimatePresence>

      {expanded && (
        <div className="hero-search-reveal flex flex-col">
          <div className="my-3 border-t border-[#E6E8F3]" />

          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div
                key="results-phase"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <SearchDropdown heroState="results" />

                {/* Pagination Controls inside the Card */}
                <div className="mt-6 mb-2 flex items-center justify-center gap-2 sm:gap-3 text-[13px] sm:text-[14px]">
                  <button type="button" className="font-semibold text-[#6656D9] hover:underline cursor-pointer flex items-center gap-1">
                    ← Back
                  </button>
                  <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#6656D9] font-bold text-white shadow-xs">
                    01
                  </span>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-700 hover:bg-gray-100 hover:text-[#6656D9] font-medium cursor-pointer">
                    02
                  </button>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-700 hover:bg-gray-100 hover:text-[#6656D9] font-medium cursor-pointer">
                    03
                  </button>
                  <span className="px-1 text-gray-400 font-medium">…</span>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-700 hover:bg-gray-100 hover:text-[#6656D9] font-medium cursor-pointer">
                    12
                  </button>
                  <button type="button" className="font-semibold text-[#6656D9] hover:underline cursor-pointer flex items-center gap-1">
                    Next →
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="recents-phase"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <SearchRecentList onSelectRecent={() => triggerSearch?.()} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  </div>
);

export default SearchCard;
