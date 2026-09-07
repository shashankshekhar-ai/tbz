"use client";

import { useEffect, useState } from "react";
import { Quote, Clock } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  quote: string;
  isPending: boolean;
}

const AUTOPLAY_MS = 4500;

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Continuous auto-advance, pausing briefly for a fade transition on each change.
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsVisible(true);
      }, 220);
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setIsVisible(false);
    window.setTimeout(() => {
      setCurrentIndex(index);
      setIsVisible(true);
    }, 150);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 px-6 sm:px-8 lg:px-12 bg-[#f8fafc] border-b border-slate-200 overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-96 h-96 glow-teal pointer-events-none opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline mb-16 border-b border-slate-200 pb-8">
          <div className="lg:col-span-3 flex items-baseline gap-4">
            <span className="font-h1 font-black text-6xl sm:text-8xl lg:text-9xl text-slate-200 tracking-tighter select-none">
              04
            </span>
            <div className="h-12 w-[1px] bg-slate-200 hidden lg:block" />
          </div>

          <div className="lg:col-span-9 space-y-2">
            <span className="font-h2 text-xs font-bold uppercase tracking-[0.2em] text-[#c57b4b]">
              Social Proof &amp; Credibility
            </span>
            <h2 className="font-h2 font-extrabold text-3xl sm:text-5xl text-[#0c2940]">Testimonials</h2>
            <p className="font-body text-slate-700 text-base sm:text-lg font-normal max-w-2xl">
              Voices from client partners, enterprise enablement directors, and executive advisors.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-14 relative overflow-hidden min-h-[420px] flex flex-col justify-between shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="text-slate-200">
              <Quote className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.2]" />
            </div>

            <div className="flex items-center gap-2 font-h1 font-bold text-sm tracking-widest text-[#0c2940] bg-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200">
              <span>{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">{String(testimonials.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div
            className={`space-y-6 my-auto transition-all duration-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <blockquote className="font-h1 font-medium text-2xl sm:text-4xl text-[#0c2940] leading-relaxed tracking-tight">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {current.isPending && (
              <div className="inline-flex items-center gap-2 bg-[#c57b4b]/10 border border-[#c57b4b]/30 px-3 py-1 rounded-lg text-xs text-[#c57b4b] font-caption font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Pending Confirmation &amp; Release</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-h2 font-bold text-xl text-[#0c2940]">{current.name}</h3>
              <p className="font-body text-sm text-[#39918d] font-bold mt-0.5">
                {current.title} — <span className="text-slate-600 font-normal">{current.organization}</span>
              </p>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {testimonials.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => goToSlide(idx)}
                    className="relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                    style={{ width: isActive ? "48px" : "12px" }}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    title={item.name}
                  >
                    <span className="absolute inset-0 bg-slate-200 rounded-full" />
                    {isActive && (
                      <span
                        key={`progress-${currentIndex}`}
                        className="absolute inset-y-0 left-0 bg-[#0c2940] rounded-full animate-[testimonial-progress_4.5s_linear]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <span className="font-caption text-xs text-slate-500 select-none">
              Voices of our client partners &amp; executive network
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes testimonial-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
