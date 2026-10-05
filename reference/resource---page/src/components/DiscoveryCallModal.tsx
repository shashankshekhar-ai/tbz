import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, Building, User, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [workforceSize, setWorkforceSize] = useState('250 - 1,000 employees');
  const [primaryInterest, setPrimaryInterest] = useState('Enterprise Learning Architecture');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0c2940]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#0c2940]"
      >
        {/* Header matching brand palette */}
        <div className="bg-[#0c2940] px-6 py-4 flex items-center justify-between border-b border-[#3f6d67]/30 text-white">
          <div>
            <span className="font-h3 text-[10px] font-bold tracking-[0.14em] uppercase text-[#39918d]">
              EXECUTIVE ENGAGEMENT
            </span>
            <h3 className="font-h3 text-lg font-bold text-white mt-0.5">
              Book a Discovery Call
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#3f6d67]/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 font-body">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-[#39918d]/15 text-[#39918d] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#39918d]/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h4 className="font-h2 text-2xl font-bold text-[#0c2940]">
                  Consultation Requested
                </h4>
                <p className="font-body text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-[#0c2940]">{fullName}</span>. An executive partner from The Bradbury Group will reach out to schedule your briefing.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-[#39918d]" />
                  <span>Expected response within 1 business day</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-[#f8c51c]" />
                  <span>30-minute structured leadership discovery session</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#0c2940] text-white text-sm font-h3 font-semibold transition-colors cursor-pointer"
                >
                  Return to Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="font-body text-xs sm:text-sm text-slate-600">
                Connect with our partners to discuss custom learning architecture, executive AI fluency, or embedded capability partnerships.
              </p>

              <div className="space-y-3 pt-1">
                <div className="space-y-1">
                  <label className="font-body text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Corporate Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-body text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>Company Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company Ltd"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-body text-xs font-medium text-slate-700">
                      Workforce Size
                    </label>
                    <select
                      value={workforceSize}
                      onChange={(e) => setWorkforceSize(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                    >
                      <option>Under 250 employees</option>
                      <option>250 - 1,000 employees</option>
                      <option>1,000 - 5,000 employees</option>
                      <option>5,000+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-body text-xs font-medium text-slate-700">
                    Primary Area of Focus
                  </label>
                  <select
                    value={primaryInterest}
                    onChange={(e) => setPrimaryInterest(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white text-[#0c2940] focus:outline-none focus:ring-2 focus:ring-[#f8c51c]"
                  >
                    <option>Learning Architecture Design</option>
                    <option>Embedded Training Partnership</option>
                    <option>Community Upskilling Workshops</option>
                    <option>Executive AI Fluency &amp; Governance</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-h3 font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#f8c51c] text-[#0c2940] font-h3 font-bold text-xs uppercase tracking-wider transition-all shadow hover:brightness-105 cursor-pointer"
                >
                  Schedule Call
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
