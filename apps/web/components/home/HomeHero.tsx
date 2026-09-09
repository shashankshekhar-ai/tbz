"use client";

import { ChevronDown } from "lucide-react";

export function HomeHero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden text-white"
      style={{
        backgroundImage: "url('/brand/hero-image-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 pt-[125px]">
        <div className="absolute left-6 lg:left-8 top-[43%] -translate-y-1/2 w-full max-w-[900px] pr-8">
          <h1 className="text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px] xl:text-[50px] font-bold leading-[1.08] tracking-[-0.02em] text-white max-w-[900px]">
            Stop Implementing AI Tools.
            <br />
            Start Architecting Human Performance.
          </h1>
        </div>

        <div className="absolute bottom-[28px] sm:bottom-[32px] left-1/2 -translate-x-1/2 z-20">
          <a href="#latest-updates" className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-slate-300 group-hover:text-[#f8c51c] transition-colors">
              SCROLL DOWN
            </span>

            <div className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center group-hover:border-[#f8c51c] transition-all">
              <ChevronDown className="w-4 h-4 text-white animate-bounce group-hover:text-[#f8c51c] transition-colors" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
