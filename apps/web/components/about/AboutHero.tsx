"use client";

import { ArrowDown, Shield, Cpu, Users } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

function openColumbus(topic: string) {
  window.dispatchEvent(new CustomEvent("open-columbus", { detail: topic }));
}

export function AboutHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] overflow-hidden border-b border-slate-200/80">
      <div className="absolute top-1/4 right-10 w-96 h-96 glow-teal pointer-events-none opacity-80 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 glow-copper pointer-events-none opacity-60 blur-3xl" />

      <ParticleBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="font-h2 text-xs font-bold text-[#c57b4b] tracking-[0.25em] uppercase px-3.5 py-1 bg-[#c57b4b]/10 border border-[#c57b4b]/30 rounded-full">
            THE BRADBURY GROUP
          </span>
          <div className="h-[1px] w-12 bg-slate-300" />
          <span className="font-caption text-xs text-slate-600 font-medium">
            About Page &amp; Editorial Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9 space-y-8">
            <h1 className="font-h1 font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0c2940] leading-[1.08] tracking-tight">
              Learning transformation <br />
              <span className="bg-gradient-to-r from-[#0c2940] via-[#1e3a8a] to-[#0f766e] bg-clip-text text-transparent">
                starts with people.
              </span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl font-normal">
              AI capability isn&rsquo;t built by checking boxes. It&rsquo;s built by creating the
              conditions where people can experiment, struggle, adapt, and gain confidence.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-4 pt-2 border-t lg:border-t-0 lg:border-l border-slate-200/80 lg:pl-8">
            <span className="font-caption text-xs text-[#0f766e] tracking-widest block uppercase font-bold">
              Strategic Pillars
            </span>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-teal-500 transition-colors">
                <Shield className="w-4 h-4 text-[#c57b4b] mt-0.5 shrink-0" />
                <div>
                  <span className="font-h2 text-xs font-bold text-[#0c2940] block">
                    Psychological Safety
                  </span>
                  <span className="font-caption text-[11px] text-slate-600 font-medium">
                    Agency to push back &amp; struggle
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-teal-500 transition-colors">
                <Cpu className="w-4 h-4 text-[#0f766e] mt-0.5 shrink-0" />
                <div>
                  <span className="font-h2 text-xs font-bold text-[#0c2940] block">
                    Learning Architecture
                  </span>
                  <span className="font-caption text-[11px] text-slate-600 font-medium">
                    Frameworks over isolated tools
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-teal-500 transition-colors">
                <Users className="w-4 h-4 text-[#b45309] mt-0.5 shrink-0" />
                <div>
                  <span className="font-h2 text-xs font-bold text-[#0c2940] block">
                    Workforce Readiness
                  </span>
                  <span className="font-caption text-[11px] text-slate-600 font-medium">
                    Practical confidence &amp; skill
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openColumbus("approach")}
              className="w-full text-left font-h2 text-xs font-bold text-[#0f766e] hover:text-[#0c2940] transition-colors pt-2 flex items-center justify-between group"
            >
              <span>Explore Architecture Blueprint</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200 text-xs text-slate-600 font-h2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e] animate-pulse" />
            <span className="uppercase tracking-widest text-[#0c2940] font-bold">Diagnostic Intelligence</span>
          </div>
          <span className="hidden xs:inline text-slate-300">|</span>
          <span className="font-caption text-slate-600 font-medium">Human Expertise × AI Transformation</span>
        </div>

        <a
          href="#story"
          className="group flex items-center gap-3 text-slate-700 hover:text-[#0c2940] transition-colors focus:outline-none"
        >
          <span className="uppercase tracking-widest text-[11px] font-bold">Begin Digital Story</span>
          <div className="w-8 h-8 rounded-full border border-slate-300 group-hover:border-[#0c2940] bg-white flex items-center justify-center transition-colors shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-[#0f766e] group-hover:text-[#0c2940] group-hover:translate-y-0.5 transition-all" />
          </div>
        </a>
      </div>
    </section>
  );
}
