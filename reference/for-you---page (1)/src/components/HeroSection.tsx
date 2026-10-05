import React from 'react';
import { AGGREGATE_METRICS } from '../data';
import { TrendingUp, Zap, Gauge, ShieldCheck, CheckCircle2, Shield, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#c57b4b]" aria-hidden="true" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#f8c51c]" aria-hidden="true" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-[#39918d]" aria-hidden="true" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#3f6d67]" aria-hidden="true" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#39918d]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="methodology-math"
      className="relative overflow-hidden bg-gradient-to-b from-[#0c2940] via-[#0f3452] to-[#0c2940] text-white py-16 sm:py-20 lg:py-24 border-b border-[#39918d]/25"
      aria-labelledby="math-methodology-title"
    >
      {/* Subtle geometric grid backdrop accent */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#39918d 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3f6d67]/40 border border-[#39918d]/40 text-[#f8c51c] text-xs font-bold uppercase tracking-wider font-h3">
            <span>03</span>
            <span>/</span>
            <span>OUTCOMES &amp; ROI</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-caption">
            <Shield className="w-3.5 h-3.5 text-[#39918d]" />
            Validated Cohort &amp; Organizational Benchmark Data
          </span>
        </div>

        {/* H1 Headline strictly in ONE SINGLE LINE as required by user */}
        <div className="w-full overflow-hidden mb-5">
          <h2
            id="math-methodology-title"
            className="font-h1 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-extrabold tracking-tight text-white whitespace-nowrap leading-tight text-left truncate"
            title="The Math Behind the Methodology"
          >
            The Math Behind the Methodology
          </h2>
        </div>

        {/* Subheadline: Montserrat */}
        <p
          id="hero-subheadline"
          className="font-h2 text-base sm:text-lg md:text-xl font-normal text-slate-200 max-w-3xl leading-relaxed mb-10"
        >
          Every number on this page comes from a real engagement with a real person or organization.
          We track outcomes the way we teach them:{' '}
          <strong className="font-semibold text-[#f8c51c]">structured, measured, and documented.</strong>
        </p>

        {/* Aggregate Stat Strip */}
        <div id="aggregate-stat-strip" className="mb-8 w-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#39918d] font-h3">
              Aggregate Stat Strip
            </span>
            <span className="text-xs text-slate-300 font-caption">
              Direct participant &amp; institutional records
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            {AGGREGATE_METRICS.map((stat) => (
              <div
                key={stat.id}
                id={`stat-card-${stat.id}`}
                className="bg-[#0c2940]/90 border border-[#39918d]/30 rounded-xl p-5 sm:p-6 shadow-sm hover:border-[#39918d]/70 transition-colors flex flex-col justify-between group min-w-0 w-full overflow-hidden"
              >
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="p-2 rounded-lg bg-[#3f6d67]/30 border border-[#39918d]/30 shrink-0">
                      {getIcon(stat.icon)}
                    </span>
                    <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300 font-h3 shrink-0">
                      Verified
                    </span>
                  </div>

                  <div className="font-h1 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 group-hover:text-[#f8c51c] transition-colors truncate">
                    {stat.value}
                  </div>

                  <p className="font-body text-xs sm:text-sm font-medium text-slate-200 leading-snug line-clamp-2">
                    {stat.metric}
                  </p>
                </div>

                {stat.subtext && (
                  <div className="mt-4 pt-3 border-t border-white/10 font-caption text-xs text-slate-300 truncate">
                    {stat.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Validation Footnote Banner */}
        <div
          id="hero-validation-note"
          className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-[#3f6d67]/25 border border-[#39918d]/35 text-slate-200 min-w-0 w-full"
        >
          <CheckCircle2 className="w-5 h-5 text-[#f8c51c] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="font-caption text-xs sm:text-sm text-slate-200 leading-relaxed">
            These figures are validated from our AI Fluency Cohorts, Solomon Engine engagements, and
            embedded organizational partnerships. Updated as new engagements close.
          </p>
        </div>
      </div>
    </section>
  );
};
