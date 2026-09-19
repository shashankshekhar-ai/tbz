'use client';

import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, DollarSign, Download } from 'lucide-react';

interface TaxCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaxCreditsModal: React.FC<TaxCreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tax-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0c2940]/70 backdrop-blur-xs"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0c2940] text-white p-6 sm:p-7 flex items-start justify-between gap-4 border-b border-[#39918d]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3f6d67] text-xs font-bold font-h3 uppercase text-white mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f8c51c]" /> Financial &amp; Tax Compliance Guide
            </div>
            <h3 id="tax-modal-title" className="font-h1 text-xl sm:text-2xl font-bold text-white">
              Tax Credits, Deductions &amp; Reimbursement Guidance
            </h3>
            <p className="font-caption text-xs sm:text-sm text-slate-300 mt-1">
              Frameworks to offset or write off upskilling investments
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto font-body text-slate-700">
          {/* Section 1: Employer Educational Assistance */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-h3 text-sm sm:text-base font-bold text-[#0c2940]">
                1. IRS Section 127 Educational Assistance Programs
              </h4>
              <span className="text-xs font-bold text-[#3f6d67] bg-[#3f6d67]/15 px-2 py-0.5 rounded font-h3">
                Up to $5,250/yr
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Under Internal Revenue Code Section 127, an employer can provide up to $5,250 per employee
              per year in tax-free educational assistance for skills development and coursework directly
              applicable to workforce efficiency.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 font-body">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#39918d] shrink-0" />
                Deductible for the employer as a standard business operating expense
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#39918d] shrink-0" />
                Excluded from employee gross income (no payroll or income tax levied)
              </li>
            </ul>
          </div>

          {/* Section 2: IRC Section 162 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-h3 text-sm sm:text-base font-bold text-[#0c2940]">
                2. IRC Section 162: Trade or Business Expenses
              </h4>
              <span className="text-xs font-bold text-[#c57b4b] bg-[#c57b4b]/15 px-2 py-0.5 rounded font-h3">
                100% Deductible
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              For self-employed practitioners, LLCs, and corporations, training that maintains or improves
              skills required in your present trade or business is fully deductible as an ordinary and
              necessary business expense.
            </p>
          </div>

          {/* Section 3: State & Municipal Grants */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-h3 text-sm sm:text-base font-bold text-[#0c2940] mb-2">
              3. State Workforce &amp; Upskilling Subsidies
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Many US states (e.g., California ETP, Texas Skills Development, Massachusetts Workforce
              Training Fund) provide matching grants reimbursing 50%–100% of executive technology upskilling
              and workflow modernization programs.
            </p>
          </div>

          {/* Institutional Requisition Support */}
          <div className="p-4 rounded-xl bg-[#39918d]/10 border border-[#39918d]/30 text-xs sm:text-sm text-slate-800">
            <span className="block font-bold text-[#0c2940] font-h3 mb-1">
              Invoice &amp; Requisition Documentation:
            </span>
            <p className="font-body text-slate-700 leading-relaxed">
              We provide itemized invoices, course syllabi, verifiable outcome certifications, and
              W-9 documentation formatted to meet institutional procurement and accounting requirements.
            </p>
          </div>

          <p className="text-xs text-slate-700 font-caption">
            *Disclaimer: This information is for educational purposes. Consult with your certified CPA
            or tax advisor regarding your specific organizational eligibility and tax position.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0c2940] text-white text-xs sm:text-sm font-semibold font-h3 hover:bg-[#0c2940]/90 transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
