import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Building2,
  Users2,
  Compass,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ApplySection } from "@/components/solomon/ApplySection";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export const metadata: Metadata = {
  title: "The Solomon Engine",
  description:
    "A 12-week executive cohort program for senior leaders navigating AI-driven transformation.",
};

const tiers = [
  {
    id: "enterprise",
    name: "Enterprise Tier",
    badge: "Dedicated Cohort",
    price: "Custom pricing",
    description: "A dedicated cohort built for your organization, facilitated by our senior team.",
    features: [
      "Dedicated facilitator & custom curriculum",
      "Departmental readiness audit included",
      "Org-wide rollout planning",
      "Priority Solomon AI access",
    ],
    accentColor: "#39918d",
    icon: Building2,
  },
  {
    id: "small-business",
    name: "Small Business Tier",
    badge: "Shared Peer Cohort",
    price: "Starting at $2,400 / seat",
    description: "Join a shared cohort of peer leaders following our standard 12-week curriculum.",
    features: [
      "Shared cohort, standard curriculum",
      "Leadership upskilling sessions",
      "Ethics & governance framework",
      "Solomon AI access during application",
    ],
    accentColor: "#c57b4b",
    icon: Users2,
  },
];

export default function SolomonEnginePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-20 pt-32 pb-20 bg-[#0c2940] text-white overflow-hidden">
        <ParticleBackground variant="dark" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#39918d]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#f8c51c]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 mb-6">
            <Sparkles className="w-4 h-4 text-[#f8c51c]" />
            <span className="text-xs font-inter font-bold tracking-widest text-[#f8c51c] uppercase">
              For Leaders
            </span>
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
            The Solomon Engine
          </h1>
          <p className="text-lg font-roboto text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            A 12-week executive cohort program for senior leaders navigating AI-driven
            transformation — team enablement, cross-functional alignment, and leadership
            architecture design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-montserrat font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-[#f8c51c]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Start Your Application</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#tiers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-montserrat font-semibold text-base px-8 py-4 rounded-full transition-colors"
            >
              <span>Choose Your Cohort Tier</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <a
              href="#tiers"
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#39918d]/60 text-left flex items-center gap-3 transition-colors group"
            >
              <span className="p-2 rounded-lg bg-[#39918d]/20 text-[#39918d] group-hover:bg-[#39918d] group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-sm font-montserrat font-bold text-white">Enterprise Tier</span>
                <span className="block text-xs text-white/70 font-roboto">Dedicated cohort & custom pricing</span>
              </span>
            </a>
            <a
              href="#tiers"
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f8c51c]/60 text-left flex items-center gap-3 transition-colors group"
            >
              <span className="p-2 rounded-lg bg-[#c57b4b]/20 text-[#c57b4b] group-hover:bg-[#c57b4b] group-hover:text-white transition-colors">
                <Users2 className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-sm font-montserrat font-bold text-white">Small Business Tier</span>
                <span className="block text-xs text-white/70 font-roboto">Shared peer cohort & $2,400 / seat</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#0c2940] mb-3">
            Choose Your Cohort Tier
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                id={tier.id}
                className="rounded-2xl bg-[#ffffff] border border-[#0c2940]/15 hover:border-[#39918d]/60 p-8 sm:p-10 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="p-3 rounded-xl border"
                      style={{
                        backgroundColor: `${tier.accentColor}26`,
                        borderColor: `${tier.accentColor}4D`,
                        color: tier.accentColor,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <span
                      className="text-xs font-inter font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{
                        color: tier.accentColor,
                        backgroundColor: `${tier.accentColor}1A`,
                        borderColor: `${tier.accentColor}4D`,
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-montserrat font-bold text-[#0c2940] mb-3">{tier.name}</h3>
                  <p className="text-sm font-roboto text-[#0c2940]/80 mb-8 leading-relaxed">{tier.description}</p>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#39918d]" />
                        </span>
                        <span className="text-sm font-roboto text-[#0c2940]/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#0c2940]/10">
                  <span className="block text-2xl font-montserrat font-bold text-[#0c2940] mb-6">
                    {tier.price}
                  </span>
                  <a
                    href="#apply"
                    className="w-full inline-flex items-center justify-center gap-2 font-montserrat font-bold text-base py-4 rounded-xl shadow-md transition-all group"
                    style={{
                      backgroundColor: tier.accentColor,
                      color: tier.id === "small-business" ? "#0c2940" : "#ffffff",
                    }}
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm font-roboto text-[#0c2940]/70 mt-10 italic max-w-2xl mx-auto">
          Pricing shown is indicative — final tier pricing is confirmed during the discovery call.
        </p>
      </section>

      {/* Walter — L&D strategist track */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          id="walter-track"
          className="relative overflow-hidden rounded-3xl bg-[#0c2940] text-white p-8 sm:p-12 md:p-16 border border-white/10 shadow-xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39918d]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 mb-6">
              <Compass className="w-4 h-4 text-[#f8c51c]" />
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#39918d]">
                Specialized Track
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-white mb-4">
              Walter — L&amp;D Strategist Track
            </h2>
            <h3 className="text-xl font-montserrat font-medium text-[#f8c51c] mb-6">
              A dedicated track for learning &amp; development leaders
            </h3>
            <p className="text-base sm:text-lg font-roboto text-white/85 leading-relaxed">
              Walter is our specialized curriculum track for L&amp;D strategists building internal
              AI capability programs — covering instructional design for AI fluency, change
              management, and measurement frameworks tailored to training organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Tax and Reimbursement block */}
      <section className="py-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          id="reimbursement"
          className="rounded-3xl bg-[#f8fafb] border border-[#0c2940]/15 p-8 sm:p-12 md:p-16 shadow-lg"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c57b4b]/15 border border-[#c57b4b]/30 mb-6">
            <FileText className="w-4 h-4 text-[#c57b4b]" />
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#c57b4b]">
              Tuition & Funding Support
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#0c2940] mb-6">
            Tax &amp; Employer Reimbursement
          </h2>
          <p className="text-base sm:text-lg font-roboto text-[#0c2940]/85 leading-relaxed">
            Professional development and executive education expenses, including cohort tuition,
            are often eligible for employer tuition-reimbursement programs and may qualify as a
            deductible business expense. We recommend confirming eligibility with your employer's
            L&amp;D budget or a tax professional — our team can provide an itemized invoice and
            program outline to support your reimbursement request.
          </p>
        </div>
      </section>

      {/* Apply / Interview + Solomon */}
      <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#ffffff]">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-inter font-bold tracking-widest text-[#3f6d67] uppercase bg-[#39918d]/10 border border-[#39918d]/30 px-4 py-1.5 rounded-full inline-block mb-4">
            Apply / Interview
          </span>
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-[#0c2940]">
            Start Your Application
          </h2>
          <p className="text-sm font-roboto text-[#0c2940]/80 mt-2">
            Submit your interest below — once received, Solomon, our AI L&amp;D strategist, becomes
            available to answer questions while our team reviews your application.
          </p>
        </div>
        <ApplySection />
      </section>

      <section className="py-16 px-4 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-inter font-semibold bg-[#f8c51c] text-[#0c2940] hover:bg-[#e0b016] hover:scale-[1.02] shadow-lg transition-all group"
        >
          Prefer to talk first? Book a Discovery Call
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
