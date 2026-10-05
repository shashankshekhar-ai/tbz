'use client';

import React, { useState } from 'react';
import { Clock, Award, ArrowRight, Check } from 'lucide-react';

interface DecisionFrameworkProps {
  onFindOutMore: () => void;
  onApplyPhase1: () => void;
  onApplyPhase2: () => void;
}

export const Section02DecisionFramework: React.FC<DecisionFrameworkProps> = ({
  onFindOutMore,
  onApplyPhase1,
  onApplyPhase2,
}) => {
  return (
    <section className="bg-[#fbfdfd] text-[#0c2940] py-14 sm:py-20 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-h3 font-medium uppercase tracking-widest text-[#39918d] mb-2">
          DECISION FRAMEWORK
        </div>

        <h2 className="font-h2 text-2xl sm:text-4xl font-bold text-[#0c2940] tracking-tight mb-10">
          Two phases.
        </h2>

        {/* Phase 1 and Phase 2 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
          {/* PHASE 1 */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#3f6d67]/40 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-h3 font-bold uppercase tracking-wider text-[#3f6d67] mb-1">
                PHASE 1: AI LITERACY &amp; FOUNDATIONS
              </div>
              <h3 className="font-h2 text-xl sm:text-2xl font-bold text-[#0c2940] mb-2">
                Learn to speak AI
              </h3>

              <div className="text-xs sm:text-sm text-slate-700 font-body mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#39918d]" />
                <span>6 weeks · 2 sessions/week · 60 min each</span>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-[#0c2940] font-h3 mb-6 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#f8c51c]" />
                <span>AI Literacy Specialist · Certificate of Participation</span>
              </div>

              <div className="mb-6">
                <div className="text-xs font-h3 font-bold uppercase tracking-wider text-[#0c2940] mb-2">
                  Best if:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-body">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3f6d67] font-bold">•</span>
                    <span>You’re new to AI concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3f6d67] font-bold">•</span>
                    <span>You want foundational confidence before exploring tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3f6d67] font-bold">•</span>
                    <span>You need a safe space for questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3f6d67] font-bold">•</span>
                    <span>Your manager wants you to start with the basics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3f6d67] font-bold">•</span>
                    <span>You want to increase your wage premium opportunities</span>
                  </li>
                </ul>
              </div>

              <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 pt-4 border-t border-slate-100">
                6 modules covering foundational AI concepts, responsible use, prompting frameworks,
                how to run a pilot project, basics to building an AI assistant, and the durable soft
                skills needed to talk with others about AI. See the full syllabus on Maven.
              </p>
            </div>

            {/* Find out more · Apply for Phase 1 */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onFindOutMore}
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0c2940] text-xs sm:text-sm font-semibold text-center transition-colors cursor-pointer"
              >
                Find out more
              </button>
              <button
                type="button"
                onClick={onApplyPhase1}
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-[#3f6d67] hover:bg-[#345b56] text-white text-xs sm:text-sm font-bold text-center transition-colors shadow-sm cursor-pointer"
              >
                Apply for Phase 1
              </button>
            </div>
          </div>

          {/* PHASE 2 */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#39918d]/50 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-h3 font-bold uppercase tracking-wider text-[#39918d] mb-1">
                PHASE 2: AI FLUENCY &amp; INTEGRATION
              </div>
              <h3 className="font-h2 text-xl sm:text-2xl font-bold text-[#0c2940] mb-2">
                Solve a real problem
              </h3>

              <div className="text-xs sm:text-sm text-slate-700 font-body mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#39918d]" />
                <span>6 weeks · 2 sessions/week · 60 min each</span>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-[#0c2940] font-h3 mb-6 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#f8c51c]" />
                <span>AI Integration Specialist · Certificate of AI Competency (Requires Phase 1)</span>
              </div>

              <div className="mb-6">
                <div className="text-xs font-h3 font-bold uppercase tracking-wider text-[#0c2940] mb-2">
                  Best if:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-body">
                  <li className="flex items-start gap-2">
                    <span className="text-[#39918d] font-bold">•</span>
                    <span>You’ve completed Phase 1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#39918d] font-bold">•</span>
                    <span>You’re ready to build something and measure its impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#39918d] font-bold">•</span>
                    <span>You have a use case or project to optimize with AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#39918d] font-bold">•</span>
                    <span>You want to be a leader of AI initiatives in your organization</span>
                  </li>
                </ul>
              </div>

              <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 pt-4 border-t border-slate-100">
                6 modules covering personal use case development, tool vetting, pilot project
                architecture, organizing data, AI governance, and measuring ROI. See the full
                curriculum on Maven.
              </p>
            </div>

            {/* Apply for Phase 2 */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onApplyPhase2}
                className="w-full py-3 px-4 rounded-xl bg-[#0c2940] hover:bg-[#163f61] text-white text-xs sm:text-sm font-bold text-center transition-colors shadow-sm cursor-pointer"
              >
                Apply for Phase 2
              </button>
            </div>
          </div>
        </div>

        {/* Miyagi Practice Lab */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c2940] text-white border border-[#39918d]/40">
          <div className="space-y-2">
            <h3 className="font-h1 text-xl sm:text-2xl font-bold text-white">
              Miyagi Practice Lab
            </h3>
            <p className="font-body text-sm sm:text-base text-slate-200 leading-relaxed">
              Both have a Miyagi Practice Lab where you get to “wax on, wax off” your new-found
              skills in a safe environment that builds skills and confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
