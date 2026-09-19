'use client';

import React, { useState } from 'react';
import { Download, ChevronDown, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { TAX_QUALIFICATIONS, DEDUCTION_REQUIREMENTS, WHAT_WE_PROVIDE } from '../data/cohortData';

export const TaxReimbursementSection: React.FC = () => {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDownloadTaxGuide = () => {
    const guideText = `THE BRADBURY GROUP: THE SOLOMON ENGINE
IRC SECTION 162 TAX DEDUCTION GUIDE

Program: The Solomon Engine, AI Mastery for Individual Executives
Provider: The Bradbury Group (Paige Bradbury, CEO & Principal Learning Architect)

WHAT QUALIFIES
${TAX_QUALIFICATIONS.map((item) => `- ${item}`).join('\n')}

DEDUCTION REQUIREMENTS
${DEDUCTION_REQUIREMENTS.map((item) => `- ${item}`).join('\n')}

WHAT WE PROVIDE
${WHAT_WE_PROVIDE.map((item) => `- ${item}`).join('\n')}

Talk to your tax professional with this page and your syllabus. The full guide adds the IRC Section 162 strategy, audit-proof checklist, and paper trail templates.`;

    const element = document.createElement('a');
    const file = new Blob([guideText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Bradbury_Group_IRC_162_Tax_Guide.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="funding" className="py-16 md:py-24 bg-[#f7f9fa] border-b border-[#3f6d67]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Compressed band */}
        <div className="bg-white rounded-2xl border-2 border-[#3f6d67]/30 shadow-md p-6 sm:p-8 md:p-10 text-center space-y-5">
          <div className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#c57b4b]">
            IRC Section 162
          </div>

          <h2 className="t-h2 text-[#0c2940] max-w-2xl mx-auto">
            Your investment likely qualifies as a tax deduction
          </h2>

          <button
            id="download-tax-guide-btn"
            type="button"
            onClick={handleDownloadTaxGuide}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#f8c51c] hover:bg-[#e5b310] text-[#0c2940] font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#0c2940]" />
            <span>DOWNLOAD THE TAX GUIDE</span>
          </button>

          <div>
            <button
              type="button"
              onClick={() => setDetailOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[#39918d] hover:text-[#0a3d42] font-montserrat font-semibold text-sm cursor-pointer"
            >
              <span>See what qualifies</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${detailOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expanded detail (three columns) */}
        {detailOpen && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl border border-[#3f6d67]/30 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-[#39918d]" />
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#0c2940]">
                    What Qualifies
                  </span>
                </div>
                <ul className="space-y-2">
                  {TAX_QUALIFICATIONS.map((item) => (
                    <li key={item} className="font-opensans text-sm text-[#0c2940]/80 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-[#3f6d67]/30 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#c57b4b]" />
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#0c2940]">
                    Deduction Requirements
                  </span>
                </div>
                <ul className="space-y-2">
                  {DEDUCTION_REQUIREMENTS.map((item) => (
                    <li key={item} className="font-opensans text-sm text-[#0c2940]/80 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-[#3f6d67]/30 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-[#0c2940]" />
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#0c2940]">
                    What We Provide
                  </span>
                </div>
                <ul className="space-y-2">
                  {WHAT_WE_PROVIDE.map((item) => (
                    <li key={item} className="font-opensans text-sm text-[#0c2940]/80 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="font-opensans text-sm text-[#0c2940]/70 leading-relaxed text-center max-w-2xl mx-auto">
              Talk to your tax professional with this page and your syllabus. The full guide adds
              the IRC Section 162 strategy, audit-proof checklist, and paper trail templates.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
