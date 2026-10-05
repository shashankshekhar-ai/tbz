'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, BookOpen, Clock, Award, Shield, ExternalLink } from 'lucide-react';
import { PhaseDetails } from '../types';

interface SyllabusModalProps {
  phase: PhaseDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (phaseNumber: number) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  phase,
  isOpen,
  onClose,
  onApply,
}) => {
  if (!isOpen || !phase) return null;

  const phase1Modules = [
    {
      module: 'Module 01',
      title: 'Foundational AI Concepts & LLM Architecture',
      focus: 'Tokenization, temperature, attention mechanics, context windows, and model tradeoffs.',
    },
    {
      module: 'Module 02',
      title: 'Responsible & Ethical AI in the Workplace',
      focus: 'Department of Labor guidelines, IP guardrails, confidentiality, and data hygiene.',
    },
    {
      module: 'Module 03',
      title: 'Advanced Prompting Frameworks & Delimiters',
      focus: 'System prompts, zero-shot/few-shot framing, structural tags, and persona anchoring.',
    },
    {
      module: 'Module 04',
      title: 'Designing and Running a Pilot Project',
      focus: 'Bottleneck taxonomy, scoping small verifiable wins, and zero-tooling setup.',
    },
    {
      module: 'Module 05',
      title: 'Basics of Building an AI Assistant',
      focus: 'Custom GPT/Claude project creation, knowledge retrieval grounding, and edge case rules.',
    },
    {
      module: 'Module 06',
      title: 'Durable Soft Skills & Stakeholder Advocacy',
      focus: 'How to present AI workflows to skeptical managers, executive reporting, and wage premium growth.',
    },
  ];

  const phase2Modules = [
    {
      module: 'Module 01',
      title: 'Personal Use Case Deep Dive & Architecture',
      focus: 'Audit your high-friction daily workflows, quantify current hour waste, and map out AI automation.',
    },
    {
      module: 'Module 02',
      title: 'Multi-LLM Tool Vetting & Benchmarking',
      focus: 'Empirical head-to-head testing (Gemini vs Claude vs GPT), scoring matrices, and defensible selection.',
    },
    {
      module: 'Module 03',
      title: 'Pilot Project Architecture & Custom Assistant Build',
      focus: 'End-to-end bot construction with structured inputs, schema enforcement, and self-correction loops.',
    },
    {
      module: 'Module 04',
      title: 'Organizing & Indexing Institutional Data',
      focus: 'Vector grounding concepts, prompt repositories, SOP synthesis, and markdown knowledge hubs.',
    },
    {
      module: 'Module 05',
      title: 'AI Governance & Compliance Standards',
      focus: 'Department of Labor five competencies compliance, audit trails, and risk management.',
    },
    {
      module: 'Module 06',
      title: 'Measuring & Proving ROI to Leadership',
      focus: 'Before/after velocity tracking, dollar leverage ratio modeling ($13.83/dollar), and executive presentation.',
    },
  ];

  const modules = phase.phaseNumber === 1 ? phase1Modules : phase2Modules;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="syllabus-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/75 backdrop-blur-xs"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0c2940] text-white rounded-2xl border border-[#39918d]/40 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#081d2e] p-6 border-b border-[#39918d]/30 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3f6d67] text-white text-xs font-bold font-h3 uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Curriculum Syllabus</span>
            </div>
            <h3 id="syllabus-modal-title" className="font-h1 text-xl sm:text-2xl font-bold text-white">
              {phase.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#f8c51c] font-medium mt-1">
              {phase.headline} · {phase.duration} ({phase.sessions})
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close syllabus"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Credential & Format Banner */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <Award className="w-4 h-4 text-[#f8c51c]" />
              <span><strong>Credential:</strong> {phase.credential}</span>
            </div>
            <span className="text-[#39918d] font-semibold">Includes Miyagi Practice Lab</span>
          </div>

          {/* Module Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#39918d] font-h3">
              The 6 Structured Modules:
            </h4>
            <div className="space-y-2.5">
              {modules.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#081d2e] border border-white/10 hover:border-[#39918d]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-bold text-[#f8c51c] font-mono">{m.module}</span>
                    <span className="text-[11px] text-slate-400">Live Cohort Session</span>
                  </div>
                  <h5 className="font-h3 text-sm font-bold text-white mb-1">
                    {m.title}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-body">
                    {m.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* U.S. Dept of Labor Alignment */}
          <div className="p-4 rounded-xl bg-[#3f6d67]/25 border border-[#39918d]/40 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#f8c51c] font-bold">
              <Shield className="w-4 h-4 text-[#39918d]" />
              <span>U.S. Department of Labor AI Literacy Competencies:</span>
            </div>
            <p className="text-slate-200 leading-relaxed font-body">
              Every participant receives portable, defensible competency tracking that aligns directly
              with federal workforce development criteria for AI fluency.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#081d2e] border-t border-[#39918d]/30 flex flex-wrap items-center justify-between gap-3">
          <a
            href="https://maven.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
          >
            <span>View Syllabus on Maven</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#39918d]" />
          </a>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onApply(phase.phaseNumber);
              }}
              className="px-5 py-2 rounded-lg bg-[#39918d] hover:bg-[#327e7b] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Apply for Phase {phase.phaseNumber}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
