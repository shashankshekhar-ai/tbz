import { getAllPages, getBlogPosts } from "@/lib/cms";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebradburygroup.com";

/**
 * llms.txt — an emerging convention (llmstxt.org) giving AI crawlers a plain
 * markdown index of the site, cheaper to ingest than crawling rendered HTML.
 * GEO counterpart to sitemap.xml/robots.txt, which are SEO-crawler-oriented.
 */
export async function GET() {
  const [pages, { docs: posts }] = await Promise.all([
    getAllPages().catch(() => []),
    getBlogPosts(50).catch(() => ({ docs: [] })),
  ]);

  const lines: string[] = [
    "# The Bradbury Group",
    "",
    "> AI fluency training, executive coaching, and organizational transformation. The Bradbury Group helps leaders and organizations adopt AI deliberately rather than accidentally.",
    "",
    "## Core pages",
    "",
    `- [About](${BASE_URL}/about)`,
    `- [AI Fluency Cohort](${BASE_URL}/ai-fluency-cohort)`,
    `- [The Solomon Engine](${BASE_URL}/the-solomon-engine): a 12-week executive program`,
    `- [For Organizations](${BASE_URL}/for-organizations)`,
    `- [Our AI Return](${BASE_URL}/our-ai-return)`,
    `- [AI Readiness Assessment](${BASE_URL}/assessment): free scored assessment of an organization's AI maturity`,
    `- [Resources](${BASE_URL}/resources): gated guides, templates, checklists`,
    `- [Contact / Book a Discovery Call](${BASE_URL}/contact)`,
    "",
  ];

  if (pages.length > 0) {
    lines.push("## Additional pages", "");
    for (const p of pages as Array<{ slug: string; title: string; seo?: { aiSummary?: string } }>) {
      const summary = p.seo?.aiSummary ? `: ${p.seo.aiSummary}` : "";
      lines.push(`- [${p.title}](${BASE_URL}/${p.slug})${summary}`);
    }
    lines.push("");
  }

  if (posts.length > 0) {
    lines.push("## Insights (blog)", "");
    for (const post of posts as Array<{
      slug: string;
      title: string;
      excerpt?: string;
      seo?: { aiSummary?: string };
    }>) {
      const summary = post.seo?.aiSummary ?? post.excerpt ?? "";
      lines.push(`- [${post.title}](${BASE_URL}/insights/${post.slug})${summary ? `: ${summary}` : ""}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
