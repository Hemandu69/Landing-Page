"use client";

import HeroBackground from "./HeroBaground";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButton";
import HeroCharacters from "./HeroCharacter";
import Search from "./Search/SearchSection";
import { HERO_STATES } from "./heroState";
import useHeroController from "./useHeroController";

const Hero = () => {
  const { heroState, showResults, scope, startTimeline, closeTimeline } = useHeroController();
  const searchOpen = heroState !== HERO_STATES.DEFAULT;

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-[#E2E5FD] pb-10 lg:pb-14 transition-all duration-300"
    >
      <HeroBackground />

      <div className="relative z-40">
        <HeroContent heroState={heroState} />
        <HeroButtons heroState={heroState} />
        <HeroCharacters heroState={heroState} />
      </div>

      <Search
        heroState={heroState}
        startTimeline={startTimeline}
        closeTimeline={closeTimeline}
        showResults={showResults}
      />
    </section>
  );
};

export default Hero;
