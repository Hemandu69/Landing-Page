"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import NewsCard from "./NewsCard";
import { newsData } from "./data";

const New = () => {
  const sliderRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const percentage =
      slider.scrollLeft /
      (slider.scrollWidth - slider.clientWidth);

    setProgress(percentage);
  };

  const scroll = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: direction === "left" ? -460 : 460,
      behavior: "smooth",
    });

    setTimeout(updateProgress, 350);
  };

  return (
    <section className="bg-[#E2E5FD] py-3">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}

        <div className="flex items-start justify-between px-22">
          <div>
            <h2
              className="
                text-[35px]
                font-bold
                leading-[30px]
                text-[#111827]
              "
            >
              What's New This Week
            </h2>

            <p
              className="
                mt-2
                text-[15px]
                text-[#374151]
              "
            >
              Stay updated with the latest campaigns,
              opportunities, and initiatives across MY Bharat.
            </p>
          </div>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-full
              border-1
              border-[#374151]
              bg-white
              px-3
              py-2
              shadow-lg
              shadow-black/20
              text-[16px]
              font-semibold
              text-[#374151]
              transition-all
              hover:bg-[#F7F7F7]
            "
          >
            View All

            <ArrowRight size={16} />
          </button>
        </div>

        {/* Cards */}

        <div
          ref={sliderRef}
          onScroll={updateProgress}
          className="
            mt-12
            flex
            gap-5
            overflow-x-auto
            px-22
            scroll-smooth
            scrollbar-hide
            overflow-x-auto
            no-scrollbar
          "
        >
          {newsData.map((item) => (
            <NewsCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
                {/* Bottom Navigation */}

        <div className="mt-14 flex items-center justify-between px-20">
          {/* Left Arrow */}

          <button
            onClick={() => scroll("left")}
            className="
              flex
              h-[40px]
              w-[40px]
              items-center
              justify-center
              rounded-full
              border-1
              border-[#374151]
              bg-white
              text-[#374151]
              transition-all
              hover:bg-[#F4F4F4]
            "
          >
            <ArrowLeft size={24} />
          </button>

          {/* Progress */}

          <div
            className="
              mx-100
              h-[6px]
              flex-1
              overflow-hidden
              rounded-full
              bg-[#D7DAF4]
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-[#6656D9]
                transition-all
                duration-300
              "
              style={{
                width: `${Math.max(progress * 100, 18)}%`,
              }}
            />
          </div>

          {/* Right Arrow */}

          <button
            onClick={() => scroll("right")}
            className="
              flex
              h-[40px]
              w-[40px]
              items-center
              justify-center
              rounded-full
              border-1
              border-[#374151]
              bg-white
              text-[#374151]
              transition-all
              hover:bg-[#F4F4F4]
            "
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default New;

