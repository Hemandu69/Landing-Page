"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Calendar,
  Clock3,
  MapPin,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import FirstEvent from "./assets/first.png";
import SecondEvent from "./assets/sec.png";
import ThirdEvent from "./assets/third.png";
import FourthEvent from "./assets/fourth.png";

import ViewAllButton from "./assets/right.svg";

const events = [
  {
    id: 1,
    theme: "#6F63FF",
    tabTitle: "Nasha Mukt Bharat\nAwareness Drive",
    title: "Nasha Mukt Bharat Awareness Drive",
    description:
      "Youth volunteers and communities come together to spread awareness about substance abuse prevention and inspire positive lifestyle choices.",

    date: "7 July 2026",
    time: "6:00 pm - 9:00 pm",
    location: "Pragati Maidan, New Delhi",

    image: FirstEvent,
  },

  {
    id: 2,
    theme: "#B24AC8",
    tabTitle: "Clean India Green India\nCampaign",
    title: "Clean Energy Workshop",

    description:
      "Experts and enthusiasts gather to discuss renewable energy solutions and practical steps towards sustainable living.",

    date: "15 August 2026",
    time: "10:00 am - 4:00 pm",
    location: "IIT Bombay, Mumbai",

    image: SecondEvent,
  },

  {
    id: 3,
    theme: "#39A578",

    tabTitle: "Digital Literacy\nWorkshop",

    title: "Digital Literacy Camp",

    description:
      "Volunteers teach basic computer skills and internet safety to underprivileged youth and senior citizens.",

    date: "22 September 2026",

    time: "9:00 am - 3:00 pm",

    location: "Community Hall, Chennai",

    image: ThirdEvent,
  },

  {
    id: 4,

    theme: "#E9B53C",

    tabTitle: "Water Conservation\nRally",

    title: "Urban Gardening Initiative",

    description:
      "Neighborhood residents collaborate to create green spaces and promote urban agriculture for healthier communities.",

    date: "5 October 2026",

    time: "8:00 am - 12:00 pm",

    location: "Central Park, Bengaluru",

    image: FourthEvent,
  },
];

