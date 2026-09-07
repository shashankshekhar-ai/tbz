"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Ticket } from "lucide-react";
import { WORKSHOP_CATEGORIES, type Workshop, type WorkshopCategory } from "./workshopsData";

export function WorkshopCatalog({ workshops }: { workshops: Workshop[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<WorkshopCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workshops.filter((workshop) => {
      const matchesCategory = category === "all" || workshop.category === category;
      const matchesQuery =
        q.length === 0 ||
        workshop.title.toLowerCase().includes(q) ||
        workshop.description.toLowerCase().includes(q) ||
        workshop.formatTag.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [workshops, query, category]);

  return (
    <div className="space-y-8">
      {/* Search + category filter controls */}
      <div className="rounded-xl border border-[#D9E3E6] bg-[#F7F8F9] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#60707A] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <label htmlFor="workshop-search" className="sr-only">
            Search workshops
          </label>
          <input
            id="workshop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search catalog sessions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D9E3E6] bg-white font-roboto text-sm text-[#0c2940] placeholder:text-[#60707A] focus:outline-none focus:ring-2 focus:ring-[#39918d] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto" role="group" aria-label="Filter workshops by audience">
          {WORKSHOP_CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-inter text-xs font-semibold transition-colors ${
                  active
                    ? "bg-[#39918d] text-white shadow-sm"
                    : "bg-white text-[#60707A] border border-[#D9E3E6] hover:border-[#39918d] hover:text-[#0c2940]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 space-y-2">
          <h2 className="text-xl font-montserrat font-bold text-[#0c2940]">No workshops found</h2>
          <p className="text-sm font-roboto text-[#60707A]">Try adjusting your search or selecting another audience.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((workshop) => (
            <div
              key={workshop.id}
              className="rounded-2xl border border-[#D9E3E6] bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 hover:border-[#39918d] hover:shadow-lg"
            >
              <div className="space-y-2 max-w-3xl">
                <span className="text-xs font-inter font-bold uppercase tracking-widest text-[#39918d] block">
                  {workshop.formatTag}
                </span>
                <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-[#0c2940] leading-tight">
                  {workshop.title}
                </h3>
                <p className="text-sm sm:text-base font-roboto text-[#60707A] leading-relaxed">
                  {workshop.description}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border-2 border-[#0c2940] text-[#0c2940] font-inter font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#0c2940] hover:text-white whitespace-nowrap"
                >
                  <Ticket className="w-4 h-4 text-[#f8c51c]" aria-hidden="true" />
                  <span>Reserve a Seat</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
