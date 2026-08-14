import Link from "next/link";
import Image from "next/image";
import { CATEGORY_LABELS, CONTENT_TYPE_LABELS, formatPublishedDate, type Insight } from "./types";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      aria-label={`Read the insight: ${insight.title}`}
      className="group flex flex-col border border-[#D9E3E6] rounded-2xl overflow-hidden bg-white hover:border-[#39918d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative w-full aspect-[16/10] bg-[#F7F8F9] overflow-hidden">
        {insight.featuredImage?.url ? (
          <Image
            src={insight.featuredImage.url}
            alt={insight.featuredImage.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#123856_0%,#0c2940_70%)]" />
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <span className="inline-block w-fit text-xs font-inter font-semibold px-2 py-1 rounded bg-[#0c2940]/10 text-[#0c2940] mb-3">
          {CONTENT_TYPE_LABELS[insight.contentType ?? "article"] ?? "Article"}
          {insight.category ? ` · ${CATEGORY_LABELS[insight.category] ?? insight.category}` : ""}
        </span>

        <h3 className="text-lg font-montserrat font-bold text-[#0c2940] mb-2 group-hover:text-[#39918d] transition-colors">
          {insight.title}
        </h3>

        <p className="text-[#60707A] font-roboto text-sm leading-relaxed line-clamp-3 mb-4">
          {insight.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between text-xs font-roboto text-[#60707A] pt-4 border-t border-[#D9E3E6]">
          <span>{insight.author?.name}</span>
          <span className="flex items-center gap-2">
            <span>{formatPublishedDate(insight.publishedAt)}</span>
            {insight.readingTime ? <span>· {insight.readingTime} min read</span> : null}
          </span>
        </div>
      </div>
    </Link>
  );
}
