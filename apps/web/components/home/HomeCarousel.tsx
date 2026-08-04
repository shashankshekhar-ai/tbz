"use client";

import { useState } from "react";
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

function renderIcon(iconName: string, color: string) {
  const props = { className: "w-5 h-5", style: { color } };
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
  const visibleCount = 3;
  const maxIndex = Math.max(0, slides.length - visibleCount);

  const prevSlide = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  const nextSlide = () => setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));

  return (
    <section id="latest-updates" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-h2 text-[#0c2940]">
          Latest Updates &amp; Industry Briefs
        </h2>

        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            aria-label="Previous updates"
            className="w-9 h-9 rounded-full border border-[#D9E3E8] hover:border-[#39918d] bg-white text-[#0c2940] hover:text-[#39918d] flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next updates"
            className="w-9 h-9 rounded-full border border-[#D9E3E8] hover:border-[#39918d] bg-white text-[#0c2940] hover:text-[#39918d] flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
        >
          {slides.map((slide) => (
            <Link
              key={slide.id}
              href={resolveHref(slide.linkUrl)}
              className="w-full min-w-[280px] md:min-w-[calc(33.333%-16px)] bg-white rounded-2xl p-6 border border-[#D9E3E8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${slide.accentColor}1a` }}>
                    {renderIcon(slide.icon, slide.accentColor)}
                  </div>
                  <span className="text-[11px] font-h3 text-[#5d6b74] bg-[#F8FAFB] border border-[#D9E3E8] px-2.5 py-1 rounded-full">
                    {slide.subtitle}
                  </span>
                </div>

                <h3 className="text-lg font-h3 text-[#0c2940] mb-2">{slide.title}</h3>
                <p className="text-xs font-body text-[#5d6b74] leading-relaxed mb-6">{slide.description}</p>
              </div>

              <div className="pt-4 border-t border-[#D9E3E8] flex items-center justify-between text-xs font-medium">
                <span className="font-caption italic text-[#5d6b74]">{slide.dateOrTag}</span>
                <span className="text-[#39918d] hover:text-[#3f6d67] font-semibold transition-colors">
                  {slide.linkText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              currentIndex === idx ? "bg-[#39918d] w-6" : "bg-[#D9E3E8] hover:bg-slate-400 w-2.5"
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5d6b74] hover:text-[#0c2940] transition-colors"
        >
          <span>{seeAllText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#39918d]" />
        </Link>
      </div>
    </section>
  );
}
