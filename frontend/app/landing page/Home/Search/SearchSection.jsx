"use client";

import SearchCard from "./SearchCard";
import { HERO_STATES } from "../heroState";

const SearchSection = ({ heroState, startTimeline, closeTimeline, showResults }) => (
  <section className="hero-search-section relative z-30 flex w-full justify-center px-4 pb-8 sm:px-8 lg:px-16">
    <div className="hero-search-width w-full max-w-[1640px]">
      <SearchCard
        heroState={heroState}
        startTimeline={startTimeline}
        closeTimeline={closeTimeline}
        showResults={showResults}
        expanded={heroState !== HERO_STATES.DEFAULT}
      />
    </div>
  </section>
);

export default SearchSection;
