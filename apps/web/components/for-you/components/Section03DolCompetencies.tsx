'use client';

import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Check, AlertCircle } from 'lucide-react';

interface DolCompetenciesProps {
  onOpenGapsDiagnostic?: () => void;
}

export const Section03DolCompetencies: React.FC<DolCompetenciesProps> = ({
  onOpenGapsDiagnostic,
}) => {
  const [selectedCompetency, setSelectedCompetency] = useState<number | null>(null);

  const competencies = [
    {
      num: 1,
      title: 'Understand AI',
      desc: 'Mental models, limitations, foundational vocabulary',
    },
    {
      num: 2,
      title: 'Use AI Effectively',
      desc: 'Practical AI application in real workplace settings',
    },
    {
      num: 3,
      title: 'Direct AI Effectively',
      desc: 'Spot errors, maintain control, iterate strategically',
    },
    {
      num: 4,
      title: 'Evaluate Outputs Responsibly',
      desc: 'Human judgment, verification, ethical use',
    },
    {
      num: 5,
      title: 'Use AI Responsibly',
      desc: 'Data protection, accountability, legal compliance',
    },
  ];

  return (
    <section className="bg-[#ffffff] text-[#0c2940] py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-h3 font-medium uppercase tracking-widest text-[#39918d] mb-2">
          DOL COMPETENCIES
        </div>

        <h2 className="font-h2 text-2xl sm:text-4xl font-bold text-[#0c2940] tracking-tight mb-2">
          Five competencies. Covered.
        </h2>

        <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed mb-8">
          Every module aligns with the U.S. Department of Labor’s Federal AI Literacy Framework.
        </p>

        {/* 5 Competencies Horizontal Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {competencies.map((comp) => {
            const isSelected = selectedCompetency === comp.num;
            return (
              <div
                key={comp.num}
                onClick={() => setSelectedCompetency(isSelected ? null : comp.num)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3f6d67]/10 border-[#3f6d67] shadow-sm ring-2 ring-[#3f6d67]/30'
                    : 'bg-[#fbfcfd] border-slate-200 hover:border-[#39918d]/50 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#3f6d67] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {comp.num}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-[#3f6d67] font-semibold font-h3 px-2 py-0.5 rounded bg-[#3f6d67]/15">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="font-h3 text-base font-bold text-[#0c2940] mb-2">
                    {comp.num}. {comp.title}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WEF 2025 Quote / Stat Box */}
        <div className="p-6 rounded-xl bg-amber-50/80 border border-amber-200 mb-10">
          <div className="flex items-start gap-3.5">
            <span className="p-2 rounded-lg bg-[#f8c51c]/30 text-[#c57b4b] shrink-0 mt-0.5">
              <TrendingUp className="w-5 h-5 text-[#c57b4b]" />
            </span>
            <p className="font-body text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              The World Economic Forum stated in its 2025 Future of Jobs Report that workers with
              verified AI competencies will command a{' '}
              <strong className="text-[#0c2940] font-bold">56% wage premium</strong> over non-skilled
              peers.
            </p>
          </div>
        </div>

        {/* Where are the gaps for you or your team right now? */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c2940] text-white border border-[#39918d]/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-h1 text-xl sm:text-2xl font-bold text-white">
                Where are the gaps for you or your team right now?
              </h3>
            </div>
            {onOpenGapsDiagnostic && (
              <button
                type="button"
                onClick={onOpenGapsDiagnostic}
                className="px-5 py-3 rounded-xl bg-[#39918d] hover:bg-[#327e7b] text-white text-xs sm:text-sm font-h3 font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                Assess Gaps Live
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
