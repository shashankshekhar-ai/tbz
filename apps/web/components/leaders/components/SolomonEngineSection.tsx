'use client';

import React, { useState } from 'react';
import { Calendar, Layers, ChevronDown, Bot, Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { JOURNEY_TIMELINE, SOLOMON_ASSISTANTS, ORGANIZATIONAL_BLUEPRINT, INVESTMENT_AND_COHORTS } from '../data/cohortData';

const STAGE_ICONS = [ShieldCheck, Bot, Layers];
const ASSISTANT_ICONS = { miyagi: Compass, vertical: Bot, dash: Sparkles };

export const SolomonEngineSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [activeAssistant, setActiveAssistant] = useState(0);
  const [blueprintOpen, setBlueprintOpen] = useState(false);

  return (
    <section id="solomon-engine" className="py-16 md:py-24 bg-[#ffffff] border-b border-[#3f6d67]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>03 / THE JOURNEY</span>
          </div>

          <div className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#c57b4b]">
            12 weeks, one on one
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            The Solomon Engine
          </h2>

          <p className="font-opensans text-base sm:text-lg text-[#0c2940]/85 leading-relaxed font-medium max-w-3xl mx-auto">
            I customize every session based on what I learned during your interview. Your Week 3 looks nothing like anyone else&apos;s.
          </p>

          <p className="font-opensans text-sm sm:text-base text-[#0c2940]/75 leading-relaxed max-w-2xl mx-auto">
            You&apos;re not learning AI in the abstract. You&apos;re learning it while solving real problems in your business, with me as your thinking partner.
          </p>
        </div>

        {/* Weekly structure: tabbed, one stage visible at a time */}
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-2.5">
            {JOURNEY_TIMELINE.map((stage, idx) => {
              const Icon = STAGE_ICONS[idx];
              return (
                <button
                  key={stage.period}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeStage === idx
                      ? 'bg-[#0c2940] text-white shadow-md'
                      : 'bg-[#f7f9fa] text-[#0c2940]/70 border border-slate-200 hover:border-[#39918d]/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{stage.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-[#f7f9fa] rounded-2xl border-2 border-[#3f6d67]/30 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#39918d]" />
            <div className="space-y-3">
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#39918d]">
                {JOURNEY_TIMELINE[activeStage].period}
              </span>
              <h3 className="t-h3 text-[#0c2940]">
                {JOURNEY_TIMELINE[activeStage].title}
              </h3>
              <p className="font-montserrat text-sm font-semibold text-[#c57b4b] uppercase tracking-wide">
                {JOURNEY_TIMELINE[activeStage].subtitle}
              </p>
              <p className="font-opensans text-sm sm:text-base text-[#0c2940]/80 leading-relaxed pt-2">
                {JOURNEY_TIMELINE[activeStage].outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Your custom AI arsenal: tabbed */}
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#39918d] block mb-2">
              YOUR CUSTOM AI ARSENAL
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {SOLOMON_ASSISTANTS.map((assistant, idx) => {
              const Icon = ASSISTANT_ICONS[assistant.id as keyof typeof ASSISTANT_ICONS];
              return (
                <button
                  key={assistant.id}
                  type="button"
                  onClick={() => setActiveAssistant(idx)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeAssistant === idx
                      ? 'text-white shadow-md'
                      : 'bg-[#f7f9fa] text-[#0c2940]/70 border border-slate-200 hover:border-[#39918d]/40'
                  }`}
                  style={activeAssistant === idx ? { backgroundColor: assistant.color } : undefined}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{assistant.name}</span>
                </button>
              );
            })}
          </div>

          <div
            className="bg-white rounded-2xl border-2 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden max-w-4xl mx-auto"
            style={{ borderColor: `${SOLOMON_ASSISTANTS[activeAssistant].color}66` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: SOLOMON_ASSISTANTS[activeAssistant].color }}
            />
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${SOLOMON_ASSISTANTS[activeAssistant].color}1A`,
                  borderColor: `${SOLOMON_ASSISTANTS[activeAssistant].color}4D`,
                  color: SOLOMON_ASSISTANTS[activeAssistant].color,
                }}
              >
                {(() => {
                  const Icon = ASSISTANT_ICONS[SOLOMON_ASSISTANTS[activeAssistant].id as keyof typeof ASSISTANT_ICONS];
                  return <Icon className="w-6 h-6 stroke-[2.2]" />;
                })()}
              </div>
              <div className="space-y-2">
                <span
                  className="text-xs font-montserrat font-bold uppercase tracking-wider block"
                  style={{ color: SOLOMON_ASSISTANTS[activeAssistant].color }}
                >
                  {SOLOMON_ASSISTANTS[activeAssistant].badge}
                </span>
                <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-[#0c2940]">
                  {SOLOMON_ASSISTANTS[activeAssistant].name} ({SOLOMON_ASSISTANTS[activeAssistant].role})
                </h3>
                <p className="font-opensans text-sm sm:text-base text-[#0c2940]/80 leading-relaxed">
                  {SOLOMON_ASSISTANTS[activeAssistant].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organizational blueprint: collapsed by default */}
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => setBlueprintOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-4 bg-[#f7f9fa] hover:bg-[#f0f4f5] border-2 border-[#3f6d67]/30 rounded-2xl p-6 sm:p-7 transition-colors cursor-pointer text-left"
          >
            <div>
              <h3 className="font-montserrat text-lg sm:text-xl font-bold text-[#0c2940]">
                {ORGANIZATIONAL_BLUEPRINT.toggleHeading}
              </h3>
              <p className="font-opensans text-sm text-[#0c2940]/75 mt-1">
                {ORGANIZATIONAL_BLUEPRINT.toggleSubhead}
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[#39918d] shrink-0 transition-transform ${blueprintOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {blueprintOpen && (
            <div className="bg-white border-2 border-t-0 border-[#3f6d67]/30 rounded-b-2xl -mt-2 pt-4 p-6 sm:p-7">
              <ul className="space-y-2.5">
                {ORGANIZATIONAL_BLUEPRINT.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-opensans text-sm text-[#0c2940]/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39918d] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Investment and cohorts */}
        <div className="bg-[#0c2940] text-[#ffffff] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#3f6d67]/40 relative overflow-hidden max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-[#f8c51c]">
                <Layers className="w-4 h-4 text-[#f8c51c]" />
                <span>Investment</span>
              </div>
              <p className="font-opensans text-sm sm:text-base text-[#ffffff]/90 leading-relaxed">
                {INVESTMENT_AND_COHORTS.investment}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-[#f8c51c]">
                <Calendar className="w-4 h-4 text-[#f8c51c]" />
                <span>Next Cohorts</span>
              </div>
              <p className="font-opensans text-sm sm:text-base text-[#ffffff]/90 leading-relaxed">
                {INVESTMENT_AND_COHORTS.nextCohorts}
              </p>
              <p className="font-opensans text-xs text-[#ffffff]/70">
                {INVESTMENT_AND_COHORTS.applicationNote}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
