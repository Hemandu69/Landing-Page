"use client";

import { useState, useEffect, useCallback } from "react";

export function useOtpTimer(initialSeconds: number = 120) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanResend(true);
      return;
    }

    setCanResend(false);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const resetTimer = useCallback((newSeconds?: number) => {
    setSecondsLeft(newSeconds !== undefined ? newSeconds : initialSeconds);
    setCanResend(false);
  }, [initialSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  return {
    secondsLeft,
    formattedTime,
    canResend,
    resetTimer,
  };
}
