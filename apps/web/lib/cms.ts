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

export async function getBlogPosts(limit = 10, page = 1) {
  const data = await cmsFetch(
    `/api/posts?where[status][equals]=published&limit=${limit}&page=${page}&sort=-publishedAt`
  );
  return data ?? { docs: [], totalDocs: 0, totalPages: 0 };
}

export async function getPostBySlug(slug: string) {
  const data = await cmsFetch(
    `/api/posts?where[slug][equals]=${slug}&where[status][equals]=published`
  );
  return data?.docs?.[0] ?? null;
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
