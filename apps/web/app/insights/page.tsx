import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles, perspectives, and practical guidance on AI fluency, organizational transformation, and responsible AI implementation.",
};

export const revalidate = 60;

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  author?: string;
};

export default async function InsightsPage() {
  const { docs: posts } = await getBlogPosts(12).catch(() => ({ docs: [] }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-brand-navy)] mb-4">Insights</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Practical perspectives on AI fluency, organizational transformation, and responsible
          implementation — without the hype.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts published yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <article
              key={post.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/insights/${post.slug}`} className="block p-6">
                <p className="text-xs text-gray-400 mb-2">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                  {post.author ? ` · ${post.author}` : ""}
                </p>
                <h2 className="text-xl font-semibold text-[var(--color-brand-navy)] mb-3 hover:text-[var(--color-brand-gold)] transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
