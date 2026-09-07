import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/ai-fluency/HeroSection";
import { TwoPhaseSection } from "@/components/ai-fluency/TwoPhaseSection";
import { TaxReimbursementSection } from "@/components/ai-fluency/TaxReimbursementSection";

export const metadata: Metadata = {
  title: "AI Fluency Cohort",
  description:
    "A structured, two-phase program from AI literacy to AI fluency — individual executive coaching, personal AI agent workflows, and foundational upskilling.",
};

export default function AiFluencyCohortPage() {
  return (
    <div>
      <HeroSection />

      <TwoPhaseSection />

      <TaxReimbursementSection />

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
