'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, ArrowRight, Clock, MessageSquare } from 'lucide-react';

interface NextStepsConsultationProps {
  onScheduleClick: () => void;
}

export const NextStepsConsultation: React.FC<NextStepsConsultationProps> = ({ onScheduleClick }) => {
  const steps = [
    {
      title: 'Where friction lives in your organization',
      desc: 'Redundant work, timelines, capability gaps',
    },
    {
      title: 'What success looks like for you',
      desc: 'What changes, elevating the human experience, what metrics matter',
    },
    {
      title: 'Whether embedded partnership, custom workshops, or community learning makes sense for your situation',
      desc: 'Clear, tailored recommendations for your scope and priorities',
    },
  ];

  return (
    <section id="next-steps" className="py-20 md:py-28 bg-[#ffffff] text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Box */}
        <div className="bg-[#f8fafb] rounded-3xl p-8 sm:p-12 md:p-16 border border-[#0c2940]/15 shadow-xl relative overflow-hidden w-full">
          <div className="text-center w-full mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 mb-4">
              <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#39918d]">
                Next Steps
              </span>
            </div>

            <h2
               className="t-h2 text-[#0c2940] mb-4"
            >
              Let's Explore If Working Together Fits
            </h2>

            <p
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-lg sm:text-xl text-[#39918d] font-semibold mb-6"
            >
              One conversation. 30 minutes. Just clarity on whether this fits your situation.
            </p>

            <p
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="text-base sm:text-lg text-[#0c2940]/80 font-medium leading-relaxed"
            >
              We'll work together to understand:
            </p>
          </div>

          {/* 3 Outcome Points */}
          <div className="space-y-4 w-full mx-auto mb-12">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#0c2940]/10 shadow-xs flex items-start space-x-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#39918d]" />
                </div>
                <div className="flex-1">
                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-base sm:text-lg font-bold text-[#0c2940] mb-1"
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                    className="text-sm sm:text-base text-[#0c2940]/75"
                  >
                    ({step.desc})
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              id="schedule-consultation-btn"
              onClick={onScheduleClick}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="w-full sm:w-auto bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold text-base sm:text-lg px-10 py-4 rounded-full transition-all duration-200 shadow-xl shadow-[#f8c51c]/25 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center space-x-3 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-[#0c2940]" />
              <span>SCHEDULE ORGANIZATIONAL CONSULTATION</span>
              <ArrowRight className="w-5 h-5 text-[#0c2940]" />
            </button>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-[#0c2940]/60">
              <Clock className="w-4 h-4" />
              <span>30-minute discovery session • No obligation • Strategic clarity</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
