import type { Insight } from "@/components/insights/types";

// Was previously fetched from Payload's posts collection. Hardcoded here now
// that content changes go through code, not a CMS — the live CMS had zero
// published posts at the time of removal, so this starts empty. Add new
// articles as entries in this array, newest first.
export const POSTS: Insight[] = [];

function sortByPublishedDesc(posts: Insight[]): Insight[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): Insight | null {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(post: Pick<Insight, "id" | "category">, limit = 3): Insight[] {
  return sortByPublishedDesc(
    POSTS.filter((p) => p.category === post.category && p.id !== post.id)
  ).slice(0, limit);
}

export function getFeaturedPost(): Insight | null {
  const featured = POSTS.find((p) => p.featured);
  if (featured) return featured;
  return sortByPublishedDesc(POSTS)[0] ?? null;
}

export function listPosts(options?: {
  limit?: number;
  page?: number;
  category?: string;
  search?: string;
}): { docs: Insight[]; totalDocs: number; totalPages: number } {
  const { limit = 10, page = 1, category, search } = options ?? {};

  let filtered = sortByPublishedDesc(POSTS);

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((p) =>
      [p.title, p.excerpt, p.author?.name, p.category, ...(p.tags?.map((t) => t.tag) ?? [])]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }

  const totalDocs = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  const start = (page - 1) * limit;
  const docs = filtered.slice(start, start + limit);

  return { docs, totalDocs, totalPages };
}
