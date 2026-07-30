"use client";

import Image from "next/image";
import {
  BriefcaseBusiness,
  Users,
  Lightbulb,
  BadgeCheck,
} from "lucide-react";

import BluePic from "./assets/BluePic.png";
import YellowPic from "./assets/YellowPic.png";
import GreenPic from "./assets/GreenPic.png";
import GetToKnowMore from "./assets/GetToKnowMore.svg";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Explore volunteering & experiential learning opportunities",
  },
  {
    icon: Users,
    title: "Connect with mentors, organizations & like-minded peers",
  },
  {
    icon: Lightbulb,
    title: "Build skills through leadership programs & national initiatives",
  },
  {
    icon: BadgeCheck,
    title: "Earn digital recognition and build your professional profile",
  },
];

const Yuva = () => {
  return (
    <div className="w-full bg-[#E2E5FD]">
      <section className="w-full overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] lg:rounded-t-[48px] bg-[#261F47] px-6 py-20">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8">

        {/* ================= Left Content ================= */}

        <div
          className="
            w-[770px]
            rounded-[25px]
            bg-[#E2E5FD]
            px-8
            py-11
            h-[430px]
          "
        >


          <h2
            className="
              text-[40px]
              font-bold
              leading-[35px]
              tracking-[-0.05em]
              text-[#111827]
              max-w-[620px]
              font-bold
            "
          >
            About Mera Yuva Bharat
          </h2>

          <p
            className="
              mt-5
              max-w-[640px]
              text-[14px]
              leading-[20px]
              text-[#4B5563]
            "
          >
            MY Bharat is the Government of India's technology-driven
            platform that empowers young people to learn, lead,
            serve, and create meaningful impact through opportunities
            that build skills, leadership, and real-world experience.
          </p>

          {/* ================= Feature Grid ================= */}

          <div className="mt-8 grid grid-cols-2 gap-6">

            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    flex
                    items-center
                    gap-5
                    rounded-[10px]
                    bg-[#1E293913]
                    px-5
                    py-4
                    h-[50px]
                    font-medium
                  "
                >

                  <div
                    className="
                      flex
                      h-7
                      w-6
                      shrink-0
                      items-center
                      justify-center
                     
                      
                    "
                  >
                    <Icon
                      size={22}
                      strokeWidth={2}
                      className="text-[#374151]"
                    />
                  </div>

                  <p
                    className="
                      text-[12px]
                      leading-[20px]
                      text-[#374151]
                    "
                  >
                    {item.title}
                  </p>

                </div>
              );
            })}
          </div>
                    {/* ================= CTA ================= */}

          <div className="mt-2">
            <a
              href="https://mybharat.gov.in/pages/about_mybharat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full transition-all duration-300 hover:scale-[1.05] hover:opacity-95 active:scale-[0.98] cursor-pointer mt-10 shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_25px_rgba(102,86,217,0.25)]"
            >
              <Image
                src={GetToKnowMore}
                alt="Get To Know More"
                priority
                className="w-[170px] h-auto object-contain"
              />
            </a>
          </div>

        </div>

        {/* ================= Right Illustration ================= */}

        <div
          className="
            relative
            h-[520px]
            w-[460px]
            shrink-0
          "
        >

          {/* Blue Card */}

          <div
            className="
              absolute
              left-8
              top-[100px]
              z-30
              flex
              h-[150px]
              w-[150px]
              items-center
              justify-center
              rounded-[20px]
              bg-[#6F63FF]
              shadow-[0_20px_40px_rgba(0,0,0,0.18)]
            "
          >
            <Image
              src={BluePic}
              alt="Handshake"
              priority
              className="w-[170px] h-auto object-contain"
            />
          </div>

          {/* Yellow Card */}

          <div
            className="
              absolute
              bottom-44
              left-[140px]
              z-10
              flex
              h-[150px]
              w-[150px]
              items-center
              justify-center
              rounded-[20px]
              bg-[#F2BB45]
              shadow-[0_20px_40px_rgba(0,0,0,0.18)]
            "
          >
            <Image
              src={YellowPic}
              alt="Certificate"
              priority
              className="w-[175px] h-auto object-contain"
            />
          </div>

          {/* Green Card */}

          <div
            className="
              absolute
              right-10
              top-[120px]
              z-20
              flex
              h-[150px]
              w-[150px]
              items-center
              justify-center
              rounded-[20px]
              bg-[#A6E1C0]
              shadow-[0_20px_40px_rgba(0,0,0,0.18)]
            "
          >
            <Image
              src={GreenPic}
              alt="Profile"
              priority
              className="w-[170px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Yuva;
