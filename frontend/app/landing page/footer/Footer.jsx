"use client";

import Image from "next/image";
import { Mail } from "lucide-react";

import myBharatFooterIcon from "./Assests/MyBharatFooter.svg";
import digitalIndiaIcon from "./Assests/Digital-India.svg";
import facebookIcon from "./Assests/facebook.svg";
import instaIcon from "./Assests/insta.svg";
import linkedinIcon from "./Assests/linkedin.svg";
import whatsappIcon from "./Assests/whatsapp.svg";
import xIcon from "./Assests/x.svg";
import youtubeIcon from "./Assests/youtube.svg";

const importantLinks = [
  { label: "Experiential Learning", href: "https://mybharat.gov.in/" },
  { label: "Volunteer for Bharat", href: "https://mybharat.gov.in/pages/events" },
  { label: "Opportunities", href: "https://mybharat.gov.in/" },
  { label: "Mega Events", href: "https://mybharat.gov.in/mega_events" },
  { label: "About My Bharat", href: "https://mybharat.gov.in/pages/about_mybharat" },
  { label: "Youth Clubs", href: "#" },
];

const usefulLinks = [
  { label: "Sitemap", href: "https://mybharat.gov.in/sitemap" },
  { label: "Feedback", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "Press & Media", href: "#" },
];

const resourceLinks = [
  { label: "FAQ", href: "#" },
  { label: "Support", href: "https://mybharat.gov.in/support" },
  { label: "My Bharat Chatbot", href: "#" },
];

const socialLinks = [
  { label: "LinkedIn", icon: linkedinIcon, href: "https://www.linkedin.com/company/mybharatgov/" },
  { label: "Instagram", icon: instaIcon, href: "https://www.instagram.com/mybharatgov/" },
  { label: "X", icon: xIcon, href: "https://x.com/mybharatgov" },
  { label: "YouTube", icon: youtubeIcon, href: "https://www.youtube.com/@mybharatgov" },
  { label: "WhatsApp", icon: whatsappIcon, href: "https://www.whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h" },
  { label: "Facebook", icon: facebookIcon, href: "https://www.facebook.com/mybharatgov" },
];

const Footer = () => (
  <footer className="bg-[#41377d] text-white">
    <div className="mx-auto max-w-[1280px] px-6 pb-9 pt-10 sm:px-10 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
        <h2 className="max-w-[420px] text-4xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-5xl lg:text-[48px]">
          Get the Latest
          <br />
          from MY Bharat
        </h2>

        <div className="max-w-[540px] lg:justify-self-end">
          <p className="max-w-[520px] text-[17px] leading-relaxed text-white/95 lg:text-[19px]">
            Get the best internships, events and programs delivered to your
            inbox or WhatsApp every Monday.
          </p>

          <form className="mt-5 flex h-12 items-center rounded-full border border-white/85 bg-[#696198] p-1">
            <Mail className="ml-4 h-5 w-5 shrink-0 text-white" />
            <input
              type="email"
              aria-label="Email address"
              placeholder="you@email.com"
              className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-white placeholder:text-white/85 outline-none"
            />
            <button
              type="submit"
              className="h-full rounded-full bg-[#f8f8fb] px-5 text-[15px] font-semibold text-[#374151] shadow-[0_2px_0_rgba(0,0,0,0.2)] transition-colors hover:bg-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1.7fr_0.9fr] lg:gap-12">
        <div>
          <Image
            src={myBharatFooterIcon}
            alt="My Bharat"
            width={164}
            height={68}
            className="h-[68px] w-[164px] object-contain"
          />

          <p className="mt-4 max-w-[360px] text-[14px] leading-[1.4] text-white/90">
            My Bharat is an initiative of Ministry of Youth Affairs & Sports to
            empower Indian youth through social mobility, educational equity,
            and practical skills.
          </p>

          <div className="mt-5 grid w-fit grid-cols-3 gap-3">
            {socialLinks.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
              >
                <Image src={icon} alt={label} width={28} height={28} className="h-full w-full object-contain brightness-0 invert" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-7 sm:grid-cols-3">
          <FooterLinks title="Important Links" links={importantLinks} />
          <FooterLinks title="Useful Links" links={usefulLinks} />
          <FooterLinks title="Resources & Support" links={resourceLinks} />
        </div>

        <div className="flex flex-col items-start lg:items-end">
          <span className="rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-[#6656d9]">
            Last Updated on 24-04-2026
          </span>

          <div className="mt-5 flex items-center gap-3 text-right">
            <span className="text-[14px] text-white/90">Powered by</span>
            <Image
              src={digitalIndiaIcon}
              alt="Digital India"
              width={86}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="mt-4 text-right">
            <p className="text-[13px] leading-[1.45] text-white/90">
              Digital India Corporation (DIC)
              <br />
              Ministry of Electronics & IT (MeitY)
              <br />
              Government of India
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-[#252047] px-6 py-4 sm:px-10 lg:px-12">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 text-[13px] text-white/90 md:flex-row md:items-center md:justify-between lg:text-[14px]">
        <p>© 2026 - My Bharat @ All rights reserved. | Ministry of Youth Affairs and Sports, Govt of India®</p>
        <div className="flex items-center gap-5 whitespace-nowrap">
          <a href="https://mybharat.gov.in/pages/terms_of_use" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms & Conditions</a>
          <span className="h-5 w-px bg-white/70" />
          <a href="https://mybharat.gov.in/pages/policy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

const FooterLinks = ({ title, links }) => (
  <div>
    <h3 className="text-[15px] font-semibold">{title}</h3>
    <ul className="mt-4 space-y-2 text-[14px] text-white/90">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
