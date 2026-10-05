import React from 'react';
import { Play, Shield, Clock, CheckCircle2, Award, ArrowDown, Sparkles } from 'lucide-react';

interface PlaybookHeroProps {
  onOpenAurilis: () => void;
  onExploreClick: () => void;
}

export const PlaybookHero: React.FC<PlaybookHeroProps> = ({
  onOpenAurilis,
  onExploreClick,
}) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#081d2e] via-[#0c2940] to-[#0f3452] text-white pt-14 pb-20 sm:pt-20 sm:pb-24 border-b border-[#39918d]/25"
      aria-labelledby="hero-playbook-title"
    >
      {/* Background architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#39918d 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Tagline / Eyebrow */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#3f6d67]/40 border border-[#39918d]/40 text-[#f8c51c] text-xs font-bold uppercase tracking-wider font-h3">
                <span className="w-2 h-2 rounded-full bg-[#f8c51c] animate-pulse" />
                The Bradbury Group AI Playbook
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1 font-caption">
                <Shield className="w-3.5 h-3.5 text-[#39918d]" />
                Aligned with U.S. Dept of Labor Framework
              </span>
            </div>

            {/* Headline H1 */}
            <h1
              id="hero-playbook-title"
              className="font-h1 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12]"
            >
              We rebuilt how our team learns AI.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#39918d]">
                Here’s the playbook.
              </span>
            </h1>

            {/* Subheadline Prose */}
            <p className="font-h2 text-base sm:text-lg md:text-xl font-normal text-slate-200 leading-relaxed max-w-2xl">
              Random tutorials weren’t cutting it. Smart, capable people were spending months dabbling
              with AI tools and getting nowhere because the structure, guardrails, and measurement
              weren’t there. So we redesigned the whole approach:{' '}
              <strong className="text-white font-semibold">a 12-week, evidence-based program</strong>{' '}
              aligned with the U.S. Department of Labor framework. Two phases. Real outcomes. Measurable
              ROI.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Aurilis CTA Card/Button */}
              <button
                type="button"
                onClick={onOpenAurilis}
                className="group relative flex items-center justify-between sm:justify-start gap-4 p-3.5 sm:px-5 sm:py-3.5 rounded-xl bg-[#3f6d67] hover:bg-[#345b56] border border-[#39918d] text-white shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                aria-label="Watch Aurilis's Story · 0:30 Video"
              >
                <div className="w-10 h-10 rounded-full bg-[#f8c51c] text-[#0c2940] flex items-center justify-center shrink-0 shadow-md group-hover:bg-white transition-colors">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-h1 text-sm sm:text-base font-bold text-white">
                      Watch Aurilis’s Story
                    </span>
                    <span className="text-[11px] font-bold text-[#f8c51c] px-2 py-0.5 rounded bg-black/25">
                      0:30
                    </span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    Troubleshooting PowerBI:{' '}
                    <strong className="text-[#f8c51c]">5+ hours → &lt;2 minutes</strong>
                  </div>
                </div>
              </button>

              {/* Read Framework Button */}
              <button
                type="button"
                onClick={onExploreClick}
                className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore the 12-Week Framework</span>
                <ArrowDown className="w-4 h-4 text-[#39918d]" />
              </button>
            </div>

            {/* Quick Proof Badges Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-caption">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#39918d]" />
                Two structured 6-week phases
              </span>
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#39918d]" />
                Miyagi Practice Lab included
              </span>
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#39918d]" />
                $0 new software required
              </span>
            </div>
          </div>

          {/* Right Hero Interactive Feature Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0f3452] to-[#081d2e] p-6 sm:p-7 border border-[#39918d]/40 shadow-xl space-y-5">
              {/* Highlight Ribbon */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#39918d] font-h3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f8c51c]" /> Executive Overview
                </span>
                <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  Cohort &amp; Enterprise
                </span>
              </div>

              {/* Two Phases Blueprint Preview */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#39918d]/60 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span className="font-bold text-[#f8c51c]">Phase 1: 6 Weeks</span>
                    <span className="text-[11px]">2 sessions / wk · 60m</span>
                  </div>
                  <div className="font-h3 text-sm font-bold text-white">
                    AI Literacy &amp; Foundations
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Learn to speak AI. 6 foundational modules + prompt engineering guardrails.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#39918d]/60 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span className="font-bold text-[#39918d]">Phase 2: 6 Weeks</span>
                    <span className="text-[11px]">2 sessions / wk · 60m</span>
                  </div>
                  <div className="font-h3 text-sm font-bold text-white">
                    AI Fluency &amp; Integration
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Solve a real problem. Pilot project architecture, custom bots &amp; ROI proof.
                  </p>
                </div>
              </div>

              {/* Live Impact Snippet */}
              <div
                onClick={onOpenAurilis}
                className="p-3.5 rounded-xl bg-[#3f6d67]/30 border border-[#f8c51c]/40 hover:bg-[#3f6d67]/45 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#f8c51c] flex items-center gap-1">
                    <Play className="w-3 h-3 fill-[#f8c51c]" /> Featured Alum
                  </span>
                  <span className="text-[11px] text-slate-300">Click to watch</span>
                </div>
                <div className="font-h1 text-sm font-bold text-white mt-1">
                  AURILIS SANCHEZ
                </div>
                <div className="text-xs text-slate-200 mt-0.5">
                  Built a custom AI assistant in &lt;2 hours to fix PowerBI DAX errors in seconds.
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="pt-2 text-center text-xs text-slate-300 font-caption">
                Structured · Measured · Documented · Live Cohort Training
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
