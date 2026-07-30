"use client";

import StepsCard from "./StepsCard";

import CreateProfile from "./assets/CreateProfile.png";
import Discover from "./assets/Discover.png";
import Participate from "./assets/Participate.png";

const steps = [
  {
    id: 1,
    number: "01",
    step: "Step 1",
    title: "Create Profile",
    description:
      "Create your MY Bharat profile in just a few minutes using your Aadhaar or email. Tell us about your interests, skills, and aspirations so we can recommend opportunities that are most relevant to you.",
    button: "Sign Up",
    link: "https://mybharat.gov.in/yuva_register",
    image: CreateProfile,
    color: "#3E996C",
    zIndex: 10,
  },
  {
    id: 2,
    number: "02",
    step: "Step 2",
    title: "Discover Opportunities",
    description:
      "Browse thousands of volunteering drives, internships, competitions, events, and national initiatives. Get personalized recommendations based on your interests and never miss an opportunity that matches your goals.",
    button: "Explore Opportunities",
    image: Discover,
    color: "#6264D9",
    zIndex: 20,
  },
  {
    id: 3,
    number: "03",
    step: "Step 3",
    title: "Participate & Earn Recognition",
    description:
      "Join meaningful activities, contribute to nation-building, and build real-world experience. Earn government-recognized certificates, badges, and achievements that strengthen your academic and professional journey.",
    button: "View Rewards",
    image: Participate,
    color: "#A34AB0",
    zIndex: 30,
  },
];

const Steps = () => {
  return (
    <section className="bg-[#261F47] ">
      <div className="mx-auto max-w-[1280px] px-2">
        {/* Sticky Heading */}
        <div className="sticky top-0 z-5 bg-[#261F47] pt-20 pb-8">
          <h2 className="text-[40px] font-bold leading-[40px] text-white">
            Three steps to get started
          </h2>

          <p className="mt-4 max-w-[800px] text-[18px] leading-[25px] text-white/80">
            Getting started is simple. Create your profile, explore opportunities
            that match your interests, and begin your journey towards learning,
            volunteering, and making a meaningful impact.
          </p>
        </div>

        {/* Sticky Cards */}
        <div className="relative mt-20 h-[134vh]">
          {steps.map((item, index) => (
            <div
              key={item.id}
              className="sticky"
              style={{
                top: "250px",
                zIndex: item.zIndex,
                marginTop: index === 0 ? 0 : "90px",
                marginLeft: `${index * 90}px`,
              }}
            >
              <StepsCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
