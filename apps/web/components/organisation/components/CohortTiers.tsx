'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Building2, Users2 } from 'lucide-react';
import { CohortTierId } from '../types';

interface CohortTiersProps {
  selectedTier: CohortTierId;
  onSelectTier: (tier: CohortTierId) => void;
}

export const CohortTiers: React.FC<CohortTiersProps> = ({ selectedTier, onSelectTier }) => {
  return (
    <section id="cohort-tiers" className="py-20 md:py-28 bg-[#f8fafb] text-[#0c2940] border-b border-[#0c2940]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
             className="t-h2 text-[#0c2940] mb-4"
          >
            Choose Your Cohort Tier
          </h2>
        </div>

        {/* 2-Column Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
          
          {/* Card 1: Enterprise Tier (Crisp white elevated card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative border ${
              selectedTier === 'enterprise'
                ? 'bg-[#ffffff] text-[#0c2940] border-[#39918d] ring-2 ring-[#39918d]/40 shadow-xl'
                : 'bg-[#ffffff] text-[#0c2940] border-[#0c2940]/15 hover:border-[#39918d]/60 shadow-lg'
            }`}
          >
            <div>
              {/* Header with Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-[#39918d]/15 border border-[#39918d]/30 text-[#39918d]">
                  <Building2 className="w-6 h-6 text-[#39918d]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#39918d] bg-[#39918d]/10 px-3 py-1 rounded-full border border-[#39918d]/30">
                  Dedicated Cohort
                </span>
              </div>

              {/* Title */}
              <h3
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }} className="t-h3 text-[#0c2940] mb-3"
              >
                Enterprise Tier
              </h3>

              {/* Description */}
              <p
                style={{ fontFamily: "'Roboto', sans-serif" }}
                className="text-[#0c2940]/80 text-base mb-8 leading-relaxed"
              >
                A dedicated cohort built for your organization, facilitated by our senior team.
              </p>

              {/* Bullet Points */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Dedicated facilitator & custom curriculum
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Departmental readiness audit included
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Org-wide rollout planning
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Priority Solomon AI access
                  </span>
                </li>
              </ul>
            </div>

            {/* Price & Action */}
            <div className="pt-6 border-t border-[#0c2940]/10">
              <div className="mb-6">
                <span
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  className="text-2xl sm:text-3xl font-bold text-[#0c2940] block"
                >
                  Custom pricing
                </span>
              </div>

              <button
                id="apply-enterprise-tier-btn"
                onClick={() => onSelectTier('enterprise')}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="w-full bg-[#39918d] hover:bg-[#327e7a] text-white font-bold text-base py-4 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Apply</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Small Business Tier (Crisp white elevated card in mixed theme) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative border ${
              selectedTier === 'small-business'
                ? 'bg-[#ffffff] text-[#0c2940] border-[#f8c51c] ring-2 ring-[#f8c51c]/40 shadow-xl'
                : 'bg-[#ffffff] text-[#0c2940] border-[#0c2940]/15 hover:border-[#f8c51c]/60 shadow-lg'
            }`}
          >
            <div>
              {/* Header with Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-[#c57b4b]/15 border border-[#c57b4b]/30 text-[#c57b4b]">
                  <Users2 className="w-6 h-6 text-[#c57b4b]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c57b4b] bg-[#c57b4b]/10 px-3 py-1 rounded-full border border-[#c57b4b]/30">
                  Shared Peer Cohort
                </span>
              </div>

              {/* Title */}
              <h3
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }} className="t-h3 text-[#0c2940] mb-3"
              >
                Small Business Tier
              </h3>

              {/* Description */}
              <p
                style={{ fontFamily: "'Roboto', sans-serif" }}
                className="text-[#0c2940]/80 text-base mb-8 leading-relaxed"
              >
                Join a shared cohort of peer leaders following our standard 12-week curriculum.
              </p>

              {/* Bullet Points */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Shared cohort, standard curriculum
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Leadership upskilling sessions
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Ethics & governance framework
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#39918d]" />
                  </div>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/90">
                    Solomon AI access during application
                  </span>
                </li>
              </ul>
            </div>

            {/* Price & Action */}
            <div className="pt-6 border-t border-[#0c2940]/10">
              <div className="mb-6">
                <span
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  className="text-2xl sm:text-3xl font-bold text-[#0c2940] block"
                >
                  Starting at $2,400 / seat
                </span>
              </div>

              <button
                id="apply-small-business-tier-btn"
                onClick={() => onSelectTier('small-business')}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="w-full bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold text-base py-4 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Apply</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#0c2940]" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Footnote Caption: Pricing shown is indicative — final tier pricing is confirmed during the discovery call. */}
        <div className="mt-12 text-center">
          <p
            style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}
            className="text-sm text-[#0c2940]/70 max-w-2xl mx-auto"
          >
            Pricing shown is indicative — final tier pricing is confirmed during the discovery call.
          </p>
        </div>

      </div>
    </section>
  );
};
