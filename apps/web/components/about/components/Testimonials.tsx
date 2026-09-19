'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Quote, Clock } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  // Continuous auto-sliding animation effect every 4.5 seconds without requiring clicking
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIdx ? 1 : -1);
    setCurrentIdx(index);
  };

  const current = TESTIMONIALS_DATA[currentIdx];

  // Slide animation variants for continuous horizontal sliding motion
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 240, damping: 26 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 240, damping: 26 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  return (
    <section id="testimonials" className="relative pt-10 pb-16 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-20 px-6 sm:px-8 lg:px-12 bg-[#f8fafc] border-b border-slate-200 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 glow-teal pointer-events-none opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Header with Oversized Number Visual Object */}
        <div className="mb-10 sm:mb-12 border-b border-slate-200 pb-6">
          <h2 className="t-h2 text-[#0c2940]">
            Testimonials
          </h2>
        </div>

        {/* Editorial Carousel Main Container with Continuous Auto-sliding animation */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-14 relative overflow-hidden min-h-[420px] flex flex-col justify-between shadow-sm transition-shadow hover:shadow-md">
          {/* Top Giant Quotation Mark and Numeric Pagination */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="text-slate-200">
              <Quote className="w-14 h-14 sm:w-18 sm:h-18 stroke-[1.2]" />
            </div>

            {/* Counter */}
            <div className="flex items-center gap-2 font-h1 font-bold text-sm tracking-widest text-[#0c2940] bg-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200">
              <span>{String(currentIdx + 1).padStart(2, '0')}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-700">{String(TESTIMONIALS_DATA.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Testimonial Quote Sliding Track */}
          <div className="relative w-full overflow-hidden my-auto py-4 min-h-[220px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 w-full"
              >
                <blockquote className="font-h1 font-medium text-2xl sm:text-3xl lg:text-4xl text-[#0c2940] leading-relaxed tracking-tight">
                  “{current.quote}”
                </blockquote>


                {/* Author Attribution */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-h2 font-bold text-xl text-[#0c2940]">
                    {current.name}
                  </h3>
                  <p className="font-h3 text-sm text-[#2d7773] font-medium mt-0.5">
                    {current.title}, <span className="font-body text-slate-600 font-normal">{current.organization}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Footer: Animated Progress Line & Track */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((item, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => goToSlide(idx)}
                    className="relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                    style={{ width: isActive ? '48px' : '12px' }}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    title={item.name}
                  >
                    {/* Background track */}
                    <div className="absolute inset-0 bg-slate-200 rounded-full" />
                    {/* Active filling progress bar */}
                    {isActive ? (
                      <motion.div
                        key={`progress-${currentIdx}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: 'linear' }}
                        className="absolute inset-0 bg-[#0c2940] rounded-full"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};
