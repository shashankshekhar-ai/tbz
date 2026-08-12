"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Clock } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  quote: string;
  isPending: boolean;
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

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

        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-14 relative overflow-hidden min-h-[380px] flex flex-col justify-between shadow-sm">
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

          <div className="space-y-6 my-auto">
            <blockquote className="font-h1 font-medium text-2xl sm:text-4xl text-[#0c2940] leading-relaxed tracking-tight">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {current.isPending && (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg text-xs text-[#b45309] font-caption font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Pending Confirmation &amp; Release</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-h2 font-bold text-xl text-[#0c2940]">{current.name}</h3>
              <p className="font-body text-sm text-[#0f766e] font-bold mt-0.5">
                {current.title} — <span className="text-slate-600 font-normal">{current.organization}</span>
              </p>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-[#0c2940]" : "w-2 bg-slate-200 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-center text-slate-700 hover:text-[#0c2940] hover:border-[#0c2940] transition-colors focus:outline-none shadow-xs"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-center text-slate-700 hover:text-[#0c2940] hover:border-[#0c2940] transition-colors focus:outline-none shadow-xs"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
