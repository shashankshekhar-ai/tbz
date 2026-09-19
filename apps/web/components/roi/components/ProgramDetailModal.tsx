'use client';

import React from 'react';
import { X, ArrowRight, CheckCircle2, Users, Briefcase, Building2 } from 'lucide-react';
import { ModalContent } from '../types';

interface ProgramDetailModalProps {
  content: ModalContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  content,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !content) return null;

  const getIcon = () => {
    switch (content.category) {
      case 'individual':
        return <Users className="w-5 h-5 text-[#39918d]" />;
      case 'leaders':
        return <Briefcase className="w-5 h-5 text-[#c57b4b]" />;
      case 'orgs':
        return <Building2 className="w-5 h-5 text-[#f8c51c]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#39918d]" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
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
              {getIcon()}
              <span>Program Architecture &amp; Pathway</span>
            </div>
            <h3 id="program-modal-title" className="font-h1 text-xl sm:text-2xl font-bold text-white">
              {content.title}
            </h3>
            <p className="font-caption text-xs sm:text-sm text-slate-300 mt-1">
              {content.subtitle}
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
          <div className="space-y-3 font-body text-sm sm:text-base leading-relaxed">
            {content.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-[#0c2940] mb-3">
              Key Methodology Highlights:
            </h4>
            <ul className="space-y-2.5">
              {content.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-700 font-caption">
            Structured • Measured • Documented
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2 rounded-xl bg-[#0c2940] text-white text-xs sm:text-sm font-semibold font-h3 hover:bg-[#0c2940]/90 transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
