const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebradburygroup.com";

type SiteSettings = {
  siteName?: string;
  tagline?: string;
  logo?: { url?: string } | null;
  social?: { linkedin?: string; twitter?: string; youtube?: string };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildOrganizationJsonLd(settings: SiteSettings | null): Record<string, any> {
  const sameAs = [
    settings?.social?.linkedin,
    settings?.social?.twitter,
    settings?.social?.youtube,
  ].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName ?? "The Bradbury Group",
    url: BASE_URL,
    description:
      settings?.tagline ??
      "AI fluency training, executive programs, and organizational transformation.",
    ...(settings?.logo?.url ? { logo: settings.logo.url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  seo?: { aiSummary?: string; description?: string };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildArticleJsonLd(post: BlogPost): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.aiSummary ?? post.seo?.description ?? post.excerpt,
    url: `${BASE_URL}/insights/${post.slug}`,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    publisher: {
      "@type": "Organization",
      name: "The Bradbury Group",
      url: BASE_URL,
    },
  };
}
