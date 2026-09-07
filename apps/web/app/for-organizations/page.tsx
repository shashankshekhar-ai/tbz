import type { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, Users2, ArrowRight } from "lucide-react";

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
    icon: Building2,
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
      <section className="relative -mt-20 pt-32 pb-20 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            For Organizations
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold text-white mb-4 leading-[1.1]">
            Enterprise AI Transformation
          </h1>
          <p className="text-lg font-roboto text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Enterprise-wide AI transformation, custom model integration, and proprietary ROI
            models — for CXOs, enterprise boards, and enterprise PMOs.
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const content = (
              <div
                id={pillar.id}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-8 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#39918d]"
              >
                <div>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-md"
                    style={{ backgroundColor: pillar.accentColor }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-[#0c2940] mb-3 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-roboto text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
                {pillar.href && (
                  <div className="pt-6 mt-4 flex items-center gap-2 text-sm font-inter font-semibold text-[#39918d] group">
                    <span>See Workshop Catalog</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            );
            return pillar.href ? (
              <Link key={pillar.id} href={pillar.href} className="group">
                {content}
              </Link>
            ) : (
              <div key={pillar.id}>{content}</div>
            );
          })}
        </div>
      </section>

      {/* Team AI Enablement cross-link */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[#0c2940] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-1">
              Team AI Enablement
            </span>
            <h3 className="text-xl font-montserrat font-bold mb-2">
              Looking for individual enablement instead?
            </h3>
            <p className="text-sm font-roboto text-slate-300 max-w-md leading-relaxed">
              For single-seat or small-team enrollment rather than an organization-wide rollout,
              see the AI Fluency Cohort — our path built for individuals.
            </p>
          </div>
          <Link
            href="/ai-fluency-cohort"
            className="inline-flex items-center gap-2 bg-[#f8c51c] hover:brightness-105 text-[#0c2940] font-inter font-bold px-6 py-3.5 rounded-lg shadow-lg transition-all whitespace-nowrap group"
          >
            <span>Go to For You</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
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
