'use client';

import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight } from 'lucide-react';

interface BusinessCaseProps {
  onOpenPainPoint?: () => void;
}

export const Section01BusinessCase: React.FC<BusinessCaseProps> = ({ onOpenPainPoint }) => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const painPointExamples = [
    'Debugging spreadsheet formulas / SQL / PowerBI',
    'SME research and course module design bottlenecks',
    'Multi-week review and sign-off approval loops',
    'Executive reporting and stewardship synthesis',
  ];

  return (
    <section className="bg-[#ffffff] text-[#0c2940] py-14 sm:py-20 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-h3 font-medium uppercase tracking-widest text-[#39918d] mb-2">
          BUSINESS CASE
        </div>

        <h2 className="font-h2 text-2xl sm:text-4xl font-bold text-[#0c2940] tracking-tight mb-10">
          Here’s what we know.
        </h2>

        {/* The 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#3f6d67]/30 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-h3 text-lg sm:text-xl font-bold text-[#0c2940] mb-3 leading-snug">
                The federal standard is already here
              </h3>
              <p className="font-body text-sm text-slate-700 leading-relaxed">
                The Department of Labor published an AI Literacy Framework with five competencies for
                responsible AI use. That’s the workforce development standard now. We align to all of
                them.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#3f6d67]/30 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-h3 text-lg sm:text-xl font-bold text-[#0c2940] mb-3 leading-snug">
                The gap is already costly
              </h3>
              <p className="font-body text-sm text-slate-700 leading-relaxed">
                Organizations investing in structured AI capability retain talent, move faster, and
                reduce decision bottlenecks. The data on this is consistent across sectors.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#3f6d67]/30 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-h3 text-lg sm:text-xl font-bold text-[#0c2940] mb-3 leading-snug">
                Structured beats random
              </h3>
              <p className="font-body text-sm text-slate-700 leading-relaxed">
                Cohort-based. Live. Peer-supported. Personalized to your actual work. Includes a
                performance measurement framework you take with you to measure, stress-test, demonstrate,
                and continuously improve AI capability.
              </p>
            </div>
          </div>
        </div>

        {/* What’s the one pain point you would try to fix with AI? */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c2940] text-white border border-[#39918d]/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-h1 text-xl sm:text-2xl font-bold text-white">
                What’s the one pain point you would try to fix with AI?
              </h3>
            </div>
            {onOpenPainPoint && (
              <button
                type="button"
                onClick={onOpenPainPoint}
                className="px-5 py-3 rounded-xl bg-[#39918d] hover:bg-[#327e7b] text-white text-xs sm:text-sm font-h3 font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                Identify My Pain Point
              </button>
            )}
          </div>

          {/* Interactive Pain Point Quick Selector */}
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="text-xs text-slate-300 font-caption mb-3">
              Common bottlenecks solved inside our cohorts:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {painPointExamples.map((pt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPoint(pt)}
                  className={`p-3 rounded-lg text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2 border cursor-pointer ${
                    selectedPoint === pt
                      ? 'bg-[#3f6d67] border-[#f8c51c] text-white font-medium'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span>{pt}</span>
                  {selectedPoint === pt && <Check className="w-4 h-4 text-[#f8c51c] shrink-0" />}
                </button>
              ))}
            </div>
            {selectedPoint && (
              <div className="mt-4 p-3 rounded-lg bg-[#3f6d67]/30 border border-[#39918d]/40 text-xs text-slate-200">
                <strong className="text-[#f8c51c]">Selected:</strong> &ldquo;{selectedPoint}&rdquo; — This bottleneck is targeted with structured AI assistant frameworks in Phase 1 &amp; Phase 2.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
