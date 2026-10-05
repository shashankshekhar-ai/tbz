/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Section01BusinessCase } from './components/Section01BusinessCase';
import { Section02DecisionFramework } from './components/Section02DecisionFramework';
import { Section03DolCompetencies } from './components/Section03DolCompetencies';
import { Section04Credentials } from './components/Section04Credentials';
import { Section05Upskill } from './components/Section05Upskill';
import { ManagerLetterSection } from './components/ManagerLetterSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { AurilisStoryModal } from './components/AurilisStoryModal';
import { SyllabusModal } from './components/SyllabusModal';
import { ApplicationModal } from './components/ApplicationModal';
import { PHASE_PROGRAMS } from './data';
import { PhaseDetails } from './types';

export default function App() {
  const [isAurilisOpen, setIsAurilisOpen] = useState(false);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<PhaseDetails | null>(PHASE_PROGRAMS[0]);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyPhaseNum, setApplyPhaseNum] = useState<number>(1);

  // Pain point and Gaps modals state
  const [isPainPointModalOpen, setIsPainPointModalOpen] = useState(false);
  const [isGapsModalOpen, setIsGapsModalOpen] = useState(false);

  const handleOpenAurilis = () => {
    setIsAurilisOpen(true);
  };

  const handleFindOutMore = () => {
    setSelectedPhase(PHASE_PROGRAMS[0]);
    setIsSyllabusOpen(true);
  };

  const handleApplyPhase1 = () => {
    setApplyPhaseNum(1);
    setIsApplyOpen(true);
  };

  const handleApplyPhase2 = () => {
    setApplyPhaseNum(2);
    setIsApplyOpen(true);
  };

  const handleGetStarted = () => {
    setApplyPhaseNum(1);
    setIsApplyOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#0c2940] selection:bg-[#39918d]/20 selection:text-[#0c2940] w-full overflow-x-hidden">
      {/* NO HEADER - HEADER REMOVED COMPLETELY AS REQUESTED */}

      <main className="flex-1 w-full">
        {/* HERO */}
        <Hero onOpenAurilis={handleOpenAurilis} />

        {/* 01 / BUSINESS CASE */}
        <Section01BusinessCase onOpenPainPoint={() => setIsPainPointModalOpen(true)} />

        {/* 02 / DECISION FRAMEWORK */}
        <Section02DecisionFramework
          onFindOutMore={handleFindOutMore}
          onApplyPhase1={handleApplyPhase1}
          onApplyPhase2={handleApplyPhase2}
        />

        {/* DOL COMPETENCIES */}
        <Section03DolCompetencies onOpenGapsDiagnostic={() => setIsGapsModalOpen(true)} />

        {/* CREDENTIALS */}
        <Section04Credentials />

        {/* HOW TO UPSKILL YOURSELF */}
        <Section05Upskill />

        {/* Manager Letter */}
        <ManagerLetterSection />

        {/* FINAL CTA */}
        <FinalCtaSection onGetStarted={handleGetStarted} />
      </main>

      {/* Interactive Modals */}
      <AurilisStoryModal
        isOpen={isAurilisOpen}
        onClose={() => setIsAurilisOpen(false)}
      />

      <SyllabusModal
        phase={selectedPhase}
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        onApply={(phaseNum) => {
          setIsSyllabusOpen(false);
          setApplyPhaseNum(phaseNum);
          setIsApplyOpen(true);
        }}
      />

      <ApplicationModal
        isOpen={isApplyOpen}
        initialPhase={applyPhaseNum}
        onClose={() => setIsApplyOpen(false)}
      />

      {/* Pain Point Diagnostic Dialog */}
      {isPainPointModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-[#0c2940] border border-[#39918d]/50 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setIsPainPointModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="font-h1 text-xl font-bold text-white mb-3">
              What’s the one pain point you would try to fix with AI?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mb-4 font-body leading-relaxed">
              In our cohorts, practitioners bring their single most stubborn bottleneck and build an
              assistant that solves it in under 2 hours.
            </p>
            <div className="space-y-2 mb-6">
              {[
                'PowerBI / DAX formula debugging',
                'Literature review & research synthesis',
                'Multi-week approval and revision loops',
                'Executive speechwriting and reporting',
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setIsPainPointModalOpen(false);
                    handleApplyPhase1();
                  }}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#f8c51c] hover:bg-[#3f6d67]/30 transition-colors cursor-pointer text-xs sm:text-sm flex items-center justify-between"
                >
                  <span>{item}</span>
                  <span className="text-[#f8c51c] text-xs font-bold">Solve in Cohort →</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setIsPainPointModalOpen(false);
                handleApplyPhase1();
              }}
              className="w-full py-2.5 rounded-lg bg-[#39918d] hover:bg-[#327e7b] text-white font-bold text-xs uppercase"
            >
              Apply to Solve Your Bottleneck
            </button>
          </div>
        </div>
      )}

      {/* Gaps Diagnostic Dialog */}
      {isGapsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-[#0c2940] border border-[#39918d]/50 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setIsGapsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="text-xs font-h3 uppercase tracking-wider text-[#f8c51c] mb-1">
              Competencies Diagnostic
            </div>
            <h3 className="font-h1 text-xl font-bold text-white mb-3">
              Where are the gaps for you or your team right now?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mb-4 font-body leading-relaxed">
              Map your team’s current state against the 5 U.S. Department of Labor competencies:
            </p>
            <div className="space-y-2 mb-6 text-xs sm:text-sm">
              {[
                '1. Understand AI (Mental models & vocabulary)',
                '2. Use AI Effectively (Practical application)',
                '3. Direct AI Effectively (Prompt control & iteration)',
                '4. Evaluate Outputs Responsibly (Human verification)',
                '5. Use AI Responsibly (Security & compliance)',
              ].map((gap, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between"
                >
                  <span className="text-slate-200">{gap}</span>
                  <span className="text-[#39918d] font-bold text-xs">Phase {i < 3 ? '1' : '2'}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setIsGapsModalOpen(false);
                handleApplyPhase1();
              }}
              className="w-full py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-bold text-xs uppercase"
            >
              Close Gaps in Next Cohort
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
