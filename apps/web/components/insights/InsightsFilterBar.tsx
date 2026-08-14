"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { CATEGORY_LABELS } from "./types";

const TOPICS = [{ value: "all", label: "All" }, ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))];

export function InsightsFilterBar({ activeTopic, activeSearch }: { activeTopic: string; activeSearch: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(activeSearch);
  const [, startTransition] = useTransition();

  useEffect(() => setQuery(activeSearch), [activeSearch]);

  function pushParams(next: { topic?: string; q?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    const topic = next.topic ?? activeTopic;
    const q = next.q ?? query;

    if (topic && topic !== "all") params.set("topic", topic);
    else params.delete("topic");

    if (q) params.set("q", q);
    else params.delete("q");

    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
    });
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      if (query !== activeSearch) pushParams({ q: query });
    }, 350);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="space-y-5">
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#60707A]" aria-hidden="true" />
        <label htmlFor="insights-search" className="sr-only">
          Search insights
        </label>
        <input
          id="insights-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search insights"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D9E3E6] font-roboto text-sm text-[#0c2940] placeholder:text-[#60707A] focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" role="group" aria-label="Filter insights by topic">
        {TOPICS.map((topic) => {
          const active = activeTopic === topic.value || (activeTopic === "" && topic.value === "all");
          return (
            <button
              key={topic.value}
              type="button"
              aria-pressed={active}
              onClick={() => pushParams({ topic: topic.value })}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#39918d] ${
                active
                  ? "bg-[#0c2940] text-white"
                  : "bg-white text-[#0c2940] border border-[#D9E3E6] hover:border-[#39918d]"
              }`}
            >
              {topic.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
