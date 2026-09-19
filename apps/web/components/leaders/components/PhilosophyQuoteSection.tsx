'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export const PhilosophyQuoteSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#0c2940] text-[#ffffff] border-y border-[#3f6d67]/30 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-48 bg-[#39918d]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Label: Why this works */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3f6d67]/30 border border-[#39918d]/40">
          <span className="w-2 h-2 rounded-full bg-[#f8c51c] animate-pulse" />
          <span className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#f8c51c]">
            Why this works
          </span>
        </div>

        {/* Quote */}
        <div className="relative">
          <Quote className="w-10 h-10 text-[#f8c51c]/25 mx-auto mb-4" />
          <blockquote className="font-opensans text-xl sm:text-2xl md:text-3xl leading-relaxed text-[#ffffff] font-normal max-w-4xl mx-auto">
            &ldquo;We&apos;ve been conditioned for instant gratification. AI requires something different. It requires you to think deeper, iterate, and be comfortable with not knowing immediately. But for leaders brave enough to <span className="text-[#f8c51c] font-semibold">go slow first and go fast later</span>, the dividends are extraordinary.&rdquo;
          </blockquote>
        </div>

        {/* Attribution */}
        <div className="pt-2">
          <p className="font-montserrat text-sm sm:text-base font-semibold text-[#ffffff]">
            Paige Bradbury
          </p>
          <p className="font-opensans text-xs sm:text-sm text-[#ffffff]/75">
            CEO &amp; Principal Learning Architect
          </p>
        </div>
      </div>
    </section>
  );
};
