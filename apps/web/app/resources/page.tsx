import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, templates, checklists, and tools to help your organization build AI fluency and achieve measurable results.",
};

export const revalidate = 60;

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001";

type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  resourceType: string;
  gated: boolean;
};

const TYPE_LABELS: Record<string, string> = {
  guide: "Guide",
  template: "Template",
  checklist: "Checklist",
  webinar: "Webinar",
  "case-study": "Case Study",
  tool: "Tool",
};

async function getResources(): Promise<Resource[]> {
  try {
    const res = await fetch(
      `${CMS_URL}/api/resources?where[status][equals]=published&limit=50&sort=-createdAt`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.docs ?? [];
  } catch {
    return [];
  }
}

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-brand-navy)] mb-4">Resources</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Practical tools to help you and your team build AI fluency — without the overwhelm.
        </p>
      </header>

      {resources.length === 0 ? (
        <p className="text-gray-500">Resources coming soon. Check back shortly.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={`/resources/${resource.slug}`}
              className="group block border border-gray-200 rounded-xl p-6 hover:border-[var(--color-brand-gold)] hover:shadow-md transition-all"
            >
              <span className="inline-block text-xs font-medium px-2 py-1 rounded bg-[var(--color-brand-navy)]/10 text-[var(--color-brand-navy)] mb-3">
                {TYPE_LABELS[resource.resourceType] ?? resource.resourceType}
              </span>
              {resource.gated && (
                <span className="inline-block text-xs font-medium px-2 py-1 rounded bg-[var(--color-brand-gold)]/20 text-[var(--color-brand-navy)] mb-3 ml-2">
                  Free Download
                </span>
              )}
              <h2 className="text-lg font-semibold text-[var(--color-brand-navy)] mb-2 group-hover:text-[var(--color-brand-gold)] transition-colors">
                {resource.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
