'use client';

import React, { useState } from 'react';
import { ArrowRight, Info, ShieldCheck, Compass, Users, Briefcase, Building2 } from 'lucide-react';
import { ModalContent } from '../types';
import { ProgramDetailModal } from './ProgramDetailModal';
import { TaxCreditsModal } from './TaxCreditsModal';

export const ClosingNavigation: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState<boolean>(false);

  const programs: Record<string, ModalContent> = {
    fluency: {
      title: 'The AI Fluency Cohort',
      subtitle: 'Path for Individual Practitioners & Creators (For You)',
      category: 'individual',
      body: [
        'A high-intensity, hands-on cohort designed for practitioners who want to eliminate repetitive friction from their daily work.',
        'You walk in with your actual operational bottleneck and walk out with custom AI assistants and repeatable evaluation frameworks that belong to you forever.',
        'All work is built using your existing, employer-approved software stack—requiring $0 in new tooling licenses.',
      ],
      keyHighlights: [
        'Live PowerBI formula debugging, multi-LLM comparative benchmarking, and structured storyboard drafting',
        'Pre- and post-session workflow velocity audits with confirmed live metrics',
        'Average measured time savings of 2+ hours per week per practitioner',
      ],
    },
    solomon: {
      title: 'The Solomon Engine',
      subtitle: 'Personal AI Mastery for Executive Leaders (For Leaders)',
      category: 'leaders',
      body: [
        'A tailored, one-on-one executive intensive designed for organizational decision-makers who need to master AI personally.',
        'We help leaders transition from being operational "doers" to strategic "approvers," liberating executive bandwidth for long-range planning, board governance, and high-impact stewardship.',
        'Documented across client engagements to yield an average of $13.83 in documented value for every dollar invested.',
      ],
      keyHighlights: [
        'Personal 5-year AI strategy roadmap tailored to your specific organization',
        'Custom private assistant suite for speechwriting, board decks, and financial modeling',
        'Direct recovery of 70+ executive hours in the initial 6-week sprint',
      ],
    },
    partnerships: {
      title: 'Organizational Partnerships',
      subtitle: 'Embedded Transformation & Knowledge Architecture (For Organizations)',
      category: 'orgs',
      body: [
        'An end-to-end embedded partnership where our team embeds inside your division for 3 to 6 months.',
        'We design and deploy institutional knowledge architectures, automated triage systems, and analyst engines that compress organizational timelines by up to 75%.',
        'Built with zero external dependency: your staff completely owns, governs, and operates the infrastructure.',
      ],
      keyHighlights: [
        'Semantic search and automated synthesis across thousands of internal strategy documents',
        'Up to 75% compression of annual review and regulatory reporting cycles',
        'Rigorous data privacy safeguards and compliance with federal/institutional guidelines',
      ],
    },
  };

  return (
    <footer
      id="closing-navigation"
      className="py-16 sm:py-20 lg:py-24 bg-[#0c2940] text-white border-t border-[#39918d]/30"
      aria-labelledby="closing-nav-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (No Sales CTA — Trust Page) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3f6d67]/30 border border-[#39918d]/40 text-xs font-semibold uppercase tracking-wider text-[#f8c51c] font-h3 mb-4">
            <Compass className="w-3.5 h-3.5" />
            Methodology Pathways
          </div>

          <h2
            id="closing-nav-title" className="t-h2 text-white"
          >
            See How the Work Gets Done
          </h2>

          <p className="font-caption text-sm sm:text-base text-slate-300 mt-3">
            Structured engagement models designed for individual practitioners, executive leaders,
            and complete institutions.
          </p>
        </div>

        {/* 3 Main Pathway Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Link 1: Explore the AI Fluency Cohort */}
          <button
            type="button"
            onClick={() => setActiveModal(programs.fluency)}
            className="group text-left bg-[#0f3452]/90 hover:bg-[#134065] border border-[#39918d]/30 hover:border-[#39918d] rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between shadow-sm min-h-[180px] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-2 rounded-lg bg-[#3f6d67]/40 text-[#f8c51c]">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-h3">
                  For You
                </span>
              </div>
              <h3 className="font-h3 text-lg font-bold text-white group-hover:text-[#f8c51c] transition-colors leading-snug">
                Explore the AI Fluency Cohort
              </h3>
              <p className="font-body text-xs text-slate-300 mt-2 leading-relaxed">
                For instructional designers, developers, trainers, and individual problem-solvers.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#f8c51c] font-h3">
              <span>View Engagement Specs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Link 2: Learn About The Solomon Engine */}
          <button
            type="button"
            onClick={() => setActiveModal(programs.solomon)}
            className="group text-left bg-[#0f3452]/90 hover:bg-[#134065] border border-[#39918d]/30 hover:border-[#c57b4b] rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between shadow-sm min-h-[180px] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-2 rounded-lg bg-[#c57b4b]/25 text-[#f8c51c]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-h3">
                  For Leaders
                </span>
              </div>
              <h3 className="font-h3 text-lg font-bold text-white group-hover:text-[#f8c51c] transition-colors leading-snug">
                Learn About The Solomon Engine
              </h3>
              <p className="font-body text-xs text-slate-300 mt-2 leading-relaxed">
                For executive directors, department heads, and founders seeking personal mastery.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#f8c51c] font-h3">
              <span>View Leadership ROI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Link 3: Explore Organizational Partnerships */}
          <button
            type="button"
            onClick={() => setActiveModal(programs.partnerships)}
            className="group text-left bg-[#0f3452]/90 hover:bg-[#134065] border border-[#39918d]/30 hover:border-[#39918d] rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between shadow-sm min-h-[180px] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-2 rounded-lg bg-[#39918d]/30 text-white">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-h3">
                  For Organizations
                </span>
              </div>
              <h3 className="font-h3 text-lg font-bold text-white group-hover:text-[#f8c51c] transition-colors leading-snug">
                Explore Organizational Partnerships
              </h3>
              <p className="font-body text-xs text-slate-300 mt-2 leading-relaxed">
                For institutions, federal evaluation centers, and multi-department enterprises.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#f8c51c] font-h3">
              <span>View Enterprise Architecture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Secondary Line: Tax Credits & Deductions */}
        <div className="text-center pt-8 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsTaxModalOpen(true)}
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-body text-slate-200 hover:text-[#f8c51c] transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <ShieldCheck className="w-4 h-4 text-[#f8c51c] shrink-0" />
            <span>
              Your investment may qualify for tax credits and deductions.{' '}
              <strong className="underline decoration-[#f8c51c] underline-offset-4 font-semibold text-white group-hover:text-[#f8c51c]">
                See the details →
              </strong>
            </span>
          </button>

          <p className="font-caption text-xs text-slate-300 mt-3 max-w-xl mx-auto">
            Documentation provided for IRS Section 127 Educational Assistance, IRC 162 business expense
            write-offs, and state-level workforce upskilling grants.
          </p>
        </div>
      </div>

      {/* Detail Modals */}
      <ProgramDetailModal
        isOpen={!!activeModal}
        content={activeModal}
        onClose={() => setActiveModal(null)}
      />

      <TaxCreditsModal
        isOpen={isTaxModalOpen}
        onClose={() => setIsTaxModalOpen(false)}
      />
    </footer>
  );
};
