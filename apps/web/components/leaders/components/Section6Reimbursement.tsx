'use client';

import React from 'react';
import { Download, FileCheck } from 'lucide-react';

interface Section6ReimbursementProps {
  onDownloadTaxGuide: () => void;
}

export const Section6Reimbursement: React.FC<Section6ReimbursementProps> = ({
  onDownloadTaxGuide,
}) => {
  return (
    <section className="bg-[#ffffff] text-[#0c2940] py-20 lg:py-24 border-b border-[#39918d]/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="w-full bg-white border-2 border-[#39918d]/30 rounded-2xl p-8 sm:p-10 shadow-lg">
          
          {/* Eyebrow */}
          <div className="flex items-center space-x-2 mb-3">
            <FileCheck className="w-5 h-5 text-[#39918d]" />
            <span 
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="text-xs font-bold tracking-widest text-[#39918d] uppercase"
            >
              IRC Section 162
            </span>
          </div>

          {/* Title */}
          <h2 
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            className="text-2xl sm:text-3xl font-bold text-[#0c2940] tracking-tight leading-tight mb-6"
          >
            Your investment likely qualifies as a tax deduction
          </h2>

          {/* CTA Button and inline subtext */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={onDownloadTaxGuide}
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="py-3 px-6 bg-[#3f6d67] hover:bg-[#39918d] text-white font-bold text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-[#f8c51c]" />
              <span>DOWNLOAD THE TAX GUIDE</span>
            </button>
            <span className="text-[#39918d] font-bold">·</span>
            <span 
              style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
              className="text-sm font-semibold text-[#3f6d67]"
            >
              See what qualifies
            </span>
          </div>

          {/* Body Paragraph */}
          <p 
            style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
            className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
          >
            Bring article lays out strategic ways you can stack state, federal, and even industry-specific subsidies to offset the cost of your training. Leaders fall under a different category than most employees, so bring the syllabus to your tax professional.
          </p>

        </div>
      </div>
    </section>
  );
};
