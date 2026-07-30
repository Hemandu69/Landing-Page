"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Search, Bell, LogOut, User, Menu, X } from "lucide-react";
import accessibilityIcon from "./Assets/Accessibility Icon.svg";
import satyamevLogo from "./Assets/Satyamev.svg";
import myBharatLogo from "./Assets/MyBharat.svg";
import loginBtn from "./Assets/Login.svg";
import joinBtn from "./Assets/JoinMyBharat button.svg";
import avatarsIcon from "./Assets/Avatars.svg";
import OpportunitiesMenu from "./OpportunitiesMenu";
import CommunityMenu from "./CommunityMenu";
import AboutUsMenu from "./AboutUsMenu";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openLoginModal, isAuthenticated, user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);

  const opportunitiesBtnRef = useRef(null);
  const communityBtnRef = useRef(null);
  const aboutBtnRef = useRef(null);
  const userMenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (menuName) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleLogoClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
    router.push("/");
  };

  const defaultHeaderBg = pathname === "/dashboard" ? "bg-[#F3F5FC]" : "bg-[#E2E5FD]";
  const headerBgClass = isScrolled ? "bg-transparent" : defaultHeaderBg;

  return (
    <header className={`sticky top-0 z-50 w-full ${headerBgClass}`}>
      <div className={`relative w-full rounded-b-[40px] border-b border-gray-100 bg-white transition-all duration-300 ease-out ${isScrolled ? "shadow-[0_12px_36px_rgba(0,0,0,0.10)]" : "shadow-xs"}`}>
        {/* Top Utility Bar */}
        <div className="border-b border-gray-100 bg-[#FBFBFF] rounded-t-[40px]">
          <div className="mx-auto flex max-w-[1360px] h-8 items-center justify-between px-4 sm:px-6 lg:px-10 text-[13px]">
            {/* Left: Flag & Government Link */}
            <a
              href="https://www.india.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-[#6656D9] transition-colors hover:text-[#5244B8]"
            >
              <span className="inline-flex h-3.5 w-5 shrink-0 flex-col overflow-hidden rounded-[2px] border border-black/10 shadow-2xs">
                <span className="h-1/3 w-full bg-[#FF9933]" />
                <span className="relative flex h-1/3 w-full items-center justify-center bg-white">
                  <span className="h-1 w-1 rounded-full bg-[#000080]" />
                </span>
                <span className="h-1/3 w-full bg-[#138808]" />
              </span>
              <span>Government of India</span>
              <ExternalLink size={12} strokeWidth={2.2} className="text-[#6656D9]" />
            </a>

            {/* Right: Talk to Us, Support, Accessibility, More */}
            <div className="hidden md:flex items-center gap-4 text-[#6656D9]">
              <span className="font-medium">
                Talk to Us: <span className="font-semibold">14472</span>
              </span>

              <span className="h-3.5 w-px bg-gray-200" />

              <a
                href="https://mybharat.gov.in/support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-medium transition-colors hover:text-[#5244B8]"
              >
                <span>Support</span>
                <ExternalLink size={12} strokeWidth={2.2} />
              </a>

              <span className="h-3.5 w-px bg-gray-200" />

              {/* Font Size Adjuster */}
              <div className="flex items-center gap-1.5 font-medium">
                <button type="button" className="px-1 text-[13px] hover:opacity-80" aria-label="Decrease font size">
                  A<sup>-</sup>
                </button>
                <button type="button" className="rounded-md bg-[#E0E7FF] px-2 py-0.5 text-[13px] font-semibold text-[#4338CA]" aria-label="Reset font size">
                  A
                </button>
                <button type="button" className="px-1 text-[13px] hover:opacity-80" aria-label="Increase font size">
                  A<sup>+</sup>
                </button>
              </div>

              <span className="h-3.5 w-px bg-gray-200" />

              {/* Contrast / Theme Toggle */}
              <button type="button" className="flex items-center justify-center p-0.5 hover:opacity-80" aria-label="Toggle contrast">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#6656D9] overflow-hidden">
                  <span className="h-full w-1/2 bg-[#6656D9]" />
                  <span className="h-full w-1/2 bg-transparent" />
                </span>
              </button>

              <span className="h-3.5 w-px bg-gray-200" />

              {/* Accessibility / More */}
              <button type="button" className="flex items-center gap-1.5 font-medium transition-colors hover:text-[#5244B8]">
                <Image src={accessibilityIcon} alt="Accessibility" width={16} height={16} className="h-4 w-4 object-contain" />
                <span>More</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="mx-auto flex max-w-[1360px] h-[58px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logos (Left) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" onClick={handleLogoClick} className="cursor-pointer transition-opacity hover:opacity-90">
              <Image
                src={satyamevLogo}
                alt="Ministry of Youth Affairs and Sports"
                width={63}
                height={32}
                priority
                className="h-8 w-auto cursor-pointer object-contain"
              />
            </Link>
            <Link href="/" onClick={handleLogoClick} className="cursor-pointer transition-opacity hover:opacity-90">
              <Image
                src={myBharatLogo}
                alt="MY Bharat"
                width={96}
                height={40}
                priority
                className="h-9 w-auto cursor-pointer object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center gap-2 text-[15px] font-semibold text-[#1F2937]">
            {/* Opportunities Dropdown Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter("opportunities")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={opportunitiesBtnRef}
                type="button"
                aria-expanded={activeDropdown === "opportunities"}
                aria-controls="opportunities-mega-menu"
                onClick={() =>
                  setActiveDropdown((prev) =>
                    prev === "opportunities" ? null : "opportunities"
                  )
                }
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                  activeDropdown === "opportunities"
                    ? "border-gray-300/80 bg-[#F3F4F6] text-[#1F2937] font-bold shadow-2xs"
                    : "border-transparent text-[#1F2937] hover:bg-[#F3F4F6] hover:text-[#6656D9]"
                }`}
              >
                Opportunities
                {activeDropdown === "opportunities" ? (
                  <ChevronUp size={16} strokeWidth={2.2} className="text-[#1F2937]" />
                ) : (
                  <ChevronDown size={16} strokeWidth={2.2} className="text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {activeDropdown === "opportunities" && (
                  <OpportunitiesMenu
                    isOpen={activeDropdown === "opportunities"}
                    onClose={() => setActiveDropdown(null)}
                    triggerRef={opportunitiesBtnRef}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Community Dropdown Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter("community")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={communityBtnRef}
                type="button"
                aria-expanded={activeDropdown === "community"}
                aria-controls="community-mega-menu"
                onClick={() =>
                  setActiveDropdown((prev) =>
                    prev === "community" ? null : "community"
                  )
                }
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                  activeDropdown === "community"
                    ? "border-gray-300/80 bg-[#F3F4F6] text-[#1F2937] font-bold shadow-2xs"
                    : "border-transparent text-[#1F2937] hover:bg-[#F3F4F6] hover:text-[#6656D9]"
                }`}
              >
                Community
                {activeDropdown === "community" ? (
                  <ChevronUp size={16} strokeWidth={2.2} className="text-[#1F2937]" />
                ) : (
                  <ChevronDown size={16} strokeWidth={2.2} className="text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {activeDropdown === "community" && (
                  <CommunityMenu
                    isOpen={activeDropdown === "community"}
                    onClose={() => setActiveDropdown(null)}
                    triggerRef={communityBtnRef}
                  />
                )}
              </AnimatePresence>
            </div>

            <a
              href="https://yuva-beta.mybharats.in/success-stories"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-1.5 rounded-full border border-transparent transition-all text-[#1F2937] hover:bg-[#F3F4F6] hover:text-[#6656D9] hover:border-gray-300/80 hover:shadow-2xs cursor-pointer"
            >
              Success Stories
            </a>

            {/* About Us Dropdown Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={aboutBtnRef}
                type="button"
                aria-expanded={activeDropdown === "about"}
                aria-controls="about-us-menu"
                onClick={() =>
                  setActiveDropdown((prev) =>
                    prev === "about" ? null : "about"
                  )
                }
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                  activeDropdown === "about"
                    ? "border-gray-300/80 bg-[#F3F4F6] text-[#1F2937] font-bold shadow-2xs"
                    : "border-transparent text-[#1F2937] hover:bg-[#F3F4F6] hover:text-[#6656D9]"
                }`}
              >
                About Us
                {activeDropdown === "about" ? (
                  <ChevronUp size={16} strokeWidth={2.2} className="text-[#1F2937]" />
                ) : (
                  <ChevronDown size={16} strokeWidth={2.2} className="text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {activeDropdown === "about" && (
                  <AboutUsMenu
                    isOpen={activeDropdown === "about"}
                    onClose={() => setActiveDropdown(null)}
                    triggerRef={aboutBtnRef}
                  />
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Buttons / Logged In State (Right) */}
          <div className="flex items-center gap-3.5">
            {isAuthenticated ? (
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Youth Pill Button */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-full border border-[#1F2937] bg-white px-4 py-1.5 text-[15px] font-bold text-[#1F2937] transition-all hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  <span>Youth</span>
                  <ChevronDown size={16} strokeWidth={2.2} className="text-[#1F2937]" />
                </button>

                {/* Search Icon Button */}
                <button
                  type="button"
                  aria-label="Search"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#1F2937] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Search size={20} strokeWidth={2.2} />
                </button>

                {/* Notification Bell Icon Button */}
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#1F2937] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Bell size={20} strokeWidth={2.2} />
                </button>

                {/* User Avatar with Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="relative shrink-0 transition-transform hover:scale-105 cursor-pointer focus:outline-none flex items-center"
                    aria-label="User Menu"
                  >
                    <Image
                      src={avatarsIcon}
                      alt={user?.name || "User Avatar"}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain rounded-full border border-[#6355DC]/30 shadow-2xs"
                    />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2.5 w-60 rounded-[20px] border border-gray-100 bg-white p-3 shadow-xl z-50 flex flex-col gap-1"
                      >
                        {/* User Header Info */}
                        <div className="flex items-center gap-3 p-2.5 rounded-[14px] bg-[#F9FAFB] border border-gray-100">
                          <Image
                            src={avatarsIcon}
                            alt="User Profile"
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain rounded-full border border-[#6355DC]/20 shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-bold text-[#111827] truncate">
                              {user?.name || "Karan Singh"}
                            </span>
                            <span className="text-[11px] font-medium text-[#6B7280] truncate">
                              {user?.identifier || "Registered Youth"}
                            </span>
                          </div>
                        </div>

                        <div className="h-px w-full bg-gray-100 my-1" />

                        {/* Edit Profile / Dashboard Option */}
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-[12px] text-[13px] font-semibold text-[#374151] hover:bg-[#F3F4F6] hover:text-[#6355DC] transition-colors"
                        >
                          <User size={16} />
                          <span>My Account / Profile</span>
                        </Link>

                        {/* Log Out Option */}
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-[12px] text-[13px] font-semibold text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer w-full text-left"
                        >
                          <LogOut size={16} />
                          <span>Log Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openLoginModal("login")}
                  className="transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Image src={loginBtn} alt="Login" width={68} height={44} className="h-10 w-auto object-contain cursor-pointer" />
                </button>
                <button
                  type="button"
                  onClick={() => openLoginModal("register")}
                  className="transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Image src={joinBtn} alt="Join MY Bharat" width={158} height={44} className="h-10 w-auto object-contain cursor-pointer" />
                </button>
              </>
            )}

            {/* Hamburger Button for Mobile / Tablet */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="flex h-10 w-10 lg:hidden items-center justify-center rounded-full border border-gray-200 text-[#1F2937] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Slide-over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex lg:hidden bg-black/40 backdrop-blur-xs"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="ml-auto w-full max-w-[340px] sm:max-w-[400px] h-full bg-white shadow-2xl flex flex-col overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#FBFBFF]">
                <div className="flex items-center gap-3">
                  <Image src={satyamevLogo} alt="Satyamev" width={48} height={24} className="h-6 w-auto object-contain" />
                  <Image src={myBharatLogo} alt="MY Bharat" width={75} height={32} className="h-7 w-auto object-contain" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Nav Links & Accordions */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                {/* Opportunities Accordion */}
                <div className="border-b border-gray-100 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedSection(prev => prev === 'opportunities' ? null : 'opportunities')}
                    className="flex w-full items-center justify-between py-2 text-[16px] font-bold text-[#1F2937]"
                  >
                    <span>Opportunities</span>
                    <ChevronDown size={18} className={`transition-transform ${mobileExpandedSection === 'opportunities' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedSection === 'opportunities' && (
                    <div className="pl-4 py-2 flex flex-col gap-2 text-[14px] text-[#4B5563]">
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">Internships</a>
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">Volunteering</a>
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">Quiz & Essays</a>
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">Events</a>
                    </div>
                  )}
                </div>

                {/* Community Accordion */}
                <div className="border-b border-gray-100 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedSection(prev => prev === 'community' ? null : 'community')}
                    className="flex w-full items-center justify-between py-2 text-[16px] font-bold text-[#1F2937]"
                  >
                    <span>Community</span>
                    <ChevronDown size={18} className={`transition-transform ${mobileExpandedSection === 'community' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedSection === 'community' && (
                    <div className="pl-4 py-2 flex flex-col gap-2 text-[14px] text-[#4B5563]">
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">Youth Center</a>
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">All Organisations</a>
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">Gallery</a>
                    </div>
                  )}
                </div>

                {/* Success Stories */}
                <a
                  href="https://yuva-beta.mybharats.in/success-stories"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-[16px] font-bold text-[#1F2937] border-b border-gray-100 hover:text-[#6656D9] transition-colors"
                >
                  Success Stories
                </a>

                {/* About Us Accordion */}
                <div className="border-b border-gray-100 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedSection(prev => prev === 'about' ? null : 'about')}
                    className="flex w-full items-center justify-between py-2 text-[16px] font-bold text-[#1F2937]"
                  >
                    <span>About Us</span>
                    <ChevronDown size={18} className={`transition-transform ${mobileExpandedSection === 'about' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedSection === 'about' && (
                    <div className="pl-4 py-2 flex flex-col gap-2 text-[14px] text-[#4B5563]">
                      <a href="https://mybharat.gov.in/pages/about_mybharat" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">About MY Bharat</a>
                      <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6656D9]">Public Dashboard</a>
                    </div>
                  )}
                </div>

                {/* Utility info */}
                <div className="mt-4 p-3 rounded-2xl bg-[#F8F9FE] flex flex-col gap-2 text-[13px] text-[#6656D9]">
                  <span className="font-semibold">Talk to Us: 14472</span>
                  <a href="https://mybharat.gov.in/support" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-medium hover:underline">
                    <span>Support</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Mobile Footer Auth Buttons */}
              <div className="p-4 border-t border-gray-100 bg-[#FBFBFF] flex flex-col gap-2">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => { setIsMobileMenuOpen(false); openLoginModal("login"); }}
                      className="w-full rounded-full border border-[#6355DC] py-2.5 text-[15px] font-bold text-[#6355DC] hover:bg-[#F3F5FC]"
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsMobileMenuOpen(false); openLoginModal("register"); }}
                      className="w-full rounded-full bg-[#6355DC] py-2.5 text-[15px] font-bold text-white shadow-sm hover:bg-[#5243C9]"
                    >
                      Join MY Bharat
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full rounded-full bg-[#6355DC] py-2.5 text-[15px] font-bold text-white"
                    >
                      <User size={18} />
                      <span>My Dashboard</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                      className="flex items-center justify-center gap-2 w-full rounded-full border border-red-200 py-2 text-[14px] font-bold text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
