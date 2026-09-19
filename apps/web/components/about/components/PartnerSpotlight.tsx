'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PARTNERS_DATA } from '../data/partners';
import { Partner } from '../types';
import { CheckCircle, Shield, Building2, ChevronRight, Layers } from 'lucide-react';

interface PartnerSpotlightProps {
  onOpenContact?: () => void;
}

export const PartnerSpotlight: React.FC<PartnerSpotlightProps> = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('amplified-concepts');

  const selectedPartner: Partner =
    PARTNERS_DATA.find((p) => p.id === selectedPartnerId) || PARTNERS_DATA[0];

  return (
    <section id="partners" className="relative pt-10 pb-16 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-20 px-6 sm:px-8 lg:px-12 bg-white border-b border-slate-200 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 glow-copper pointer-events-none opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Header with Oversized Number Visual Object */}
        <div className="mb-10 sm:mb-12 border-b border-slate-200 pb-6">
          <h2 className="t-h2 text-[#0c2940]">
            Partner Spotlight
          </h2>
        </div>

        {/* Main Layout: Desktop 2-Column Split (Left: Main Spotlight Viewport, Right: Secondary Partner Index) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Main Partner Viewport Card (Occupies 8 Cols) */}
          <div className="lg:col-span-8 bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 sm:p-10 relative flex flex-col justify-between shadow-sm h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPartner.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-8"
              >
                {/* Header Tag & Founder */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <span className="font-caption text-xs font-bold uppercase tracking-widest text-[#2d7773] block mb-1">
                      {selectedPartner.category || 'Strategic Partner'}
                    </span>
                    <h3 className="t-h3 text-[#0c2940]">
                      {selectedPartner.name}
                    </h3>
                  </div>

                  {selectedPartner.founder ? (
                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-right shadow-xs">
                      <span className="font-h3 text-xs font-medium text-[#9a5a2e] block">
                        {selectedPartner.founder}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Focus Line */}
                {selectedPartner.focus && (
                  <div>
                    <p className="font-h2 text-lg font-bold text-[#0c2940]">
                      {selectedPartner.focus}
                    </p>
                  </div>
                )}

                {/* Detailed Description or Pending State */}
                {!selectedPartner.isPending && (selectedPartner.paragraphs || selectedPartner.description) ? (
                  <div className="space-y-5">
                    {selectedPartner.paragraphs ? (
                      selectedPartner.paragraphs.map((paragraph, idx) => {
                        if (paragraph.startsWith('The result:')) {
                          return (
                            <div
                              key={idx}
                              className="p-5 sm:p-6 bg-slate-50 border-l-4 border-[#0f766e] rounded-r-xl space-y-2"
                            >
                              <p className="font-body text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                                <strong className="text-[#0c2940] font-bold">The result:</strong>{' '}
                                TBG's business infrastructure got audited, blueprinted, and accelerated by a world-class revenue strategist. Amplified Concepts built their curriculum with our frameworks and tools.
                              </p>
                              <p className="font-h2 text-sm sm:text-base font-bold text-[#0c2940]">
                                Peer-level collaboration. Defined deliverables. Mutual growth.
                              </p>
                            </div>
                          );
                        }
                        if (paragraph.startsWith('This partnership models')) {
                          return (
                            <p
                              key={idx}
                              className="font-caption text-sm text-slate-600 italic font-medium pt-1"
                            >
                              {paragraph}
                            </p>
                          );
                        }
                        return (
                          <p
                            key={idx}
                            className="font-body text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
                          >
                            {paragraph}
                          </p>
                        );
                      })
                    ) : (
                      <>
                        {/* Narrative Description */}
                        <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                          {selectedPartner.description}
                        </p>

                        {/* Pull Quote Callout */}
                        {selectedPartner.pullQuote && (
                          <div className="p-6 bg-amber-50/80 border-l-4 border-[#c57b4b] rounded-r-xl shadow-xs">
                            <span className="font-h2 font-bold text-base sm:text-lg text-[#78350f] block">
                              “{selectedPartner.pullQuote}”
                            </span>
                          </div>
                        )}

                        {/* Specific Outcome */}
                        {selectedPartner.outcome && (
                          <div className="p-5 bg-white border border-teal-200 rounded-xl space-y-2 shadow-xs">
                            <div className="flex items-center gap-2 text-[#0f766e]">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-h2 text-xs uppercase font-bold tracking-wider">
                                Measurable Outcome & Client Impact
                              </span>
                            </div>
                            <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                              {selectedPartner.outcome}
                            </p>
                          </div>
                        )}

                        {/* Shared Philosophy */}
                        {selectedPartner.philosophy && (
                          <p className="font-caption text-xs text-slate-600 italic pt-2 font-medium">
                            {selectedPartner.philosophy}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-4 bg-white border border-dashed border-slate-300 rounded-2xl p-8">
                    <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
                    <div>
                      <h4 className="font-h2 font-bold text-[#0c2940] text-lg">
                        {selectedPartner.name}
                      </h4>
                      <p className="font-body text-sm text-slate-700 mt-1">
                        [Content pending from Paige]
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Secondary Partner Selector / Index (Occupies 4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
<span className="font-h2 text-xs font-bold uppercase tracking-wider text-[#0c2940]">
                Partners
              </span>
            </div>

            {/* Scrollable Selector List */}
            <div className="space-y-2 flex-1 overflow-y-auto pr-1 mt-4 min-h-[360px] max-h-[500px] lg:max-h-none">
              {PARTNERS_DATA.map((partner) => {
                const isSelected = partner.id === selectedPartnerId;
                return (
                  <button
                    key={partner.id}
                    onClick={() => setSelectedPartnerId(partner.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#0c2940] border-[#0c2940] text-white shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-h2 text-xs font-bold block">
                        {partner.name}
                      </span>
                      {partner.founder && (
                        <span
                          className={`font-caption text-xs block ${
                            isSelected ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          {partner.founder}
                        </span>
                      )}
                      {partner.isPending && (
                        <span
                          className={`font-caption text-xs block ${
                            isSelected ? 'text-amber-300' : 'text-[#9a5a2e]'
                          }`}
                        >
                          [Content pending]
                        </span>
                      )}
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? 'text-white translate-x-1'
                          : 'text-slate-400 group-hover:text-slate-800'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
