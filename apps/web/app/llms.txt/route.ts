import { POSTS } from "@/lib/content/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebradburygroup.net";

/**
 * llms.txt — an emerging convention (llmstxt.org) giving AI crawlers a plain
 * markdown index of the site, cheaper to ingest than crawling rendered HTML.
 * GEO counterpart to sitemap.xml/robots.txt, which are SEO-crawler-oriented.
 */
export function GET() {
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
    `- [Insights](${BASE_URL}/insights): articles, research, and perspectives on leadership and organizational performance`,
    `- [Contact / Book a Discovery Call](${BASE_URL}/contact)`,
    "",
  ];

  if (POSTS.length > 0) {
    lines.push("## Insights (articles)", "");
    for (const post of POSTS) {
      const summary = post.seo?.aiSummary ?? post.excerpt ?? "";
      lines.push(`- [${post.title}](${BASE_URL}/insights/${post.slug})${summary ? `: ${summary}` : ""}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
