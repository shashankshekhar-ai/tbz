"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, BarChart2, Users, Presentation, FileText, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface CarouselSlide {
  id: string;
  icon: "calendar" | "barChart" | "users" | "presentation" | "fileText";
  title: string;
  subtitle: string;
  dateOrTag: string;
  description: string;
  linkText: string;
  linkUrl: string;
  accentColor: string;
}

const ROUTE_MAP: Record<string, string> = {
  "for-you": "/ai-fluency-cohort",
  "for-leaders": "/the-solomon-engine",
  "for-organizations": "/for-organizations",
  "our-roi": "/our-ai-return",
  resources: "/resources",
  insights: "/insights",
  about: "/about",
};

function resolveHref(anchor: string) {
  const key = anchor.replace("#", "");
  return ROUTE_MAP[key] ?? "/insights";
}

function renderIcon(iconName: string) {
  const props = { className: "w-6 h-6 text-white" };
  switch (iconName) {
    case "calendar":
      return <Calendar {...props} />;
    case "barChart":
      return <BarChart2 {...props} />;
    case "users":
      return <Users {...props} />;
    case "presentation":
      return <Presentation {...props} />;
    case "fileText":
    default:
      return <FileText {...props} />;
  }
}

export function HomeCarousel({ slides, seeAllText }: { slides: CarouselSlide[]; seeAllText: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 40) handleNext();
    else if (diffX < -40) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      id="whats-moving"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto focus:outline-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-[#0c2940]">Latest Updates &amp; Industry Briefs</h2>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-2 rounded-full border border-[#D9E3E6] bg-white text-[#0c2940] hover:bg-[#39918d] hover:text-white hover:border-[#39918d] transition-all shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-2 rounded-full border border-[#D9E3E6] bg-white text-[#0c2940] hover:bg-[#39918d] hover:text-white hover:border-[#39918d] transition-all shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <Link
              key={slide.id}
              href={resolveHref(slide.linkUrl)}
              onClick={() => setCurrentIndex(index)}
              className={`group relative rounded-[20px] p-6 border transition-all duration-300 flex flex-col justify-between min-h-[240px] ${
                isActive
                  ? "bg-white border-[#39918d] shadow-lg ring-2 ring-[#39918d]/20 scale-[1.02]"
                  : "bg-[#F7F8F9] border-[#D9E3E6] hover:border-[#39918d]/60 hover:bg-white hover:shadow-md"
              }`}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm"
                  style={{ backgroundColor: slide.accentColor || "#39918d" }}
                >
                  {renderIcon(slide.icon)}
                </div>

                <h3 className="text-lg font-montserrat font-bold text-[#0c2940] leading-tight group-hover:text-[#39918d] transition-colors mb-1">
                  {slide.title}
                </h3>
                <p className="text-xs font-roboto italic text-[#60707A] mb-3">{slide.subtitle}</p>
                <p className="text-xs text-[#60707A] font-roboto line-clamp-2">{slide.description}</p>
              </div>

              <div className="pt-4 border-t border-[#EDF2F4] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#60707A] bg-[#EDF2F4] px-2 py-0.5 rounded">
                  {slide.dateOrTag}
                </span>
                <span className="text-xs font-inter font-semibold text-[#39918d] group-hover:translate-x-1 transition-transform">
                  {slide.linkText}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center space-x-2 mt-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-[#39918d]" : "w-2.5 bg-[#BFC9CD] hover:bg-[#60707A]"
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/insights"
          className="inline-flex items-center space-x-2 text-sm font-inter font-semibold text-[#39918d] hover:text-[#0c2940] transition-colors group"
        >
          <span>{seeAllText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
