"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const StepsCard = ({
  number,
  step,
  title,
  description,
  button,
  link,
  image,
  color,
  zIndex,
}) => {
  return (
    <div
  className="relative"
  style={{ zIndex }}
>
      <div
        className="
          relative
          mx-auto
          h-auto
          lg:h-[320px]
          w-full
          max-w-[1340px]
          rounded-[24px]
          sm:rounded-[30px]
          p-4
          sm:p-6
          lg:p-[30px]
          shadow-[0_18px_70px_rgba(0,0,0,0.25)]
        "
        style={{ backgroundColor: color }}
      >
        
        {/* Left Step Tab */}

        <div
          className="
            hidden
            sm:block
            absolute
            left-0
            top-0
            h-full
            w-[80px]
            lg:w-[100px]
            rounded-l-[23px]
          "
        >
          {/* Top Number */}

          <div
            className="
              absolute
              top-[-40px]
              left-0
              flex
              h-[60px]
              lg:h-[70px]
              w-full
              items-center
              justify-center
              rounded-t-[20px]
              rounded-br-[18px]
            "
            style={{ backgroundColor: color }}
          >
            <span
              className="
                text-[14px]
                lg:text-[15px]
                font-bold
                text-white
              "
            >
              {number}
            </span>
          </div>

          {/* Vertical Step */}

          <div
            className="
              flex
              h-full
              items-center
              justify-center
            "
          >
            <span
              className="
                rotate-[-90deg]
                whitespace-nowrap
                text-[16px]
                lg:text-[20px]
                font-semibold
                text-white
              "
            >
              {step}
            </span>
          </div>
        </div>

        {/* White Card */}

        <div
          className="
            ml-0
            sm:ml-[45px]
            lg:ml-[55px]
            flex
            flex-col
            md:flex-row
            h-full
            items-start
            md:items-center
            justify-between
            rounded-[18px]
            bg-[#F4F5FF]
            p-5
            sm:px-8
            py-6
          "
        >
          {/* Left */}

          <div className="max-w-[560px]">
            <span className="inline-block sm:hidden text-[12px] font-bold uppercase tracking-wider text-[#6656D9] mb-1">
              Step {number}
            </span>
            <h3
              className="
                text-[22px]
                sm:text-[26px]
                lg:text-[30px]
                font-bold
                leading-tight
                lg:leading-[37px]
                text-[#111827]
              "
            >
              {title}
            </h3>

            <p
              className="
                mt-2
                text-[12px]
                sm:text-[13px]
                leading-[18px]
                sm:leading-[20px]
                text-[#4B5563]
              "
            >
              {description}
            </p>

            <a
              href={link || "#"}
              target={link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="
                mt-5
                sm:mt-9
                inline-flex
                items-center
                gap-3
                sm:gap-5
                rounded-full
                bg-[#374151]
                px-4
                sm:px-5
                py-2
                sm:py-2.5
                text-[13px]
                sm:text-[14px]
                font-semibold
                text-white
                shadow-[0_3px_0_#1F2937]
                transition-transform
                hover:scale-105
                cursor-pointer
              "
            >
              {button}

              <ArrowRight
                size={18}
                strokeWidth={2.3}
              />
            </a>
          </div>

          {/* Right */}

          <Image
            src={image}
            alt={title}
            priority
            className="
              h-[130px]
              sm:h-[160px]
              lg:h-[185px]
              w-auto
              object-contain
              select-none
              mt-4
              md:mt-0
              self-center
              md:self-auto
            "
          />
        </div>
      </div>
    </div>
  );
};

export default StepsCard;
