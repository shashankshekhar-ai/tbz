import React, { useState } from 'react';
import { Linkedin, Youtube, Star, X, Calendar, Mail, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setIsBookingOpen(false);
      setContactName('');
      setContactEmail('');
      setContactOrg('');
      setContactMessage('');
    }, 2200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#081d2e] text-slate-300 border-t border-[#39918d]/30 pt-16 pb-12 font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#0c2940] border border-[#f8c51c]/40 text-[#f8c51c] shadow-sm shrink-0">
                <Star className="w-4 h-4 fill-[#f8c51c] text-[#f8c51c]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300">THE</span>
                </div>
                <div className="flex items-baseline gap-1.5 leading-none mt-0.5">
                  <span className="font-h1 font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    Bradbury
                  </span>
                  <span className="font-h1 font-medium text-2xl sm:text-3xl text-[#39918d] tracking-tight">
                    Group
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#39918d] font-bold uppercase mt-1">
                  Partners in Learning &amp; Growth
                </p>
              </div>
            </div>

            <p className="font-h3 text-xs sm:text-sm font-bold text-[#f8c51c] tracking-wider uppercase pt-2">
              Engineering the AI-First Organization
            </p>

            <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Helping organizations adopt AI responsibly through leadership, learning architecture,
              governance, and transformation.
            </p>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#39918d] font-h3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('hero-section')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our ROI
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('practitioners-section')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Resources
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('executive-section')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Insights
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('organization-section')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#39918d] font-h3">
              Programs
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('practitioners-section')}
                  className="font-bold text-white hover:text-[#f8c51c] transition-colors cursor-pointer text-left block"
                >
                  AI Fluency Cohort
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('executive-section')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  The Solomon Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('organization-section')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  For Organizations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('closing-navigation')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#39918d] font-h3">
              Connect
            </h4>
            <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ready to accelerate your organizational AI capability? Contact our C-suite consulting
              team.
            </p>
            <div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center justify-center bg-[#2c7772] hover:bg-[#39918d] active:bg-[#25635f] text-white font-h3 font-bold text-xs uppercase px-5 py-3 rounded tracking-wider shadow-sm transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                Book Discovery Call
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8 sm:my-10" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 The Bradbury Group. All rights reserved.</p>

          {/* Social Icons matching theme colour (LinkedIn and YouTube) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg bg-[#0c2940] border border-[#39918d]/40 flex items-center justify-center text-[#39918d] hover:text-[#f8c51c] hover:border-[#39918d] hover:bg-[#0c2940]/80 transition-colors shadow-2xs"
            >
              <Linkedin className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-lg bg-[#0c2940] border border-[#39918d]/40 flex items-center justify-center text-[#39918d] hover:text-[#f8c51c] hover:border-[#39918d] hover:bg-[#0c2940]/80 transition-colors shadow-2xs"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Discovery Call Modal */}
      {isBookingOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="discovery-call-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-[#0c2940] border border-[#39918d]/50 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white">
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-lg bg-[#39918d]/30 text-[#f8c51c]">
                <Calendar className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-[#39918d] font-h3">
                C-Suite Consultation
              </span>
            </div>

            <h3 id="discovery-call-title" className="text-2xl font-bold font-h2 text-white">
              Book Discovery Call
            </h3>
            <p className="text-sm text-slate-300 mt-1 mb-6 font-body">
              Discuss your organization's AI capability, governance framework, or cohort upskilling.
            </p>

            {bookingSubmitted ? (
              <div className="p-6 rounded-xl bg-[#3f6d67]/30 border border-[#39918d] text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#f8c51c] mx-auto" />
                <h4 className="font-h3 font-bold text-lg text-white">Request Received</h4>
                <p className="text-xs text-slate-200">
                  Our executive advisory team will reach out within 1 business day to confirm your briefing session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="discovery-name" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    id="discovery-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g., Dr. Jane Smith"
                    className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="discovery-email" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                      Work Email
                    </label>
                    <input
                      id="discovery-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@organization.org"
                      className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                    />
                  </div>
                  <div>
                    <label htmlFor="discovery-org" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                      Organization
                    </label>
                    <input
                      id="discovery-org"
                      type="text"
                      required
                      value={contactOrg}
                      onChange={(e) => setContactOrg(e.target.value)}
                      placeholder="Agency / Company"
                      className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="discovery-notes" className="block text-xs font-semibold text-slate-200 uppercase mb-1">
                    Current Bottlenecks or Goals (Optional)
                  </label>
                  <textarea
                    id="discovery-notes"
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Briefly describe what your team is looking to accomplish..."
                    className="w-full bg-[#081d2e] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#39918d]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="px-4 py-2.5 text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#39918d] hover:bg-[#3f6d67] text-white font-bold text-xs uppercase px-5 py-2.5 rounded shadow-sm transition-colors cursor-pointer"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
