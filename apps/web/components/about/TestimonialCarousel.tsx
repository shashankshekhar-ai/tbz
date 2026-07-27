"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length, isPaused]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-[#0c2940] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-white">Voices of Impact</h2>
            <p className="text-sm font-roboto text-[#D9E3E6] leading-relaxed">
              Real people. Real results. Measurable transformation.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <Link
                href="/contact"
                className="bg-[#39918d] hover:bg-[#2d7774] text-white font-inter font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center space-x-2"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-[#39918d] flex items-center justify-center text-white hover:text-[#39918d] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-[#39918d] flex items-center justify-center text-white hover:text-[#39918d] transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-8 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className={`glass-card rounded-2xl p-6 border transition-all duration-500 flex flex-col justify-between space-y-4 ${
                    idx === currentIndex ? "border-[#39918d] shadow-2xl scale-[1.02]" : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-3">
                    <Quote className="w-6 h-6 text-[#39918d] opacity-80" />
                    <p className="text-sm font-roboto text-[#EDF2F4] leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs font-montserrat font-bold text-white block">{t.name}</span>
                    <span className="text-[11px] font-roboto text-[#BFC9CD] block leading-tight">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-6 bg-[#39918d]" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
