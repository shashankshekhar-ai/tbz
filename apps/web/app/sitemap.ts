import type { MetadataRoute } from "next";
import { getAllPages, getBlogPosts } from "@/lib/cms";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebradburygroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/insights`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/resources`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/ai-fluency-cohort`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/the-solomon-engine`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/for-organizations`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/our-ai-return`, lastModified: new Date(), priority: 0.8 },
  ];

  const [pages, { docs: posts }] = await Promise.all([
    getAllPages().catch(() => []),
    getBlogPosts(100).catch(() => ({ docs: [] })),
  ]);

  const cmsRoutes: MetadataRoute.Sitemap = pages
    .filter((p: { slug: string }) => !["home"].includes(p.slug))
    .map((p: { slug: string; updatedAt?: string }) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      priority: 0.7,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts.map(
    (p: { slug: string; publishedAt?: string }) => ({
      url: `${BASE_URL}/insights/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...cmsRoutes, ...postRoutes];
}
