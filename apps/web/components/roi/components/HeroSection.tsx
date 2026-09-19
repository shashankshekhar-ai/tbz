'use client';

import React from 'react';
import { AGGREGATE_METRICS } from '../data';
import { TrendingUp, Zap, Gauge, ShieldCheck, CheckCircle2, Shield } from 'lucide-react';

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
      id="hero-section"
      className="relative overflow-hidden min-h-[85vh] flex flex-col justify-center bg-gradient-to-b from-[#0c2940] via-[#0f3452] to-[#0c2940] text-white pt-[calc(108px+3vh)] pb-[3vh] border-b border-[#39918d]/20"
      aria-labelledby="hero-title"
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
        {/* Brand Eyebrow Flag */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div
            id="brand-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#3f6d67]/40 border border-[#39918d]/50 text-white text-xs font-semibold uppercase tracking-wider font-h3"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#f8c51c] animate-pulse" />
            OUR AI RETURN
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/80 font-caption">
            <Shield className="w-3.5 h-3.5 text-[#39918d]" />
            Validated Cohort &amp; Organizational Benchmark Data
          </span>
        </div>

        {/* H1: Inter */}
        <h1
          id="hero-title" className="t-h1 text-white mb-4"
        >
          The Math Behind the Methodology
        </h1>

        {/* Subheadline: Montserrat */}
        <p
          id="hero-subheadline"
          className="font-h2 text-base sm:text-lg font-normal text-slate-200 max-w-3xl leading-relaxed mb-6"
        >
          Every number on this page comes from a real engagement with a real person or organization.
          We track outcomes the way we teach them:{' '}
          <strong className="font-semibold text-[#f8c51c]">structured, measured, and documented.</strong>
        </p>

        {/* Aggregate Stat Strip */}
        <div id="aggregate-stat-strip" className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#39918d] font-h3">
              Aggregate Stat Strip
            </span>
            <span className="text-xs text-slate-300 font-caption">
              Direct participant &amp; institutional records
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {AGGREGATE_METRICS.map((stat) => (
              <div
                key={stat.id}
                id={`stat-card-${stat.id}`}
                className="bg-[#0c2940]/90 border border-[#39918d]/30 rounded-xl p-4 shadow-sm hover:border-[#39918d]/70 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="p-2 rounded-lg bg-[#3f6d67]/30 border border-[#39918d]/30">
                      {getIcon(stat.icon)}
                    </span>
                    <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300 font-h3">
                      Verified
                    </span>
                  </div>

                  <div className="font-h1 text-3xl font-extrabold text-white tracking-tight mb-1 group-hover:text-[#f8c51c] transition-colors">
                    {stat.value}
                  </div>

                  <p className="font-body text-sm font-medium text-slate-200 leading-snug">
                    {stat.metric}
                  </p>
                </div>

                {stat.subtext && (
                  <div className="mt-4 pt-3 border-t border-white/10 font-caption text-xs text-slate-300">
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
          className="flex items-start gap-3.5 p-3 rounded-lg bg-[#3f6d67]/25 border border-[#39918d]/35 text-slate-200"
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
