import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Calendar, ShieldCheck } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  initialPhase?: number;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/75 backdrop-blur-xs"
    >
      <div
        className="relative w-full max-w-lg bg-[#0c2940] text-white rounded-2xl border border-[#39918d]/40 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#081d2e] p-6 border-b border-[#39918d]/30 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3f6d67] text-white text-xs font-bold font-h3 uppercase mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#f8c51c]" />
              <span>Upcoming Cohort Intake</span>
            </div>
            <h3 id="application-modal-title" className="font-h1 text-xl sm:text-2xl font-bold text-white">
              Apply for AI Cohort
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Reserve your seat for the next live cohort.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close application dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="p-6 rounded-xl bg-[#3f6d67]/30 border border-[#39918d] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#f8c51c] text-[#0c2940] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-h1 text-xl font-bold text-white">Application Received</h4>
              <p className="text-xs sm:text-sm text-slate-200 font-body leading-relaxed">
                Thank you, <strong>{name}</strong>! We have reserved your preliminary spot. Our admissions team has sent the syllabus and onboarding diagnostic link to <strong>{email}</strong>.
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#39918d] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#327e7b] cursor-pointer"
                >
                  Return to Playbook
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="app-name" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                  Full Name
                </label>
                <input
                  id="app-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Aurilis Sanchez"
                  className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                />
              </div>

              {/* Email & Org */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="app-email" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                    Work Email
                  </label>
                  <input
                    id="app-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                  />
                </div>
                <div>
                  <label htmlFor="app-org" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                    Organization / Title
                  </label>
                  <input
                    id="app-org"
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Company or Agency"
                    className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                  />
                </div>
              </div>

              {/* Target Use Case */}
              <div>
                <label htmlFor="app-usecase" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                  Target Bottleneck You Want to Solve (Optional)
                </label>
                <textarea
                  id="app-usecase"
                  rows={2}
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  placeholder="e.g., DAX formula troubleshooting, multi-week approval cycles..."
                  className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                />
              </div>

              {/* Trust Callout */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-caption">
                <ShieldCheck className="w-4 h-4 text-[#39918d] shrink-0" />
                <span>Small cohorts (capped at 20 participants) to ensure live personalized feedback.</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
