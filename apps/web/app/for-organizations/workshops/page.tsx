import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WORKSHOPS } from "@/components/for-organizations/workshopsData";
import { WorkshopCatalog } from "@/components/for-organizations/WorkshopCatalog";

export const metadata: Metadata = {
  title: "Workshop Catalog",
  description: "Upcoming community upskilling workshops from The Bradbury Group.",
};

export default function WorkshopCatalogPage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/for-organizations"
            className="inline-flex items-center gap-2 text-sm font-inter font-semibold text-[#39918d] hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to For Organizations</span>
          </Link>
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Community Upskilling
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">Workshop Catalog</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl">
            Open-enrollment sessions for broader workforce AI upskilling — search or filter below to find the
            right session for your team.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <WorkshopCatalog workshops={WORKSHOPS} />
      </section>
    </div>
  );
}
