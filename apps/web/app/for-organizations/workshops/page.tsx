import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Workshop Catalog",
  description: "Upcoming community upskilling workshops from The Bradbury Group.",
};

const workshops = [
  {
    title: "Designing Governance & Human-in-the-Loop Workflows",
    format: "Live Masterclass",
    audience: "Leadership Series",
    description:
      "An interactive session on building oversight processes for AI-assisted decision-making.",
  },
  {
    title: "AI Literacy for Non-Technical Teams",
    format: "Half-Day Workshop",
    audience: "All Staff",
    description: "A hands-on introduction to working with AI tools safely and effectively.",
  },
  {
    title: "Prompt Architecture for Domain Experts",
    format: "Full-Day Workshop",
    audience: "Subject Matter Experts",
    description: "Moving beyond prompt tricks into durable, reusable context architecture.",
  },
];

export default function WorkshopCatalogPage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/for-organizations"
            className="inline-flex items-center space-x-2 text-sm font-inter text-[#39918d] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to For Organizations</span>
          </Link>
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Community Upskilling
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">Workshop Catalog</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl">
            Open-enrollment sessions for broader workforce AI upskilling.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          {workshops.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-[#D9E3E6] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#39918d] hover:shadow-md transition-all"
            >
              <div>
                <span className="text-xs font-inter font-semibold uppercase tracking-wide text-[#39918d]">
                  {w.audience} · {w.format}
                </span>
                <h3 className="text-lg font-montserrat font-bold text-[#0c2940] mt-1 mb-1">{w.title}</h3>
                <p className="text-sm font-roboto text-[#60707A]">{w.description}</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-sm font-inter font-semibold text-[#0c2940] border-2 border-[#0c2940] px-5 py-2.5 rounded-lg hover:bg-[#0c2940] hover:text-white transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Seat</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
