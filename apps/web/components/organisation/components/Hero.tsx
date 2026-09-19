'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';

interface HeroProps {
  onSeeHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSeeHowItWorksClick }) => {
  return (
    <section
      id="hero"
      className="relative bg-[#0c2940] text-white min-h-[85vh] flex flex-col justify-center pt-[calc(108px+3vh)] pb-[3vh] overflow-hidden border-b border-white/10"
    >
      {/* Interactive dynamic particle network background */}
      <ParticleBackground />

      {/* Ambient background glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#39918d]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#f8c51c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Eyebrow / Organizational Hook */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 mb-4 sm:mb-5"
        >
          <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs sm:text-xs font-bold uppercase tracking-widest text-[#f8c51c]">
            Organizational Hook & Learning Architecture
          </span>
        </motion.div>

        {/* H1: Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="t-h1 text-white mb-5 sm:mb-6 w-full max-w-6xl 2xl:max-w-7xl mx-auto"
        >
          Your Team Doesn't Need More AI Tools.<br className="hidden sm:inline" /> They Need a Better Way to Think With Them.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-[#f8c51c] w-full max-w-5xl 2xl:max-w-6xl mx-auto mb-5 sm:mb-6 font-medium leading-relaxed"
        >
          We redesign how work moves through your organization, so AI adoption becomes sustainable, not just shiny.
        </motion.p>

        {/* Body Copy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ fontFamily: "'Roboto', sans-serif" }}
          className="text-sm sm:text-base 2xl:text-lg text-white/90 w-full max-w-5xl 2xl:max-w-6xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light space-y-3"
        >
          <p>
            Most organizations bolt AI onto existing workflows and wonder why nothing changes.
          </p>
          <p>
            We start with the human side: how your team processes information, makes decisions, and communicates results. One organization recovered 50% of their executive's time and compressed 4-month review cycles to 30 days. Not by adding tools. By redesigning how work moves.
          </p>
          <p className="font-medium text-white">
            We call it Learning Architecture. And we build it with you.
          </p>
        </motion.div>

        {/* CTA Button: SEE HOW IT WORKS → */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <button
            id="hero-see-how-it-works-btn"
            onClick={onSeeHowItWorksClick}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="w-full sm:w-auto bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold text-sm sm:text-base px-9 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#f8c51c]/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>SEE HOW IT WORKS</span>
            <ArrowRight className="w-4 h-4 text-[#0c2940]" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
