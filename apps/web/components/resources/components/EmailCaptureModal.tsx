'use client';

import React, { useState, useEffect, useRef } from 'react';
import { submitResourceDownload } from '@/lib/api';
import { ResourceItem, UserLead } from '../types';
import { triggerResourceDownload } from '../utils/fileDownloader';

interface EmailCaptureModalProps {
  resource: ResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessUnlock: (resourceId: string, lead: UserLead) => void;
  onOpenViewer: (resource: ResourceItem) => void;
}

export const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({
  resource,
  isOpen,
  onClose,
  onSuccessUnlock,
  onOpenViewer,
}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeNurturePillar, setActiveNurturePillar] = useState<'Desire' | 'Ability' | 'Context'>('Desire');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError('');
      // Autofocus email input for convenience
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, resource]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const isHold = resource.status === 'content-hold';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Strict email check
    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setError('Please enter a valid work email address to receive this framework.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const lead: UserLead = {
        email: emailTrimmed,
        fullName: fullName.trim() || undefined,
        organization: organization.trim() || undefined,
        resourceId: resource.id,
        timestamp: new Date().toISOString(),
        nurtureSequence: activeNurturePillar,
      };

      // Save to localStorage leads
      try {
        const existingLeads = JSON.parse(localStorage.getItem('playbook_leads') || '[]');
        existingLeads.push(lead);
        localStorage.setItem('playbook_leads', JSON.stringify(existingLeads));
      } catch (err) {
        console.error('Failed saving lead locally', err);
      }

      void submitResourceDownload({
        email: emailTrimmed,
        resource_slug: resource.id,
        resource_title: resource.cardHeadline,
        first_name: fullName.trim() || undefined,
        company: organization.trim() || undefined,
      });

      onSuccessUnlock(resource.id, lead);
      setIsSubmitting(false);
      setIsSuccess(true);

      // If available, trigger download
      if (!isHold) {
        triggerResourceDownload(resource);
      }
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0c2940]/70 backdrop-blur-sm transition-opacity"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close button (min 44x44px touch target) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-[#0c2940]"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSuccess ? (
          <div>
            {/* Header & Badges */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-h3 text-xs font-semibold px-2.5 py-1 rounded bg-[#0c2940] text-[#f8c51c]">
                {resource.badgeLabel}
              </span>
              <span className="font-body text-xs font-medium text-[#3f6d67]">
                {resource.category}
              </span>
            </div>

            <h3
              id="modal-headline"
              className="font-h3 text-xl sm:text-2xl font-bold text-[#0c2940] leading-tight mb-2"
            >
              {isHold ? 'Notify Me When Core4 Ships' : `Download: ${resource.cardHeadline}`}
            </h3>

            <p className="font-body text-sm text-slate-600 mb-5 leading-relaxed">
              {isHold
                ? "This framework is on editorial hold. Provide your email to be the first to receive Paige's complete Core4 readiness worksheet the minute it is published."
                : "Enter your work email to immediately download this framework and join our executive practitioner network."}
            </p>

            {/* Capture Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="capture-email" className="block font-h3 text-xs font-semibold text-[#0c2940] mb-1.5">
                  Work Email Address <span className="text-rose-600" aria-hidden="true">*</span>
                </label>
                <input
                  ref={emailInputRef}
                  id="capture-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 font-body text-sm text-[#0c2940] focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-all"
                  aria-required="true"
                  aria-invalid={!!error}
                />
                {error && (
                  <p className="font-body text-xs text-rose-600 mt-1.5 flex items-center gap-1" role="alert">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="capture-name" className="block font-h3 text-xs font-medium text-[#0c2940] mb-1.5">
                    Your Name <span className="font-caption text-slate-500">(optional)</span>
                  </label>
                  <input
                    id="capture-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Jordan Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 font-body text-sm text-[#0c2940] focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="capture-org" className="block font-h3 text-xs font-medium text-[#0c2940] mb-1.5">
                    Organization <span className="font-caption text-slate-500">(optional)</span>
                  </label>
                  <input
                    id="capture-org"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company or Agency"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 font-body text-sm text-[#0c2940] focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] transition-all"
                  />
                </div>
              </div>

              {/* Engagement Assurance Note */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs font-caption text-slate-600">
                "After you download, you'll hear from us with more resources like this. Useful frameworks, not sales pressure."
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] px-6 py-3.5 rounded-lg bg-[#0c2940] hover:bg-[#123959] text-white font-h3 font-semibold text-sm sm:text-base tracking-wide transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#0c2940] disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin text-[#f8c51c]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Access...</span>
                  </>
                ) : isHold ? (
                  <>
                    <svg className="w-5 h-5 text-[#f8c51c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span>Register for Notification</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-[#f8c51c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Unlock & [{resource.ctaText}]</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#39918d]/15 text-[#39918d] flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#39918d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-h2 text-2xl font-bold text-[#0c2940] mb-2">
              {isHold ? 'You Are Registered!' : 'Your Framework is Ready!'}
            </h3>

            <p className="font-body text-sm text-slate-600 mb-6 leading-relaxed max-w-sm mx-auto">
              {isHold
                ? `We have queued ${email} to receive Paige's definition and the Core4 Framework Worksheet the moment it is released.`
                : `We have initiated the download for "${resource.cardHeadline}" and sent backup access to ${email}.`}
            </p>

            {/* Post-Download line verification */}
            <div className="p-4 bg-[#0c2940]/5 rounded-xl border border-[#0c2940]/10 text-left mb-6">
              <p className="font-h3 text-xs font-bold text-[#0c2940] uppercase tracking-wider mb-1">
                Our Engagement Commitment
              </p>
              <p className="font-caption text-xs sm:text-sm text-slate-700">
                "After you download, you'll hear from us with more resources like this. Useful frameworks, not sales pressure."
              </p>

            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {!isHold && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenViewer(resource);
                    }}
                    className="min-h-[48px] flex-1 px-5 py-3 rounded-lg bg-[#0c2940] hover:bg-[#123959] text-white font-h3 font-semibold text-sm transition-all shadow flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#0c2940]"
                  >
                    <svg className="w-4 h-4 text-[#f8c51c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Read Full Document Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerResourceDownload(resource)}
                    className="min-h-[48px] px-4 py-3 rounded-lg border border-[#3f6d67] text-[#3f6d67] hover:bg-[#3f6d67]/10 font-h3 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#3f6d67]"
                  >
                    <svg className="w-4 h-4 text-[#39918d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download File (.txt/.pdf)</span>
                  </button>
                </>
              )}

              {isHold && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full min-h-[48px] px-6 py-3 rounded-lg bg-[#0c2940] text-white font-h3 font-semibold text-sm transition-all"
                >
                  Close & Continue Browsing
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
