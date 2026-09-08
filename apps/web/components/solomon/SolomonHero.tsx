"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles, Building2, Users2 } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function SolomonHero() {
  return (
    <section
      id="hero"
      className="relative bg-[#0c2940] text-white pt-32 sm:pt-36 pb-20 md:pb-28 overflow-hidden border-b border-white/10"
    >
      <ParticleBackground variant="dark" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#39918d]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#f8c51c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#f8c51c]" />
          <span className="text-xs sm:text-sm font-montserrat font-bold uppercase tracking-widest text-[#f8c51c]">
            For Leaders
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-inter font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
        >
          The Solomon Engine
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-[21px] text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-roboto font-light"
        >
          A 12-week executive cohort program for senior leaders navigating AI-driven transformation —
          team enablement, cross-functional alignment, and leadership architecture design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
