import React from 'react';

interface BradburyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BradburyLogo: React.FC<BradburyLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const isLarge = size === 'lg';

  return (
    <div className={`flex flex-col items-start select-none text-white ${className}`}>
      {/* Top line: "The", floret crest, and extending horizontal rule */}
      <div className="flex items-center gap-1.5 w-full">
        <span className="text-[10px] font-medium tracking-wide text-white/90">
          The
        </span>
        
        {/* Wheat/floret crest from screenshot */}
        <svg
          className={`${isLarge ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-white flex-shrink-0 -mt-0.5`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Central leaf */}
          <path d="M12 2C11 5 11 8 12 10C13 8 13 5 12 2Z" />
          {/* Left top leaf */}
          <path d="M9 5C7 7 7 10 9 12C10.5 10.5 10.5 8 9 5Z" />
          {/* Right top leaf */}
          <path d="M15 5C13.5 8 13.5 10.5 15 12C17 10 17 7 15 5Z" />
          {/* Left lower leaf */}
          <path d="M6 10C4 12 4.5 15 7 16.5C8 14.5 8 12.5 6 10Z" />
          {/* Right lower leaf */}
          <path d="M18 10C16 12.5 16 14.5 17 16.5C19.5 15 20 12 18 10Z" />
          {/* Base stalk and node */}
          <circle cx="12" cy="17" r="1.5" />
          <path d="M12 17V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Extending fine horizontal rule across the top of the brand */}
        <div className="flex-1 h-[1px] bg-white/70 min-w-[28px]"></div>
      </div>

      {/* Main Name: "Bradbury Group" */}
      <div className="flex items-baseline gap-1 -mt-0.5">
        <span className={`font-h1 font-bold tracking-tight text-white ${isLarge ? 'text-2xl' : 'text-xl'}`}>
          Bradbury
        </span>
        <span className={`font-h2 font-light text-white/90 ${isLarge ? 'text-base' : 'text-sm'}`}>
          Group
        </span>
      </div>

      {/* Bottom tagline: ── PARTNERS IN LEARNING & GROWTH ── */}
      <div className="flex items-center gap-1.5 w-full mt-0.5">
        <div className="w-2.5 h-[1px] bg-white/60"></div>
        <span className="text-[6.5px] sm:text-[7px] font-bold tracking-[0.14em] uppercase text-white/80 whitespace-nowrap">
          PARTNERS IN LEARNING &amp; GROWTH
        </span>
        <div className="flex-1 h-[1px] bg-white/60"></div>
      </div>
    </div>
  );
};

