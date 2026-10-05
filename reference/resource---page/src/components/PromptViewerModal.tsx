import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Download, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { UNIVERSAL_GRANT_PROMPT } from '../data/playbookData';

interface PromptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPackage: () => void;
}

export const PromptViewerModal: React.FC<PromptViewerModalProps> = ({
  isOpen,
  onClose,
  onDownloadPackage
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(UNIVERSAL_GRANT_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0c2940]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#0c2940]"
      >
        {/* Navy Header */}
        <div className="bg-[#0c2940] px-6 py-4 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#f8c51c]" />
            <h3 className="font-h2 text-base sm:text-lg font-bold text-white">
              Universal Prompt for Grants &amp; Tax Credits
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
              Paste this prompt directly into your internal LLM, Claude, or ChatGPT to generate executive audit memos, §127 plans, and state grant applications.
            </p>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#39918d] text-white hover:bg-[#3f6d67]'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Prompt'}</span>
            </button>
          </div>

          {/* Prompt Box */}
          <div className="relative bg-slate-900 rounded-xl p-4 sm:p-5 text-slate-100 font-mono text-xs leading-relaxed max-h-[50vh] overflow-y-auto border border-slate-800">
            <pre className="whitespace-pre-wrap selection:bg-[#f8c51c] selection:text-[#0c2940]">
              {UNIVERSAL_GRANT_PROMPT}
            </pre>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 flex items-center justify-between">
            <span>
              Includes full compliance clauses for IRS §127, state ETP/WTFP training funds, and IRC §162 ordinary and necessary business expense criteria.
            </span>
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
                onDownloadPackage();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Grant Package</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
