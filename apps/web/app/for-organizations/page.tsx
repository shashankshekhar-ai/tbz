import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OrganizationHero } from "@/components/for-organizations/OrganizationHero";
import { PillarCards } from "@/components/for-organizations/PillarCards";
import { EnablementBanner } from "@/components/for-organizations/EnablementBanner";

export const metadata: Metadata = {
  title: "For Organizations",
  description:
    "Enterprise-wide AI transformation, custom model integration, and proprietary ROI models for CXOs, boards, and enterprise PMOs.",
};

export default function ForOrganizationsPage() {
  return (
    <div>
      <OrganizationHero />
      <PillarCards />
      <EnablementBanner />

      <section className="py-20 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-[#0c2940] mb-3">
          Ready to design your organization&apos;s AI learning architecture?
        </h2>
        <p className="text-sm sm:text-base font-roboto text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Talk with our team about a transformation program built around your roles, risk profile, and existing
          L&amp;D infrastructure.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-inter font-bold bg-[#f8c51c] text-[#0c2940] hover:brightness-105 hover:scale-[1.02] shadow-lg transition-all group"
        >
          Book a Discovery Call
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
