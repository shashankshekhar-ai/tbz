"use client";

import { ChevronDown } from "lucide-react";

export function HomeHero() {
  return (
    <section
      id="hero"
      className="relative -mt-20 min-h-[100vh] flex flex-col justify-center items-center overflow-hidden text-white px-4 sm:px-6 lg:px-8 pt-28 pb-20"
      style={{
        backgroundImage: "url('/brand/hero-image-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-h1 leading-tight tracking-tight">
            Stop Implementing AI Tools.
            <br />
            Start Architecting Human Performance.
          </h1>

          <p className="text-lg md:text-xl text-slate-200 font-h3 leading-relaxed max-w-2xl">
            Talk to Columbus in the corner —
            tell us what you&apos;re working through, and our team will follow up personally.
          </p>
        </div>

        <div className="mt-24 flex justify-center">
          <a href="#latest-updates" className="flex flex-col items-center gap-2 group">
            <span className="text-xs tracking-[0.25em] text-slate-300 group-hover:text-[#f8c51c]">
              SCROLL DOWN
            </span>

            <div className="w-11 h-11 rounded-full border border-slate-400 flex items-center justify-center group-hover:border-[#f8c51c] transition">
              <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-[#f8c51c]" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
