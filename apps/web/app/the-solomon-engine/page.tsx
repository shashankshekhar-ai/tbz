import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SolomonHero } from "@/components/solomon/SolomonHero";
import { CohortTierCards } from "@/components/solomon/CohortTierCards";
import { TracksAndReimbursement } from "@/components/solomon/TracksAndReimbursement";
import { ApplySection } from "@/components/solomon/ApplySection";

export const metadata: Metadata = {
  title: "The Solomon Engine",
  description:
    "A 12-week executive cohort program for senior leaders navigating AI-driven transformation.",
};

export default function SolomonEnginePage() {
  return (
    <div>
      <SolomonHero />
      <CohortTierCards />
      <TracksAndReimbursement />

      <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
