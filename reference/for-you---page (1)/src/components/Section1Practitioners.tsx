import React, { useState } from 'react';
import { PRACTITIONER_CASES, COHORT_OUTCOMES } from '../data';
import { UserCheck, Award, ArrowUpRight, Sparkles, Filter, Check, Clock, ShieldCheck } from 'lucide-react';

export const Section1Practitioners: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('all');

  const visibleCases =
    selectedCaseId === 'all'
      ? PRACTITIONER_CASES
      : PRACTITIONER_CASES.filter((c) => c.id === selectedCaseId);

  return (
    <section
      id="section-practitioners"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200 overflow-hidden"
      aria-labelledby="section-1-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39918d]/15 text-[#0c2940] text-xs font-semibold uppercase tracking-wider font-h3 mb-3 border border-[#39918d]/30">
            <UserCheck className="w-3.5 h-3.5 text-[#3f6d67]" />
            Section 1: Individual Practitioners — AI Fluency Cohort Results
          </div>

          <h2
            id="section-1-title"
            className="font-h2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0c2940] tracking-tight mb-4"
          >
            What Happens When Individuals Commit to the Process
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
            These are real people from our cohorts who walked in with a problem and walked out with a
            working solution. The skills belong to them. We built the system that made it repeatable.
          </p>
        </div>

        {/* Filter bar for touch-friendly accessibility */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 mr-2 flex items-center gap-1 font-h3">
            <Filter className="w-3.5 h-3.5" /> Filter Case:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCaseId('all')}
            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all font-h3 cursor-pointer ${
              selectedCaseId === 'all'
                ? 'bg-[#0c2940] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            View All (3)
          </button>
          {PRACTITIONER_CASES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedCaseId(item.id)}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all font-h3 cursor-pointer ${
                selectedCaseId === item.id
                  ? 'bg-[#3f6d67] text-white shadow-sm'
                  : 'bg-slate-100 text-[#3f6d67] hover:bg-slate-200'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Individual Practitioner Cards — Designed to prevent card overflow */}
        <div className="space-y-8 mb-16 w-full">
          {visibleCases.map((practitioner) => (
            <article
              key={practitioner.id}
              id={`practitioner-${practitioner.id}`}
              className="bg-[#fbfcfd] rounded-2xl border border-slate-200 shadow-sm hover:border-[#39918d]/50 transition-all p-5 sm:p-7 lg:p-8 overflow-hidden w-full min-w-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
                {/* Left Column: Profile & Story */}
                <div className="lg:col-span-7 space-y-4 min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded bg-[#3f6d67]/15 text-[#0c2940] text-xs font-bold font-h3 tracking-wide uppercase">
                      {practitioner.categoryTag}
                    </span>
                    <span className="text-xs text-slate-600 font-caption">
                      Verified Cohort Alum
                    </span>
                  </div>

                  <div>
                    {/* Name: bold in #3f6d67 as requested */}
                    <h3 className="font-h3 text-xl sm:text-2xl font-bold text-[#3f6d67] tracking-tight">
                      {practitioner.name}
                    </h3>
                    <p className="font-body text-sm font-medium text-[#3f6d67] mt-0.5">
                      {practitioner.role}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#f8c51c]/15 border border-[#f8c51c]/40 text-[#0c2940]">
                    <h4 className="font-h3 text-base sm:text-lg font-bold">
                      {practitioner.tagline}
                    </h4>
                  </div>

                  <p className="font-body text-sm sm:text-base text-slate-700 leading-relaxed">
                    {practitioner.narrative}
                  </p>

                  {/* The Skill Gained Callout */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#39918d]/30">
                      <div className="p-2 rounded-lg bg-[#39918d]/15 text-[#3f6d67] shrink-0 mt-0.5">
                        <Award className="w-5 h-5 text-[#39918d]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-[#0c2940] font-h3 mb-1">
                          The Skill Gained:
                        </span>
                        <p className="font-body text-sm text-slate-800 font-medium leading-relaxed">
                          {practitioner.skillGained}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Metric Grid with Zero Overflow */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm min-w-0 w-full overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-h3 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#39918d]" /> Documented Metrics
                    </span>
                    <span className="text-[11px] font-semibold text-[#3f6d67] bg-[#3f6d67]/10 px-2 py-0.5 rounded font-caption">
                      Result
                    </span>
                  </div>

                  <div className="space-y-2.5 min-w-0 w-full">
                    {practitioner.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#f8fafb] border border-slate-100 hover:border-[#39918d]/30 transition-colors min-w-0 w-full"
                      >
                        <span className="font-body text-xs sm:text-sm text-slate-700 font-medium leading-snug break-words">
                          {m.metric}
                        </span>
                        <span className="font-h1 text-xs sm:text-sm font-bold text-[#0c2940] text-left sm:text-right bg-white px-2.5 py-1 rounded-md shadow-2xs border border-slate-200 shrink-0 max-w-full break-words">
                          {m.result}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-caption">
                    <ShieldCheck className="w-4 h-4 text-[#39918d] shrink-0" />
                    <span>Verified during live cohort audit &amp; workflow verification.</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Cohort-Wide Outcomes Container */}
        <div
          id="cohort-wide-outcomes"
          className="bg-gradient-to-br from-[#0c2940] to-[#12395b] text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#39918d]/30 shadow-md min-w-0 w-full overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3f6d67]/40 border border-[#39918d]/40 text-white text-xs font-semibold uppercase tracking-wider font-h3 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#f8c51c]" /> Aggregate Cohort Benchmarks
              </div>
              <h3 className="font-h3 text-xl sm:text-2xl font-bold text-white tracking-tight">
                Cohort-Wide Outcomes
              </h3>
            </div>
            <span className="text-xs text-slate-300 font-caption bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              Across all participating practitioners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 min-w-0 w-full">
            {COHORT_OUTCOMES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0c2940]/80 rounded-xl p-5 border border-[#39918d]/30 hover:border-[#f8c51c]/50 transition-colors flex flex-col justify-between min-w-0 w-full overflow-hidden"
              >
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-h3 mb-2 truncate">
                    {item.metric}
                  </div>
                  <div className="font-h1 text-2xl sm:text-3xl font-extrabold text-[#f8c51c] tracking-tight mb-2 truncate">
                    {item.result}
                  </div>
                </div>
                {item.detail && (
                  <p className="text-xs text-slate-200 font-body leading-relaxed pt-3 border-t border-white/10">
                    {item.detail}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Results measured note */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/15 text-xs sm:text-sm text-slate-200 font-caption">
            <Check className="w-4 h-4 text-[#39918d] shrink-0" />
            <span>
              Results measured across AI Fluency Cohort participants using pre/post assessments and
              workflow documentation.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
