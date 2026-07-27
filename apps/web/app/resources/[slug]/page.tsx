import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3003";

type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  resourceType: string;
  gated: boolean;
  externalUrl?: string;
  seo?: { title?: string; description?: string };
};

const TYPE_LABELS: Record<string, string> = {
  guide: "Guide",
  template: "Template",
  checklist: "Checklist",
  webinar: "Webinar",
  "case-study": "Case Study",
  tool: "Tool",
};

async function getResourceBySlug(slug: string): Promise<Resource | null> {
  try {
    const res = await fetch(`${CMS_URL}/api/resources?where[slug][equals]=${slug}&limit=1`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.docs?.[0] ?? null;
  } catch {
    return null;
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.seo?.title ?? resource.title,
    description: resource.seo?.description ?? resource.description,
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center space-x-2 text-sm font-inter text-[#39918d] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Resources</span>
          </Link>
          <span className="inline-block text-xs font-inter font-semibold px-2 py-1 rounded bg-white/10 text-[#39918d] mb-3">
            {TYPE_LABELS[resource.resourceType] ?? resource.resourceType}
          </span>
          <h1 className="text-3xl sm:text-4xl font-montserrat font-bold text-white mb-4">{resource.title}</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl">{resource.description}</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        {resource.externalUrl ? (
          <a
            href={resource.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-semibold px-8 py-3.5 rounded-lg shadow-lg transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Resource</span>
          </a>
        ) : (
          <div className="rounded-2xl bg-[#F7F8F9] border border-[#D9E3E6] p-8">
            <Download className="w-6 h-6 text-[#39918d] mx-auto mb-3" />
            <p className="text-sm font-roboto text-[#60707A]">
              This resource file isn't uploaded yet — check back soon, or{" "}
              <Link href="/contact" className="text-[#39918d] font-semibold hover:underline">
                contact us
              </Link>{" "}
              to request it directly.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
