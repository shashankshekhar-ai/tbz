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
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">Insights</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl">
            Practical perspectives on AI fluency, organizational transformation, and responsible
            implementation — without the hype.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-[#60707A] font-roboto">No posts published yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <article
                key={post.id}
                className="border border-[#D9E3E6] rounded-2xl overflow-hidden hover:border-[#39918d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/insights/${post.slug}`} className="block p-6">
                  <p className="text-xs font-roboto text-[#BFC9CD] mb-2">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                    {post.author ? ` · ${post.author}` : ""}
                  </p>
                  <h2 className="text-xl font-montserrat font-bold text-[#0c2940] mb-3 hover:text-[#39918d] transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[#60707A] font-roboto text-sm leading-relaxed">{post.excerpt}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
