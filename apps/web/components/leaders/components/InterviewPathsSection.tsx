'use client';

import React, { useState } from 'react';
import { Bot, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export const InterviewPathsSection: React.FC = () => {
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="solomon-interview" className="py-16 md:py-24 bg-[#f7f9fa] border-b border-[#3f6d67]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="w-full text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>02 / START HERE</span>
          </div>

          <div className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#c57b4b]">
            Beta programme
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            Try the AI Interview
          </h2>

          <p className="font-opensans text-base sm:text-lg md:text-xl text-[#0c2940]/85 leading-relaxed font-medium max-w-3xl mx-auto">
            Thirty minutes, one real strategic challenge, and you&apos;ll know whether this resonates.
          </p>

          <p className="font-opensans text-sm sm:text-base text-[#0c2940]/75 leading-relaxed max-w-2xl mx-auto">
            We&apos;re in active beta. You&apos;re not just learning about AI, you&apos;re testing the tool we built for executive thinking.
          </p>
        </div>

        {/* Two Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
          
          {/* Path 1: Interview first */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#3f6d67] shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#3f6d67]" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#39918d]/10 border border-[#39918d]/30 flex items-center justify-center text-[#39918d] shadow-sm group-hover:scale-105 transition-transform">
                  <Bot className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#39918d] text-[#ffffff] font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm whitespace-nowrap">
                  PATH 01 / 30 MINUTES
                </span>
              </div>

              {/* Title & Subheading */}
              <h3 className="t-h3 text-[#0c2940] mb-3">
                A conversation with the Solomon assistant
              </h3>
              <p className="font-opensans text-sm sm:text-base text-[#0c2940]/80 leading-relaxed mb-6 bg-[#f7f9fa] p-4 rounded-xl border border-slate-200 font-medium">
                Bring one real strategic challenge you&apos;re facing right now.
              </p>

              {/* Numbered list */}
              <div className="space-y-3 mb-6">
                <ol className="space-y-3 font-opensans text-sm text-[#0c2940]/85 list-none">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#39918d]/15 text-[#39918d] font-montserrat font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Ask the AI questions about your challenge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#39918d]/15 text-[#39918d] font-montserrat font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>See how it thinks through your problem</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#39918d]/15 text-[#39918d] font-montserrat font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Experience a sophisticated thinking partner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#39918d]/15 text-[#39918d] font-montserrat font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Decide whether this kind of partnership resonates</span>
                  </li>
                </ol>
              </div>

              {/* Closing body */}
              <div className="p-4 rounded-xl bg-[#39918d]/5 border border-[#39918d]/20 mb-8">
                <p className="font-opensans text-xs sm:text-sm text-[#0c2940]/80 leading-relaxed">
                  It also helps me understand how you think, so I can design your custom journey around the problems you actually have.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                id="try-interview-card-btn"
                onClick={() => {
                  setSubmitted(false);
                  setShowBetaModal(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#f8c51c] hover:bg-[#e5b310] text-[#0c2940] font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
              >
                <span>START THE INTERVIEW</span>
                <ArrowRight className="w-4 h-4 text-[#0c2940]" />
              </button>
            </div>

          </div>

          {/* Path 2: Enroll Directly */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#c57b4b] shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#c57b4b]" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#c57b4b]/10 border border-[#c57b4b]/30 flex items-center justify-center text-[#c57b4b] shadow-sm group-hover:scale-105 transition-transform">
                  <Rocket className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#c57b4b] text-[#ffffff] font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm">
                  PATH 02 / READY NOW
                </span>
              </div>

              {/* Title & Subheading */}
              <h3 className="t-h3 text-[#0c2940] mb-3">
                Skip the preview and begin
              </h3>
              <p className="font-opensans text-sm sm:text-base text-[#0c2940]/80 leading-relaxed mb-6 bg-[#f7f9fa] p-4 rounded-xl border border-slate-200">
                Already confident? Enroll now. You&apos;ll still get the interview experience during your first week, then move directly into the 12-week journey.
              </p>

              {/* Timeline list */}
              <div className="space-y-3 mb-6">
                <div className="font-montserrat font-bold text-xs text-[#c57b4b] uppercase tracking-wider mb-2">
                  Curriculum Timeline
                </div>
                <ul className="space-y-2.5 font-opensans text-xs sm:text-sm text-[#0c2940]/85">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                    <span><strong className="font-semibold text-[#0c2940]">Week 1:</strong> Interview and calibration</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                    <span><strong className="font-semibold text-[#0c2940]">Weeks 1 to 4:</strong> Foundation, psychology, frameworks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                    <span><strong className="font-semibold text-[#0c2940]">Weeks 5 to 8:</strong> Building your custom AI assistants</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                    <span><strong className="font-semibold text-[#0c2940]">Weeks 9 to 12:</strong> Strategy synthesis and organizational blueprint</span>
                  </li>
                </ul>
              </div>

              {/* Closing body */}
              <div className="p-4 rounded-xl bg-[#c57b4b]/5 border border-[#c57b4b]/20 mb-8">
                <p className="font-opensans text-xs sm:text-sm text-[#0c2940]/80 leading-relaxed">
                  Cohorts stay small because this work requires real attention, not a lecture hall.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                id="enroll-now-card-btn"
                onClick={() => {
                  setSubmitted(false);
                  setShowEnrollModal(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#f8c51c] hover:bg-[#e5b310] text-[#0c2940] font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
              >
                <span>ENROLL NOW</span>
                <ArrowRight className="w-4 h-4 text-[#0c2940]" />
              </button>
            </div>

          </div>

        </div>

        {/* Closing line under the path selector */}
        <div className="bg-[#ffffff] rounded-2xl border border-[#3f6d67]/30 p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-sm">
          <p className="font-opensans text-sm sm:text-base md:text-lg text-[#0c2940]/85 leading-relaxed">
            Some leaders need to try first. Others are ready to commit immediately. This approach honors how you prefer to make decisions.
          </p>
        </div>

      </div>

      {/* Interactive Modal for Beta Interview / Direct Enrollment */}
      {(showBetaModal || showEnrollModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-300 relative">
            <button
              onClick={() => {
                setShowBetaModal(false);
                setShowEnrollModal(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-xl p-1"
              aria-label="Close"
            >
              &times;
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#39918d]/15 text-[#39918d] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-[#0c2940]">
                  {showBetaModal ? 'Interview Request Received' : 'Enrollment Application Received'}
                </h3>
                <p className="font-opensans text-sm text-[#0c2940]/80">
                  Thank you! We have sent confirmation to <strong className="text-[#0c2940]">{submittedEmail || 'your email'}</strong> with next steps and scheduling links.
                </p>
                <button
                  onClick={() => {
                    setShowBetaModal(false);
                    setShowEnrollModal(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-[#0c2940] text-white font-montserrat font-bold text-xs uppercase"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#39918d]">
                    {showBetaModal ? '30-Minute Executive Beta' : 'Priority Executive Enrollment'}
                  </span>
                  <h3 className="font-montserrat font-bold text-xl text-[#0c2940]">
                    {showBetaModal ? 'Request Your AI Interview' : 'Direct Journey Enrollment'}
                  </h3>
                  <p className="font-opensans text-xs text-[#0c2940]/70 leading-relaxed">
                    {showBetaModal
                      ? 'Enter your details to receive the calendar invite for your 30-minute beta interview with the custom AI assistant.'
                      : 'Lock in your seat for the upcoming 12-week Solomon Engine executive coaching cohort.'}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block font-montserrat text-xs font-semibold text-[#0c2940] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#39918d]"
                    />
                  </div>
                  <div>
                    <label className="block font-montserrat text-xs font-semibold text-[#0c2940] mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={submittedEmail}
                      onChange={(e) => setSubmittedEmail(e.target.value)}
                      placeholder="e.g., sarah@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#39918d]"
                    />
                  </div>
                  <div>
                    <label className="block font-montserrat text-xs font-semibold text-[#0c2940] mb-1">
                      Organization &amp; Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Chief Operating Officer"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#39918d]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 rounded-xl bg-[#f8c51c] hover:bg-[#e5b310] text-[#0c2940] font-montserrat font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
                >
                  {showBetaModal ? 'CONFIRM INTERVIEW REQUEST' : 'SUBMIT DIRECT ENROLLMENT'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
