"use client";

import { useState } from "react";
import { BookOpen, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { COHORT_PHASES } from "./cohortData";

type PhaseTab = "all" | "literacy" | "fluency";

const literacyPhase = COHORT_PHASES[0];
const fluencyPhase = COHORT_PHASES[1];

export function TwoPhaseSection() {
  const [activeTab, setActiveTab] = useState<PhaseTab>("all");
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);

  return (
    <section id="cohort-overview" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-[#0c2940] tracking-tight mb-4">
            A Two-Phase Path: From Literacy to Fluency
          </h2>
          <p className="text-base sm:text-lg font-roboto text-[#60707A] leading-relaxed">
            Move from foundational mental models to personal, autonomous agent execution. Our
            curriculum bridges technical comprehension with applied executive leverage.
          </p>

          {/* Phase toggle */}
          <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 rounded-xl bg-[#F7F8F9] border border-[#D9E3E6] shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-montserrat font-bold transition-all cursor-pointer ${
                activeTab === "all" ? "bg-[#0c2940] text-white shadow-md" : "text-[#0c2940]/70 hover:text-[#0c2940]"
              }`}
            >
              Side-by-Side View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("literacy")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-montserrat font-bold transition-all cursor-pointer ${
                activeTab === "literacy" ? "bg-[#c57b4b] text-white shadow-md" : "text-[#0c2940]/70 hover:text-[#c57b4b]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Phase 1: Literacy</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("fluency")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-montserrat font-bold transition-all cursor-pointer ${
                activeTab === "fluency" ? "bg-[#39918d] text-white shadow-md" : "text-[#0c2940]/70 hover:text-[#39918d]"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Phase 2: Fluency</span>
            </button>
          </div>
        </div>

        {/* Progression stepper */}
        <div className="mb-12 bg-gradient-to-r from-[#0c2940] via-[#123652] to-[#0c2940] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-inter font-bold uppercase tracking-widest text-[#f8c51c]">
                The Executive Progression
              </span>
              <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white">
                From Technical Comprehension to Autonomous Workflow Execution
              </h3>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#c57b4b]/20 border border-[#c57b4b]/50">
                <span className="w-2 h-2 rounded-full bg-[#c57b4b]" />
                <span className="font-montserrat text-xs font-bold text-white">1. Understand &amp; Evaluate</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#f8c51c] shrink-0" />
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#39918d]/20 border border-[#39918d]/50">
                <span className="w-2 h-2 rounded-full bg-[#39918d]" />
                <span className="font-montserrat text-xs font-bold text-white">2. Architect &amp; Deploy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase cards */}
        <div className={`grid gap-8 lg:gap-10 w-full ${activeTab === "all" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
          {(activeTab === "all" || activeTab === "literacy") && (
            <PhaseCard
              phase={literacyPhase}
              icon={<BookOpen className="w-7 h-7 stroke-[2.2]" />}
              focusLabel="Core Focus Areas"
              footerLabel="Foundational Executive Competence"
              pathwayLabel="Phase 1 Pathway"
              selectedCapability={selectedCapability}
              onSelectCapability={setSelectedCapability}
            />
          )}

          {(activeTab === "all" || activeTab === "fluency") && (
            <PhaseCard
              phase={fluencyPhase}
              icon={<Sparkles className="w-7 h-7 stroke-[2.2]" />}
              focusLabel="Applied Workflow Capabilities"
              footerLabel="Applied Personal Agent Mastery"
              pathwayLabel="Phase 2 Pathway"
              selectedCapability={selectedCapability}
              onSelectCapability={setSelectedCapability}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function PhaseCard({
  phase,
  icon,
  focusLabel,
  footerLabel,
  pathwayLabel,
  selectedCapability,
  onSelectCapability,
}: {
  phase: (typeof COHORT_PHASES)[number];
  icon: React.ReactNode;
  focusLabel: string;
  footerLabel: string;
  pathwayLabel: string;
  selectedCapability: string | null;
  onSelectCapability: (title: string | null) => void;
}) {
  const accent = phase.accentColor;

  return (
    <div
      className="bg-white rounded-2xl border-2 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden"
      style={{ borderColor: `${accent}4d` }}
    >
      <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: accent }} />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-14 h-14 rounded-xl border flex items-center justify-center shadow-sm"
            style={{ backgroundColor: `${accent}1a`, borderColor: `${accent}4d`, color: accent }}
          >
            {icon}
          </div>
          <span
            className="px-3.5 py-1 rounded-full text-white font-montserrat font-bold text-xs uppercase tracking-widest shadow-sm"
            style={{ backgroundColor: accent }}
          >
            {phase.badge}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-[#0c2940] mb-3">{phase.title}</h3>

        <p
          className="text-sm sm:text-base font-roboto text-[#0c2940]/80 leading-relaxed mb-8 p-4 rounded-xl border"
          style={{ backgroundColor: `${accent}0d`, borderColor: `${accent}33` }}
        >
          {phase.tagline}
        </p>

        <div className="space-y-3 mb-8">
          <div className="font-montserrat font-bold text-xs uppercase tracking-widest" style={{ color: accent }}>
            {focusLabel}
          </div>

          {phase.capabilities.map((cap) => {
            const isSelected = selectedCapability === cap.title;
            return (
              <button
                type="button"
                key={cap.title}
                onClick={() => onSelectCapability(isSelected ? null : cap.title)}
                className="w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer"
                style={
                  isSelected
                    ? { backgroundColor: `${accent}1a`, borderColor: accent }
                    : { backgroundColor: "#ffffff", borderColor: "#D9E3E6" }
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accent }} />
                    <span className="font-montserrat font-bold text-sm text-[#0c2940]">{cap.title}</span>
                  </div>
                  <span className="text-xs font-montserrat font-semibold shrink-0" style={{ color: accent }}>
                    {isSelected ? "− Less" : "+ Details"}
                  </span>
                </div>
                {isSelected && (
                  <p
                    className="mt-2.5 pt-2 text-xs font-roboto text-[#0c2940]/80 leading-relaxed border-t"
                    style={{ borderColor: `${accent}33` }}
                  >
                    {cap.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-5 border-t border-[#EDF2F4] flex items-center justify-between gap-3">
        <span className="font-caption text-xs text-[#0c2940]/70">{footerLabel}</span>
        <span className="font-montserrat font-semibold text-xs shrink-0" style={{ color: accent }}>
          {pathwayLabel}
        </span>
      </div>
    </div>
  );
}
