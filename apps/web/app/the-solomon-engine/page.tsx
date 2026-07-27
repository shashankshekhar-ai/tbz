import type { Metadata } from "next";
import Link from "next/link";
import { Check, Building2, Users, Compass } from "lucide-react";
import { ApplySection } from "@/components/solomon/ApplySection";

export const metadata: Metadata = {
  title: "The Solomon Engine",
  description:
    "A 12-week executive cohort program for senior leaders navigating AI-driven transformation.",
};

const tiers = [
  {
    id: "enterprise",
    name: "Enterprise Tier",
    price: "Custom pricing",
    description: "A dedicated cohort built for your organization, facilitated by our senior team.",
    features: [
      "Dedicated facilitator & custom curriculum",
      "Departmental readiness audit included",
      "Org-wide rollout planning",
      "Priority Solomon AI access",
    ],
    accentColor: "#39918d",
  },
  {
    id: "small-business",
    name: "Small Business Tier",
    price: "Starting at $2,400 / seat",
    description: "Join a shared cohort of peer leaders following our standard 12-week curriculum.",
    features: [
      "Shared cohort, standard curriculum",
      "Leadership upskilling sessions",
      "Ethics & governance framework",
      "Solomon AI access during application",
    ],
    accentColor: "#c57b4b",
  },
];

export default function SolomonEnginePage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            For Leaders
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">The Solomon Engine</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl mx-auto">
            A 12-week executive cohort program for senior leaders navigating AI-driven
            transformation — team enablement, cross-functional alignment, and leadership
            architecture design.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-montserrat font-bold text-[#0c2940] text-center mb-10">
          Choose Your Cohort Tier
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              id={tier.id}
              className="rounded-2xl border-2 p-8 flex flex-col justify-between"
              style={{ borderColor: `${tier.accentColor}66` }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-montserrat font-bold text-[#0c2940]">{tier.name}</h3>
                  {tier.id === "enterprise" ? (
                    <Building2 className="w-6 h-6" style={{ color: tier.accentColor }} />
                  ) : (
                    <Users className="w-6 h-6" style={{ color: tier.accentColor }} />
                  )}
                </div>
                <p className="text-sm font-roboto text-[#60707A] mb-6">{tier.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center space-x-2.5 text-sm text-[#0c2940] font-roboto">
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: tier.accentColor }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-[#D9E3E6] flex items-center justify-between">
                <span className="text-sm font-inter font-semibold text-[#0c2940]">{tier.price}</span>
                <a
                  href="#apply"
                  className="text-sm font-inter font-semibold"
                  style={{ color: tier.accentColor }}
                >
                  Apply →
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-roboto text-[#BFC9CD] mt-6 italic">
          Pricing shown is indicative — final tier pricing is confirmed during the discovery call.
        </p>
      </section>

      {/* Walter — L&D strategist track */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[#F7F8F9] border border-[#D9E3E6] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 flex items-center justify-center flex-shrink-0">
            <Compass className="w-7 h-7 text-[#39918d]" />
          </div>
          <div>
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-1">
              Walter — L&amp;D Strategist Track
            </span>
            <h3 className="text-xl font-montserrat font-bold text-[#0c2940] mb-2">
              A dedicated track for learning & development leaders
            </h3>
            <p className="text-sm font-roboto text-[#60707A] leading-relaxed">
              Walter is our specialized curriculum track for L&amp;D strategists building internal
              AI capability programs — covering instructional design for AI fluency, change
              management, and measurement frameworks tailored to training organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Tax and Reimbursement block */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[#EDF2F4] p-8 sm:p-10">
          <h3 className="text-lg font-montserrat font-bold text-[#0c2940] mb-3">
            Tax &amp; Employer Reimbursement
          </h3>
          <p className="text-sm font-roboto text-[#60707A] leading-relaxed">
            Professional development and executive education expenses, including cohort tuition,
            are often eligible for employer tuition-reimbursement programs and may qualify as a
            deductible business expense. We recommend confirming eligibility with your employer's
            L&amp;D budget or a tax professional — our team can provide an itemized invoice and
            program outline to support your reimbursement request.
          </p>
        </div>
      </section>

      {/* Apply / Interview + Solomon */}
      <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F8F9]">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Apply / Interview
          </span>
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-[#0c2940]">
            Start Your Application
          </h2>
          <p className="text-sm font-roboto text-[#60707A] mt-2">
            Submit your interest below — once received, Solomon, our AI L&amp;D strategist, becomes
            available to answer questions while our team reviews your application.
          </p>
        </div>
        <ApplySection />
      </section>

      <section className="py-16 px-4 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-inter font-semibold bg-[#f8c51c] text-[#0c2940] hover:bg-[#e0b016] hover:scale-[1.02] shadow-lg transition-all"
        >
          Prefer to talk first? Book a Discovery Call
        </Link>
      </section>
    </div>
  );
}
