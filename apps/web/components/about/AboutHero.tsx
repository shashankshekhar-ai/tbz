"use client";

import { motion } from "motion/react";
import { Shield, Cpu, Users, Sparkles } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function AboutHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0c2940] via-[#0c2940] to-[#082033] overflow-hidden border-b border-[#3f6d67]/30"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#39918d]/15 pointer-events-none blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#3f6d67]/20 pointer-events-none blur-3xl rounded-full" />
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-[#f8c51c]/10 pointer-events-none blur-3xl rounded-full" />

      <ParticleBackground variant="dark" />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        <div className="max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f8c51c] text-xs sm:text-sm font-h2 font-bold tracking-wider uppercase"
          >
            <Sparkles className="w-4 h-4 text-[#f8c51c]" />
            <span>The Bradbury Philosophy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-h1 font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight"
          >
            Learning transformation <br />
            <span className="bg-gradient-to-r from-[#39918d] via-[#f8c51c] to-[#c57b4b] bg-clip-text text-transparent drop-shadow-sm">
              starts with people.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-lg sm:text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-3xl font-normal"
          >
            AI capability isn&rsquo;t built by checking boxes. It&rsquo;s built by creating the conditions where
            people can experiment, struggle, adapt, and gain confidence.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          <div className="bg-[#0c2940] rounded-2xl p-6 sm:p-7 border border-[#3f6d67]/50 hover:border-[#39918d] transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between group backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#39918d]/15 border border-[#39918d]/30 flex items-center justify-center text-[#39918d] group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-[#39918d]" />
                </div>
                <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#39918d] bg-[#39918d]/15 px-2.5 py-1 rounded-full border border-[#39918d]/30">
                  Condition 01
                </span>
              </div>

              <h2 className="font-h2 text-xl font-bold text-white mb-2 group-hover:text-[#39918d] transition-colors">
                Psychological Safety
              </h2>

              <p className="font-body text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                Safe-to-fail environments where people can freely{" "}
                <strong className="text-white font-semibold">experiment</strong>, test prompt limits, and make
                mistakes without fear of judgment or compliance risk.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3f6d67]/30 flex items-center justify-between">
              <span className="font-caption text-xs font-bold text-[#39918d] tracking-wide uppercase">
                Zero-Risk Sandbox
              </span>
              <span className="text-xs text-slate-400 font-medium">Safe Practice</span>
            </div>
          </div>

          <div className="bg-[#0c2940] rounded-2xl p-6 sm:p-7 border border-[#3f6d67]/50 hover:border-[#c57b4b] transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between group backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#c57b4b]/15 border border-[#c57b4b]/30 flex items-center justify-center text-[#c57b4b] group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-[#c57b4b]" />
                </div>
                <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#c57b4b] bg-[#c57b4b]/15 px-2.5 py-1 rounded-full border border-[#c57b4b]/30">
                  Condition 02
                </span>
              </div>

              <h2 className="font-h2 text-xl font-bold text-white mb-2 group-hover:text-[#c57b4b] transition-colors">
                Learning Architecture
              </h2>

              <p className="font-body text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                Structured multi-phase progression where teams{" "}
                <strong className="text-white font-semibold">struggle & adapt</strong> together through real
                workflows, converting initial friction into lasting fluency.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3f6d67]/30 flex items-center justify-between">
              <span className="font-caption text-xs font-bold text-[#c57b4b] tracking-wide uppercase">
                Workflow Grounded
              </span>
              <span className="text-xs text-slate-400 font-medium">Applied Fluency</span>
            </div>
          </div>

          <div className="bg-[#0c2940] rounded-2xl p-6 sm:p-7 border border-[#3f6d67]/50 hover:border-[#f8c51c] transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between group backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#f8c51c]/15 border border-[#f8c51c]/30 flex items-center justify-center text-[#f8c51c] group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-[#f8c51c]" />
                </div>
                <span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#f8c51c] bg-[#f8c51c]/15 px-2.5 py-1 rounded-full border border-[#f8c51c]/30">
                  Condition 03
                </span>
              </div>

              <h2 className="font-h2 text-xl font-bold text-white mb-2 group-hover:text-[#f8c51c] transition-colors">
                Workforce Readiness
              </h2>

              <p className="font-body text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                Equipping people to <strong className="text-white font-semibold">gain confidence</strong> as
                autonomous builders who deploy, govern, and scale bespoke AI tools that drive measurable business
                impact.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3f6d67]/30 flex items-center justify-between">
              <span className="font-caption text-xs font-bold text-[#f8c51c] tracking-wide uppercase">
                Measurable ROI
              </span>
              <span className="text-xs text-slate-400 font-medium">Lasting Impact</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
