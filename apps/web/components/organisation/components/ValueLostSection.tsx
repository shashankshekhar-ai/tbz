'use client';

import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ArrowRight, Clock, Target, CheckCircle2 } from 'lucide-react';

export const ValueLostSection: React.FC = () => {
  const gaps = [
    {
      gap: 'Opportunity → Capability',
      question: "What can AI do that your team can't leverage yet?",
      looksLike: 'The tools are available. The skills aren\'t.',
      pillColor: 'bg-[#39918d]/15 text-[#39918d] border-[#39918d]/30',
    },
    {
      gap: 'Capability → Application',
      question: 'Is what they learned actually showing up in their work?',
      looksLike: 'They passed the training. Nothing changed on the job.',
      pillColor: 'bg-[#f8c51c]/20 text-[#0c2940] border-[#f8c51c]/40',
    },
    {
      gap: 'Application → Performance',
      question: 'Is AI use making the work faster, better, or more accurate?',
      looksLike: 'They\'re using AI daily, but unsure if we\'re better, safer and more accurate.',
      pillColor: 'bg-[#c57b4b]/15 text-[#c57b4b] border-[#c57b4b]/30',
    },
    {
      gap: 'Performance → Value',
      question: 'Did improved performance create measurable business value?',
      looksLike: 'Tasks are faster, but the organization captured nothing from it.',
      pillColor: 'bg-[#0c2940]/10 text-[#0c2940] border-[#0c2940]/20',
    },
  ];

  return (
    <section id="where-value-gets-lost" className="py-20 md:py-28 bg-[#f8fafb] text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center w-full mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#c57b4b]/10 border border-[#c57b4b]/30 mb-4">
            <AlertCircle className="w-4 h-4 text-[#c57b4b]" />
            <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#c57b4b]">
              Measurement & Value Realization
            </span>
          </div>

          <h2
             className="t-h2 text-[#0c2940] mb-5"
          >
            Most AI Training Measures Adoption. We Measure Where Value Gets Lost.
          </h2>

          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-lg sm:text-xl text-[#39918d] font-semibold mb-6 w-full"
          >
            Your team completed the training. They're using the tools. So where did the value go?
          </p>

          <p
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="text-base sm:text-lg text-[#0c2940]/80 leading-relaxed w-full"
          >
            AI creates opportunity. But opportunity doesn't automatically become value. Between what AI makes possible and what your organization actually captures, there are gaps. We find them.
          </p>
        </div>

        {/* The Gap Table / Structure */}
        <div className="bg-white rounded-3xl border border-[#0c2940]/15 shadow-xl overflow-hidden mb-16">
          <div className="hidden lg:grid grid-cols-12 bg-[#0c2940] text-white py-4 px-8 text-xs font-bold uppercase tracking-wider border-b border-white/10" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="col-span-4 text-[#f8c51c]">The Gap</div>
            <div className="col-span-4 text-white/90">The Question It Asks</div>
            <div className="col-span-4 text-[#39918d]">What It Looks Like</div>
          </div>

          <div className="divide-y divide-[#0c2940]/10">
            {gaps.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-center hover:bg-[#f8fafb] transition-colors"
              >
                {/* The Gap */}
                <div className="lg:col-span-4 mb-4 lg:mb-0">
                  <span className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#0c2940]/60 block mb-1">
                    The Gap
                  </span>
                  <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-bold border ${item.pillColor}`}>
                    {item.gap}
                  </span>
                </div>

                {/* The Question */}
                <div className="lg:col-span-4 mb-4 lg:mb-0">
                  <span className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#0c2940]/60 block mb-1">
                    The Question It Asks
                  </span>
                  <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base font-medium text-[#0c2940]">
                    {item.question}
                  </p>
                </div>

                {/* What It Looks Like */}
                <div className="lg:col-span-4">
                  <span className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#0c2940]/60 block mb-1">
                    What It Looks Like
                  </span>
                  <div className="bg-[#f8fafb] rounded-xl p-3.5 border border-[#0c2940]/10">
                    <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm text-[#0c2940]/80 italic">
                      "{item.looksLike}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Missing 30 Minutes & The Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: The Missing 30 Minutes */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#0c2940]/15 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#f8c51c]/20 text-[#0c2940] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#0c2940]" />
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl font-bold text-[#0c2940]">
                  The Missing 30 Minutes:
                </h3>
              </div>

              <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/85 leading-relaxed">
                If AI reduces a recurring task from 60 minutes to 30 minutes, most vendors report "30 minutes saved" and call it a win. We ask what happened to those 30 minutes. Did the employee use that capacity to improve quality, reduce backlog, or complete higher-value work? If nothing changed, you created efficiency without capturing value. That's the gap we close.
              </p>
            </div>
          </div>

          {/* Card 2: The Goal */}
          <div className="bg-[#0c2940] text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#39918d]/20 text-[#39918d] flex items-center justify-center border border-[#39918d]/40">
                  <Target className="w-5 h-5 text-[#f8c51c]" />
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl font-bold text-white">
                  The Goal:
                </h3>
              </div>

              <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-white/90 leading-relaxed">
                Move from AI capability to captured organizational value. We measure every gap in the chain, not just adoption, so you know exactly where value is being created and where it's leaking out.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
