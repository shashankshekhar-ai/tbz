'use client';

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onOpenBooking: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="home-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative bg-[#0c2940] rounded-3xl p-8 sm:p-14 text-center text-white overflow-hidden border border-[#39918d]/30 shadow-2xl starfield-bg">
        {/* Subtle Constellation Lines Background Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#39918d" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="#c57b4b" strokeWidth="0.5" />
            <circle cx="10%" cy="20%" r="2" fill="#f8c51c" />
            <circle cx="40%" cy="50%" r="2.5" fill="#39918d" />
            <circle cx="80%" cy="30%" r="2" fill="#ffffff" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <h2 className="t-h2 text-white">
            Not Sure Which Path Is Right for You?
          </h2>

          <p className="home-lead text-slate-300 font-body max-w-2xl mx-auto leading-relaxed">
           Talk it through with us directly.
          </p>

          <div className="pt-4 flex flex-col items-center gap-4">
            <button
              onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ02gbI3oOoAkk6FnRZpu6RUQTiAo23ewsroiiCMwZD_Jcf8yRwqAFRAz11Xy9kDhIE10O74E_Yp', '_blank')}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-[#39918d] hover:bg-[#3f6d67] transition-all shadow-xl hover:shadow-[#39918d]/20 cursor-pointer group border border-[#39918d]/50"
            >
              <Calendar className="w-4 h-4 text-[#f8c51c]" />
              <span>Book a discovery call</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-slate-300 font-caption italic">
              
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
