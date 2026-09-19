'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Users,
  Building2,
  ArrowRight,
} from 'lucide-react';

export const StrategicEngagement: React.FC = () => {
  return (
    <section
      id="tailored-engagement"
      className="home-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white"
    >
      {/* Section Heading */}
      <div className="home-section-head">
        <h2 className="t-h2 text-[#0c2940]">
          Already Know What You Need? Explore Directly.
        </h2>
      </div>

      {/* 3 Grid Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CARD 1 — BUILD YOUR OWN AI FLUENCY */}
        <div
          id="Build Your Own AI Fluency"
          className="bg-[#3f6d67] rounded-2xl p-8 border border-[#3f6d67] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
        >
          <div>
            <div className="flex items-center justify-end mb-6">
              <div className="p-2 bg-white/10 text-white rounded-full border border-white/30">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>

            <h3 className="home-h3 font-h2 text-white mb-3">
              Build Your Own AI Fluency
            </h3>

            <p className="home-body font-body text-white leading-relaxed mb-8">
              A structured program for individual professionals — practical
              skills, real frameworks, built for sustainable professional
              leverage.
            </p>
          </div>

          <div className="pt-6 border-t border-white/30 flex justify-end">
            <Link
              href="/for-you"
              className="home-cta font-semibold text-white inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 transition-all"
            >
              <span>Explore AI Fluency Cohort</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>

        {/* CARD 2 — STRATEGIC PARTNER FOR EXECUTIVES */}
        <div
          id="for-leaders"
          className="bg-[#39918d] rounded-2xl p-8 border border-[#39918d] shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative group"
        >
          <div>
            <div className="flex items-center justify-end mb-6">
              <div className="p-2 bg-white/10 text-white rounded-full border border-white/30">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>

            <h3 className="home-h3 font-h2 text-white mb-3">
              A Strategic Partner for Executives
            </h3>

            <p className="home-body font-body text-white leading-relaxed mb-8">
              A private, one-on-one engagement for leaders who need to build an
              AI strategy they can execute with confidence.
            </p>
          </div>

          <div className="pt-6 border-t border-white/30 flex justify-end">
            <Link
              href="/leaders"
              className="home-cta font-semibold text-white inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 transition-all"
            >
              <span>Learn About The Solomon Engine</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>

        {/* CARD 3 — ORGANIZATIONS */}
        <div
          id="for-organizations"
          className="bg-[#c57b4b] rounded-2xl p-8 border border-[#c57b4b] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
        >
          <div>
            <div className="flex items-center justify-end mb-6">
              <div className="p-2 bg-white/10 text-white rounded-full border border-white/30">
                <Building2 className="w-5 h-5 text-white" />
              </div>
            </div>

            <h3 className="home-h3 font-h2 text-white mb-3">
              Bring AI Fluency to Your Team
            </h3>

            <p className="home-body font-body text-white leading-relaxed mb-8">
              Training, learning architecture, and community workshops built
              for organizations who want to roll out AI at scale.
            </p>
          </div>

          <div className="pt-6 border-t border-white/30 flex justify-end">
            <Link
              href="/organisation"
              className="home-cta font-semibold text-white inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 transition-all"
            >
              <span>Explore Organizational Partnerships</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};