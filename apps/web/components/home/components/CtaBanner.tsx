'use client';

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onOpenBooking: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenBooking }) => {
  return (
    <section
      className="
        w-full
        home-section
        bg-white
        px-4
        sm:px-6
        lg:px-8
      "
    >
      <div className="w-full max-w-[1420px] mx-auto">
        <div
          className="
            relative
            w-full
            min-h-[389.5px]
            bg-[#0c2940]
            rounded-3xl
            px-6
            sm:px-10
            lg:px-16
            py-12
            sm:py-14
            lg:py-16
            flex
            items-center
            justify-center
            text-center
            text-white
            overflow-hidden
            border
            border-[#39918d]/30
            shadow-2xl
            starfield-bg
          "
        >
          {/* Background constellation */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <line
                x1="10%"
                y1="20%"
                x2="40%"
                y2="50%"
                stroke="#39918d"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />

              <line
                x1="40%"
                y1="50%"
                x2="80%"
                y2="30%"
                stroke="#c57b4b"
                strokeWidth="0.5"
              />

              <circle
                cx="10%"
                cy="20%"
                r="2"
                fill="#f8c51c"
              />

              <circle
                cx="40%"
                cy="50%"
                r="2.5"
                fill="#39918d"
              />

              <circle
                cx="80%"
                cy="30%"
                r="2"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Main Content */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-4xl
              mx-auto
              flex
              flex-col
              items-center
              justify-center
            "
          >
            {/* Heading */}
            <h2
              className="
                text-white
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                leading-tight
                tracking-tight
                mb-5
              "
            >
              Not Sure Which Path Is Right for You?
            </h2>

            {/* Supporting Text */}
            <p
              className="
                text-slate-200
                text-lg
                sm:text-xl
                lg:text-2xl
                font-body
                leading-relaxed
                mb-8
              "
            >
              Talk it through with us directly.
            </p>

            {/* CTA */}
            <button
              type="button"
              onClick={() =>
                window.open(
                  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ02gbI3oOoAkk6FnRZpu6RUQTiAo23ewsroiiCMwZD_Jcf8yRwqAFRAz11Xy9kDhIE10O74E_Yp',
                  '_blank'
                )
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                px-9
                sm:px-10
                py-4
                sm:py-5
                rounded-xl
                text-base
                sm:text-lg
                font-bold
                uppercase
                tracking-wider
                text-white
                bg-[#39918d]
                hover:bg-[#3f6d67]
                transition-all
                duration-300
                shadow-xl
                hover:shadow-[#39918d]/30
                cursor-pointer
                group
                border
                border-[#39918d]/50
              "
            >
              <Calendar
                className="
                  w-5
                  h-5
                  sm:w-5.5
                  sm:h-5.5
                  text-[#f8c51c]
                "
              />

              <span>Book a Discovery Call</span>

              <ArrowRight
                className="
                  w-5
                  h-5
                  text-white
                  group-hover:translate-x-1
                  transition-transform
                "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};