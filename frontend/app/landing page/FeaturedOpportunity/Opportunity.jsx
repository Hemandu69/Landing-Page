"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Clock } from "lucide-react";

import ilbsLogo from "./assets/ilbs.svg";
import myBharatLogo from "./assets/My Bharat.svg";
import rpCoins from "./assets/25 RP.svg";

const topOpportunities = [
  {
    id: 1,
    logo: ilbsLogo,
    org: "ILBS",
    timeAgo: "2 hr ago",
    isPopular: true,
    title: "Public Distribution System Awareness...",
    description:
      "Gain hands-on experience in strengthening the Public Distribution System and ensuring food security.",
    location: "Ashoknagar, Madhya Pradesh",
    dateRange: "15 Jun 2026 - 21 Jul 2026",
    duration: "40 Hrs",
    tags: ["Management", "Excel", "Power Point"],
    extraTags: "+1",
    rp: 25,
  },
  {
    id: 2,
    logo: myBharatLogo,
    org: "MY BHARAT",
    timeAgo: "1 week ago",
    isPopular: false,
    title: "Community Health Awareness Campaign",
    description:
      "Develop and execute health workshops focusing on preventive care and nutrition.",
    location: "Chennai, Tamil Nadu",
    dateRange: "15 Jun 2026 - 21 Jul 2026",
    duration: "40 Hrs",
    tags: ["Management", "Excel", "Power Point"],
    extraTags: "+3",
    rp: 25,
  },
  {
    id: 3,
    logo: myBharatLogo,
    org: "MY BHARAT",
    timeAgo: "1 week ago",
    isPopular: false,
    title: "Community Health Awareness Campaign",
    description:
      "Develop and execute health workshops focusing on preventive care and nutrition.",
    location: "Chennai, Tamil Nadu",
    dateRange: "15 Jun 2026 - 21 Jul 2026",
    duration: "40 Hrs",
    tags: ["Management", "Excel", "Power Point"],
    extraTags: "+3",
    rp: 25,
  },
];

const bottomOpportunities = [
  {
    id: 4,
    logo: ilbsLogo,
    org: "ILBS",
    timeAgo: "2 hr ago",
    isPopular: true,
    title: "Public Distribution System Awareness Campaign Internship",
    description:
      "Gain hands-on experience in strengthening the Distribution System and ensuring food securit...",
    location: "Ashoknagar, Madhya Pradesh",
    dateRange: "15 Jun 2026 - 21 Jul 2026",
    duration: "40 Hrs",
    tags: ["Management", "Excel", "Power Point", "Leadership"],
    extraTags: null,
    rp: 25,
  },
  {
    id: 5,
    logo: myBharatLogo,
    org: "MY BHARAT",
    timeAgo: "1 week ago",
    isPopular: false,
    title: "Community Health Awareness Campaign",
    description:
      "Develop and execute health workshops focusing on preventive care and nutrition.",
    location: "Chennai, Tamil Nadu",
    dateRange: "15 Jun 2026 - 21 Jul 2026",
    duration: "40 Hrs",
    tags: ["Management", "Excel", "Power Point"],
    extraTags: "+3",
    rp: 25,
  },
];

const OpportunityCard = ({ item }) => (
  <div className="flex flex-col justify-between rounded-[26px] bg-white p-6 text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-100 transition-all hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1">
    {/* Card Top */}
    <div>
      {/* Header info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200/80 bg-white p-1.5 shadow-2xs">
            <Image
              src={item.logo}
              alt={item.org}
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#1F2937] leading-tight">
              {item.org}
            </span>
            <span className="text-[12px] font-medium text-gray-500">
              {item.timeAgo}
            </span>
          </div>
        </div>

        {item.isPopular && (
          <span
            style={{
              background:
                "linear-gradient(90deg, #F5E3E3 49.04%, #DCDFFE 100%)",
            }}
            className="rounded-full px-4 py-1 text-[12px] font-bold text-[#6953D8] shadow-2xs"
          >
            Popular
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-[18px] font-bold leading-[24px] text-[#111827] transition-colors hover:text-[#6953D8] cursor-pointer">
        {item.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-[13px] font-medium leading-[20px] text-[#4B5563] line-clamp-2">
        {item.description}
      </p>

      {/* Location */}
      <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-[#4B5563]">
        <MapPin size={16} className="text-gray-500 shrink-0" />
        <span>{item.location}</span>
      </div>

      {/* Date & Duration */}
      <div className="mt-2 flex flex-wrap items-center gap-4 text-[13px] font-semibold text-[#4B5563]">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500 shrink-0" />
          <span>{item.dateRange}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-gray-500 shrink-0" />
          <span>{item.duration}</span>
        </div>
      </div>

      {/* Skill Tags */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-300 bg-[#F9FAFB] px-3.5 py-1 text-[12px] font-semibold text-[#374151]"
          >
            {tag}
          </span>
        ))}
        {item.extraTags && (
          <span className="rounded-full border border-gray-300 bg-[#F9FAFB] px-3 py-1 text-[12px] font-semibold text-[#374151]">
            {item.extraTags}
          </span>
        )}
      </div>
    </div>

    {/* Card Footer */}
    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
      {/* RP Coins Badge Image */}
      <Image
        src={rpCoins}
        alt="25 RP Earn"
        width={75}
        height={32}
        className="h-7 w-auto object-contain"
      />

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-[13px] font-bold text-[#374151] transition-all hover:bg-gray-50 cursor-pointer"
        >
          View Details
        </button>
        <button
          type="button"
          className="rounded-full bg-[#6953D8] px-5 py-2 text-[13px] font-bold text-white transition-all hover:bg-[#5844C4] shadow-sm cursor-pointer"
        >
          Apply now
        </button>
      </div>
    </div>
  </div>
);

const Opportunity = () => {
  const [activeTab, setActiveTab] = useState("Popular");

  return (
    <section className="bg-[#261F47] py-16 text-white">
      <div className="mx-auto max-w-[1340px] px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-[36px] font-bold leading-tight tracking-tight sm:text-[42px]">
              Featured Opportunities
            </h2>
            <p className="mt-2 text-[15px] font-medium text-white/80">
              Explore handpicked internships, volunteering drives, competitions, campaigns, and events designed to help you learn, contribute, and grow.
            </p>
          </div>

          <a
            href="https://mybharat.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[14px] font-bold text-[#1F2937] shadow-sm transition-all hover:bg-gray-100 hover:scale-105 active:scale-98 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight size={18} strokeWidth={2.2} />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 rounded-full bg-white p-1.5 w-fit shadow-xs">
          {["Popular", "Recently Added", "Near You"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2 text-[14px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#6953D8] text-white shadow-sm"
                    : "text-[#6953D8] hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Top 3 Cards Grid (3 Columns) */}
        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {topOpportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom 2 Cards Grid (2 Columns, aligned with left & right edges) */}
        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          {bottomOpportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opportunity;
