'use client';

import React from 'react';
import { ArrowRight, Quote, ShieldCheck } from 'lucide-react';
import { HeadParticles } from './HeadParticles';

interface HeroSectionProps {
  onExplorePhases?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const scrollToInterview = () => {
    const el = document.getElementById('solomon-interview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#0c2940] text-[#ffffff] min-h-[85vh] flex flex-col justify-center pt-[calc(108px+5vh)] pb-[5vh] border-b border-[#3f6d67]/30">
      {/* Subtle Ambient Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#39918d]/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#c57b4b]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3f6d67]/15 blur-3xl pointer-events-none rounded-full" />

      {/* Small Particle Animation Effects with Low Opacity Behind Head Section */}
      <HeadParticles className="z-0 opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Eyebrow, H1, Subheadline, Body, CTAs, Support Line */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Eyebrow label: The Solomon Engine */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3f6d67]/30 border border-[#39918d]/40 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#f8c51c] animate-pulse" />
              <span className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#f8c51c]">
                The Solomon Engine
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="t-h1 text-[#ffffff]">
              &ldquo;I&apos;m terrified of AI. I don&apos;t know where to start.&rdquo;
            </h1>

            {/* Subheadline */}
            <p className="font-opensans text-base sm:text-lg md:text-xl text-[#ffffff]/90 leading-relaxed font-medium">
              From paralysis to mastery in 12 weeks. This is what one nonprofit leader discovered, and what&apos;s waiting for you.
            </p>

            {/* Body */}
            <p className="font-opensans text-sm sm:text-base text-[#ffffff]/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Every discovery call I take, the story is the same: leaders who know AI is non-negotiable, but who are terrified of getting it wrong.
            </p>

            {/* CTA: Try the AI Interview / Enroll Directly */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  id="hero-try-interview-btn"
                  onClick={scrollToInterview}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#f8c51c] hover:bg-[#e5b310] text-[#0c2940] font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>TRY THE AI INTERVIEW</span>
                  <ArrowRight className="w-4 h-4 text-[#0c2940]" />
                </button>

                <button
                  id="hero-enroll-directly-btn"
                  onClick={scrollToInterview}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-transparent border-2 border-white/40 hover:border-white text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer"
                >
                  <span>ENROLL DIRECTLY</span>
                </button>
              </div>

              {/* CTA support line */}
              <p className="font-opensans text-xs text-[#ffffff]/70 pt-1">
                30 minutes with a thinking partner. Beta cohort, Q4 2026.
              </p>
            </div>

          </div>

          {/* Right Column: Hero card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full flex flex-col bg-[#123652]/90 backdrop-blur-md rounded-2xl border-2 border-[#39918d]/50 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#39918d] via-[#f8c51c] to-[#c57b4b]" />
              
              {/* Card Header Label */}
              <div className="flex items-center justify-between mb-4 border-b border-[#3f6d67]/40 pb-3">
                <span className="font-montserrat font-bold text-xs tracking-widest uppercase text-[#f8c51c]">
                  PARTICIPANT FILE / 001
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#39918d]/20 text-[#39918d] font-montserrat font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Case
                </span>
              </div>

              {/* Quote */}
              <div className="relative mb-5">
                <Quote className="w-7 h-7 text-[#f8c51c]/30 mb-2" />
                <blockquote className="font-opensans italic text-sm sm:text-base text-[#ffffff]/95 leading-relaxed">
                  &ldquo;I walked in convinced this wasn&apos;t for me. I walked out with a 5-year strategic plan, three custom AI assistants, and a clear path to scale my impact without scaling my team.&rdquo;
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="mb-6 pt-3 border-t border-[#3f6d67]/30">
                <div className="font-montserrat font-bold text-sm text-[#ffffff]">
                  Andy Ivey
                </div>
                <div className="font-opensans text-xs text-[#ffffff]/75 mt-0.5 leading-snug">
                  Fundraising Lead, Family Legacy. 8,000 sponsored children in Zambia.
                </div>
              </div>

              {/* Card footer */}
              <div className="mt-auto pt-3.5 border-t border-[#3f6d67]/50 flex items-center justify-between bg-[#0c2940]/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-3.5">
                <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#ffffff]/80">
                  SIX WEEKS LATER
                </span>
                <span className="font-montserrat font-extrabold text-base text-[#f8c51c]">
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

