"use client";

import Image from "next/image";

import Phone70 from "./BottomAssets/70 Phone.png";
import FullPhone from "./BottomAssets/Full_Phone.png";

import QR from "./BottomAssets/qr.svg";
import GooglePlay from "./BottomAssets/google play store.svg";
import AppStore from "./BottomAssets/app store.svg";

const DownloadCard = () => {
  return (
    <section className="w-full bg-[#ECEBFA] px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="relative h-auto lg:h-[320px] overflow-hidden lg:overflow-visible rounded-[20px] border border-white/20 bg-[#F2BB45] p-6 sm:p-8 lg:p-0">

          {/* ================= Phones (Desktop Only) ================= */}

          <div className="hidden lg:block absolute inset-y-0 left-0 w-[580px]">

            {/* Left Phone */}

            <Image
              src={Phone70}
              alt="70 Percent Phone"
              priority
              className="
                absolute
                left-[30px]
                bottom-[-20px]
                w-[190px]
                h-auto
                object-contain
                z-10
              "
            />

            {/* Right Phone */}

            <Image
              src={FullPhone}
              alt="Full Phone"
              priority
              className="
                absolute
                left-[240px]
                top-[-55px]
                w-[210px]
                h-auto
                object-contain
                z-20
              "
            />

          </div>

          {/* ================= Content ================= */}

          <div className="flex h-full flex-col justify-center lg:pl-[490px] lg:pr-[100px]">

            <h2
              className="
                max-w-[690px]
                text-[28px]
                sm:text-[42px]
                lg:text-[53px]
                font-bold
                leading-tight
                lg:leading-[50px]
                tracking-tight
                text-[#111827]
              "
            >
              MY Bharat in your pocket
            </h2>

            <p
              className="
                mt-2
                sm:mt-3
                max-w-[680px]
                text-[14px]
                sm:text-[17px]
                lg:text-[19px]
                leading-[22px]
                sm:leading-[30px]
                text-[#374151]
              "
            >
              Instant notifications for new opportunities, one-tap
              applications, offline certificates and event check-ins.
            </p>
                        <div className="mt-6 sm:mt-8 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-7">

              <div className="shrink-0">

                <p className="text-[13px] sm:text-[15px] leading-none text-[#374151]">
                  Login to the app
                </p>

                <h3 className="mt-1.5 sm:mt-2 text-[20px] sm:text-[24px] font-bold leading-none text-[#111827]">
                  Using QR
                </h3>

              </div>

              <Image
                src={QR}
                alt="QR Code"
                width={64}
                height={64}
                className="h-[52px] w-[52px] sm:h-[64px] sm:w-[64px] shrink-0"
              />

              <div className="hidden sm:block h-[64px] w-px bg-white/40" />

              <div className="flex items-center gap-3 sm:gap-4">

                <Image
                  src={GooglePlay}
                  alt="Google Play"
                  className="
                    h-[38px]
                    sm:h-[46px]
                    w-auto
                    cursor-pointer
                    transition-transform
                    duration-200
                    hover:scale-105
                  "
                />

                <Image
                  src={AppStore}
                  alt="App Store"
                  className="
                    h-[38px]
                    sm:h-[46px]
                    w-auto
                    cursor-pointer
                    transition-transform
                    duration-200
                    hover:scale-105
                  "
                />

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DownloadCard;
