import React, { useState } from 'react';
import { BradburyLogo } from './BradburyLogo';
import { ArrowRight, Menu, X, BookOpen } from 'lucide-react';

interface HeaderProps {
  onBookDiscovery: () => void;
  onFilterSelect?: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookDiscovery, onFilterSelect }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Playbook',
      isGoldActive: true,
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    },
    {
      label: 'Leadership Case',
      action: () => {
        if (onFilterSelect) onFilterSelect('Leadership');
        setMobileMenuOpen(false);
      }
    },
    {
      label: 'TRIPS Scorecard',
      action: () => {
        if (onFilterSelect) onFilterSelect('Strategy');
        setMobileMenuOpen(false);
      }
    },
    {
      label: 'Workforce Readiness',
      action: () => {
        if (onFilterSelect) onFilterSelect('Readiness');
        setMobileMenuOpen(false);
      }
    },
    {
      label: 'Case Studies',
      action: () => {
        if (onFilterSelect) onFilterSelect('Evidence');
        setMobileMenuOpen(false);
      }
    },
    {
      label: 'Tax Credits',
      action: () => {
        if (onFilterSelect) onFilterSelect('Funding');
        setMobileMenuOpen(false);
      }
    },
    {
      label: 'AI Glossary',
      action: () => {
        if (onFilterSelect) onFilterSelect('Glossary');
        setMobileMenuOpen(false);
      }
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c2940] border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Zone: Single text element wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center text-left focus:outline-none rounded-md py-1 cursor-pointer"
          aria-label="The Bradbury Group"
        >
          <BradburyLogo />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-5 lg:space-x-6">
          {navItems.map((item, idx) => {
            const isHighlight = item.isGoldActive;
            return (
              <button
                key={idx}
                onClick={item.action}
                className={`text-[13px] tracking-normal transition-colors duration-150 cursor-pointer font-h3 ${
                  isHighlight
                    ? 'text-[#f8c51c] font-semibold'
                    : 'text-white/85 hover:text-white font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={onBookDiscovery}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f8c51c] hover:bg-[#f8c51c]/90 active:scale-98 text-[#0c2940] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(248,197,28,0.4)] group cursor-pointer font-h3"
          >
            <span>Book a Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className="p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c2940] border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          <div className="flex flex-col space-y-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`w-full text-left px-4 py-2.5 rounded-md text-xs font-h3 ${
                  item.isGoldActive
                    ? 'text-[#f8c51c] font-semibold bg-white/5'
                    : 'text-white/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                onBookDiscovery();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#f8c51c] text-[#0c2940] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(248,197,28,0.35)] font-h3 cursor-pointer"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
