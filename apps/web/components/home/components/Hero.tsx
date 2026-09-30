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
        min-h-[680px]
        overflow-hidden
        text-white
      "
    >
      {/* ======================================================= */}
      {/* BACKGROUND                                              */}
      {/* ======================================================= */}

      <div
        className="
          absolute
          inset-0
          z-0
          bg-[url('/hero-image-bg.png')]
          bg-cover
          bg-center
          bg-no-repeat
          md:bg-[position:60%_center]
          lg:bg-[position:center_center]
        "
      />

      {/* ======================================================= */}
      {/* DARK OVERLAY                                             */}
      {/* ======================================================= */}

      <div
        className="
          absolute
          inset-0
          z-[1]
          bg-black/35
          pointer-events-none
        "
      />

      {/* ======================================================= */}
      {/* MAIN HERO CONTAINER                                     */}
      {/* ======================================================= */}

      <div
        className="
          relative
          z-10
          w-full
          h-full
          max-w-[1536px]
          mx-auto
          px-6
          sm:px-8
          md:px-10
          lg:px-10
          xl:px-12
          2xl:px-16
        "
      >
        {/* ===================================================== */}
        {/* HERO TEXT                                             */}
        {/* ===================================================== */}

        <div
          className="
            absolute
            z-30
            left-0
            top-[43%]
            -translate-y-1/2
            overflow-visible
          "
        >
          {/* =================================================== */}
          {/* HEADING                                              */}
          {/* =================================================== */}

          <h1
            className="
              m-0
              p-0
              font-bold
              tracking-[-0.025em]
              leading-[1.05]
              text-white
              overflow-visible
              whitespace-normal
            "
          >
            {/* ================================================= */}
            {/* FIRST LINE                                         */}
            {/* ================================================= */}

            <span
              className="
                block
                whitespace-normal
                sm:whitespace-nowrap
                text-[38px]
                sm:text-[46px]
                md:text-[54px]
                lg:text-[60px]
                xl:text-[66px]
                2xl:text-[70px]
                leading-[1.05]
              "
            >
              Stop Implementing AI Tools.
            </span>

            {/* ================================================= */}
            {/* GRADIENT LINE                                      */}
            {/* ================================================= */}

            <span
              className="
                block
                mt-1
                max-w-full
                md:max-w-[760px]
                lg:max-w-[820px]
                xl:max-w-[900px]
                whitespace-normal
                text-[28px]
                sm:text-[32px]
                md:text-[38px]
                lg:text-[40px]
                xl:text-[44px]
                2xl:text-[48px]
                leading-[1.05]
                bg-gradient-to-r
                from-[#c57b4b]
                via-[#d98d4a]
                to-[#f8c51c]
                bg-clip-text
                text-transparent
              "
            >
              Start Architecting Human Performance
            </span>
          </h1>

          {/* =================================================== */}
          {/* DESCRIPTION                                          */}
          {/* =================================================== */}

          <h3
            className="
              mt-6
              sm:mt-6
              md:mt-7
              max-w-[850px]
              text-[16px]
              sm:text-[16px]
              md:text-[18px]
              lg:text-[21px]
              xl:text-[24px]
              leading-[1.45]
              font-medium
              tracking-[-0.01em]
              text-white
              whitespace-normal
            "
          >
            Tell us what you're working through, and our team will follow up
            personally.
          </h3>
        </div>

        {/* ===================================================== */}
        {/* SCROLL DOWN                                           */}
        {/* ===================================================== */}

        <div
          className="
            absolute
            z-30
            bottom-5
            sm:bottom-6
            md:bottom-7
            lg:bottom-8
            left-1/2
            -translate-x-1/2
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
              focus:outline-none
            "
          >
            <span
              className="
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                lg:text-[11px]
                tracking-[0.25em]
                text-slate-300
                transition-colors
                duration-200
                group-hover:text-[#f8c51c]
              "
            >
              SCROLL DOWN
            </span>

            <div
              className="
                w-8
                h-8
                sm:w-9
                sm:h-9
                md:w-10
                md:h-10
                rounded-full
                border
                border-slate-400
                flex
                items-center
                justify-center
                transition-colors
                duration-200
                group-hover:border-[#f8c51c]
              "
            >
              <ChevronDown
                className="
                  w-3.5
                  h-3.5
                  sm:w-4
                  sm:h-4
                  text-white
                  animate-bounce
                  transition-colors
                  duration-200
                  group-hover:text-[#f8c51c]
                "
              />
            </div>
          </button>
        </div>
      </div>

      {/* ======================================================= */}
      {/* RESPONSIVE BACKGROUND                                   */}
      {/* ======================================================= */}

      <style>{`
        /* ================================================ */
        /* TABLET                                           */
        /* ================================================ */

        @media (min-width: 768px) and (max-width: 1023px) {
          #hero > div:first-child {
            background-position: 62% center !important;
          }
        }

        /* ================================================ */
        /* MOBILE                                           */
        /* ================================================ */

        @media (max-width: 767px) {
          #hero {
            height: 100svh;
            min-height: 650px;
          }

          #hero > div:first-child {
            background-position: 69% center !important;
          }

          #hero h1 span:first-child {
            white-space: normal !important;
          }

          #hero h1 span:nth-child(2) {
            width: auto !important;
            max-width: 100% !important;
            white-space: normal !important;
          }
        }

        /* ================================================ */
        /* SMALL MOBILE                                     */
        /* ================================================ */

        @media (max-width: 480px) {
          #hero {
            min-height: 630px;
          }

          #hero > div:first-child {
            background-position: 73% center !important;
          }
        }
      `}</style>
    </section>
  );
};