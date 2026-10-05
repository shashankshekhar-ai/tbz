import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface HeaderProps {
  onBookCallClick: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookCallClick, onNavigateTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tiers & Pricing', targetId: 'cohort-tiers' },
    { label: 'Walter Track', targetId: 'walter-track' },
    { label: 'Tuition & Reimbursement', targetId: 'reimbursement' },
    { label: 'Apply', targetId: 'application' },
  ];

  const handleLinkClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    onNavigateTo(targetId);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c2940] text-white border-b border-white/10 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Bradbury Group Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigateTo('hero')}
              className="flex items-center space-x-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-1.5">
                  <svg className="w-5 h-5 text-[#f8c51c]" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                    <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="#f8c51c" fillOpacity="0.95"/>
                    <path d="M12 22V12M12 12C9 12 7 10 7 7M12 12C15 12 17 10 17 7"/>
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#39918d]">The</span>
                </div>
                <div className="flex items-baseline space-x-1 -mt-1">
                  <span className="text-xl font-extrabold tracking-tight text-white font-serif">Bradbury</span>
                  <span className="text-sm font-semibold text-[#39918d]">Group</span>
                </div>
                <span className="text-[8.5px] uppercase tracking-widest text-[#39918d] font-semibold -mt-0.5">
                  PARTNERS IN LEARNING & GROWTH
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.targetId)}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-sm font-medium text-white/80 hover:text-[#f8c51c] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center">
            <button
              id="header-book-call-btn"
              onClick={onBookCallClick}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 flex items-center shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 ml-2 text-[#0c2940]" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-[#f8c51c] hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c2940] border-t border-white/10 px-4 pt-3 pb-6 space-y-3"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.targetId)}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-[#f8c51c] hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookCallClick();
                }}
                className="w-full bg-[#f8c51c] text-[#0c2940] font-bold text-sm py-3 rounded-full flex items-center justify-center space-x-2 shadow-md cursor-pointer"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-[#0c2940]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
