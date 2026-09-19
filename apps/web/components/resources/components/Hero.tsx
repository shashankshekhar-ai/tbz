'use client';

import React from 'react';

interface HeroProps {
  unlockedCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export const Hero: React.FC<HeroProps> = ({
  unlockedCount,
  totalCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
}) => {
  return (
    <header className="relative w-full min-h-[85vh] flex flex-col justify-center border-b border-[#0c2940]/10 bg-gradient-to-b from-[#0c2940]/[0.03] to-white pt-[calc(108px+3vh)] pb-[4vh]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow / Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0c2940]/5 border border-[#0c2940]/15 text-[#0c2940]">
            <span className="h-2 w-2 rounded-full bg-[#39918d] animate-pulse" aria-hidden="true"></span>
            <span className="font-h3 text-xs tracking-wider uppercase font-semibold text-[#0c2940]">
              RESOURCES & FRAMEWORKS
            </span>
          </div>

          {unlockedCount > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3f6d67]/10 text-[#3f6d67] border border-[#3f6d67]/30 text-xs font-body font-medium">
              <svg className="w-4 h-4 text-[#39918d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{unlockedCount} of {totalCount} tools unlocked in this session</span>
            </div>
          )}
        </div>

        {/* Headline (H1): Inter */}
        <h1
          id="page-main-headline" className="t-h1 text-[#0c2940] max-w-4xl"
        >
          Free Tools From the Same Playbook
        </h1>

        {/* Subheadline (H2/Subtitles): Montserrat */}
        <p
          id="hero-subheadline"
          className="font-h2 mt-5 text-lg sm:text-xl md:text-2xl text-[#3f6d67] font-medium leading-relaxed max-w-3xl"
        >
          These are the actual frameworks we use inside paid engagements. Download the ones that solve your problem right now.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories Pill Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist" aria-label="Filter resources by category">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(cat)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-h3 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#0c2940] ${
                    isActive
                      ? 'bg-[#0c2940] text-white shadow-sm font-semibold'
                      : 'bg-slate-100 text-[#0c2940] hover:bg-slate-200/80 font-medium'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <label htmlFor="resource-search-input" className="sr-only">
              Search resources by keyword or topic
            </label>
            <input
              id="resource-search-input"
              type="search"
              placeholder="Search frameworks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-[44px] pl-10 pr-4 rounded-lg bg-white border border-slate-300 text-sm font-body text-[#0c2940] placeholder:text-slate-500 focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-all"
            />
            <svg
              className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
