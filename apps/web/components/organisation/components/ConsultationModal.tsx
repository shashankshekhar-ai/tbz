'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2, Clock, Building2, Mail, User, ArrowRight } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScope?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialScope = 'Pilot',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('Nonprofits');
  const [scope, setScope] = useState(initialScope);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !orgName) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0c2940]/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container in Light Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl border-2 border-[#39918d]/35 bg-gradient-to-br from-[#ffffff] via-[#f0f7f6] to-[#ffffff] p-6 sm:p-8 text-[#0c2940] shadow-2xl z-10 my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#0c2940]/70 hover:text-[#0c2940] hover:bg-[#0c2940]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2 font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-[0.2em] text-[#39918d]">
                  <Clock size={14} />
                  <span>30-Minute Discovery Session</span>
                </div>
                <h3
                  id="consultation-modal-title"
                  className="font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-tight text-[#0c2940]"
                >
                  Schedule Organizational Consultation
                </h3>
                <p className="mt-2 font-[family-name:var(--font-opensans)] text-sm leading-relaxed text-[#0c2940]/80">
                  One conversation. 30 minutes. Just clarity on whether this fits your situation.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-semibold mb-1.5 text-[#0c2940]/90">
                        Your Name
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-3 text-[#0c2940]/40" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Dr. Sarah Jenkins"
                          className="w-full rounded-xl pl-10 pr-3.5 py-2.5 font-[family-name:var(--font-opensans)] text-sm bg-white border border-[#39918d]/30 text-[#0c2940] placeholder-[#0c2940]/40 focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-semibold mb-1.5 text-[#0c2940]/90">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-3 text-[#0c2940]/40" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@organization.gov / .org"
                          className="w-full rounded-xl pl-10 pr-3.5 py-2.5 font-[family-name:var(--font-opensans)] text-sm bg-white border border-[#39918d]/30 text-[#0c2940] placeholder-[#0c2940]/40 focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-semibold mb-1.5 text-[#0c2940]/90">
                        Organization Name
                      </label>
                      <div className="relative">
                        <Building2 size={15} className="absolute left-3.5 top-3 text-[#0c2940]/40" />
                        <input
                          type="text"
                          required
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="e.g. NCEMCH / Georgetown"
                          className="w-full rounded-xl pl-10 pr-3.5 py-2.5 font-[family-name:var(--font-opensans)] text-sm bg-white border border-[#39918d]/30 text-[#0c2940] placeholder-[#0c2940]/40 focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-semibold mb-1.5 text-[#0c2940]/90">
                        Organization Type
                      </label>
                      <select
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value)}
                        className="w-full rounded-xl px-3.5 py-2.5 font-[family-name:var(--font-opensans)] text-sm bg-white border border-[#39918d]/30 text-[#0c2940] focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] focus:outline-none transition-all"
                      >
                        <option value="Federal agencies">Federal agencies</option>
                        <option value="Municipalities">Municipalities</option>
                        <option value="Nonprofits">Nonprofits</option>
                        <option value="Private sector">Private sector</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-[family-name:var(--font-montserrat)] text-xs font-semibold mb-1.5 text-[#0c2940]/90">
                      Engagement Scope Interest
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Pilot', 'How It Works', 'Transform'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setScope(option)}
                          className={`py-2 px-3 rounded-lg text-xs font-[family-name:var(--font-montserrat)] font-semibold border transition-all ${
                            scope === option
                              ? 'border-[#39918d] bg-[#39918d]/15 text-[#39918d]'
                              : 'border-[#39918d]/25 bg-white text-[#0c2940]/70 hover:bg-[#39918d]/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide bg-[#f8c51c] text-[#0c2940] hover:bg-[#0c2940] hover:text-white transition-all duration-150 hover:shadow-lg hover:shadow-[#f8c51c]/35 active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                    >
                      <Calendar size={16} />
                      <span>Confirm Consultation Request</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  <p className="text-center font-[family-name:var(--font-opensans)] text-[11px] text-[#0c2940]/60">
                    Direct calendar link provided immediately upon submission · No obligation
                  </p>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 border bg-[#39918d]/15 text-[#39918d] border-[#39918d]/30">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[#0c2940]">
                  Consultation Confirmed
                </h4>
                <p className="mt-3 font-[family-name:var(--font-opensans)] text-sm max-w-sm mx-auto leading-relaxed text-[#0c2940]/80">
                  Thank you, <span className="font-semibold text-[#39918d]">{name || 'Leader'}</span>.
                  We&apos;ve reserved consultation alignment for{' '}
                  <span className="font-semibold text-[#c57b4b]">{orgName}</span> ({scope} scope).
                </p>
                <div className="mt-6 p-4 rounded-xl border border-[#39918d]/25 bg-white text-xs font-[family-name:var(--font-opensans)] text-left max-w-md mx-auto space-y-2 text-[#0c2940]/80">
                  <p>
                    <strong className="text-[#0c2940]">Next Step:</strong> Check your inbox at{' '}
                    <span className="font-semibold text-[#39918d]">{email}</span> for calendar
                    coordination and the friction mapping preparation notes.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-2.5 font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-wider shadow-md transition-colors bg-[#0c2940] text-white hover:bg-[#39918d]"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
