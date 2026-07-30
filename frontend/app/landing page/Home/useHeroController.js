"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HERO_STATES } from "./heroState";

const useHeroController = () => {
  const [heroState, setHeroState] = useState(HERO_STATES.DEFAULT);
  const [showResults, setShowResults] = useState(false);
  const scope = useRef(null);
  const timeline = useRef(null);
  const context = useRef(null);

  useLayoutEffect(() => () => context.current?.revert(), []);

  const startTimeline = useCallback(() => {
    if (heroState !== HERO_STATES.DEFAULT) return;

    setHeroState(HERO_STATES.TRANSITIONING);

    context.current?.revert();
    context.current = gsap.context(() => {
      const section = ".hero-search-section";
      const width = ".hero-search-width";
      const reveals = ".hero-search-reveal";

      timeline.current = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1.2 },
        onComplete: () => {
          setHeroState(HERO_STATES.EXPANDED);
          // Keep showResults = false so Phase 1 (RECENTS state) stays STABLE!
        },
        onReverseComplete: () => {
          setShowResults(false);
          gsap.set([section, width], { clearProps: "all" });
          setHeroState(HERO_STATES.DEFAULT);
        },
      });

      timeline.current
        .to(section, { y: -36, duration: 1.2, ease: "power2.out" }, 0)
        .to(width, { maxWidth: 1280, duration: 1.2, ease: "power2.out" }, 0)
        .fromTo(
          reveals,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          0.4
        );
    }, scope);
  }, [heroState]);

  const triggerSearch = useCallback(() => {
    if (heroState === HERO_STATES.DEFAULT) {
      startTimeline();
    }
    setShowResults(true);
  }, [heroState, startTimeline]);

  const closeTimeline = useCallback(() => {
    if (timeline.current) {
      setShowResults(false);
      timeline.current.duration(1.2).reverse();
    } else {
      setHeroState(HERO_STATES.DEFAULT);
      setShowResults(false);
    }
  }, []);

  return { heroState, showResults, setShowResults, scope, startTimeline, triggerSearch, closeTimeline };
};

export default useHeroController;
