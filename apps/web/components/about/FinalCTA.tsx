"use client";

import Link from "next/link";
import { ArrowUpRight, Layers, ShieldCheck, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-28 px-6 sm:px-8 lg:px-12 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-teal pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-10 w-80 h-80 glow-copper pointer-events-none opacity-30 blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-10 bg-white border border-slate-200 rounded-3xl p-10 sm:p-16 lg:p-20 shadow-xl backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
          <span className="font-h2 text-xs font-bold uppercase tracking-[0.2em] text-[#b45309]">The Next Step</span>
        </div>

        <h2 className="font-h1 font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0c2940] tracking-tight leading-[1.1]">
          Build the capability. <br />
          <span className="bg-gradient-to-r from-[#0f766e] via-[#0c2940] to-[#b45309] bg-clip-text text-transparent">
            Not just the compliance.
          </span>
        </h2>

        <p className="font-body text-base sm:text-xl text-slate-700 font-normal max-w-2xl mx-auto leading-relaxed">
          Let&rsquo;s create an AI learning strategy built around how your people actually learn, work, and adapt.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0c2940] hover:bg-[#163a59] text-white font-h2 text-sm font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 active:scale-95"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4 text-[#f8c51c]" />
          </Link>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-columbus", { detail: "approach" }))}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-300 hover:border-[#0c2940] text-slate-800 font-h2 text-sm font-bold px-8 py-4 rounded-xl bg-white hover:bg-slate-50 transition-all duration-300 shadow-xs"
          >
            <Layers className="w-4 h-4 text-[#0f766e]" />
            <span>Explore Our Approach</span>
          </button>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-caption font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0f766e]" />
            <span>Strategy before implementation</span>
          </div>
          <span>•</span>
          <span>Zero unsolicited dependencies</span>
          <span>•</span>
          <span>Ethical &amp; science-backed framework</span>
        </div>
      </div>
    </section>
  );
}
