'use client';

import React from 'react';
import { EXECUTIVE_CASE } from '../data';
import { Briefcase, Quote, ArrowUpRight, DollarSign, Users, Award, CheckCircle } from 'lucide-react';

export const Section2Leaders: React.FC = () => {
  const caseData = EXECUTIVE_CASE;

  return (
    <section
      id="section-leaders"
      className="py-16 sm:py-20 lg:py-24 bg-[#f4f7f8] border-b border-slate-200"
      aria-labelledby="section-2-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c57b4b]/15 text-[#0c2940] text-xs font-semibold uppercase tracking-wider font-h3 mb-3 border border-[#c57b4b]/30">
            <Briefcase className="w-3.5 h-3.5 text-[#c57b4b]" />
            Section 2: Executive Leaders — The Solomon Engine Results
          </div>

          <h2
            id="section-2-title" className="t-h2 text-[#0c2940] mb-4"
          >
            What Happens When a Leader Chooses to Master AI Personally
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed">
            Executive leadership sets the operational ceiling for AI adoption. When leaders lead from
            the front, the ROI ripples across the entire organization.
          </p>
        </div>

        {/* Andy Ivey Executive Card */}
        <article
          id="executive-case-andy-ivey"
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-[#0c2940] text-white p-6 sm:p-8 lg:p-10 border-b border-[#39918d]/30">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3.5 py-1 rounded bg-[#3f6d67] text-white text-xs font-bold font-h3 tracking-wide uppercase">
                The Solomon Engine Case Study
              </span>
              <span className="text-xs text-slate-200 font-caption">
                6-Week Leadership Intensive
              </span>
            </div>

            <div className="max-w-3xl">
              <h3 className="t-h3 text-white">
                {caseData.name}
              </h3>
              <p className="font-body text-base text-slate-200 mt-1">
                {caseData.title}, <span className="text-[#f8c51c] font-medium">{caseData.organization}</span>
              </p>

              <div className="mt-4 inline-block px-4 py-2 rounded-lg bg-[#c57b4b]/20 border border-[#c57b4b]/50">
                <span className="font-h3 text-base sm:text-lg font-bold text-[#f8c51c]">
                  {caseData.tagline}
                </span>
              </div>

              <p className="font-body text-base text-slate-200 mt-4 leading-relaxed">
                {caseData.narrative}
              </p>
            </div>
          </div>

          {/* Grid of Results: The First 6 Weeks & Annual ROI */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* The First 6 Weeks Table */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                  <h4 className="font-h3 text-lg font-bold text-[#0c2940] flex items-center gap-2">
                    <span>The first 6 weeks:</span>
                  </h4>
                  <span className="text-xs font-semibold text-[#3f6d67] font-h3 uppercase">
                    Execution Log
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse" aria-label="Hours recovered breakdown">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 font-h3 bg-slate-50">
                        <th className="py-2.5 px-3">Line Item</th>
                        <th className="py-2.5 px-3 text-right">Hours Recovered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-body text-sm">
                      {caseData.recoveredHours.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-3 font-medium text-[#0c2940]">{row.item}</td>
                          <td className="py-3 px-3 text-right font-bold text-[#3f6d67]">
                            {row.hours}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-[#39918d]/10 font-medium">
                        <td className="py-3 px-3 text-[#0c2940]">
                          Team members freed for mission-critical work
                        </td>
                        <td className="py-3 px-3 text-right font-extrabold text-[#0c2940] font-h1">
                          {caseData.freedTeamMembers}
                        </td>
                      </tr>
                      <tr className="bg-[#f8c51c]/15 font-medium border-t-2 border-[#f8c51c]/40">
                        <td className="py-3.5 px-3 font-bold text-[#0c2940]">
                          Immediate value captured
                        </td>
                        <td className="py-3.5 px-3 text-right font-extrabold text-[#0c2940] text-lg font-h1">
                          {caseData.immediateValueCaptured}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-caption">
                Hours calculated based on executive time audit before and after deployment of 3 custom AI
                assistants for grant writing, presentation synthesis, and 2030 roadmap modeling.
              </div>
            </div>

            {/* Annual ROI Box */}
            <div className="lg:col-span-6 bg-[#fbfcfd] rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                  <h4 className="font-h3 text-lg font-bold text-[#0c2940] flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#c57b4b]" />
                    <span>Annual ROI:</span>
                  </h4>
                  <span className="text-xs font-semibold text-[#0c2940] bg-[#f8c51c]/30 px-2 py-0.5 rounded font-h3">
                    Validated Return
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
                    <span className="font-body text-sm text-slate-700">Training investment</span>
                    <span className="font-h1 text-base font-bold text-slate-800">
                      {caseData.roi.trainingInvestment}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
                    <span className="font-body text-sm text-slate-700">Projected annual return</span>
                    <span className="font-h1 text-xl font-extrabold text-[#0c2940]">
                      {caseData.roi.projectedAnnualReturn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0c2940] text-white">
                    <div>
                      <span className="block font-h3 text-xs uppercase tracking-wider text-slate-300">
                        Return per dollar invested
                      </span>
                      <span className="font-body text-xs text-slate-300">Direct leverage ratio</span>
                    </div>
                    <span className="font-h1 text-2xl font-black text-[#f8c51c]">
                      {caseData.roi.returnPerDollar}
                    </span>
                  </div>
                </div>

                {/* Benchmark Comparison */}
                <div className="mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#0c2940] font-h3 mb-1">
                    Benchmark comparison:
                  </span>
                  <p className="font-body text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {caseData.roi.benchmarkComparison}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-700 font-caption">
                <CheckCircle className="w-4 h-4 text-[#39918d] shrink-0" />
                Validated through verified labor rate savings and mission acceleration metrics.
              </div>
            </div>
          </div>

          {/* Testimonial Quote Block */}
          <div className="bg-[#0c2940]/5 border-t border-slate-200 p-6 sm:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-[#c57b4b] shrink-0 mt-1 opacity-80" aria-hidden="true" />
              <div className="space-y-2">
                <blockquote className="font-caption text-base sm:text-lg md:text-xl text-[#0c2940] leading-relaxed">
                  "{caseData.quote}"
                </blockquote>
                <p className="font-h3 text-sm text-[#0c2940] pt-2">
                  — <span className="font-bold text-[#0c2940]">ANDY IVEY</span>,{' '}
                  <span className="font-normal text-slate-600">Fundraising Lead, Family Legacy</span>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
