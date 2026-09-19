'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutGrid, Users2, ShieldCheck, ArrowRight } from 'lucide-react';

export const OperatingPrinciples: React.FC = () => {
  return (
    <section id="principles" className="home-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="home-section-head">
        <h2 className="t-h2 text-[#0c2940]">
          How It's Different
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-8 border border-[#D9E3E8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#39918d]/10 text-[#39918d] flex items-center justify-center mb-6">
              <LayoutGrid className="w-6 h-6 text-[#39918d]" />
            </div>
            <h3 className="home-h3 font-h2 text-[#0c2940] mb-3">
             Built on structure, not screenshots.
            </h3>
            <p className="home-body font-body text-[#5d6b74] leading-relaxed mb-8">
              We explore how to think with AI, not which  buttons to click.

            </p>
          </div>

          
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-8 border border-[#D9E3E8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#c57b4b]/10 text-[#c57b4b] flex items-center justify-center mb-6">
              <Users2 className="w-6 h-6 text-[#c57b4b]" />
            </div>
            <h3 className="home-h3 font-h2 text-[#0c2940] mb-3">
            People-first.

            </h3>
            <p className="home-body font-body text-[#5d6b74] leading-relaxed mb-8">
            Every learning journey starts with how people actually learn and adopt new skills — not just the tools themselves.

            </p>
          </div>

          
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-8 border border-[#D9E3E8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#3f6d67]/10 text-[#3f6d67] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-[#3f6d67]" />
            </div>
            <h3 className="home-h3 font-h2 text-[#0c2940] mb-3">
              Proven, not promised.
            </h3>
            <p className="home-body font-body text-[#5d6b74] leading-relaxed mb-8">
              Every framework we use has been vetted and tested with real clients.
            </p>
          </div>

          <Link
            href="/roi"
            className="home-cta font-semibold text-[#3f6d67] hover:text-[#39918d] flex items-center gap-1.5 transition-colors"
          >
            <span>See our ROI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
