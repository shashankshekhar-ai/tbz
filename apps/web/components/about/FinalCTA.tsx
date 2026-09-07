"use client";

import Link from "next/link";
import { ArrowUpRight, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

export function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0c2940] via-[#0c2940] to-[#082033] border-t border-[#3f6d67]/30 overflow-hidden">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#39918d]/15 pointer-events-none blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#c57b4b]/15 pointer-events-none blur-3xl rounded-full" />

      <ParticleBackground variant="dark" />

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f8c51c] text-xs sm:text-sm font-h2 font-bold tracking-wider uppercase">
          <Sparkles className="w-4 h-4 text-[#f8c51c]" />
          <span>The Next Step</span>
        </div>

        <h2 className="font-h1 font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
          Build the capability. <br />
          <span className="bg-gradient-to-r from-[#39918d] via-[#f8c51c] to-[#c57b4b] bg-clip-text text-transparent drop-shadow-sm">
            Not just the compliance.
          </span>
        </h2>

        <p className="font-body text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
          Let&rsquo;s create an AI learning strategy built around how your people actually learn, work, and adapt.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f8c51c] hover:bg-[#f9d04b] text-[#0c2940] font-inter font-semibold text-sm px-8 py-4 rounded-full shadow-[0_10px_24px_rgba(248,197,28,0.24)] hover:shadow-[0_12px_28px_rgba(248,197,28,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-columbus", { detail: "approach" }))}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 hover:border-[#39918d] text-white font-h2 text-sm font-bold px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
          >
            <Layers className="w-4 h-4 text-[#39918d]" />
            <span>Explore Our Approach</span>
          </button>
        </div>

        <div className="pt-8 border-t border-[#3f6d67]/30 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-caption font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#39918d]" />
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
