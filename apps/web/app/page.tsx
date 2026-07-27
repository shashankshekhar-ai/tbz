import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "300+", label: "Executives trained" },
  { value: "40+", label: "Organizations transformed" },
  { value: "12 wk", label: "Solomon Engine cohort" },
  { value: "94%", label: "Would recommend" },
];

const programs = [
  {
    title: "AI Fluency Cohort",
    href: "/ai-fluency-cohort",
    description: "Cohort-based AI literacy and workflow transformation for professional teams.",
  },
  {
    title: "The Solomon Engine",
    href: "/the-solomon-engine",
    description: "12-week executive program for senior leaders navigating AI-driven transformation.",
  },
  {
    title: "For Organizations",
    href: "/for-organizations",
    description: "Custom AI readiness assessments, workshops, and implementation support.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-20 pt-32 pb-20 overflow-hidden bg-[#0c2940] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <span className="inline-flex items-center gap-2 text-xs font-inter font-bold tracking-widest uppercase text-[#39918d] mb-5 px-3 py-1 rounded-full border border-[#39918d]/40">
            <Sparkles className="w-3.5 h-3.5" />
            AI Readiness &amp; Executive Transformation
          </span>
          <h1 className="text-4xl md:text-6xl font-inter font-extrabold mb-6 leading-tight">
            Build an AI-Ready Organization
          </h1>
          <p className="text-lg md:text-xl text-[#D9E3E6] font-roboto max-w-2xl mx-auto mb-8">
            The Bradbury Group delivers AI fluency programs, executive coaching, and
            organizational transformation for leaders who refuse to be left behind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-inter font-semibold bg-[#f8c51c] text-[#0c2940] hover:bg-[#e0b016] hover:scale-[1.02] shadow-lg transition-all group"
            >
              Book a Discovery Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/the-solomon-engine"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-inter font-medium border border-white/30 text-white hover:bg-white/5 hover:border-[#39918d] transition-colors"
            >
              Explore The Solomon Engine
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#F7F8F9] border-b border-[#D9E3E6] py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-montserrat font-bold text-[#0c2940]">{s.value}</p>
              <p className="text-xs font-roboto uppercase tracking-wide text-[#60707A] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-3 text-[#0c2940]">
            Programs &amp; Solutions
          </h2>
          <p className="text-center font-roboto text-[#60707A] max-w-xl mx-auto mb-12">
            Three paths to AI fluency — for individuals, executives, and entire organizations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group block p-8 rounded-2xl border border-[#D9E3E6] hover:border-[#39918d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-9 w-9 rounded-lg bg-[#0c2940] mb-5 flex items-center justify-center text-[#39918d] font-bold group-hover:bg-[#39918d] group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-montserrat font-bold mb-3 text-[#0c2940] group-hover:text-[#39918d] transition-colors">
                  {program.title}
                </h3>
                <p className="text-[#60707A] font-roboto text-sm leading-relaxed">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-4 bg-[#0c2940] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">Not sure where to start?</h2>
          <p className="font-roboto text-[#D9E3E6] mb-8">
            Take our free AI Readiness Assessment and get a personalized maturity score with
            recommended next steps.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-inter font-semibold bg-[#f8c51c] text-[#0c2940] hover:bg-[#e0b016] hover:scale-[1.02] shadow-lg transition-all"
          >
            Start the Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
