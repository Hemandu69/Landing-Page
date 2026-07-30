"use client";

import { useScroll, useTransform } from "framer-motion";

const useSearchJourney = () => {
  const { scrollYProgress } = useScroll();

  return {
    heroOpacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
    heroY: useTransform(scrollYProgress, [0, 0.15], [0, -120]),

    characterOpacity: useTransform(scrollYProgress, [0.08, 0.25], [1, 0]),
    characterY: useTransform(scrollYProgress, [0.08, 0.25], [0, 120]),
    characterScale: useTransform(scrollYProgress, [0.08, 0.25], [1, 0.9]),

    searchY: useTransform(scrollYProgress, [0.15, 0.45], [0, -220]),
    searchScale: useTransform(scrollYProgress, [0.15, 0.45], [1, 0.82]),

    cardHeight: useTransform(scrollYProgress, [0.45, 0.7], [185, 470]),

    inputHeight: useTransform(scrollYProgress, [0.45, 0.7], [70, 150]),

    recentsOpacity: useTransform(scrollYProgress, [0.62, 0.72], [0, 1]),

    recentsY: useTransform(scrollYProgress, [0.62, 0.72], [30, 0]),

    dividerOpacity: useTransform(scrollYProgress, [0.58, 0.65], [0, 1]),
  };
};

export default useSearchJourney;