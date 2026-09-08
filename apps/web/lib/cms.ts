const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001";

async function cmsFetch(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${CMS_URL}${path}`, {
      next: { revalidate: 60 },
      ...options,
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string) {
  const data = await cmsFetch(
    `/api/pages?where[slug][equals]=${slug}&where[status][equals]=published&depth=2`
  );
  return data?.docs?.[0] ?? null;
}

export async function getAllPages() {
  const data = await cmsFetch(`/api/pages?where[status][equals]=published&limit=100`);
  return data?.docs ?? [];
}

export async function getBlogPosts(
  limit = 10,
  page = 1,
  options?: { category?: string; search?: string }
) {
  const params = new URLSearchParams({
    "where[status][equals]": "published",
    limit: String(limit),
    page: String(page),
    sort: "-publishedAt",
    depth: "1",
  });
  if (options?.category && options.category !== "all") {
    params.set("where[category][equals]", options.category);
  }
  if (options?.search) {
    const q = options.search;
    ["title", "excerpt", "author.name", "tags.tag"].forEach((field, i) => {
      params.set(`where[or][${i}][${field}][like]`, q);
    });
    params.set("where[or][4][category][like]", q);
  }
  const data = await cmsFetch(`/api/posts?${params.toString()}`);
  return data ?? { docs: [], totalDocs: 0, totalPages: 0 };
}

export async function getFeaturedPost() {
  const featured = await cmsFetch(
    `/api/posts?where[status][equals]=published&where[featured][equals]=true&limit=1&sort=-publishedAt&depth=1`
  );
  if (featured?.docs?.[0]) return featured.docs[0];
  const latest = await cmsFetch(
    `/api/posts?where[status][equals]=published&limit=1&sort=-publishedAt&depth=1`
  );
  return latest?.docs?.[0] ?? null;
}

export async function getPostBySlug(slug: string) {
  const data = await cmsFetch(
    `/api/posts?where[slug][equals]=${slug}&where[status][equals]=published&depth=1`
  );
  return data?.docs?.[0] ?? null;
}

export async function getRelatedPosts(post: { id: string | number; category?: string }, limit = 3) {
  const data = await cmsFetch(
    `/api/posts?where[status][equals]=published&where[category][equals]=${post.category ?? ""}&where[id][not_equals]=${post.id}&limit=${limit}&sort=-publishedAt&depth=1`
  );
  return data?.docs ?? [];
}

export async function getSiteSettings() {
  return cmsFetch(`/api/globals/site-settings?depth=1`);
}

export type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  footerGroup?: string;
  children?: { label: string; href: string; description?: string }[];
};

export async function getNavigation(): Promise<NavItem[]> {
  const data = await cmsFetch(
    `/api/navigation?where[enabled][equals]=true&where[location][equals]=header&sort=order&limit=100&depth=1`
  );
  return data?.docs ?? [];
}

export type FooterNavGroup = { heading: string; items: NavItem[] };

export async function getFooterNavigation(): Promise<FooterNavGroup[]> {
  const data = await cmsFetch(
    `/api/navigation?where[enabled][equals]=true&where[location][equals]=footer&sort=order&limit=100&depth=1`
  );
  const items: NavItem[] = data?.docs ?? [];
  const groups = new Map<string, NavItem[]>();
  for (const item of items) {
    const heading = item.footerGroup?.trim() || "Links";
    if (!groups.has(heading)) groups.set(heading, []);
    groups.get(heading)!.push(item);
  }
  return Array.from(groups.entries()).map(([heading, groupItems]) => ({ heading, items: groupItems }));
}

export type CmsTestimonial = {
  id: string;
  name: string;
  title: string;
  organization: string;
  quote: string;
  isPending: false;
};

// The `testimonials` collection has existed since the CMS was built but no
// page ever fetched it — every testimonial on the site was a hardcoded
// array (see /about's page.tsx). Same shape as getNavigation(): real CMS
// docs first, hardcoded fallback only when the CMS has none yet.
export async function getTestimonials(context?: string): Promise<CmsTestimonial[]> {
  const where = context ? `&where[context][equals]=${context}` : "";
  const data = await cmsFetch(`/api/testimonials?sort=order&limit=100&depth=1${where}`);
  const docs = data?.docs ?? [];
  return docs.map((doc: Record<string, unknown>) => ({
    id: String(doc.id),
    name: (doc.name as string) ?? "",
    title: (doc.title as string) ?? "",
    organization: (doc.company as string) ?? "",
    quote: (doc.quote as string) ?? "",
    isPending: false as const,
  }));
}
