"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function HomeHero() {
  return (
    <section
      id="hero"
      className="relative -mt-20 w-full starfield-bg text-white min-h-[85vh] flex flex-col justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full">
          <line x1="15%" y1="20%" x2="35%" y2="40%" stroke="#39918d" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
          <line x1="35%" y1="40%" x2="65%" y2="30%" stroke="#39918d" strokeWidth="0.5" opacity="0.4" />
          <line x1="65%" y1="30%" x2="85%" y2="60%" stroke="#c57b4b" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
          <line x1="25%" y1="70%" x2="55%" y2="80%" stroke="#39918d" strokeWidth="0.5" opacity="0.3" />
          <circle cx="15%" cy="20%" r="2" fill="#ffffff" />
          <circle cx="35%" cy="40%" r="3" fill="#f8c51c" />
          <circle cx="65%" cy="30%" r="2.5" fill="#39918d" />
          <circle cx="85%" cy="60%" r="3" fill="#c57b4b" />
          <circle cx="25%" cy="70%" r="2" fill="#ffffff" />
          <circle cx="55%" cy="80%" r="3" fill="#f8c51c" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          <div className="w-full lg:w-1/2 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#39918d]/15 border border-[#39918d]/30 text-xs font-inter font-medium text-[#f8c51c] tracking-wide">
              <span className="italic">Enterprise AI Adoption &amp; Transformation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-inter font-extrabold tracking-tight leading-tight text-white">
              Human-Centered AI
              <br />
              Transformation
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#a3b8c2] max-w-xl font-roboto leading-relaxed">
              Guiding leaders and organizations through a proven capability evolution from awareness to
              sustainable enterprise impact.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
            <Image
              src="/brand/hero-illustration-v2.png"
              alt="The Bradbury Group — AI transformation illustration"
              width={420}
              height={420}
              priority
              className="w-64 sm:w-80 md:w-96 lg:w-80 xl:w-96 h-auto object-contain rounded-md shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto flex justify-center pt-14">
        <a href="#whats-moving" className="flex flex-col items-center cursor-pointer group">
          <span className="text-[10px] font-inter tracking-[0.2em] text-[#718898] uppercase font-semibold mb-2 group-hover:text-[#39918d] transition-colors">
            SCROLL DOWN
          </span>
          <div className="w-9 h-9 rounded-full border border-slate-600 group-hover:border-[#f8c51c] flex items-center justify-center bg-[#0c2940]/80 backdrop-blur shadow-lg transition-colors">
            <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-[#f8c51c] animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
