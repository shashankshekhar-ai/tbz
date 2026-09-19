'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, MessageCircle, Shield } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'AI Learning Architecture Strategy',
    message: '',
  });

  // Handle Escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      organization: '',
      inquiryType: 'AI Learning Architecture Strategy',
      message: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-10 z-10 overflow-hidden max-h-[90vh] overflow-y-auto text-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="contact-modal-title" className="font-h1 font-bold text-xl text-[#0c2940]">
                    Start a Conversation
                  </h3>
                  <span className="font-caption text-xs text-slate-600 font-medium">
                    The Bradbury Group Advisory Inquiry
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2.5 border border-slate-200 rounded-lg hover:border-[#0c2940] text-slate-600 hover:text-[#0c2940] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                aria-label="Close conversation dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-h2 font-bold text-2xl text-[#0c2940]">Inquiry Received</h4>
                <p className="font-body text-slate-700 text-sm max-w-md mx-auto leading-relaxed font-normal">
                  Thank you for reaching out to <strong className="text-[#0c2940]">The Bradbury Group</strong>. Paige Bradbury or a senior learning architect will review your request and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl bg-[#0c2940] text-white font-h2 text-xs font-bold hover:bg-[#163a59] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="py-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-name"
                      className="font-h2 text-xs font-bold text-slate-700 uppercase tracking-wider block"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-form-name"
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0c2940] focus:ring-1 focus:ring-[#0c2940] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-email"
                      className="font-h2 text-xs font-bold text-slate-700 uppercase tracking-wider block"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-form-email"
                      required
                      type="email"
                      placeholder="jane@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0c2940] focus:ring-1 focus:ring-[#0c2940] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-organization"
                      className="font-h2 text-xs font-bold text-slate-700 uppercase tracking-wider block"
                    >
                      Organization / Company
                    </label>
                    <input
                      id="contact-form-organization"
                      type="text"
                      placeholder="Acme Corp / Enterprise Institute"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0c2940] focus:ring-1 focus:ring-[#0c2940] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-inquiry"
                      className="font-h2 text-xs font-bold text-slate-700 uppercase tracking-wider block"
                    >
                      Inquiry Focus
                    </label>
                    <select
                      id="contact-form-inquiry"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 text-sm focus:outline-none focus:border-[#0c2940] focus:ring-1 focus:ring-[#0c2940] transition-colors"
                    >
                      <option value="AI Learning Architecture Strategy">AI Learning Architecture Strategy</option>
                      <option value="Workforce Readiness Audit">Workforce Readiness Audit</option>
                      <option value="Ecosystem Partner Collaboration">Ecosystem Partner Collaboration</option>
                      <option value="Keynote Speaking & Masterclass">Keynote Speaking & Masterclass</option>
                      <option value="Advisory Board Inquiry">Advisory Board Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-form-message"
                    className="font-h2 text-xs font-bold text-slate-700 uppercase tracking-wider block"
                  >
                    Message / Strategic Context *
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    required
                    placeholder="Tell us about your learning transformation goals, current challenges, or collaboration proposal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0c2940] focus:ring-1 focus:ring-[#0c2940] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#0c2940] hover:bg-[#163a59] text-white font-h2 text-sm font-bold p-4 rounded-xl transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                >
                  <Send className="w-4 h-4 text-[#f8c51c]" />
                  <span>Submit Strategic Inquiry</span>
                </button>
              </form>
            )}

            {/* Modal Footer Info */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 font-caption font-medium">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#0f766e]" />
                <span>Confidential & Direct to Paige Bradbury</span>
              </div>
              <span>Atlanta, GA • Global Practice</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
