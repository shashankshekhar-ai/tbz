import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our ROI for Human-Focused AI",
  description:
    "Rigorous measurement, verifiable performance benchmarks, and measurable business impact from our For You and For Leaders programs.",
};

const results = [
  {
    id: "for-you-results",
    title: "For You Results",
    stats: [
      { value: "89%", label: "Report daily AI workflow adoption within 30 days" },
      { value: "4.2 hrs", label: "Average weekly time reclaimed per participant" },
      { value: "94%", label: "Would recommend to a peer" },
    ],
    accentColor: "#39918d",
  },
  {
    id: "for-leaders-results",
    title: "For Leaders Results",
    stats: [
      { value: "76%", label: "Of cohort leaders shipped a team AI workflow within 90 days" },
      { value: "3.1x", label: "Increase in team-reported AI confidence, pre/post cohort" },
      { value: "40+", label: "Organizations transformed through leadership cohorts" },
    ],
    accentColor: "#c57b4b",
  },
];

export default function OurAiReturnPage() {
  return (
    <div>
      <section className="relative -mt-20 pt-32 pb-16 bg-[#0c2940] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block mb-3">
            Our ROI
          </span>
          <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4">
            ROI for Human-Focused AI
          </h1>
          <p className="text-lg font-roboto text-[#D9E3E6] max-w-2xl mx-auto">
            Rigorous measurement, verifiable performance benchmarks, and measurable business
            impact — proven, not promised.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        {results.map((group) => (
          <div key={group.id} id={group.id}>
            <h2 className="text-2xl font-montserrat font-bold text-[#0c2940] mb-6">{group.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {group.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#D9E3E6] p-6 hover:border-[#39918d] hover:shadow-md transition-all"
                >
                  <TrendingUp className="w-5 h-5 mb-3" style={{ color: group.accentColor }} />
                  <p className="text-3xl font-montserrat font-extrabold text-[#0c2940]">{stat.value}</p>
                  <p className="text-sm font-roboto text-[#60707A] mt-2 leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-center text-xs font-roboto text-[#BFC9CD] italic">
          Figures reflect aggregate self-reported cohort survey data collected post-program.
        </p>
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
