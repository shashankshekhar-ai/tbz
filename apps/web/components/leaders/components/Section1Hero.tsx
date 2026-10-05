'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Section1HeroProps {
  onTryInterview: () => void;
  onEnrollDirectly: () => void;
}

export const Section1Hero: React.FC<Section1HeroProps> = ({
  onTryInterview,
  onEnrollDirectly,
}) => {
  return (
    <section className="relative bg-[#0c2940] text-white pt-[calc(96px+4rem)] pb-20 sm:pt-[calc(102px+4rem)] md:pt-[calc(102px+6rem)] md:pb-28 lg:pt-[calc(108px+6rem)] overflow-hidden border-b border-[#39918d]/20">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#39918d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#c57b4b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center space-x-2 mb-4">
              <span 
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                className="text-xs sm:text-sm font-semibold tracking-widest text-[#f8c51c] uppercase"
              >
                The Solomon Engine
              </span>
            </div>

            {/* H1 */}
            <h1 
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6"
            >
              “I’m terrified of AI. I don’t know where to start.”
            </h1>

            {/* Sub */}
            <h2 
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="text-lg sm:text-xl font-bold text-[#f8c51c] leading-snug mb-5"
            >
              From paralysis to fluency in 12 weeks. This is what one nonprofit leader discovered, and what’s waiting for you.
            </h2>

            {/* Body */}
            <p 
              style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
              className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl font-normal"
            >
              Every discovery call I take, the story is the same: leaders who know AI is non-negotiable, but who are skeptical or terrified of getting it wrong.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <button
                onClick={onTryInterview}
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                className="px-6 py-3.5 bg-[#f8c51c] hover:bg-[#eab314] text-[#0c2940] font-bold text-sm tracking-wide rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center space-x-2"
              >
                <span>TRY THE AI INTERVIEW</span>
                <Sparkles className="w-4 h-4 text-[#0c2940]" />
              </button>

              <span className="text-[#39918d] font-bold hidden sm:inline">·</span>

              <button
                onClick={onEnrollDirectly}
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                className="px-6 py-3.5 bg-[#3f6d67] hover:bg-[#39918d] text-white font-bold text-sm tracking-wide rounded-lg border border-[#39918d]/40 transition-all duration-200 active:scale-[0.99] flex items-center space-x-2"
              >
                <span>ENROLL DIRECTLY</span>
                <ArrowRight className="w-4 h-4 text-[#f8c51c]" />
              </button>
            </div>

            {/* Supporting Caption */}
            <p 
              style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
              className="text-xs sm:text-sm text-slate-300 italic"
            >
              30 minutes with a thinking partner. Beta cohort, Q4 2026.
            </p>
          </div>

          {/* Right Column: Hero Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0c2940]/90 backdrop-blur-md border-2 border-[#39918d]/40 rounded-2xl p-7 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#f8c51c]/50">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#39918d]/30 pb-4 mb-6">
                <span 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="text-xs font-bold tracking-widest text-[#f8c51c] uppercase"
                >
                  PARTICIPANT FILE / 001
                </span>
                <span className="w-2 h-2 rounded-full bg-[#f8c51c]" />
              </div>

              {/* Quote */}
              <blockquote 
                style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
                className="text-base sm:text-lg text-white italic leading-relaxed mb-6 font-normal"
              >
                “I walked in convinced this wasn’t for me. I walked out with a 5-year strategic plan, three custom AI assistants, and a clear path to scale my impact without scaling my team.”
              </blockquote>

              {/* Attribution */}
              <div className="border-t border-[#39918d]/30 pt-4 mb-6">
                <p 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="text-sm font-semibold text-white leading-snug"
                >
                  Andy Ivey, Fundraising Lead, Family Legacy. 8,000 sponsored children in Zambia.
                </p>
              </div>

              {/* Bottom bar */}
              <div className="bg-[#3f6d67] -mx-7 -mb-7 sm:-mx-8 sm:-mb-8 px-7 sm:px-8 py-3.5 flex items-center justify-between border-t border-[#39918d]/50">
                <span 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="text-xs font-bold tracking-wider text-white uppercase"
                >
                  SIX WEEKS LATER
                </span>
                <span 
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  className="text-base sm:text-lg font-extrabold text-[#f8c51c] tracking-tight"
                >
                  $62,224
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
