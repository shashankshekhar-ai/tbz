"use client";

import { ChevronDown } from "lucide-react";
import { AiWaveCanvas } from "./AiWaveCanvas";

export function HomeHero() {
  return (
    <section
      id="hero"
      className="relative -mt-20 w-full bg-[#0c2940] text-white min-h-[85vh] flex flex-col justify-between pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
        <AiWaveCanvas />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto pt-2">
        <div className="inline-flex items-center space-x-2 bg-[#0c2132] text-[#c0d1dd] border border-[#1e384d] px-4 py-1.5 rounded-full text-xs font-inter font-normal tracking-wide shadow-sm">
          <span>The Bradbury Group — AI Adoption Platform</span>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center px-4 py-12">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-inter font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          Human-Centered AI
          <br />
          Transformation
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-[#a3b8c2] font-roboto font-normal max-w-2xl mx-auto leading-relaxed">
          Guiding leaders and organizations through a proven capability evolution from awareness to
          sustainable enterprise impact.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto flex justify-center pt-8">
        <a href="#whats-moving" className="flex flex-col items-center cursor-pointer group">
          <span className="text-[10px] font-mono tracking-[0.2em] text-[#718898] uppercase font-semibold mb-2 group-hover:text-[#39918d] transition-colors">
            SCROLL DOWN
          </span>
          <div className="w-5 h-9 rounded-full border border-[#39918d]/70 flex items-start justify-center p-1 shadow-xs group-hover:border-[#39918d] transition-colors">
            <div className="w-1.5 h-2 bg-[#39918d] rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#718898] mt-1.5 group-hover:text-[#39918d] transition-colors" />
        </a>
      </div>
    </section>
  );
}
