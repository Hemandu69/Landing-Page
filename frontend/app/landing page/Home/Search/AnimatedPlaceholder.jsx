"use client";

import { useEffect, useState } from "react";

const placeholders = [
  "Sports Events Near Me",
  "Volunteer Opportunities",
  "AI Internship",
  "Hackathons in Delhi",
  "Government Schemes",
  "Skill Development Programs",
  "Career Guidance",
];

const TYPING_SPEED = 65;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPING = 1800;
const PAUSE_AFTER_DELETING = 300;

const AnimatedPlaceholder = ({ visible }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => setText(""), 0);
      return () => clearTimeout(timeout);
    }

    const current = placeholders[index];
    let timeout;

    if (!isDeleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPING);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, DELETING_SPEED);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((previous) => (previous + 1) % placeholders.length);
      }, PAUSE_AFTER_DELETING);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center overflow-hidden">
      <span className="whitespace-nowrap text-[15px] lg:text-[16px] leading-[22px] font-normal text-gray-500">
        {text}
      </span>
      <span className="ml-[2px] animate-pulse text-[15px] lg:text-[16px] text-gray-500">|</span>
    </div>
  );
};

export default AnimatedPlaceholder;
