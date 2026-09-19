'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { X, ChevronDown, ArrowRight, MessageSquare } from 'lucide-react';
import { NAVIGATION_DATA, NavCategory, NavItemChild, SectionId } from './navigationData';

// Mirrors Header.tsx's CATEGORY_ROUTES for the desktop nav — every category
// here (dropdown or not) has its own page, so tapping the label always
// navigates there; the chevron is a separate tap target that only expands
// the submenu, matching how the desktop nav's click-vs-hover split works.
const CATEGORY_ROUTES: Record<string, string> = {
  home: '/',
  about: '/about',
  'for-you': '/for-you',
  'for-leaders': '/leaders',
  'for-organizations': '/organisation',
  'our-roi': '/roi',
  resources: '/resources',
  contact: '/contact',
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: SectionId) => void;
  onOpenContact: () => void;
  onOpenApproach: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenContact,
  onOpenApproach,
}) => {
  const router = useRouter();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  const handleChildClick = (item: NavItemChild) => {
    onClose();
    if (item.actionType === 'navigate' && item.targetSection) {
      onNavigate(item.targetSection);
    } else if (item.actionType === 'contact') {
      onOpenContact();
    } else if (item.actionType === 'approach') {
      onOpenApproach();
    }
  };

  const handleCategoryNavigate = (category: NavCategory) => {
    const route = CATEGORY_ROUTES[category.id];
    if (route) {
      onClose();
      router.push(route);
    } else if (category.hasDropdown) {
      // No page of its own — the label can only expand the submenu.
      toggleCategory(category.id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-white text-slate-900 flex flex-col overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-[#0c2940] rounded-lg px-2.5 py-2 shrink-0 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://thebradburygroup.com/wp-content/uploads/2026/06/White-Monochrome-Text-2.png"
                  alt="The Bradbury Group"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-[#0c2940] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-[#0c2940]" />
            </button>
          </div>

          {/* Accordion Navigation Body */}
          <div className="flex-1 px-6 py-6 space-y-2 overflow-y-auto">
            {NAVIGATION_DATA.filter((category) => !category.isOptional).map((category) => {
              const isExpanded = expandedCategoryId === category.id;

              return (
                <div key={category.id} className="border-b border-slate-100 pb-2">
                  <div className="w-full min-h-[48px] flex items-center justify-between rounded-lg hover:bg-slate-50 transition-colors">
                    <button
                      onClick={() => handleCategoryNavigate(category)}
                      className="flex-1 min-h-[48px] text-left py-3 px-2 focus:outline-none"
                    >
                      <span className={`font-h2 text-lg font-bold uppercase tracking-wider ${isExpanded ? 'text-[#39918d]' : 'text-slate-900'}`}>
                        {category.label}
                      </span>
                    </button>

                    {category.hasDropdown && (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.label} submenu`}
                        className="shrink-0 min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none"
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-[#39918d]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Accordion Dropdown Content */}
                  <AnimatePresence>
                    {category.hasDropdown && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-3 pr-1 py-2 space-y-2.5 bg-slate-50 rounded-lg my-1 border-l-2 border-[#0c2940]"
                      >
                        {category.id === 'for-you' ? (
                          <div className="px-2 pt-1 pb-2 border-b border-slate-200/80 mb-1">
                            <span className="font-caption text-xs font-bold uppercase tracking-wider text-[#39918d] block">
                              FOR YOU
                            </span>
                            <p className="font-body text-xs sm:text-[13px] text-slate-600 font-normal">
                              Individual capability, learning phases & sponsorship
                            </p>
                          </div>
                        ) : category.microcopy ? (
                          <p className="font-caption text-xs sm:text-[13px] text-slate-600 italic px-2 pt-1 pb-2">
                            &quot;{category.microcopy}&quot;
                          </p>
                        ) : null}

                        {category.children?.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleChildClick(child)}
                            className="w-full min-h-[40px] text-left px-2.5 py-2 rounded-md hover:bg-slate-100 flex items-center gap-2 transition-colors"
                          >
                            <span className="font-h2 text-sm font-bold text-[#0c2940]">
                              {child.label}
                            </span>
                            {child.badge && (
                              <span className="font-caption text-[10px] px-1.5 py-0.5 rounded bg-[#39918d]/10 text-[#39918d] border border-[#39918d]/30 font-semibold">
                                {child.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions & Conversion CTA */}
          <div className="p-6 border-t border-slate-200 space-y-3 bg-white shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full min-h-[48px] bg-[#f8c51c] hover:bg-[#e0b018] text-[#0c2940] font-h2 text-sm font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full min-h-[44px] border border-slate-300 hover:border-[#0c2940] text-slate-800 font-h2 text-xs uppercase font-bold tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#39918d]" />
              <span>Contact Us Directly</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
