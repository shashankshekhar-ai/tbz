import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCtaProps {
  onGetStarted: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaProps> = ({ onGetStarted }) => {
  return (
    <section className="bg-[#0c2940] text-white py-14 sm:py-20 lg:py-24 border-b border-[#39918d]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12">
        <div className="flex-1 min-w-0">
          <h2 className="font-h1 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 sm:mb-4">
            Let’s get you into a cohort.
          </h2>

          <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 leading-relaxed">
            Tell us about your situation and we’ll connect you with the right community. Cohorts launch
            every 6-8 weeks. We keep them small on purpose.
          </p>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onGetStarted}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-xl bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-h1 font-bold text-sm sm:text-base lg:text-lg transition-transform hover:scale-[1.02] shadow-lg cursor-pointer whitespace-nowrap"
          >
            <span>Let’s get started</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
