"use client";

import { useEffect, useState } from "react";

const useStickySearch = (enabled) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setSticky(false);
      return;
    }

    const onScroll = () => {
      setSticky(window.scrollY > 220);
    };

    window.addEventListener("scroll", onScroll);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return sticky;
};

export default useStickySearch;