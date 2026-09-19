'use client';

import React, { useState } from 'react';
import { SECTOR_DATA } from '../data';
import { Network, Globe, Landmark, GraduationCap, HeartHandshake, Briefcase, CheckCircle2 } from 'lucide-react';

export const Section4Sectors: React.FC = () => {
  const [activeSectorId, setActiveSectorId] = useState<string>('federal');

  const getSectorIcon = (id: string) => {
    switch (id) {
      case 'federal':
        return <Landmark className="w-5 h-5 text-[#39918d]" />;
      case 'education':
        return <GraduationCap className="w-5 h-5 text-[#c57b4b]" />;
      case 'nonprofit':
        return <HeartHandshake className="w-5 h-5 text-[#f8c51c]" />;
      case 'municipal':
        return <Globe className="w-5 h-5 text-[#3f6d67]" />;
      case 'private':
        return <Briefcase className="w-5 h-5 text-[#39918d]" />;
      default:
        return <Network className="w-5 h-5 text-[#39918d]" />;
    }
  };

  const currentSector = SECTOR_DATA.find((s) => s.id === activeSectorId) || SECTOR_DATA[0];

  return (
    <section
      id="section-sectors"
      className="py-16 sm:py-20 lg:py-24 bg-[#f8fafb] border-b border-slate-200"
      aria-labelledby="section-4-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3f6d67]/15 text-[#0c2940] text-xs font-semibold uppercase tracking-wider font-h3 mb-3 border border-[#3f6d67]/30">
            <Network className="w-3.5 h-3.5 text-[#3f6d67]" />
            Section 4: Cross-Sector Breadth
          </div>

          <h2
            id="section-4-title" className="t-h2 text-[#0c2940] mb-4"
          >
            The Industries Change. The Framework Adapts. The Results Are Consistent.
          </h2>

          <div className="font-body text-base sm:text-lg text-slate-700 leading-relaxed space-y-4">
            <p>
              We've partnered with federal agencies, municipalities, nonprofits, and private-sector
              teams. From a university system that doesn't move fast for anyone, to a nonprofit managing
              8,000 sponsored children in Zambia, to a federal research center processing hundreds of
              evidence-based strategies annually.
            </p>
            <p className="font-medium text-[#0c2940]">
              The common thread: every organization had capable people stuck in manual workflows. The
              frameworks we build are designed to be owned by your team, not dependent on ours.
            </p>
          </div>
        </div>

        {/* Sector Interactive Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10">
          {/* Sector Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-slate-200" role="tablist" aria-label="Sector domains">
            {SECTOR_DATA.map((sector) => {
              const isActive = sector.id === activeSectorId;
              return (
                <button
                  key={sector.id}
                  id={`tab-${sector.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${sector.id}`}
                  onClick={() => setActiveSectorId(sector.id)}
                  className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all font-h3 cursor-pointer ${
                    isActive
                      ? 'bg-[#0c2940] text-white shadow-sm'
                      : 'bg-[#f4f7f8] text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  {getSectorIcon(sector.id)}
                  <span>{sector.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sector Display */}
          <div
            id={`panel-${currentSector.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentSector.id}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39918d]/15 text-[#0c2940] text-xs font-bold font-h3 uppercase">
                {currentSector.title}
              </div>

              <h3 className="font-h3 text-xl sm:text-2xl font-bold text-[#0c2940]">
                {currentSector.example}
              </h3>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#c57b4b] font-h3 mb-1">
                  The Baseline Challenge:
                </span>
                <p className="font-body text-sm text-slate-700 leading-relaxed">
                  {currentSector.challenge}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0c2940] text-white rounded-xl p-6 sm:p-8 border border-[#39918d]/30 shadow-md">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f8c51c] font-h3 block mb-2">
                Documented Transformation
              </span>

              <h4 className="font-h1 text-xl sm:text-2xl font-bold text-white mb-4">
                Owned System. Measurable Outcome.
              </h4>

              <p className="font-body text-base text-slate-200 leading-relaxed mb-6">
                {currentSector.transformation}
              </p>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-caption text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39918d]" /> Zero ongoing agency dependency
                </span>
                <span className="bg-[#3f6d67]/50 px-2.5 py-1 rounded text-white font-h3 font-semibold">
                  $0 New Software Licenses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
