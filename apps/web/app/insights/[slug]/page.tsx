import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getPostBySlug, getBlogPosts, getRelatedPosts } from "@/lib/cms";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonLd";
import { RichText, extractToc } from "@/components/cms/RichText";
import { Breadcrumbs } from "@/components/insights/Breadcrumbs";
import { TableOfContents } from "@/components/insights/TableOfContents";
import { AuthorBio } from "@/components/insights/AuthorBio";
import { RelatedInsights } from "@/components/insights/RelatedInsights";
import { CATEGORY_LABELS, CONTENT_TYPE_LABELS, formatPublishedDate } from "@/components/insights/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebradburygroup.net";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { docs } = await getBlogPosts(100);
    return docs.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  const url = post.seo?.canonicalUrl || `${BASE_URL}/insights/${post.slug}`;
  const ogImage = post.seo?.ogImage?.url || post.featuredImage?.url;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [related, toc] = await Promise.all([
    getRelatedPosts(post, 3),
    Promise.resolve(extractToc(post.content)),
  ]);

  const articleJsonLd = buildArticleJsonLd(post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Insights", url: `${BASE_URL}/insights` },
    { name: post.title, url: `${BASE_URL}/insights/${post.slug}` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="relative -mt-20 pt-32 pb-10 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 [&_a]:text-[#D9E3E6] [&_a:hover]:text-[#39918d] [&_span]:text-white">
            <Breadcrumbs
              items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }, { name: post.title }]}
            />
          </div>

          <span className="inline-block text-xs font-inter font-semibold px-2 py-1 rounded bg-white/10 text-[#39918d] mb-4">
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl mb-6">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-roboto text-[#D9E3E6]">
            <span>{post.author?.name}</span>
            {post.author?.role && <span className="opacity-70">{post.author.role}</span>}
            <span aria-hidden="true">·</span>
            <span>{formatPublishedDate(post.publishedAt)}</span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>· Updated {formatPublishedDate(post.updatedAt)}</span>
            )}
            {post.readingTime && <span>· {post.readingTime} min read</span>}
          </div>
        </div>
      </header>

      {post.featuredImage?.url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              priority
              className="object-cover"
            />
          </div>
          {post.featuredImage.caption && (
            <p className="text-xs font-roboto text-[#60707A] mt-2 text-center">{post.featuredImage.caption}</p>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 items-start">
          <article className="max-w-[720px] w-full">
            {post.seo?.aiSummary && (
              <div className="flex gap-3 border border-[#39918d]/30 bg-[#39918d]/5 rounded-2xl p-5 mb-10">
                <Sparkles className="w-5 h-5 text-[#39918d] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-inter font-bold uppercase tracking-widest text-[#39918d] mb-1">
                    Key takeaway
                  </p>
                  <p className="text-sm font-roboto text-[#0c2940] leading-relaxed">{post.seo.aiSummary}</p>
                </div>
              </div>
            )}

            <div className="insight-body">
              <RichText content={post.content} />
            </div>

            <div className="mt-12">
              <AuthorBio author={post.author} />
            </div>
          </article>

          <aside>
            <TableOfContents toc={toc} />
          </aside>
        </div>

        <div className="mt-16">
          <RelatedInsights insights={related} />
        </div>

        <section className="mt-16 text-center bg-[#0c2940] text-white rounded-3xl p-10 sm:p-14">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold mb-4">
            Ready to turn insight into action?
          </h2>
          <p className="text-[#D9E3E6] font-roboto max-w-xl mx-auto mb-8">
            Connect with The Bradbury Group to explore how these ideas can be applied within your organization.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#f8c51c] text-[#0c2940] px-8 py-3.5 rounded-lg font-inter font-semibold hover:bg-[#e0b016] transition-all"
          >
            Start a conversation
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
