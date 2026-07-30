"use client";

const HeroBackground = () => {
  return (
    <>
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#E2E5FD]" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(125,125,180,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(125,125,180,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Soft Radial Glow */}
      <div
        className="
          absolute
          left-1/2
          top-[-180px]
          h-[900px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          opacity-40
          blur-[120px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(226,229,253,0) 70%)",
        }}
      />
    </>
  );
};

export default HeroBackground;