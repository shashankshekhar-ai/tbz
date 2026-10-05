'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { ParticleAnimation } from './ParticleAnimation';

interface HeroProps {
  onOpenAurilis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAurilis }) => {
  return (
    <section className="relative overflow-hidden bg-[#0c2940] text-white pt-[calc(96px+3.5rem)] pb-14 sm:pt-[calc(102px+5rem)] sm:pb-20 lg:pt-[calc(108px+7rem)] lg:pb-28 border-b border-[#39918d]/30">
      {/* 50% opacity moving particle animation in the BG */}
      <ParticleAnimation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-h1 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#ffffff] tracking-tight leading-[1.15] mb-5 sm:mb-6 max-w-5xl">
          We rebuilt how our team learns AI. Here’s the playbook.
        </h1>

        <p className="font-h2 text-sm sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mb-8 sm:mb-10">
          Random tutorials weren’t cutting it. Smart, capable people were spending months dabbling
          with AI tools and getting nowhere because the structure, guardrails, and measurement
          weren’t there. So we redesigned the whole approach: a 12-week, evidence-based program aligned
          with the U.S. Department of Labor framework. Two phases. Real outcomes. Measurable ROI.
        </p>

        {/* Watch Aurilis’s Story · 0:30 & Troubleshooting PowerBI: 5+ hours → <2 minutes */}
        <div className="pt-1 sm:pt-2">
          <button
            type="button"
            onClick={onOpenAurilis}
            className="group inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4 sm:px-6 sm:py-4 rounded-xl bg-[#3f6d67]/90 hover:bg-[#345b56] border border-[#39918d] text-white transition-all shadow-lg hover:shadow-xl cursor-pointer text-left backdrop-blur-xs max-w-full"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f8c51c] text-[#0c2940] flex items-center justify-center shrink-0 shadow">
                <Play className="w-5 h-5 fill-[#0c2940] ml-0.5" />
              </span>
              <span className="font-h1 font-bold text-base sm:text-lg text-white">
                Watch Aurilis’s Story · 0:30
              </span>
            </div>
            <div className="text-xs sm:text-sm text-[#f8c51c] font-h3 font-medium sm:border-l sm:border-white/20 sm:pl-5">
              Troubleshooting PowerBI: 5+ hours → &lt;2 minutes
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
