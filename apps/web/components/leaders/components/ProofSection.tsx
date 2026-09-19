'use client';

import React from 'react';
import { Quote, Building2 } from 'lucide-react';
import { ANDY_STATS } from '../data/cohortData';

export const ProofSection: React.FC = () => {
  return (
    <section id="proof-results" className="py-16 md:py-24 bg-[#ffffff] border-b border-[#3f6d67]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>01 / THE PROOF</span>
          </div>

          <div className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#c57b4b]">
            Andy Ivey, first six weeks
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            From Fear to $62K in Annual Value
          </h2>

          <p className="font-opensans text-base sm:text-lg text-[#0c2940]/80 leading-relaxed">
            Andy didn&apos;t just learn about AI. He built a strategic blueprint his organization now executes on.
          </p>
        </div>

        {/* The Ledger Table */}
        <div className="bg-[#ffffff] rounded-2xl border-2 border-[#3f6d67]/30 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0c2940] text-[#ffffff] font-montserrat text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 sm:px-8 font-bold">LINE ITEM</th>
                  <th className="py-4 px-6 sm:px-8 font-bold text-right">RECOVERED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-opensans text-sm">
                {ANDY_STATS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f7f9fa] transition-colors">
                    <td className="py-4 px-6 sm:px-8">
                      <div className="font-montserrat font-bold text-[#0c2940]">
                        {item.metric}
                      </div>
                      <div className="text-xs text-[#0c2940]/70 mt-0.5">
                        {item.detail}
                      </div>
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-right font-montserrat font-semibold text-[#39918d]">
                      {item.hoursOrCount}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#3f6d67]/15 border-t-2 border-[#3f6d67]/40 font-montserrat">
                  <td className="py-4 px-6 sm:px-8 font-bold text-xs uppercase tracking-wider text-[#0c2940]">
                    IMMEDIATE VALUE CAPTURED
                  </td>
                  <td className="py-4 px-6 sm:px-8 text-right font-extrabold text-base sm:text-lg text-[#0c2940]">
                    $20,000
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Annual Return Panel */}
        <div className="bg-[#f7f9fa] rounded-2xl border-2 border-[#c57b4b]/40 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#c57b4b]" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#c57b4b] block">
                PROJECTED ANNUAL RETURN
              </span>
              <h3 className="t-h3 text-[#0c2940]">
                $62,224 on a $4,500 investment
              </h3>
              <p className="font-opensans text-sm sm:text-base text-[#0c2940]/80 leading-relaxed">
                $13.83 returned for every dollar invested, outperforming Microsoft-IDC 2024 Global AI Research benchmarks and validated against TBG Cohort Pilot outcomes.
              </p>
            </div>

            <div className="shrink-0 bg-[#ffffff] p-6 rounded-xl border border-[#c57b4b]/40 shadow-sm text-center w-full sm:w-auto">
              <span className="block font-montserrat text-xs uppercase tracking-wider text-[#0c2940]/70 font-semibold mb-1">
                RETURN RATIO
              </span>
              <div className="font-montserrat text-4xl sm:text-5xl font-black text-[#c57b4b]">
                13.8x
              </div>
              <span className="block font-opensans text-xs text-[#0c2940]/60 mt-1">
                Per Dollar Invested
              </span>
            </div>
          </div>
        </div>

        {/* Second Proof Point: NCEMCH */}
        <div className="bg-[#ffffff] rounded-2xl border border-[#3f6d67]/30 p-6 sm:p-8 md:p-10 shadow-sm relative">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#39918d]/10 border border-[#39918d]/30 flex items-center justify-center text-[#39918d] shrink-0">
              <Quote className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#39918d] block">
                AND HE ISN&apos;T THE ONLY ONE
              </span>
              <blockquote className="font-opensans italic text-base sm:text-lg text-[#0c2940] leading-relaxed">
                &ldquo;Structured AI assistants moved me from &lsquo;doer&rsquo; to &lsquo;approver.&rsquo; Executive bandwidth is now for strategy, not coordination.&rdquo;
              </blockquote>
              <div className="pt-1">
                <div className="font-montserrat font-semibold text-xs sm:text-sm text-[#0c2940]/80">
                  Executive Director, National Center for Education in Maternal and Child Health.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breadth Statement */}
        <div className="bg-[#0c2940] text-[#ffffff] rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#3f6d67]/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#f8c51c] block">
                ACROSS SECTORS
              </span>
              <h4 className="font-montserrat text-xl sm:text-2xl font-bold text-[#ffffff]">
                We&apos;ve partnered with federal agencies, municipalities, nonprofits, and private-sector teams.
              </h4>
              <p className="font-opensans text-sm sm:text-base text-[#ffffff]/80 leading-relaxed">
                The industries change. The framework adapts. The results are consistent.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3f6d67]/40 border border-[#39918d]/40 text-[#ffffff] text-xs font-montserrat font-semibold">
              <Building2 className="w-4 h-4 text-[#f8c51c]" />
              <span>Multi-Sector Validated</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
