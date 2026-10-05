import React, { useState } from 'react';
import { X, Play, Clock, CheckCircle2, Award, Terminal, Zap, ShieldCheck } from 'lucide-react';

interface AurilisStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AurilisStoryModal: React.FC<AurilisStoryModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'assistant' | 'metrics'>('walkthrough');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aurilis-story-title"
    >
      <div className="relative w-full max-w-3xl bg-[#0c2940] text-white rounded-2xl border border-[#39918d]/40 shadow-2xl overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#39918d]/30 bg-[#081d2e]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f8c51c] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#39918d] font-h3">
              Cohort Case Study · 0:30 Spotlight
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Simulation Visual Area */}
        <div className="relative bg-gradient-to-br from-[#0c2940] via-[#103858] to-[#0c2940] p-6 sm:p-8 border-b border-[#39918d]/25">
          <div className="relative rounded-xl overflow-hidden border border-[#39918d]/40 bg-[#05131f] aspect-video max-h-[300px] flex flex-col items-center justify-center text-center p-6 group">
            {/* Background geometric grid */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#39918d 1px, transparent 1px), radial-gradient(#f8c51c 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            />

            {!isPlaying ? (
              <div className="relative z-10 flex flex-col items-center max-w-md">
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 cursor-pointer mb-3"
                  aria-label="Play Aurilis's 0:30 Story Video"
                >
                  <Play className="w-7 h-7 fill-[#0c2940] ml-1" />
                </button>
                <div className="text-xs font-semibold text-[#f8c51c] uppercase tracking-wider mb-1">
                  Watch Aurilis’s Story · 0:30 Video
                </div>
                <h4 className="font-h1 text-lg sm:text-xl font-bold text-white leading-tight">
                  Troubleshooting PowerBI: 5+ hours → &lt;2 minutes
                </h4>
                <p className="text-xs text-slate-300 mt-2 font-caption">
                  Click to start simulated audio walkthrough &amp; live DAX assistant diagnosis
                </p>
              </div>
            ) : (
              <div className="relative z-10 w-full h-full flex flex-col justify-between text-left p-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-[#f8c51c] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    LIVE RUNTIME AUDIT
                  </span>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Reset Video
                  </button>
                </div>
                <div className="bg-black/60 backdrop-blur-md rounded-lg p-3 border border-[#39918d]/40 font-mono text-xs text-emerald-400 space-y-1 overflow-y-auto max-h-[160px]">
                  <p className="text-slate-400">// AURILIS SANCHEZ — LIVE DAX BOT DIAGNOSTIC</p>
                  <p className="text-white">&gt; Input: CALCULATE(SUM(Sales[Revenue]), FILTER(...))</p>
                  <p className="text-amber-300">&gt; Scanning syntax nodes across 14 table dimensions...</p>
                  <p className="text-emerald-400">&gt; [DIAGNOSIS 48s]: Missing context transition wrapper at Line 2.</p>
                  <p className="text-cyan-300">&gt; [FIX DEPLOYED]: PowerBI visual rendered in 51 seconds total.</p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>0:30 / 0:30 Elapsed</span>
                  <span className="text-[#39918d] font-bold">100% Confirmed Result</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Header */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-[#39918d] font-bold uppercase tracking-wider font-h3">
                Instructional Designer / L&amp;D
              </div>
              <h3 id="aurilis-story-title" className="text-xl sm:text-2xl font-bold text-white font-h1 mt-0.5">
                AURILIS SANCHEZ
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-[#3f6d67]/30 border border-[#39918d]/40 text-[#f8c51c] font-bold text-xs sm:text-sm font-h1">
              98% Time Reduction (5+ hrs → &lt;2 min)
            </div>
          </div>
        </div>

        {/* Tabbed Interactive Body */}
        <div className="p-6 bg-[#0c2940]">
          <div className="flex gap-2 border-b border-[#39918d]/30 pb-3 mb-5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('walkthrough')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'walkthrough'
                  ? 'bg-[#39918d] text-white'
                  : 'text-slate-300 hover:text-white bg-white/5'
              }`}
            >
              The Full Story
            </button>
            <button
              onClick={() => setActiveTab('assistant')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'assistant'
                  ? 'bg-[#39918d] text-white'
                  : 'text-slate-300 hover:text-white bg-white/5'
              }`}
            >
              The AI Assistant She Built
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-[#39918d] text-white'
                  : 'text-slate-300 hover:text-white bg-white/5'
              }`}
            >
              Documented Metrics
            </button>
          </div>

          {activeTab === 'walkthrough' && (
            <div className="space-y-4 text-sm text-slate-200 leading-relaxed font-body">
              <p>
                Aurilis had to debug PowerBI formulas she didn't fully understand. Five-plus hours of
                work. Multiple failed attempts. She felt blocked and dependent on external technical
                teams who had backlogs spanning weeks.
              </p>
              <p>
                In Week 4 of the AI Fluency Cohort, she applied our structured prompt framework to build
                a custom PowerBI assistant in less than two hours. The assistant diagnosed the calculation
                error in under a minute.
              </p>
              <div className="p-3.5 rounded-xl bg-[#3f6d67]/20 border border-[#39918d]/30 flex items-start gap-3">
                <Award className="w-5 h-5 text-[#f8c51c] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#f8c51c]">
                    The Skill Gained:
                  </div>
                  <div className="text-xs text-slate-200 mt-0.5">
                    A repeatable framework for AI assistant creation she now applies to other bottlenecks
                    across instructional design, curriculum authoring, and analytics.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assistant' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-slate-300 space-y-2">
                <div className="text-[#f8c51c] font-bold">// PowerBI Diagnostic Assistant Specification</div>
                <p><strong>Trigger:</strong> Paste error code + current DAX formula</p>
                <p><strong>Evaluation Steps:</strong></p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                  <li>Context filter transition evaluation</li>
                  <li>Relationship topology verification</li>
                  <li>Single-line syntactical fix output</li>
                  <li>Zero hallucinated extra columns</li>
                </ol>
                <p className="text-emerald-400"><strong>Result:</strong> 45–55 seconds confirmed live fix time.</p>
              </div>
              <p className="text-xs text-slate-300 font-caption">
                Built with $0 additional software licenses using employer-approved enterprise LLM access.
              </p>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400">Time reduction</div>
                <div className="text-base font-bold text-[#f8c51c] font-h1 mt-1">
                  98% (5+ hrs → &lt;2 min)
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400">Build time for solution</div>
                <div className="text-base font-bold text-white font-h1 mt-1">&lt;2 hours</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400">Resolution speed</div>
                <div className="text-base font-bold text-[#39918d] font-h1 mt-1">45–55 sec/fix</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400">New tools purchased</div>
                <div className="text-base font-bold text-white font-h1 mt-1">$0</div>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#39918d]/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-caption">
              <ShieldCheck className="w-4 h-4 text-[#39918d]" />
              Audited in live cohort session
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#39918d] hover:bg-[#327e7b] text-white text-xs font-semibold cursor-pointer"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
