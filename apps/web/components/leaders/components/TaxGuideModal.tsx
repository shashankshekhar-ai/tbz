'use client';

import React, { useState } from 'react';
import { X, Download, FileCheck, CheckCircle2 } from 'lucide-react';

interface TaxGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaxGuideModal: React.FC<TaxGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      // Simulate receipt download
      const element = document.createElement('a');
      const file = new Blob([
        `THE BRADBURY GROUP — IRC SECTION 162 EXECUTIVE TAX GUIDE\n\nProgram: The Solomon Engine (12-Week Executive AI Architecture)\nTax Code Basis: Internal Revenue Code Section 162(a)\nEligible Deductions: Professional executive upskilling, strategy coaching, tuition & enterprise materials.\n\nPlease share this syllabus and advisory memorandum directly with your CPA or tax professional.`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'TBG_IRC_Section_162_Tax_Guide.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#ffffff] text-[#0c2940] rounded-2xl border-2 border-[#39918d]/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-[#0c2940] rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#39918d] text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          <FileCheck className="w-4 h-4" />
          <span>IRC Section 162 · Tax Qualification</span>
        </div>

        <h3 
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          className="text-xl font-bold text-[#0c2940] mb-3"
        >
          Your investment likely qualifies as a tax deduction
        </h3>

        <p 
          style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
          className="text-sm text-slate-700 leading-relaxed mb-6 font-normal"
        >
          Bring article lays out strategic ways you can stack state, federal, and even industry-specific subsidies to offset the cost of your training. Leaders fall under a different category than most employees, so bring the syllabus to your tax professional.
        </p>

        {downloaded ? (
          <div className="bg-[#39918d]/10 border border-[#39918d]/30 rounded-xl p-4 text-center space-y-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#39918d] mx-auto" />
            <p 
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="text-sm font-bold text-[#0c2940]"
            >
              Tax Guide Downloaded
            </p>
            <p 
              style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
              className="text-xs text-slate-600"
            >
              Your guide has been saved to your downloads folder.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            className="flex-1 py-3 px-5 bg-[#3f6d67] hover:bg-[#39918d] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-2 shadow-md"
          >
            <Download className="w-4 h-4 text-[#f8c51c]" />
            <span>DOWNLOAD THE TAX GUIDE</span>
          </button>
          <button
            onClick={onClose}
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-[#0c2940] font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
