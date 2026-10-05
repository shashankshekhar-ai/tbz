import React, { useState } from 'react';
import { Star, Menu, X, ArrowUpRight } from 'lucide-react';

interface TopNavProps {
  onOpenBooking: () => void;
  onOpenAurilis: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenBooking, onOpenAurilis }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c2940]/95 backdrop-blur-md border-b border-[#39918d]/25 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Single text element / Brand lockup */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#081d2e] border border-[#f8c51c]/40 flex items-center justify-center text-[#f8c51c] shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4 fill-[#f8c51c]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-h1 font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-1.5">
                The Bradbury Group
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#39918d] font-semibold">
                AI Playbook &amp; ROI
              </span>
            </div>
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-200">
            <button
              onClick={() => scrollTo('hero')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Playbook
            </button>
            <button
              onClick={() => scrollTo('business-case')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Business Case
            </button>
            <button
              onClick={() => scrollTo('decision-framework')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Two Phases
            </button>
            <button
              onClick={() => scrollTo('miyagi-lab')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Miyagi Lab
            </button>
            <button
              onClick={() => scrollTo('methodology-math')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Our ROI
            </button>
            <button
              onClick={() => scrollTo('section-practitioners')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Evidence
            </button>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenAurilis}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-[#f8c51c] bg-[#3f6d67]/30 border border-[#f8c51c]/40 hover:bg-[#3f6d67]/50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Watch Story (0:30)
            </button>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#39918d] hover:bg-[#327e7b] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              Book Discovery Call
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-[#39918d]"
            >
              Book Call
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#081d2e] border-b border-[#39918d]/30 px-4 pt-3 pb-5 space-y-3">
          <button
            onClick={() => scrollTo('hero')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            Playbook
          </button>
          <button
            onClick={() => scrollTo('business-case')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            01 / Business Case
          </button>
          <button
            onClick={() => scrollTo('decision-framework')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            02 / Decision Framework (Two Phases)
          </button>
          <button
            onClick={() => scrollTo('miyagi-lab')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            Miyagi Practice Lab
          </button>
          <button
            onClick={() => scrollTo('methodology-math')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            The Math Behind the Methodology
          </button>
          <button
            onClick={() => scrollTo('section-practitioners')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            Practitioner &amp; Executive Case Studies
          </button>
          <button
            onClick={() => scrollTo('section-sectors')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            Cross-Sector Breadth
          </button>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAurilis();
              }}
              className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-bold text-[#f8c51c] bg-[#3f6d67]/30 border border-[#f8c51c]/40"
            >
              Watch Aurilis’s Story (0:30)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-[#39918d]"
            >
              Book Discovery Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
