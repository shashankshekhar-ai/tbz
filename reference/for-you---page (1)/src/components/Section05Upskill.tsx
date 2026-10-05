import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Section05Upskill: React.FC = () => {
  return (
    <section className="bg-[#ffffff] text-[#0c2940] py-14 sm:py-20 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-h3 font-medium uppercase tracking-widest text-[#39918d] mb-2">
          HOW TO UPSKILL YOURSELF
        </div>

        <h2 className="font-h2 text-2xl sm:text-4xl font-bold text-[#0c2940] tracking-tight mb-4">
          What it costs. What you get back.
        </h2>

        <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
          Investment starts at under $1000 for a single phase. And we always offer discount codes.
          See current pricing and cohort dates on Maven.{' '}
          <a
            href="https://maven.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#39918d] hover:text-[#3f6d67] underline"
          >
            View on Maven
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </p>

        <div className="mb-6">
          <div className="text-xs font-h3 font-semibold uppercase tracking-wider text-[#3f6d67] mb-3">
            Included in each phase:
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="Included in each phase options">
            {[
              'Live cohort training',
              'Digital workbook',
              'Expert feedback',
              'Access to our Miyagi AI Assistant',
              'Certificate',
              'Lifetime recordings',
            ].map((item, idx) => (
              <div
                key={idx}
                role="tab"
                aria-selected="true"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-[#39918d]/40 shadow-xs hover:border-[#39918d] hover:bg-[#3f6d67]/10 hover:shadow-sm transition-all cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-[#f8c51c] shrink-0" />
                <span className="font-h3 text-xs sm:text-sm font-semibold text-[#0c2940]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* One liner sentence below the options without any box */}
        <p className="font-body text-sm sm:text-base text-slate-700 leading-relaxed mb-8">
          <strong className="font-h3 font-bold text-[#0c2940]">Tax credits &amp; funding offsets:</strong> You or your company may offset a majority of the cost entirely. We’ve done the research.
        </p>

        {/* 1448 x 1000 px Blank Image Container */}
        <div className="my-8 sm:my-10 w-full">
          <div
            className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 flex items-center justify-center overflow-hidden"
            style={{ aspectRatio: '1448 / 1000', minHeight: '260px' }}
            aria-label="1448 x 1000 px blank image container"
          >
            <span className="text-xs font-mono text-slate-400 select-none">1448 × 1000 px</span>
          </div>
        </div>

        {/* ROI from Recent Cohort Participants */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="font-h2 text-xl sm:text-2xl font-bold text-[#0c2940] mb-2">
            ROI from Recent Cohort Participants
          </h3>

          <p className="font-body text-xs sm:text-sm text-slate-600 mb-6 font-caption">
            Metrics captured before-and-after by tracking time against manual tasks.
          </p>

          {/* Horizontal 3-column ROI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Aurilis */}
            <div className="p-5 rounded-2xl bg-[#fbfcfd] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#3f6d67] text-base font-h3 block mb-2">
                  Aurilis:
                </span>
                <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ~98% time reduction, &lt;2 hrs to build, 45-55 sec live resolution, $0 new tools
                </p>
              </div>
            </div>

            {/* Teresa */}
            <div className="p-5 rounded-2xl bg-[#fbfcfd] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#3f6d67] text-base font-h3 block mb-2">
                  Teresa:
                </span>
                <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                  3 tools tested head-to-head, &lt;7 min best output, 10-80 hrs research eliminated per project, $0 new tools
                </p>
              </div>
            </div>

            {/* Leah */}
            <div className="p-5 rounded-2xl bg-[#fbfcfd] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#3f6d67] text-base font-h3 block mb-2">
                  Leah:
                </span>
                <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                  64% less time, 80% less labor, 75% fewer revisions (4 rounds to 1), 9.2/10 readiness score, $0 new tools
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-caption mb-4">
            Projected annualized value from pilot cohort outcomes. Individual results vary.
          </div>

          <p className="font-body text-sm text-slate-700 leading-relaxed">
            Your mileage will vary based on role and workflow, but the pattern holds: structured
            learning done in community pays for itself fast.
          </p>
        </div>
      </div>
    </section>
  );
};
