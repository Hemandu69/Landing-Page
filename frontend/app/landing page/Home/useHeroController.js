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
    if (heroState === HERO_STATES.EXPANDED) {
      setShowResults(true);
      return;
    }

    if (heroState !== HERO_STATES.DEFAULT) return;

    setHeroState(HERO_STATES.TRANSITIONING);

    context.current?.revert();
    context.current = gsap.context(() => {
      const section = ".hero-search-section";
      const width = ".hero-search-width";
      const card = ".hero-search-card";
      const bar = ".hero-search-bar";
      const reveals = ".hero-search-reveal";

      timeline.current = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 0.8 },
        onComplete: () => setHeroState(HERO_STATES.EXPANDED),
        onReverseComplete: () => {
          setShowResults(false);
          gsap.set([section, width, card, bar], { clearProps: "all" });
          setHeroState(HERO_STATES.DEFAULT);
        },
      });

      timeline.current
        .to(section, { y: -66 }, 0)
        .to(width, { maxWidth: 1160 }, 0)
        .to(card, { height: "clamp(500px, 36.6vw, 750px)", borderRadius: 30 }, 0)
        .to(bar, { height: "clamp(160px, 12vw, 240px)", borderRadius: 22 }, 0)
        .fromTo(reveals, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08 }, 0.25);
    }, scope);
  }, [heroState]);

  const closeTimeline = useCallback(() => {
    if (timeline.current) {
      setShowResults(false);
      timeline.current.timeScale(1.3).reverse();
    }
  }, []);

  return { heroState, showResults, scope, startTimeline, closeTimeline };
};

export default useHeroController;
