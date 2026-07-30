"use client";

const Badge = ({ variant = "new", children }) => {
  const variantStyles = {
    new: "bg-[#74A232] text-white",
    popular: "bg-[#6656D9] text-white",
  };

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
        variantStyles[variant] || variantStyles.new
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
