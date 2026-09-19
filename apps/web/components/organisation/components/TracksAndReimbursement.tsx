'use client';

import React from 'react';
import { Compass, FileText } from 'lucide-react';

export const TracksAndReimbursement: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#ffffff] text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Block 1: Walter — L&D Strategist Track (Dark luxury card in mixed theme) */}
        <div id="walter-track" className="bg-[#0c2940] text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-xl relative overflow-hidden">
          {/* Subtle background ambiance */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39918d]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 mb-6">
              <Compass className="w-4 h-4 text-[#f8c51c]" />
              <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#39918d]">
                Specialized Track
              </span>
            </div>

            {/* H2 Title */}
            <h2
               className="t-h2 text-white mb-4"
            >
              Walter — L&D Strategist Track
            </h2>

            {/* H3 Subtitle (Montserrat Medium) */}
            <h3
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              className="text-xl sm:text-2xl text-[#f8c51c] font-medium mb-6"
            >
              A dedicated track for learning & development leaders
            </h3>

            {/* Body */}
            <p
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="text-white/85 text-base sm:text-lg leading-relaxed w-full"
            >
              Walter is our specialized curriculum track for L&D strategists building internal AI capability programs — covering instructional design for AI fluency, change management, and measurement frameworks tailored to training organizations.
            </p>
          </div>
        </div>

        {/* Block 2: Tax & Employer Reimbursement (Crisp light elevated card in mixed theme) */}
        <div id="reimbursement" className="bg-[#f8fafb] text-[#0c2940] rounded-3xl p-8 sm:p-12 md:p-16 border border-[#0c2940]/15 shadow-lg relative overflow-hidden">
          <div className="w-full">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#c57b4b]/15 border border-[#c57b4b]/30 mb-6">
              <FileText className="w-4 h-4 text-[#c57b4b]" />
              <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#c57b4b]">
                Tuition & Funding Support
              </span>
            </div>

            {/* H2 Title */}
            <h2
               className="t-h2 text-[#0c2940] mb-6"
            >
              Tax & Employer Reimbursement
            </h2>

            {/* Body */}
            <p
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="text-[#0c2940]/85 text-base sm:text-lg leading-relaxed w-full"
            >
              Professional development and executive education expenses, including cohort tuition, are often eligible for employer tuition-reimbursement programs and may qualify as a deductible business expense. We recommend confirming eligibility with your employer's L&D budget or a tax professional — our team can provide an itemized invoice and program outline to support your reimbursement request.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
