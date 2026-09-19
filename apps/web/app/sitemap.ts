import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/content/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebradburygroup.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/insights`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/resources`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/ai-fluency-cohort`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/leaders`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/organisation`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/roi`, lastModified: new Date(), priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE_URL}/insights/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : p.publishedAt ? new Date(p.publishedAt) : new Date(),
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
