'use client';

import React, { useState } from 'react';
import { ORG_CASE } from '../data';
import { Building2, Layers, CheckCircle2, ArrowRight, Quote, UserCheck, AlertTriangle } from 'lucide-react';

export const Section3Organization: React.FC = () => {
  const [showFullNames, setShowFullNames] = useState<boolean>(true);
  const org = ORG_CASE;

  return (
    <section
      id="section-organization"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
      aria-labelledby="section-3-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#39918d]/15 text-[#0c2940] text-xs font-semibold uppercase tracking-wider font-h3 mb-3 border border-[#39918d]/30">
            <Building2 className="w-3.5 h-3.5 text-[#39918d]" />
            Section 3: Organizational Transformation — Embedded Partnership Results
          </div>

          <h2
            id="section-3-title" className="t-h2 text-[#0c2940] mb-4"
          >
            What Happens When an Organization Redesigns How Work Moves
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
            Enterprise scale requires more than individual prompting skills. It demands architectural
            overhaul of information flows, human triage gates, and multi-model operational pipelines.
          </p>
        </div>

        {/* Organization Showcase Card */}
        <article
          id="org-case-ncemch"
          className="bg-[#fbfcfd] rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12"
        >
          {/* Main Overview Banner */}
          <div className="p-6 sm:p-8 lg:p-10 border-b border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="px-3.5 py-1 rounded bg-[#0c2940] text-white text-xs font-bold font-h3 tracking-wide uppercase">
                Embedded Partnership (6 Months)
              </span>
              <span className="text-xs font-caption text-slate-700">
                Federal Program Evaluation &amp; Maternal Health Research
              </span>
            </div>

            <h3 className="t-h3 text-[#0c2940] mb-2">
              {org.name}
            </h3>

            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-[#3f6d67]/15 text-[#0c2940] font-h3 font-bold text-sm sm:text-base mb-6 border border-[#3f6d67]/30">
              {org.tagline}
            </div>

            <div className="font-body text-base text-slate-700 leading-relaxed space-y-4 max-w-4xl">
              <p>
                NCEMCH operates at the intersection of public health research and federal program
                evaluation. Their executive director had a choice: continue pushing his small staff
                through bottleneck after bottleneck, or rethink how work moves through the organization
                entirely. He chose the second, and he led the way personally.
              </p>
              <p>
                We embedded for six months and built four operational pillars: a unified knowledge
                architecture for 700+ evidence-based strategies, an automated intake and triage system,
                an AI-powered analyst engine, and a dynamic report generator. The human team shifted from
                data processing to judgment and strategy.
              </p>
            </div>

            {/* 4 Operational Pillars Grid */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c2940] font-h3 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#39918d]" /> The Four Operational Pillars Built
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {org.fourPillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#f8fafb] border border-slate-200 hover:border-[#39918d]/40 transition-colors"
                  >
                    <h5 className="font-h3 text-sm font-bold text-[#0c2940] mb-1.5">
                      {pillar.title}
                    </h5>
                    <p className="font-body text-xs text-slate-700 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benchmark Table: Before / After / Impact */}
          <div className="p-6 sm:p-8 lg:p-10 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="font-h3 text-xl font-bold text-[#0c2940] tracking-tight">
                  Operational Benchmarks: Before vs. After
                </h4>
                <p className="font-caption text-xs text-slate-700 mt-1">
                  Empirically tracked across 6 months of organizational embedding
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded bg-[#39918d]/15 text-[#0c2940] border border-[#39918d]/30 font-h3">
                75% Max Cycle Compression
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse" aria-label="NCEMCH Benchmark Comparison">
                <thead>
                  <tr className="bg-[#0c2940] text-white text-xs font-bold uppercase tracking-wider font-h3">
                    <th className="py-3.5 px-4 sm:px-6">Benchmark</th>
                    <th className="py-3.5 px-4 sm:px-6">Before</th>
                    <th className="py-3.5 px-4 sm:px-6">After</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-body text-sm bg-white">
                  {org.benchmarks.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-[#fcfdfd] hover:bg-slate-50'}
                    >
                      <td className="py-4 px-4 sm:px-6 font-bold text-[#0c2940]">
                        {row.benchmark}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-700 line-through decoration-slate-400">
                        {row.before}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-medium text-[#3f6d67] flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-[#39918d] shrink-0" />
                        <span>{row.after}</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right font-h1 font-extrabold text-[#0c2940]">
                        <span className="inline-block px-2.5 py-1 rounded bg-[#f8c51c]/25 border border-[#f8c51c]/60 text-xs sm:text-sm">
                          {row.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* What The Team Said (Quotes) */}
        <div id="team-testimonials" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-h3 text-xl sm:text-2xl font-bold text-[#0c2940] tracking-tight">
                What the team said:
              </h3>
              <p className="font-caption text-xs sm:text-sm text-slate-700">
                Direct feedback from participating researchers, project leads, and directors
              </p>
            </div>

            {/* Editorial Build Note & Name Attribution Toggle */}
            <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-700 px-2 font-h3 hidden sm:inline">
                Display Attribution:
              </span>
              <button
                type="button"
                onClick={() => setShowFullNames(false)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all font-h3 cursor-pointer ${
                  !showFullNames
                    ? 'bg-[#0c2940] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#0c2940]'
                }`}
              >
                Role Titles Only
              </button>
              <button
                type="button"
                onClick={() => setShowFullNames(true)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all font-h3 cursor-pointer ${
                  showFullNames
                    ? 'bg-[#0c2940] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#0c2940]'
                }`}
              >
                Full Stakeholder Names
              </button>
            </div>
          </div>

          {/* Editorial Build Note Alert Box */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800">
            <AlertTriangle className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
            <div className="font-caption">
              <strong>⚠️ Build note:</strong> Confirm with Paige whether we use full stakeholder names
              (John Richards, Dr. Lan Le, Becky Burns, Sarah) or keep generic role titles. Use the toggle
              above to preview both layout variants live.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {org.quotes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-[#39918d]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#39918d] mb-3 opacity-60" aria-hidden="true" />
                  <blockquote className="font-caption text-sm sm:text-base text-slate-800 leading-relaxed mb-4">
                    "{item.quote}"
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-h3 text-sm font-bold text-[#0c2940]">
                      {showFullNames ? (
                        <span>
                          {item.fullName}
                          <span className="font-normal text-slate-600 ml-1.5">
                            ({item.genericRole})
                          </span>
                        </span>
                      ) : (
                        <span>— {item.genericRole}</span>
                      )}
                    </div>
                    {item.leadTask && (
                      <span className="text-xs text-slate-700 font-body">
                        Focus: {item.leadTask}
                      </span>
                    )}
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#39918d]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
