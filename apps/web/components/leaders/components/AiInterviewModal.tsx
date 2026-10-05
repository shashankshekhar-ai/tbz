'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AiInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiInterviewModal: React.FC<AiInterviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [challenge, setChallenge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setChallenge('');
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0c2940] text-white rounded-2xl border-2 border-[#39918d]/50 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#39918d]/20 border border-[#39918d] rounded-full flex items-center justify-center mx-auto text-[#f8c51c]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="text-2xl font-bold text-white"
            >
              Session Reserved
            </h3>
            <p 
              style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
              className="text-sm text-slate-200 leading-relaxed font-normal"
            >
              Thank you, {name}. Your 30-minute thinking session on <span className="text-[#f8c51c] font-medium">&ldquo;{challenge.slice(0, 45)}...&rdquo;</span> has been received. Calibration instructions have been dispatched to <strong>{email}</strong>.
            </p>
            <button
              onClick={handleReset}
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="mt-4 px-6 py-2.5 bg-[#f8c51c] text-[#0c2940] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#eab314] transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-[#f8c51c] text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              <Sparkles className="w-4 h-4" />
              <span>THE AI INTERVIEW · 30 MINUTES</span>
            </div>

            <h3 
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="text-xl font-bold text-white mb-2"
            >
              A conversation with the Solomon assistant
            </h3>

            <p 
              style={{ fontFamily: 'var(--font-opensans), sans-serif' }}
              className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed"
            >
              Bring one real strategic challenge you’re facing right now. We&apos;ll use this session to see how it thinks through your problem.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="interview-challenge"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1"
                >
                  Strategic Challenge
                </label>
                <textarea
                  id="interview-challenge"
                  required
                  rows={3}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="e.g., Scaling multi-channel donor stewardship without expanding head count..."
                  className="w-full px-3.5 py-2.5 bg-[#0c2940] border border-[#39918d]/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#f8c51c] text-sm resize-none"
                />
              </div>

              <div>
                <label 
                  htmlFor="interview-name"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  id="interview-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 bg-[#0c2940] border border-[#39918d]/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#f8c51c] text-sm"
                />
              </div>

              <div>
                <label 
                  htmlFor="interview-email"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1"
                >
                  Work Email
                </label>
                <input
                  id="interview-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@organization.org"
                  className="w-full px-3.5 py-2.5 bg-[#0c2940] border border-[#39918d]/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#f8c51c] text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                className="w-full mt-2 py-3 px-5 bg-[#f8c51c] hover:bg-[#eab314] text-[#0c2940] font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'SCHEDULING...' : 'START THE INTERVIEW'}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
