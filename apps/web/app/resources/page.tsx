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
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">Resources</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl">
            Practical tools to help you and your team build AI fluency — without the overwhelm.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {resources.length === 0 ? (
          <p className="text-[#60707A] font-roboto">Resources coming soon. Check back shortly.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={`/resources/${resource.slug}`}
                className="group block border border-[#D9E3E6] rounded-2xl p-6 hover:border-[#39918d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="inline-block text-xs font-inter font-semibold px-2 py-1 rounded bg-[#0c2940]/10 text-[#0c2940] mb-3">
                  {TYPE_LABELS[resource.resourceType] ?? resource.resourceType}
                </span>
                {resource.gated && (
                  <span className="inline-block text-xs font-inter font-semibold px-2 py-1 rounded bg-[#f8c51c]/20 text-[#0c2940] mb-3 ml-2">
                    Free Download
                  </span>
                )}
                <h2 className="text-lg font-montserrat font-bold text-[#0c2940] mb-2 group-hover:text-[#39918d] transition-colors">
                  {resource.title}
                </h2>
                <p className="text-[#60707A] font-roboto text-sm leading-relaxed">{resource.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
