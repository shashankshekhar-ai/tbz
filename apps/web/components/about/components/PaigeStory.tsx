'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radio, BookOpen, Compass, Award, Bot, Sprout, Dumbbell, ChefHat, CheckCircle2 } from 'lucide-react';

// Set to the final photo path (e.g. '/brand/paige-new.jpg') to replace the placeholder.
const PAIGE_PHOTO = '/brand/paige-bradbury-2026.jpg';

export const PaigeStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'credibility' | 'personal'>('philosophy');

  const personalInterests = [
    { name: 'History Buff', icon: BookOpen, desc: 'Geeking out on historical archives & narratives' },
    { name: 'Audiobooks', icon: Compass, desc: 'Constant learning on the go' },
    { name: 'Culinary Arts', icon: ChefHat, desc: 'Experimental home cooking & recipes' },
    { name: 'Fitness', icon: Dumbbell, desc: 'Daily workouts & endurance' },
    { name: 'Garden & Pollinators', icon: Sprout, desc: 'Using AI to chart pollinator gardens & keep front yard green' },
    { name: 'Custom AI Assistants', icon: Bot, desc: 'Building bespoke AI tools for everyday fun' },
  ];

  return (
    <section id="story" className="relative pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 px-6 sm:px-8 lg:px-12 bg-white border-b border-slate-200 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Header with Oversized Number Visual Object */}
        {/* Photo banner with title card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md mb-10 sm:mb-14 h-[280px] sm:h-[380px] lg:h-[460px]">
          {PAIGE_PHOTO ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={PAIGE_PHOTO} alt="Paige Bradbury" className="absolute inset-0 w-full h-full object-cover object-[center_24%]" />
          ) : (
            <div
              role="img"
              aria-label="Paige Bradbury photo placeholder"
              className="absolute inset-0 bg-gradient-to-br from-[#0c2940] via-[#1a4a5c] to-[#39918d] flex items-center justify-end pr-[12%]"
            >
              <span className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-white/25 bg-white/10 flex items-center justify-center font-h1 font-black text-5xl sm:text-7xl tracking-widest text-[#f8c51c]">
                PB
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/5 to-transparent pointer-events-none" />
          <div className="absolute left-4 bottom-4 sm:left-10 sm:bottom-10 bg-white rounded-2xl shadow-lg px-6 py-5 sm:px-10 sm:py-7">
            <h2 className="t-h2 text-[#0c2940]">Paige&apos;s Story</h2>
          </div>
        </div>

        {/* Founder bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-14 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-h2 font-medium text-2xl sm:text-3xl text-[#0c2940] leading-snug">
              Paige Bradbury is the Founder and Principal Learning Architect of <span className="text-[#2d7773] font-bold">The Bradbury Group</span>.
            </p>
            <p className="font-body text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              She spent over <span className="font-semibold text-[#0c2940]">15+ years in international training</span>, working across sectors and cultures — building on an earlier career as a <span className="font-semibold text-[#9a5a2e]">broadcast journalist and CNN Radio correspondent</span>.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#3f6d67]/10 border border-[#3f6d67]/30 p-8 rounded-2xl relative overflow-hidden group hover:border-[#39918d] transition-colors shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-15 group-hover:opacity-25 transition-opacity">
              <Radio className="w-24 h-24 text-[#2d7773]" />
            </div>
            <span className="font-h1 font-black text-6xl sm:text-7xl text-[#0c2940] block mb-2">15+</span>
            <span className="font-h2 font-bold text-xs uppercase tracking-widest text-[#0f766e] block mb-3">
              Years in International Training
            </span>
          </div>
        </div>

        {/* Editorial Layer 4 & 5: Interactive Tabs for Credibility & Personal Side */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
<span />
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`px-4 py-2 rounded-lg text-xs font-h2 uppercase tracking-wider transition-all ${
                  activeTab === 'philosophy'
                    ? 'bg-[#0c2940] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-[#0c2940]'
                }`}
              >
                Ecosystem Leadership
              </button>
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-4 py-2 rounded-lg text-xs font-h2 uppercase tracking-wider transition-all ${
                  activeTab === 'personal'
                    ? 'bg-[#c57b4b] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-[#0c2940]'
                }`}
              >
                Outside of Work
              </button>
            </div>
          </div>

          {activeTab === 'philosophy' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Georgia AI Alliance */}
              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-h2 font-bold text-[#0c2940] text-lg">Georgia AI Alliance</h4>
                </div>
                <p className="font-body text-slate-700 text-sm leading-relaxed font-normal">
                  Paige is a key stakeholder in the <strong className="text-[#0c2940]">Georgia AI Alliance</strong>, which is part of a national network shaping workforce AI readiness and economic preparedness.
                </p>
              </div>

              {/* Ethical Standards Initiative */}
              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b45309]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-h2 font-bold text-[#0c2940] text-lg">Ethical Science-Backed Standards</h4>
                </div>
                <p className="font-body text-slate-700 text-sm leading-relaxed font-normal">
                  Founding member of an international initiative building <strong className="text-[#0c2940]">ethical, science-backed standards</strong> for how organizations measure learning and performance in the AI era.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalInterests.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 hover:border-[#c57b4b] transition-colors shadow-xs"
                    >
                      <div className="p-2 bg-[#c57b4b]/10 text-[#9a5a2e] rounded-lg shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-h2 text-xs font-bold text-[#0c2940] block mb-0.5">
                          {item.name}
                        </span>
                        <span className="font-caption text-[11px] text-slate-600 block leading-normal font-medium">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-center">
                <p className="font-caption text-xs text-[#78350f] italic font-medium">
                  “She may or may not be using AI to chart out a pollinator garden and keep her front yard green.”
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
