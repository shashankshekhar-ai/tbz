'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Quote } from 'lucide-react';

interface CommunityProps {
  onOpenConsultation: (scope?: string) => void;
}

export const Community: React.FC<CommunityProps> = ({ onOpenConsultation }) => {
  return (
    <section
      id="community"
      className="scroll-mt-24 bg-gradient-to-b from-[#ffffff] via-[#f0f7f6] to-[#ffffff] py-16 sm:py-24 border-b border-[#39918d]/15 text-[#0c2940] relative"
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-[0.25em] text-[#39918d]">
            COMMUNITY
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-tight text-[#0c2940] sm:text-3xl">
            Start With Curiosity
          </h2>
          <p className="mt-4 font-[family-name:var(--font-montserrat)] text-base leading-relaxed text-[#0c2940]/85">
            Free 30-minute consultation, community of practice, and custom workshops for organizations
            of every size.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => onOpenConsultation('Community & Workshops')}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide bg-[#f8c51c] text-[#0c2940] transition-all duration-200 hover:bg-[#0c2940] hover:text-[#ffffff] hover:shadow-lg hover:shadow-[#f8c51c]/35 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
          >
            <span>Explore community & workshops</span>
            <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Quote Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 border-l-4 border-[#c57b4b] pl-6 py-4 rounded-r-2xl bg-gradient-to-r from-[#c57b4b]/10 via-[#f0f7f6]/80 to-transparent"
        >
          <div className="flex items-start gap-3">
            <Quote size={20} className="text-[#c57b4b] shrink-0 mt-0.5" />
            <p className="font-[family-name:var(--font-opensans)] italic text-base leading-relaxed text-[#0c2940]/90">
              “Free learning is how the best partnerships begin. People show up curious, bring real questions, and the relationship evolves from there.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
