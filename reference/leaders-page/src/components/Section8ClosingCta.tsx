import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Section8ClosingCta: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid work email.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="closing-cta" className="bg-[#ffffff] text-[#0c2940] py-20 lg:py-24 border-b border-[#39918d]/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Full-width Card matching uniform page width */}
        <div className="w-full bg-[#0c2940] text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#39918d]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Narrative Copy */}
            <div className="lg:col-span-6">
              <div 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-bold tracking-widest text-[#f8c51c] uppercase mb-3"
              >
                CLOSING CTA
              </div>

              <p 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug mb-5"
              >
                The leaders who move first aren’t the ones with the most technical background. They’re the ones brave enough to admit they don’t know and curious enough to learn.
              </p>

              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal"
              >
                Andy could have waited or hired someone else. He didn’t. Six weeks later: terrified to transformed.
              </p>
            </div>

            {/* Right Column: Form Container */}
            <div className="lg:col-span-6 bg-[#3f6d67]/30 border border-[#39918d]/40 rounded-xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-[#39918d]/20 border border-[#39918d] rounded-full flex items-center justify-center mx-auto text-[#f8c51c]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-xl font-bold text-white"
                  >
                    Enrollment Request Received
                  </h4>
                  <p 
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                    className="text-sm text-slate-200"
                  >
                    Thank you, {name}. We’ll send enrollment details for the next cohort to <strong className="text-[#f8c51c]">{email}</strong> within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="mt-4 text-xs font-semibold text-[#f8c51c] hover:underline"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-xs text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="form-name"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                      >
                        NAME
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 bg-[#0c2940] border border-[#39918d]/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#f8c51c] text-sm transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="form-email"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
                      >
                        WORK EMAIL
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@organization.org"
                        className="w-full px-4 py-3 bg-[#0c2940] border border-[#39918d]/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#f8c51c] text-sm transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="w-full py-3.5 px-6 bg-[#f8c51c] hover:bg-[#eab314] text-[#0c2940] font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'PROCESSING...' : 'ENROLL NOW'}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4 text-[#0c2940]" />}
                  </button>

                  <p 
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                    className="text-xs text-slate-300 text-center pt-1 italic"
                  >
                    Enroll: We’ll send enrollment details for the next cohort within one business day.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
