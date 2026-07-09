const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001";

export async function getPageBySlug(slug: string) {
  const res = await fetch(
    `${CMS_URL}/api/pages?where[slug][equals]=${slug}&where[status][equals]=published&depth=2`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.docs?.[0] ?? null;
}

export async function getAllPages() {
  const res = await fetch(
    `${CMS_URL}/api/pages?where[status][equals]=published&limit=100`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data?.docs ?? [];
}

export async function getBlogPosts(limit = 10, page = 1) {
  const res = await fetch(
    `${CMS_URL}/api/posts?where[status][equals]=published&limit=${limit}&page=${page}&sort=-publishedAt`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return { docs: [], totalDocs: 0, totalPages: 0 };
  return res.json();
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${CMS_URL}/api/posts?where[slug][equals]=${slug}&where[status][equals]=published`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.docs?.[0] ?? null;
}
