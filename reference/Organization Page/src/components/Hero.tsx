import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { HeroParticleConstellation } from './HeroParticleConstellation';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const statPoints = [
    '7+ active use cases implemented across departments',
    'AI Champions program',
    '22 literacy lessons built for team',
    'Executive Director unlocks AI as thought partner',
    '$0 new tools',
  ];

  return (
    <section className="relative overflow-hidden bg-[#0c2940] px-6 pt-16 pb-20 sm:pt-20 sm:pb-28 border-b border-[#39918d]/30 text-[#ffffff]">
      {/* 50% Opacity Constellation Node Particle Animation (matching reference screenshot) */}
      <HeroParticleConstellation />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Brand Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-3"
        >
          <div className="h-0.5 w-6 bg-[#f8c51c]" aria-hidden="true" />
          <p className="font-['Montserrat'] text-xs font-bold uppercase tracking-[0.3em] text-[#f8c51c]">
            The Bradbury Group
          </p>
        </motion.div>

        {/* Main Grid: Storyline & Side Stat Card (Adjacently Aligned) */}
        <div className="mt-8 grid items-stretch gap-10 lg:gap-12 lg:grid-cols-12">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="font-['Inter'] text-3xl font-bold leading-[1.18] tracking-tight sm:text-4xl lg:text-[2.85rem] text-[#ffffff]"
                style={{ textWrap: 'balance' }}
              >
                One team turned a 3-week workflow into 8 hours, using tools they already had.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-6 font-['Open_Sans'] text-base leading-relaxed max-w-2xl text-[#ffffff] text-opacity-90"
              >
                Most organizations bolt AI onto existing workflows and wonder why nothing changes. We
                redesign how work moves through your team: how people process information, make
                decisions, and communicate results. We call it Learning Architecture, and we build
                it with you, and it’s the part most AI training skips entirely.
              </motion.p>
            </div>

            {/* CTAs aligned adjacently */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-8 pt-4 flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('how');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-[#f8c51c] px-7 py-3.5 font-['Montserrat'] text-sm font-bold uppercase tracking-wide text-[#0c2940] transition-all duration-200 hover:bg-[#ffffff] hover:shadow-lg hover:shadow-[#f8c51c]/25 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>See how it works</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-7 py-3.5 font-['Montserrat'] text-sm font-semibold text-[#ffffff] transition-all duration-200 hover:bg-white/10 hover:border-white/60 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f8c51c]"
              >
                Schedule a consultation
              </button>
            </motion.div>
          </div>

          {/* Right Column: Side Stat Card (5 cols) in Navy backdrop */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border-2 border-[#39918d]/40 bg-[#0c2940]/80 p-6 sm:p-7 backdrop-blur-md shadow-2xl shadow-black/40 h-full flex flex-col justify-between text-[#ffffff]"
            >
              <div>
                {/* Header Tag */}
                <div className="pb-4 border-b border-white/10">
                  <h3 className="font-['Montserrat'] font-medium text-sm sm:text-base text-[#f8c51c]">
                    NCEMCH at Georgetown University · 6-month embedded partnership
                  </h3>
                </div>

                {/* Bullets */}
                <ul className="mt-6 space-y-4">
                  {statPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#39918d]/30 text-[#f8c51c] mt-0.5 border border-[#39918d]/50">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="font-['Open_Sans'] text-sm leading-relaxed text-[#ffffff] text-opacity-95">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom decorative anchor matching left CTA baseline */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-['Open_Sans'] text-xs text-[#ffffff]/60 italic">
                <span>The Bradbury Group Partnership</span>
                <span className="text-[#39918d] font-semibold not-italic">6-Month Outcomes</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
