"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mic, ArrowRight, X } from "lucide-react";
import AnimatedPlaceholder from "./AnimatedPlaceholder";

const SearchBar = ({ startTimeline, closeTimeline, expanded }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const startOnSearchAreaClick = () => {
    startTimeline();
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={startOnSearchAreaClick}
      className="hero-search-bar relative flex h-[50px] lg:h-[54px] cursor-text items-center rounded-[20px] border border-[#AEB1FF] bg-[#E5EAFC] px-4 lg:px-6 shadow-sm transition-all"
    >
      <div className="flex shrink-0 items-center mr-3">
        <Search
          size={20}
          className="text-gray-600"
        />
      </div>

      <div className="relative min-w-0 flex-1 flex items-center self-stretch h-full">
        <AnimatedPlaceholder visible={!query} />
        <motion.input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search opportunities"
          animate={{ fontSize: 16 }}
          transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 h-full w-full cursor-text bg-transparent font-normal text-[#111827] outline-none text-[15px] lg:text-[16px] leading-[22px]"
        />
      </div>

      <AnimatePresence>
        {query && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleClear}
            className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ECEFF7]"
          >
            <X size={15} className="text-gray-600" />
          </motion.button>
        )}
      </AnimatePresence>

      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-black/5"
      >
        <Mic size={18} className="text-gray-600" />
      </button>

      {/* Close X Cross Button when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              closeTimeline?.();
            }}
            title="Close search"
            aria-label="Close search"
            className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200/90 text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <X size={18} strokeWidth={2.2} />
          </motion.button>
        )}
      </AnimatePresence>

      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="flex h-[38px] shrink-0 items-center justify-center rounded-[14px] bg-[#6656D9] px-6 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(102,86,217,0.28)] transition-all hover:bg-[#5848C7] active:scale-[0.98]"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
