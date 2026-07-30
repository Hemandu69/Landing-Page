"use client";

import { useState } from "react";
import { HERO_STATES } from "./heroState";

const useHeroState = () => {
  const [heroState, setHeroState] = useState(
    HERO_STATES.DEFAULT
  );

  return {
    heroState,
    setHeroState,
  };
};

export default useHeroState;