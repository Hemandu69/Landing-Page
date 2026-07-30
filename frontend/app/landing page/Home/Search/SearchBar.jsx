"use client";

import { useRef, useState } from "react";
import { Search, Mic, X } from "lucide-react";
import AnimatedPlaceholder from "./AnimatedPlaceholder";

const SearchBar = ({
  startTimeline,
  triggerSearch,
  closeTimeline,
  showResults,
  setShowResults,
  expanded,
}) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const handleBarClick = () => {
    if (!expanded) {
      startTimeline?.();
    } else if (!showResults) {
      // If already in Phase 1 (Recents View), clicking search bar transitions to Phase 3 (Results View)!
      triggerSearch?.();
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (showResults) {
      // If showing search results (State 3), X button clears query and goes back to State 2 (Recents View)
      setQuery("");
      setShowResults?.(false);
    } else {
      // If already in State 2 (Recents View), X button closes the expanded search bar back to State 1 (Default Hero)
      setQuery("");
      closeTimeline?.();
    }
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
    if (!expanded) {
      startTimeline?.();
    } else {
      triggerSearch?.();
    }
  };

  const handleInputChange = (event) => {
    const val = event.target.value;
    setQuery(val);
    if (!expanded) {
      startTimeline?.();
    }
    if (val.trim().length > 0) {
      setShowResults?.(true);
    } else {
      setShowResults?.(false);
    }
  };

  return (
    <div
      onClick={handleBarClick}
      className="hero-search-bar relative flex h-[50px] lg:h-[54px] cursor-text items-center rounded-[20px] border border-[#AEB1FF] bg-[#E5EAFC] px-4 lg:px-6 shadow-sm transition-all"
    >
      <div className="flex shrink-0 items-center mr-3">
        <Search size={20} className="text-[#6656D9]" />
      </div>

      <div className="relative min-w-0 flex-1 flex items-center self-stretch h-full">
        <AnimatedPlaceholder visible={!query} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              triggerSearch?.();
            }
          }}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search opportunities"
          className="relative z-10 h-full w-full cursor-text bg-transparent font-normal text-[#111827] outline-none text-[15px] lg:text-[16px] leading-[22px]"
        />
      </div>

      {/* Mic Icon */}
      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        aria-label="Voice search"
        className="mr-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-black/5 cursor-pointer"
      >
        <Mic size={18} className="text-gray-600" />
      </button>

      {/* Functional X Close/Clear Button */}
      {(query || expanded) && (
        <button
          type="button"
          onClick={handleClose}
          title="Close search"
          aria-label="Close search"
          className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#DCE1F7] text-gray-700 hover:bg-[#CBD2F2] transition-colors cursor-pointer"
        >
          <X size={16} strokeWidth={2.2} />
        </button>
      )}

      {/* Search Button */}
      <button
        type="button"
        onClick={handleSearchClick}
        className="flex h-[38px] shrink-0 items-center justify-center rounded-[14px] bg-[#6656D9] px-6 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(102,86,217,0.28)] transition-all hover:bg-[#5848C7] active:scale-[0.98] cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
