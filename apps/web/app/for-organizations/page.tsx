import type { Metadata } from "next";
import Link from "next/link";
import { Building, GraduationCap, Users2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "For Organizations",
  description:
    "Enterprise-wide AI transformation, custom model integration, and proprietary ROI models for CXOs, boards, and enterprise PMOs.",
};

const pillars = [
  {
    id: "learning-architecture",
    title: "Learning Architecture Design",
    description:
      "A custom-built learning architecture mapped to your organization's roles, risk profile, and existing L&D infrastructure — not a generic course library.",
    icon: Building,
    accentColor: "#39918d",
  },
  {
    id: "embedded-training",
    title: "Embedded Training Partnership",
    description:
      "Our facilitators embed directly within your teams over multiple quarters, building capability in the flow of real work rather than one-off workshops.",
    icon: GraduationCap,
    accentColor: "#c57b4b",
  },
  {
    id: "community-workshops",
    title: "Community Upskilling Workshops",
    description:
      "Open-enrollment workshops for broader workforce upskilling — see the full catalog for upcoming sessions and topics.",
    icon: Users2,
    accentColor: "#39918d",
    href: "/for-organizations/workshops",
  },
];

export default function ForOrganizationsPage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            For Organizations
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">
            Enterprise AI Transformation
          </h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl mx-auto">
            Enterprise-wide AI transformation, custom model integration, and proprietary ROI
            models — for CXOs, enterprise boards, and enterprise PMOs.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const content = (
              <div id={pillar.id} className="rounded-2xl bg-[#F7F8F9] border border-[#D9E3E6] p-8 h-full flex flex-col justify-between hover:border-[#39918d] hover:shadow-xl transition-all duration-300">
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: pillar.accentColor }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-[#0c2940] mb-3">{pillar.title}</h3>
                  <p className="text-sm font-roboto text-[#60707A] leading-relaxed">{pillar.description}</p>
                </div>
                {pillar.href && (
                  <div className="pt-6 flex items-center space-x-1 text-sm font-inter font-semibold text-[#39918d]">
                    <span>See Workshop Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
            return pillar.href ? (
              <Link key={pillar.id} href={pillar.href}>
                {content}
              </Link>
            ) : (
              <div key={pillar.id}>{content}</div>
            );
          })}
        </div>
      </section>

      {/* Team AI Enablement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[#0c2940] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-1">
              Team AI Enablement
            </span>
            <h3 className="text-xl font-montserrat font-bold mb-2">
              Looking for individual enablement instead?
            </h3>
            <p className="text-sm font-roboto text-[#D9E3E6] max-w-md">
              For single-seat or small-team enrollment rather than an organization-wide rollout,
              see the AI Fluency Cohort — our path built for individuals.
            </p>
          </div>
          <Link
            href="/ai-fluency-cohort"
            className="inline-flex items-center space-x-2 bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-semibold px-6 py-3.5 rounded-lg shadow-lg transition-all whitespace-nowrap"
          >
            <span>Go to For You</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-inter font-semibold bg-[#f8c51c] text-[#0c2940] hover:bg-[#e0b016] hover:scale-[1.02] shadow-lg transition-all group"
        >
          Book a Discovery Call
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
