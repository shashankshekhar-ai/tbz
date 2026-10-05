import React, { useState } from 'react';
import { X, Copy, Check, FileText, Download, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface BusinessCasePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
}

export const BusinessCasePreviewModal: React.FC<BusinessCasePreviewModalProps> = ({
  isOpen,
  onClose,
  onDownloadPdf
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const memoText = `Subject: Proposal: Strategic Investment in AI Workforce Modernization & Applied Fluency

Hi [Manager/Executive Name],

I wanted to share a concrete proposal to systematically upskill our team in operational AI rather than continuing with fragmented, uncoordinated individual tools.

The Bradbury Group (TBG) runs an applied cohort program designed specifically for enterprise operations:
1. Business Case & ROI: Focuses directly on high-friction daily workflows (document extraction, RFP acceleration, cross-team triage). Peer organizations report a 40%+ reduction in recurring task cycle times.
2. DOL Framework Alignment: Structured around federal Department of Labor workforce standards, covering data privacy, output verification, and prompt governance.
3. Time Commitment: 2 sessions per week (~2 hours each + 1 hour of applied workflow redesign over 4-6 weeks), ensuring zero disruption to live customer commitments.
4. Competitive Risk: Industry peers are rapidly adopting governed AI pipelines. A structured cohort eliminates shadow IT liability while elevating team velocity.

Could we schedule 15 minutes this week to review the implementation schedule?

Best,
[Your Name]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0c2940]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#0c2940]"
      >
        {/* Header */}
        <div className="bg-[#0c2940] px-6 py-4 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#39918d]" />
            <h3 className="font-h2 text-base sm:text-lg font-bold text-white">
              The Pre-Written Business Case · Quick Forward Memo
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <p>
              Pre-written ROI language, cost justification, and role clarity formatted to forward straight to your manager or committee.
            </p>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#39918d] text-white hover:bg-[#3f6d67]'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Memo' : 'Copy Pitch Email'}</span>
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto selection:bg-[#f8c51c] selection:text-[#0c2940]">
            {memoText}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-[#0c2940] block">DOL Framework</span>
              <span className="text-slate-500 text-[11px]">Audit-defensible compliance</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-[#0c2940] block">Competitive Risk</span>
              <span className="text-slate-500 text-[11px]">Inaction &amp; shadow IT prevention</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-[#0c2940] block">Time Commitment</span>
              <span className="text-slate-500 text-[11px]">2 sess/wk · ~2 hrs + homework</span>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onDownloadPdf();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full PDF Package</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
