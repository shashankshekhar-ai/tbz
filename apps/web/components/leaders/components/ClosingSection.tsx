'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ClosingSectionProps {
  intent?: 'interview' | 'enroll';
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ intent: initialIntent = 'interview' }) => {
  const [activeIntent, setActiveIntent] = useState<'interview' | 'enroll'>(initialIntent);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Enter a work email so we can reach you.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const firstName = name.trim().split(' ')[0] || 'there';

  return (
    <section id="closing-signup" className="py-16 md:py-24 bg-[#ffffff] text-[#0c2940] border-b border-[#3f6d67]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Closing Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3f6d67]/30 border border-[#39918d]/40">
              <span className="w-2 h-2 rounded-full bg-[#f8c51c] animate-pulse" />
              <span className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#c57b4b]">
                Your AI journey starts here
              </span>
            </div>

            <h2 className="t-h2 text-[#0c2940]">
              See What&apos;s Possible
            </h2>

            <div className="space-y-4 font-opensans text-base sm:text-lg text-[#0c2940]/85 leading-relaxed">
              <p>
                The leaders who move first aren&apos;t the ones with the most technical background. They&apos;re the ones brave enough to admit they don&apos;t know and curious enough to learn.
              </p>

              <p className="font-semibold text-lg sm:text-xl text-[#0c2940] pt-2">
                Andy could have waited or hired someone else. He didn&apos;t. Six weeks later: terrified to transformed.
              </p>
            </div>
          </div>

          {/* Right Column: Intake Form */}
          <div id="closing-signup-form" className="lg:col-span-5">
            <div className="bg-[#f7f9fa] rounded-2xl border-2 border-[#3f6d67]/30 p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#3f6d67]" />

              {!submitted ? (
                <div>
                  {/* Intent Toggle */}
                  <div className="flex rounded-xl bg-slate-200/80 p-1 mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveIntent('interview');
                        setError('');
                      }}
                      className={`flex-1 py-2 text-xs font-montserrat font-bold uppercase tracking-wider rounded-lg transition-all ${
                        activeIntent === 'interview'
                          ? 'bg-[#ffffff] text-[#0c2940] shadow-sm'
                          : 'text-[#0c2940]/70 hover:text-[#0c2940]'
                      }`}
                    >
                      AI Interview
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveIntent('enroll');
                        setError('');
                      }}
                      className={`flex-1 py-2 text-xs font-montserrat font-bold uppercase tracking-wider rounded-lg transition-all ${
                        activeIntent === 'enroll'
                          ? 'bg-[#ffffff] text-[#0c2940] shadow-sm'
                          : 'text-[#0c2940]/70 hover:text-[#0c2940]'
                      }`}
                    >
                      Direct Enroll
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Error Message */}
                    {error && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-montserrat font-medium">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Field 1: NAME */}
                    <div>
                      <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-[#0c2940] mb-1.5">
                        NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Andy Ivey"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (error) setError('');
                        }}
                        className="w-full px-4 py-3 bg-[#ffffff] rounded-xl border border-slate-300 text-sm font-opensans text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Field 2: WORK EMAIL */}
                    <div>
                      <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-[#0c2940] mb-1.5">
                        WORK EMAIL
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        className="w-full px-4 py-3 bg-[#ffffff] rounded-xl border border-slate-300 text-sm font-opensans text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* CTA Button */}
                    <button
                      type="submit"
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#f8c51c] hover:bg-[#e5b310] text-[#0c2940] font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
                    >
                      <span>{activeIntent === 'interview' ? 'START THE INTERVIEW' : 'ENROLL NOW'}</span>
                      <ArrowRight className="w-4 h-4 text-[#0c2940]" />
                    </button>

                    {/* Support Line */}
                    <p className="font-opensans text-xs text-center text-[#0c2940]/70 pt-1">
                      {activeIntent === 'interview'
                        ? "You'll receive your interview link within one business day."
                        : "We'll send enrollment details for the next cohort within one business day."}
                    </p>
                  </form>
                </div>
              ) : (
                /* Confirmation State */
                <div className="py-6 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#39918d]/15 text-[#39918d] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="font-montserrat font-bold text-2xl text-[#0c2940]">
                    You&apos;re on the list, {firstName}.
                  </h3>

                  <div className="space-y-2 font-opensans text-sm text-[#0c2940]/85 leading-relaxed">
                    <p>
                      {activeIntent === 'interview'
                        ? "You'll receive your interview link within one business day."
                        : "We'll send enrollment details for the next cohort within one business day."}
                    </p>
                    <p className="font-medium text-[#0c2940]">
                      In the meantime, think about the one strategic challenge you&apos;d bring to the conversation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
