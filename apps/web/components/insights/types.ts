export type InsightMedia = { id?: string | number; url: string; alt: string; caption?: string };

export type InsightAuthor = {
  name: string;
  role?: string;
  bio?: string;
  image?: InsightMedia | null;
  profileUrl?: string;
};

export type InsightSeo = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: InsightMedia | null;
  aiSummary?: string;
};

export type Insight = {
  id: string | number;
  title: string;
  slug: string;
  status: "draft" | "published";
  category: string;
  contentType?: "article" | "guide" | "research" | "perspective";
  featured?: boolean;
  readingTime?: number;
  author: InsightAuthor;
  featuredImage?: InsightMedia | null;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
  tags?: { tag: string }[];
  publishedAt: string;
  updatedAt?: string;
  seo?: InsightSeo;
};

export const CATEGORY_LABELS: Record<string, string> = {
  leadership: "Leadership",
  "organizational-strategy": "Organizational Strategy",
  "workplace-culture": "Workplace Culture",
  "talent-and-teams": "Talent and Teams",
  "research-and-trends": "Research and Trends",
};

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  article: "Article",
  guide: "Guide",
  research: "Research",
  perspective: "Perspective",
};

export function formatPublishedDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
