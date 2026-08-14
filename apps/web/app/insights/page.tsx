import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts, getFeaturedPost } from "@/lib/cms";
import { FeaturedInsight } from "@/components/insights/FeaturedInsight";
import { InsightCard } from "@/components/insights/InsightCard";
import { InsightsFilterBar } from "@/components/insights/InsightsFilterBar";
import { Pagination } from "@/components/insights/Pagination";
import type { Insight } from "@/components/insights/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical guidance, research, and perspectives from The Bradbury Group on leadership, organizational performance, workplace culture, and sustainable growth.",
};

const PAGE_SIZE = 9;

type Props = {
  searchParams: Promise<{ topic?: string; q?: string; page?: string }>;
};

export default async function InsightsPage({ searchParams }: Props) {
  const { topic = "", q = "", page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const hasFilters = Boolean(topic) || Boolean(q);

  const [{ docs: insights, totalPages }, featured] = await Promise.all([
    getBlogPosts(PAGE_SIZE, page, { category: topic, search: q }),
    hasFilters || page > 1 ? Promise.resolve(null) : getFeaturedPost(),
  ]);

  const gridInsights: Insight[] =
    featured && page === 1 && !hasFilters
      ? insights.filter((i: Insight) => i.id !== featured.id)
      : insights;

  function buildHref(targetPage: number) {
    const params = new URLSearchParams();
    if (topic) params.set("topic", topic);
    if (q) params.set("q", q);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return `/insights${qs ? `?${qs}` : ""}`;
  }

  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-12 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-montserrat font-bold text-white mb-4 max-w-3xl">
            Ideas and perspectives for building stronger organizations
          </h1>
          <p className="text-base sm:text-lg font-roboto text-[#D9E3E6] max-w-2xl">
            Explore practical guidance, research, and perspectives from The Bradbury Group on leadership,
            organizational performance, workplace culture, and sustainable growth.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {featured && page === 1 && !hasFilters && <FeaturedInsight insight={featured} />}

        <InsightsFilterBar activeTopic={topic} activeSearch={q} />

        {gridInsights.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <h2 className="text-xl font-montserrat font-bold text-[#0c2940]">No insights found</h2>
            <p className="text-[#60707A] font-roboto">Try adjusting your search or selecting another topic.</p>
            <Link
              href="/insights"
              className="inline-block mt-2 text-sm font-inter font-semibold text-[#39918d] hover:text-[#0c2940] transition-colors"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridInsights.map((insight: Insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} buildHref={buildHref} />
          </>
        )}
      </div>
    </div>
  );
}
