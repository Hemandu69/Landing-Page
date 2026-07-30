"use client";

import Image from "next/image";

import Button from "./Assets/ViewAll.svg";
import ArrowRight from "./Assets/arrow-right.png";

import Sneha from "./Assets/Sneha.png";
import Meera from "./Assets/Meera_Gupta.png";
import Rohan from "./Assets/Rohan_Patel.png";

const testimonials = [
  {
    image: Sneha,
    name: "Sneha Kapoor",
    role: "NSS · Jaipur",
    description:
      "MY Bharat helped me land a fellowship at MEITY. Today I'm building tools that touch a billion Indians. I've clocked 200+ volunteer hours through the platform. It changed how I see service to the nation.",
  },
  {
    image: Meera,
    name: "Meera Gupta",
    role: "MY Bharat Volunteer · Pune",
    description:
      '"MY Bharat helped me land a fellowship at MEITY. Today I\'m building tools that touch a billion Indians. It changed how I see service to the nation."',
  },
  {
    image: Rohan,
    name: "Rohan Patel",
    role: "BSG · Bangalore",
    description:
      '"Won the Youth Innovation Challenge and got seed funding for my agritech startup. All started here."',
  },
];

const Youth = () => {
  return (
    <section className="w-full bg-[#ECEBFA] py-12 sm:py-16 lg:py-[100px] px-4 sm:px-6">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 sm:gap-10">

        {/* ================= Header ================= */}

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">

          <div>

            <h2
              className="
                text-[28px]
                sm:text-[40px]
                lg:text-[52px]
                font-bold
                leading-tight
                lg:leading-[60px]
                tracking-[-0.02em]
                text-[#111827]
              "
            >
              Our impact, reflected through Youth
            </h2>

            <p
              className="
                mt-2
                text-[14px]
                sm:text-[18px]
                leading-[22px]
                sm:leading-[30px]
                text-[#374151]
              "
            >
              Discover how youth across India are creating meaningful impact.
            </p>

          </div>

          <Image
            src={Button}
            alt="View All"
            priority
            className="w-[90px] sm:w-[108px] h-auto object-contain shrink-0"
          />

        </div>

        {/* ================= Cards ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          {testimonials.map((item) => (
            <article
              key={item.name}
              className="
                h-auto
                lg:h-[270px]
                rounded-[28px]
                border-[3px]
                sm:border-[4px]
                border-[#A8ACFF]
                bg-white
                px-5
                sm:px-6
                py-5
                sm:py-4
              "
            >

              {/* Top */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3 sm:gap-4">

                  <Image
                    src={item.image}
                    alt={item.name}
                    priority
                    className="
                      h-[50px]
                      w-[50px]
                      sm:h-[60px]
                      sm:w-[60px]
                      rounded-[15px]
                      object-cover
                      shrink-0
                    "
                  />

                  <div>

                    <h3
                      className="
                        text-[15px]
                        sm:text-[16px]
                        font-semibold
                        leading-6
                        text-[#111827]
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        mt-0.5
                        sm:mt-1
                        text-[13px]
                        sm:text-[14px]
                        leading-5
                        text-[#4B5563]
                      "
                    >
                      {item.role}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="
                    mt-1
                    flex
                    h-[42px]
                    w-[42px]
                    sm:h-[48px]
                    sm:w-[48px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#374151]
                    cursor-pointer
                  "
                >
                  <Image
                    src={ArrowRight}
                    alt="Read Story"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                  />
                </button>
              </div>

              <p
                className="
                  mt-4
                  sm:mt-6
                  text-[13px]
                  sm:text-[15px]
                  leading-[20px]
                  sm:leading-7
                  text-[#1F2937]
                  line-clamp-4
                "
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Youth;
