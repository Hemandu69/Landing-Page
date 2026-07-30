"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Internship from "./assets/Internship.png";
import Opportunity from "./assets/opportunity.png";
import Quiz from "./assets/Quiz.png";
import Events from "./assets/events.png";

import ViewAll from "./assets/ViewAll.svg";

const categories = [
  {
    id: 1,
    title: "Internships",
    description:
      "Gain hands-on experience with leading organizations and build skills that prepare you for your future career.",
    button: "Browse All Internships",
    image: Internship,
    background: "#3E996C",
  },
  {
    id: 2,
    title: "Volunteer Opportunities",
    description:
      "Contribute to meaningful causes, support your community, and make a positive impact through volunteering.",
    button: "Browse All Volunteer Opportunities",
    image: Opportunity,
    background: "#6264D9",
  },
  {
    id: 3,
    title: "Quiz & Essays",
    description:
      "Participate in engaging competitions to test your knowledge, express your ideas, and earn recognition.",
    button: "Browse All Quiz & Essays",
    image: Quiz,
    background: "#BC6AE8",
  },
  {
    id: 4,
    title: "Mega Events",
    description:
      "Join national campaigns, youth festivals, workshops, and large-scale events that inspire learning and collaboration.",
    button: "Browse All Mega Events",
    image: Events,
    background: "#F2BB45",
  },
];

const Category = () => {
  return (
    <section className="w-full bg-[#E2E5FD] py-[90px] px-6">
      <div className="mx-auto max-w-[1280px]">
        {/* ================= Header ================= */}

        <div className="flex items-start justify-between">
          <div>
            <h2
              className="
                text-[40px]
                font-bold
                leading-[50px]
                tracking-[-0.03em]
                text-[#111827]
              "
            >
              Explore By Category
            </h2>

            <p
              className="
                mt-0
                max-w-[900px]
                text-[16px]
                leading-[25px]
                text-[#374151]
              "
            >
              Find internships, volunteering, events, competitions, learning
              programs and career opportunities, all in one place.
            </p>
          </div>

          <button
  className="
    flex
    h-[56px]
    w-[148px]
    items-center
    justify-center
    gap-3
    rounded-full
    border-2
    border-[#3F4A5A]
    bg-white
    text-[18px]
    font-semibold
    text-[#3F4A5A]
    shadow-[0_2px_0_#3F4A5A]
    transition-all
    duration-200
    hover:translate-y-[1px]
    hover:shadow-[0_2px_0_#3F4A5A]
  "
>
  View All
  <ArrowRight size={20} strokeWidth={2.3} />
</button>
        </div>

        {/* ================= Category Grid ================= */}

        <div className="mt-8 grid grid-cols-2 gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: item.background }}
              className="
    relative
    h-[255px]
    overflow-hidden
    rounded-[20px]
    p-[14px]
  "
            >
              {/* White Content Card */}

              <div
                className="
      relative
      z-8
      flex
      h-full
      w-[54%]
      flex-col
      rounded-[18px]
      bg-white
      px-7
      py-6
    "
              >
                <h3
                  className="
        text-[23px]
        font-bold
        leading-[10px]
        tracking-[-0.03em]
        text-[#111827]
      "
                >
                  {item.title}
                </h3>

                <p
                  className="
        mt-4
        max-w-[250px]
        text-[14px]
        leading-[20px]
        text-[#4B5563]
      "
                >
                  {item.description}
                </p>

                <button
                  className="
        mt-auto
        inline-flex
        items-center
        gap-2
        text-[14px]
        font-semibold
        text-[#111827]
        transition-all
        duration-300
        hover:gap-3
      "
                >
                  {item.button}
                  <ArrowRight size={20} strokeWidth={2.2} />
                </button>
              </div>

              {/* Right Illustration */}

              <div
                className="
      absolute
      right-2
      bottom-0
      flex
      h-full
      w-[43%]
      items-end
      justify-center
      overflow-hidden
    "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  priority
                  className="
        h-[245px]
        w-auto
        object-contain
        select-none
        pointer-events-none
      "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;

