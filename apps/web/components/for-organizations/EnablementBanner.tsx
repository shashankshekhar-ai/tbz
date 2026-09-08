"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function EnablementBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl bg-[#0c2940] border border-[#3f6d67]/40 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-inter font-bold tracking-[0.16em] uppercase text-[#39918d] block">
            Team AI Enablement
          </span>
          <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-white tracking-tight">
            Looking for individual enablement instead?
          </h3>
          <p className="text-sm sm:text-base font-roboto text-slate-300 leading-relaxed">
            For single-seat or small-team enrollment rather than an organization-wide rollout,
            see the AI Fluency Cohort — our path built for individuals.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/ai-fluency-cohort"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#f8c51c] hover:brightness-105 active:scale-[0.98] text-[#0c2940] font-inter font-bold text-sm tracking-wide transition-all shadow-md group whitespace-nowrap"
          >
            <span>Go to For You</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
