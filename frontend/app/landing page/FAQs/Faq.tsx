"use client";

import Image from "next/image";

import FAQImage from "./FAQs assets/FAQsImage.png";

const supportItems = [
  {
    icon: "💬",
    title: "Frequently Asked Questions",
  },
  {
    icon: "⚠️",
    title: "Report an Issue",
  },
  {
    icon: "📋",
    title: "User Guides & Resources",
  },
  {
    icon: "💭",
    title: "Contact Support",
  },
];

const Faq = () => {
  return (
    <section className="w-full bg-[#ECEBFA] px-6 py-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid h-[390px] overflow-hidden rounded-[24px] border border-white/20 bg-[#1F8D8D] lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Card */}

          <div className="m-8 flex h-[330px] flex-col rounded-[24px] bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)] px-10 py-8">
            <h2
              className="text-[40px]
leading-[46px]
font-bold
tracking-[-0.03em]
text-[#111827]"
            >
              Support & FAQs
            </h2>

            <p
              className="
mt-1
max-w-[620px]
text-[16px]
leading-[18px]
text-[#6B7280]
"
            >
              Find quick answers to common questions, explore helpful guides, or
              reach out to our support team for assistance with your MY Bharat
              journey.
            </p>

            <div className="mt-2 mb-0 h-px w-full bg-[#E5E7EB]" />

            <p
              className="
text-[13px]
font-medium
uppercase
tracking-[0.12em]
text-[#6B7280]
"
            >
              Get Help With
            </p>

            <div
              className="
mt-3
grid
grid-cols-2
gap-x-4
gap-y-3
"
            >
              {supportItems.map((item) => (
                <button
                  key={item.title}
                  className="
flex
h-[40px]
items-center
gap-2
rounded-[12px]
bg-[#F4F5FA]
px-2
transition-all
duration-300
hover:bg-[#ECEEF7]
"
                >
                  <span
                    className="
flex
h-7
w-7
items-center
justify-center
rounded-full
bg-white
border
border-[#E5E7EB]
shadow-sm
text-sm
shrink-0
"
                  >
                    {item.icon}
                  </span>

                  <span
                    className="
text-[14px]
font-medium
leading-[17px]
text-[#374151]
"
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            <button
              className="
mt-4
inline-flex
h-[40px]
w-fit
items-center
justify-center
gap-3
rounded-full
bg-[#374151]
px-5
text-[15px]
font-semibold
text-white
shadow-[0_4px_12px_rgba(0,0,0,0.18)]
transition-all
duration-300
hover:-translate-y-0.5
hover:bg-[#2D3748]
"
            >
              Visit Help Center
              <span className="ml-1 text-[16px]">→</span>
            </button>
          </div>

          {/* Right Illustration */}

          <div className="relative flex h-full items-center justify-center overflow-hidden pr-6">
            <Image
              src={FAQImage}
              alt="FAQ Illustration"
              className="
w-[520px]
h-auto
object-contain
translate-x-8
translate-y-2
select-none
pointer-events-none
"
              priority
            />
          </div>

        </div> {/* <-- closes the grid */}

      </div> {/* <-- closes max-w container */}

    </section>
  );
};

export default Faq;
