import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllPages } from "@/lib/cms";
import { BlockRenderer } from "@/components/cms/BlockRenderer";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description,
  };
}

export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    return pages.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    // CMS unreachable at build time — pages rendered dynamically at runtime
    return [];
  }
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <div>
      <BlockRenderer blocks={page.layout ?? []} />
    </div>
  );
}
