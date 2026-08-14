import Link from "next/link";
import Image from "next/image";
import { CATEGORY_LABELS, CONTENT_TYPE_LABELS, formatPublishedDate, type Insight } from "./types";

export function FeaturedInsight({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      aria-label={`Read the featured insight: ${insight.title}`}
      className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-[#D9E3E6] rounded-2xl overflow-hidden bg-white hover:border-[#39918d] hover:shadow-xl transition-all duration-300"
    >
      <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[320px] bg-[#F7F8F9] overflow-hidden">
        {insight.featuredImage?.url ? (
          <Image
            src={insight.featuredImage.url}
            alt={insight.featuredImage.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#123856_0%,#0c2940_70%)]" />
        )}
      </div>

      <div className="p-6 lg:p-8 lg:pr-10">
        <span className="inline-block text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase mb-3">
          Featured Insight
        </span>
        <span className="inline-block w-fit text-xs font-inter font-semibold px-2 py-1 rounded bg-[#0c2940]/10 text-[#0c2940] mb-3 ml-2">
          {CONTENT_TYPE_LABELS[insight.contentType ?? "article"] ?? "Article"}
          {insight.category ? ` · ${CATEGORY_LABELS[insight.category] ?? insight.category}` : ""}
        </span>

        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-[#0c2940] mb-3 group-hover:text-[#39918d] transition-colors">
          {insight.title}
        </h2>

        <p className="text-[#60707A] font-roboto leading-relaxed mb-6 line-clamp-3">{insight.excerpt}</p>

        <div className="flex items-center justify-between text-sm font-roboto text-[#60707A] mb-6">
          <span>{insight.author?.name}</span>
          <span className="flex items-center gap-2">
            <span>{formatPublishedDate(insight.publishedAt)}</span>
            {insight.readingTime ? <span>· {insight.readingTime} min read</span> : null}
          </span>
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-inter font-semibold text-[#0c2940] group-hover:text-[#39918d] transition-colors">
          Read the insight
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
