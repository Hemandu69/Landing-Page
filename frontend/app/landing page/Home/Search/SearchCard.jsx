"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SearchGuy from "../Assets/SearchGuy.png";
import SearchBar from "./SearchBar";
import PopularTags from "./PopularTags";
import SearchRecentList from "./SearchRecentList";
import SearchDropdown from "./SearchDropdown";

const SearchCard = ({ startTimeline, closeTimeline, showResults, expanded }) => (
  <div className="hero-search-card relative mx-auto w-full max-w-[1240px] xl:max-w-[1320px] overflow-visible border-[6px] lg:border-[8px] border-[#58B98C] rounded-[24px] lg:rounded-[28px] bg-white shadow-[0_12px_32px_rgba(21,26,57,0.06)]">
    {/* Green Search Tab protruding top-left */}
    <div className="absolute left-0 top-0 -translate-y-full">
      <div className="flex h-[48px] items-center justify-center rounded-t-[18px] rounded-b-none bg-[#58B98C] px-6">
        <span className="text-[16px] font-semibold text-white">Search</span>
      </div>
    </div>

    {/* Search Guy attached to top-right corner when expanded matching Figma */}
    <AnimatePresence>
      {expanded && (
        <motion.div
          key="search-guy"
          initial={{ opacity: 0, scale: 0.65, x: -280, y: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.65, x: -280, y: 40 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -right-[110px] lg:-right-[118px] xl:-right-[126px] -top-[175px] lg:-top-[200px] xl:-top-[220px] -z-10 hidden lg:block pointer-events-none"
        >
          <Image
            src={SearchGuy}
            alt="Search Character"
            width={700}
            height={550}
            priority
            draggable={false}
            className="h-auto w-[220px] lg:w-[250px] xl:w-[280px] select-none"
          />
        </motion.div>
      )}
    </AnimatePresence>

    <div className="relative z-20 flex h-full flex-col p-5 lg:p-6">
      <SearchBar startTimeline={startTimeline} closeTimeline={closeTimeline} expanded={expanded} />
      <PopularTags />

      {expanded && (
        <>
          <div className="hero-search-reveal my-4 border-t border-[#E6E8F3]" />
          <div className="hero-search-reveal">
            {showResults ? (
              <>
                <SearchDropdown heroState="results" />
                <div className="mt-4 mb-1 flex items-center justify-center gap-3 text-[13px]">
                  <button type="button" className="font-medium text-[#6656D9] hover:underline">← Back</button>
                  <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#6656D9] font-semibold text-white">01</span>
                  <button type="button" className="flex h-8 w-8 items-center justify-center text-gray-700 hover:text-[#6656D9]">02</button>
                  <button type="button" className="flex h-8 w-8 items-center justify-center text-gray-700 hover:text-[#6656D9]">03</button>
                  <span className="px-1 text-gray-400">…</span>
                  <button type="button" className="flex h-8 w-8 items-center justify-center text-gray-700 hover:text-[#6656D9]">12</button>
                  <button type="button" className="font-medium text-[#6656D9] hover:underline">Next →</button>
                </div>
              </>
            ) : (
              <SearchRecentList />
            )}
          </div>
        </>
      )}
    </div>
  </div>
);

export default SearchCard;
