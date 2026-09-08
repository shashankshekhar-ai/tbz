"use client";

import { motion } from "motion/react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function OrganizationHero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 bg-[#0c2940] text-white overflow-hidden border-b border-[#3f6d67]/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />
      <ParticleBackground variant="dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#39918d]/20 to-transparent blur-3xl pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <span className="text-xs sm:text-sm font-inter font-bold tracking-[0.18em] text-[#39918d] uppercase block mb-4">
          For Organizations
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold text-white mb-4 leading-[1.15] tracking-tight">
          Enterprise AI Transformation
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-roboto text-slate-200 max-w-3xl mx-auto leading-relaxed">
          Enterprise-wide AI transformation, custom model integration, and proprietary ROI
          models — for CXOs, enterprise boards, and enterprise PMOs.
        </p>
      </motion.div>
    </section>
  );
}
