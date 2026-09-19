'use client';

import React from "react";
import { ChevronDown } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToContent = () => {
    const el = document.getElementById("latest-updates");

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="hero"
      className="
        relative
        w-full
        h-screen
        min-h-[700px]
        overflow-hidden
        text-white
      "
      style={{
        backgroundImage: "url('/hero-image-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* ========================================================= */}
      {/* HERO CONTENT */}
      {/* ========================================================= */}
      <div
        className="
          relative
          z-10
          h-full
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          pt-[125px]
        "
      >
        {/* ======================================================= */}
        {/* TEXT CONTENT */}
        {/* ======================================================= */}
        <div
          className="
            absolute
            left-6
            lg:left-8
            top-[43%]
            -translate-y-1/2
            w-full
            max-w-[1200px]
            pr-8
          "
        >
          {/* Main Heading */}
          <h1 className="t-h1 text-white max-w-[1200px]">
            <span className="block text-[clamp(2.25rem,1.2rem+3.2vw,4rem)]">Stop Implementing AI Tools.</span>
            <span className="block mt-1 text-[clamp(1.6rem,1rem+2.3vw,2.9rem)] bg-gradient-to-r from-[#c57b4b] to-[#f8c51c] bg-clip-text text-transparent">
              Start Architecting Human Performance
            </span>
          </h1>
        </div>

        {/* ======================================================= */}
        {/* SCROLL DOWN */}
        {/* ======================================================= */}
        <div
          className="
            absolute
            bottom-[28px]
            sm:bottom-[32px]
            left-1/2
            -translate-x-1/2
            z-20
          "
        >
          <button
            type="button"
            onClick={scrollToContent}
            aria-label="Scroll down to latest updates"
            className="
              flex
              flex-col
              items-center
              gap-1.5
              group
              cursor-pointer
            "
          >
            {/* Scroll Label */}
            <span
              className="
                text-[10px]
                sm:text-[11px]
                tracking-[0.25em]
                text-slate-300
                group-hover:text-[#f8c51c]
                transition-colors
              "
            >
              SCROLL DOWN
            </span>

            {/* Arrow Circle */}
            <div
              className="
                w-10
                h-10
                rounded-full
                border
                border-slate-400
                flex
                items-center
                justify-center
                group-hover:border-[#f8c51c]
                transition-all
              "
            >
              <ChevronDown
                className="
                  w-4
                  h-4
                  text-white
                  animate-bounce
                  group-hover:text-[#f8c51c]
                  transition-colors
                "
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};