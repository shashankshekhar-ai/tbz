'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { NavCategory, NavItemChild, SectionId } from './navigationData';

interface MegaMenuProps {
  category: NavCategory;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: SectionId) => void;
  onOpenContact: () => void;
  onOpenApproach: () => void;
  alignment?: 'left' | 'right' | 'center';
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  category,
  isOpen,
  onClose,
  onNavigate,
  onOpenContact,
  onOpenApproach,
  alignment = 'left',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape or Click Outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (item: NavItemChild) => {
    onClose();
    if (item.actionType === 'navigate' && item.targetSection) {
      onNavigate(item.targetSection);
    } else if (item.actionType === 'contact') {
      onOpenContact();
    } else if (item.actionType === 'approach') {
      onOpenApproach();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id={`mega-menu-${category.id}`}
          role="region"
          aria-label={`${category.label} submenu`}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`absolute top-full mt-2 z-50 w-72 sm:w-80 bg-white border border-slate-200 shadow-2xl rounded-xl p-2 sm:p-2.5 text-slate-800 ${
            alignment === 'right'
              ? 'right-0 origin-top-right'
              : alignment === 'center'
              ? 'left-1/2 -translate-x-1/2 origin-top'
              : 'left-0 origin-top-left'
          }`}
        >
          {/* Header Microcopy / Section Header */}
          {category.microcopy && (
            <div className="px-2 pt-1 pb-1.5 mb-1">
              <span className="font-caption text-[11px] font-bold uppercase tracking-wider text-[#39918d] block">
                {category.label}
              </span>
            </div>
          )}

          {/* Vertical Stack List */}
          <div className="flex flex-col gap-1">
            {category.children?.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group text-left w-full py-2 px-2.5 rounded-lg hover:bg-slate-50 transition-colors duration-150 flex items-center justify-between gap-2 focus:outline-none focus:ring-1 focus:ring-[#39918d]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-h2 text-sm font-bold text-[#0c2940] group-hover:text-[#39918d] transition-colors">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="font-caption text-[10px] px-1.5 py-0.5 rounded bg-[#39918d]/10 text-[#39918d] border border-[#39918d]/30 shrink-0 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0c2940] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

