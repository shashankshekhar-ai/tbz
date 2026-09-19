'use client';

import React, { useState, useEffect } from 'react';
import { ResourceItem } from '../types';
import { triggerResourceDownload } from '../utils/fileDownloader';

interface DocumentViewerModalProps {
  resource: ResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  resource,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [tripsScores, setTripsScores] = useState({
    time: 3,
    risk: 4,
    impact: 3,
    pain: 4,
    security: 2,
  });
  const [glossaryFilter, setGlossaryFilter] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const handleCopyText = () => {
    navigator.clipboard.writeText(resource.fullContent.documentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculated TRIPS score for interactive scorecard
  const totalTripsScore =
    tripsScores.time * 1.0 +
    tripsScores.risk * 1.2 +
    tripsScores.impact * 1.0 +
    tripsScores.pain * 1.0 -
    tripsScores.security * 0.5;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#0c2940]/75 backdrop-blur-sm transition-opacity"
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 my-6 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="font-h3 text-xs font-semibold px-2.5 py-1 rounded bg-[#0c2940] text-[#f8c51c]">
              {resource.badgeLabel}
            </span>
            <span className="font-body text-xs font-semibold text-[#3f6d67]">
              {resource.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="min-h-[44px] px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-xs font-h3 font-semibold text-[#0c2940] transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#0c2940]"
              title="Copy document text to clipboard"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => triggerResourceDownload(resource)}
              className="min-h-[44px] px-3.5 py-1.5 rounded-lg bg-[#0c2940] hover:bg-[#123959] text-white text-xs font-h3 font-semibold transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#0c2940]"
              title="Download file"
            >
              <svg className="w-4 h-4 text-[#f8c51c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors focus-visible:ring-2 focus-visible:ring-[#0c2940]"
              aria-label="Close document modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h2 id="viewer-title" className="t-h2 text-[#0c2940]">
              {resource.cardHeadline}
            </h2>
            <p className="font-body text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {resource.cardBody}
            </p>
          </div>

          {/* Key Takeaways summary */}
          <div className="rounded-xl bg-[#3f6d67]/10 border border-[#3f6d67]/20 p-4">
            <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-[#0c2940] mb-2">
              Key Strategic Takeaways
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body text-slate-700">
              {resource.fullContent.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <svg className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Feature for TRIPS Scorecard */}
          {resource.id === 'trips-scorecard' && (
            <div className="p-5 rounded-xl border border-[#39918d]/40 bg-[#39918d]/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-h3 text-sm font-bold text-[#0c2940]">
                  Interactive TRIPS Priority Calculator
                </h4>
                <span className="font-h3 text-xs font-semibold px-2 py-0.5 rounded bg-[#0c2940] text-[#f8c51c]">
                  Live Sandbox
                </span>
              </div>
              <p className="font-body text-xs text-slate-600 mb-4">
                Test a workflow candidate by adjusting dimensions (1=Low, 5=High):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-body">
                {(['time', 'risk', 'impact', 'pain', 'security'] as const).map((dim) => (
                  <div key={dim} className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="flex justify-between font-h3 font-semibold text-[#0c2940] uppercase tracking-wider text-[11px] mb-1">
                      <span>{dim}</span>
                      <span className="text-[#39918d] font-bold">{tripsScores[dim]} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={tripsScores[dim]}
                      onChange={(e) =>
                        setTripsScores({ ...tripsScores, [dim]: Number(e.target.value) })
                      }
                      className="w-full accent-[#39918d] cursor-pointer"
                    />
                  </div>
                ))}

                <div className="p-3 rounded-lg bg-[#0c2940] text-white flex flex-col justify-center items-center text-center sm:col-span-2 lg:col-span-1">
                  <span className="text-[10px] font-h3 uppercase text-slate-300 tracking-wider">
                    Calculated TRIPS Score
                  </span>
                  <span className="text-2xl font-h2 font-extrabold text-[#f8c51c]">
                    {totalTripsScore.toFixed(1)}
                  </span>
                  <span className="text-[11px] font-body text-slate-200 mt-0.5">
                    {totalTripsScore >= 16 ? 'Tier 1 Priority: Greenlight' : 'Tier 2: Conduct Discovery'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Feature for Glossary */}
          {resource.id === 'glossary' && (
            <div className="mb-2">
              <label htmlFor="glossary-term-filter" className="sr-only">
                Filter glossary terms
              </label>
              <input
                id="glossary-term-filter"
                type="text"
                placeholder="Type to filter glossary terms (e.g. IPMF, Solomon, Literacy)..."
                value={glossaryFilter}
                onChange={(e) => setGlossaryFilter(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-body text-[#0c2940]"
              />
            </div>
          )}

          {/* Raw Full Text Reader */}
          <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap select-text max-h-96 overflow-y-auto">
            {resource.fullContent.documentContent}
          </div>

          {/* Post-Download line verification */}
          <div className="p-3 bg-slate-100 rounded-lg text-xs font-caption text-slate-600 text-center border border-slate-200">
            "After you download, you'll hear from us with more resources like this. Useful frameworks, not sales pressure."
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="font-caption text-xs text-slate-500">
            Format: {resource.fileFormat}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-lg bg-[#0c2940] hover:bg-[#123959] text-white text-xs sm:text-sm font-h3 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#0c2940]"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