const Event = () => {
  const [active, setActive] = useState(0);

  const current = events[active];

  /* ================= Auto Slide ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % events.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setActive((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActive((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-[#ECEBFA]">
      <section className="w-full overflow-hidden rounded-b-[32px] sm:rounded-b-[40px] lg:rounded-b-[48px] bg-[#261F47] px-4 sm:px-6 py-12 sm:py-16 lg:py-20">

      <div
        className="
          relative
          mx-auto
          max-w-[1280px]
        "
      >

        <div className="mt-0">

          <div className="flex items-start justify-between gap-6 sm:gap-10">

            <div>

              <h2 className="text-[26px] sm:text-[36px] lg:text-[45px] font-bold leading-tight lg:leading-[60px] tracking-[-0.03em] text-white">
                Events You Shouldn't Miss
              </h2>

              <p className="mt-2 max-w-[1000px] text-[13px] sm:text-[15px] leading-[18px] sm:leading-[20px] mb-5 sm:mb-7 text-white/80">
                From national campaigns and youth festivals to workshops,
                webinars, discover events that bring young people together to
                learn, connect, and contribute.
              </p>

            </div>

            <Image
              src={ViewAllButton}
              alt="View All"
              priority
              className="w-[40px] sm:w-[50px] shrink-0"
            />

          </div>

          <div
            className="mx-0 sm:mx-2.5 rounded-[24px] p-3 sm:p-[14px] pb-8 sm:pb-[72px] transition-all duration-500"
            style={{ backgroundColor: current.theme }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 rounded-[20px] bg-[#F6F5FF] p-4 sm:px-8 lg:px-10 py-4">

              <div className="flex h-auto lg:h-[320px] flex-col justify-between">

                <div>

                  <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold leading-tight sm:leading-[30px] text-[#111827]">
                    {current.title}
                  </h3>

                  <p className="mt-2 sm:mt-3 min-h-0 lg:min-h-[78px] max-w-[530px] text-[14px] sm:text-[17px] leading-[20px] sm:leading-[25px] text-[#6B7280]">
                    {current.description}
                  </p>

                  <div className="mt-4 h-px w-full bg-[#D7DAE2]" />

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] sm:text-[16px]">

                    <div className="flex items-center gap-2 text-[#374151]">
                      <Calendar size={18} strokeWidth={2} />
                      <span>{current.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#374151]">
                      <Clock3 size={18} strokeWidth={2} />
                      <span>{current.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#374151]">
                      <MapPin size={18} strokeWidth={2} />
                      <span>
                        {current.location}
                      </span>
                    </div>

                </div>

                <button
                  className="
                    mt-6
                    lg:mt-20
                    inline-flex
                    h-[42px]
                    sm:h-[48px]
                    w-fit
                    items-center
                    gap-3
                    sm:gap-4
                    rounded-full
                    bg-[#374151]
                    px-5
                    sm:px-6
                    text-[14px]
                    sm:text-[16px]
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#1F2937]
                  "
                >
                  View Details

                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                  />

                </button>

                </div>

              </div>

              <div className="flex items-center justify-center">

                <Image
                  key={active}
                  src={current.image}
                  alt={current.title}
                  priority
                  className="
                    h-[200px]
                    sm:h-[280px]
                    lg:h-[320px]
                    w-full
                    rounded-[18px]
                    object-cover
                    transition-all
                    duration-500
                  "
                />

              </div>

          </div>

          </div>

          <div className="relative z-10 mt-4 lg:-mt-[38px] grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 px-0">

            {events.map((event, index) => {

              const isActive = active === index;

              return (
                <button
                  key={event.id}
                  onClick={() => setActive(index)}
                  className="
                    h-auto
                    sm:h-[116px]
                    rounded-[18px]
                    border-2
                    sm:border-4
                    px-3
                    sm:px-5
                    py-3
                    sm:py-4
                    flex
                    flex-col
                    justify-center
                    text-left
                    transition-all
                    duration-300
                  "
                  style={{
                    borderColor: "#5B45D4",
                    borderWidth: isActive ? 5 : 4,
                    backgroundColor: isActive ? "white" : "#43347D",
                    color: isActive ? "#111827" : "white",
                    boxShadow: isActive
                      ? "0 10px 22px rgba(22, 16, 57, 0.22)"
                      : "0 6px 14px rgba(22, 16, 57, 0.16)",
                  }}
                >
                  <p
                    className="text-[11px] sm:text-[14px] uppercase"
                    style={{ color: isActive ? "#6B7280" : "rgba(255,255,255,0.7)" }}
                  >
                    EVENT {event.id}
                  </p>

                  <p className="mt-1 sm:mt-3 whitespace-pre-line text-[13px] sm:text-[18px] font-semibold leading-snug sm:leading-[28px] line-clamp-2">
                    {event.tabTitle}
                  </p>

                </button>
              );
            })}

          </div>

          <div className="relative mt-6 h-14">

            <button
              onClick={previousSlide}
              className="
                absolute
                left-0
                top-1/2
                flex
                h-10
                w-10
                sm:h-14
                sm:w-14
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#374151]
                transition-all
                duration-300
                hover:scale-105
              "
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>

            <div className="absolute left-1/2 top-1/2 h-[6px] w-[160px] sm:w-[320px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white/20">

              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{
                  width: `${((active + 1) / events.length) * 100}%`,
                }}
              />

            </div>

            <button
              onClick={nextSlide}
              className="
                absolute
                right-0
                top-1/2
                flex
                h-10
                w-10
                sm:h-14
                sm:w-14
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#374151]
                transition-all
                duration-300
                hover:scale-105
              "
            >
              <ArrowRight size={22} strokeWidth={2.5} />
            </button>
          </div>

        </div>

      </div>

    </section>
  </div>
);
};

export default Event;
