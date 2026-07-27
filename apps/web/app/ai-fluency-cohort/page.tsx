import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Zap, Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Fluency Cohort",
  description:
    "Individual executive coaching, personal AI agent workflows, and foundational upskilling — a two-phase path from AI literacy to AI fluency.",
};

const phases = [
  {
    id: "phase-1",
    label: "Phase 1",
    title: "AI Literacy",
    description:
      "Foundational understanding of how modern AI systems work, where they help, where they fail, and how to evaluate a tool before adopting it.",
    items: ["Core concepts & mental models", "Prompting fundamentals", "Risk & governance basics"],
    accentColor: "#39918d",
  },
  {
    id: "phase-2",
    label: "Phase 2",
    title: "AI Fluency",
    description:
      "Applied workflow design — building your own repeatable AI-assisted processes and personal agent workflows for daily executive work.",
    items: ["Custom agent workflow design", "Personal productivity blueprint", "Ongoing capability coaching"],
    accentColor: "#c57b4b",
  },
];

export default function AiFluencyCohortPage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            For You
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">AI Fluency Cohort</h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl mx-auto">
            Individual executive coaching, personal AI agent workflows, and foundational
            upskilling — a two-phase path from literacy to fluency.
          </p>
        </div>
      </section>

      {/* Phases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {phases.map((phase) => (
            <div key={phase.id} id={phase.id} className="rounded-2xl bg-[#F7F8F9] border border-[#D9E3E6] p-8">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: phase.accentColor }}
              >
                {phase.id === "phase-1" ? <BookOpen className="w-6 h-6 text-white" /> : <Zap className="w-6 h-6 text-white" />}
              </div>
              <span className="text-xs font-inter font-bold tracking-widest uppercase" style={{ color: phase.accentColor }}>
                {phase.label}
              </span>
              <h2 className="text-2xl font-montserrat font-bold text-[#0c2940] mt-1 mb-3">{phase.title}</h2>
              <p className="text-sm font-roboto text-[#60707A] leading-relaxed mb-5">{phase.description}</p>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-sm text-[#0c2940] font-roboto">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: phase.accentColor }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tax and Reimbursement block */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[#EDF2F4] p-8 sm:p-10">
          <h3 className="text-lg font-montserrat font-bold text-[#0c2940] mb-3">
            Tax &amp; Employer Reimbursement
          </h3>
          <p className="text-sm font-roboto text-[#60707A] leading-relaxed">
            Cohort tuition often qualifies for employer professional-development reimbursement or
            as a deductible continuing-education expense. We recommend checking with your
            employer's learning budget or a tax professional — we can provide an itemized invoice
            and program outline on request.
          </p>
        </div>
      </section>

      {/* Downloadable Recommendation Letter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[#0c2940] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-2">Need manager sign-off?</h3>
            <p className="text-sm font-roboto text-[#D9E3E6] max-w-md">
              Download a pre-written recommendation letter template to make the case for your
              manager to approve enrollment.
            </p>
          </div>
          <a
            href="/resources/manager-recommendation-letter"
            className="inline-flex items-center space-x-2 bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-semibold px-6 py-3.5 rounded-lg shadow-lg transition-all whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download Letter</span>
          </a>
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
