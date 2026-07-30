"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const NewsCard = ({
  theme,
  title,
  subtitle,
  event,
  image1,
  image2,
  image1Class,
  image2Class,
}) => {
  return (
    <div
      className="
        flex-shrink-0
        w-[320px]
        rounded-[20px]
        bg-[#6656D9]
        p-[13px]
        shadow-[0_12px_40px_rgba(0,0,0,0.18)]
      "
    >
      {/* Top Banner */}

      <div
        className="
          relative
          h-[325px]
          overflow-hidden
          rounded-[18px]
          border
          border-white/20
          px-2
          pt-5
        "
        style={{ backgroundColor: theme }}
      >
        {/* Title */}

        <h3
          className="
            whitespace-pre-line
            text-center
            text-[22px]
            font-bold
            leading-[22px]
            text-white
          "
        >
          {title}
        </h3>

        {/* Subtitle */}

        <p
          className="
            mt-1
            whitespace-pre-line
            text-center
            text-[12px]
            leading-[22px]
            text-white/90
          "
        >
          {subtitle}
        </p>

        {/* Images */}

        <div className="absolute inset-x-0 bottom-0 top-[85px]">
          <Image
            src={image1}
            alt=""
            className={`${image1Class} h-[130px] object-cover`}
          />

          <Image
            src={image2}
            alt=""
            className={`${image2Class} h-[142px] object-cover`}
          />
        </div>
      </div>

      {/* Bottom */}

      <div className="mt-5">
        <h4
          className="
            min-h-[60px]    
            text-[16px]
            font-medium
            leading-[20px]
            text-white
          "
        >
          {event}
        </h4>

        <button
          className="
            mt-8
            inline-flex
            items-center
            gap-3
            text-[16px]
            font-medium
            text-white
            transition-all
            hover:gap-5
          "
        >
          View Details

          <ArrowRight
            size={20}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;