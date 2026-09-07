export function BrandLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <div className="flex flex-col items-start select-none">
      <div className="flex items-center space-x-1.5">
        <svg
          className={`${isLarge ? "w-6 h-6" : isSmall ? "w-4 h-4" : "w-5 h-5"} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
        >
          <path
            d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
            fill="#f8c51c"
            fillOpacity="0.95"
          />
          <path d="M12 22V12M12 12C9 12 7 10 7 7M12 12C15 12 17 10 17 7" />
        </svg>
        <span
          className={`${isLarge ? "text-xs" : "text-[10px]"} tracking-widest uppercase font-semibold text-[#39918d]`}
        >
          The
        </span>
      </div>
      <div className="flex items-baseline space-x-1 -mt-1">
        <span
          className={`${isLarge ? "text-2xl" : isSmall ? "text-lg" : "text-xl"} font-extrabold tracking-tight text-white font-montserrat`}
        >
          Bradbury
        </span>
        <span className={`${isLarge ? "text-base" : "text-sm"} font-semibold text-[#39918d]`}>Group</span>
      </div>
      <span
        className={`${isLarge ? "text-[9px]" : "text-[8.5px]"} uppercase tracking-widest text-[#39918d] font-semibold -mt-0.5 whitespace-nowrap`}
      >
        Partners in Learning &amp; Growth
      </span>
    </div>
  );
}
