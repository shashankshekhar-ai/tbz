import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/cms";
import { buildArticleJsonLd } from "@/lib/jsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const articleJsonLd = buildArticleJsonLd(post);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header className="mb-10">
        <p className="text-sm font-roboto text-[#BFC9CD] mb-3">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""}
          {post.author ? ` · ${post.author}` : ""}
        </p>
        <h1 className="text-4xl font-montserrat font-bold text-[#0c2940] mb-4">{post.title}</h1>
        {post.excerpt && <p className="text-xl font-roboto text-[#60707A]">{post.excerpt}</p>}
      </header>
      <div className="prose prose-lg max-w-none font-roboto">
        {/* Rich text renderer — Payload lexical content */}
        <p className="text-[#60707A] italic">Content rendering coming in Phase 3 block build-out.</p>
      </div>
    </article>
  );
}
