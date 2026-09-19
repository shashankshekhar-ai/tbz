'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NAVIGATION_DATA, NavCategory, SectionId } from './navigationData';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { useContact } from './ContactProvider';
import { useApproach } from './ApproachProvider';

// Where each section id physically lives, since Navigation was built for a
// single scrolling page and this site now spans multiple routes.
const SECTION_ROUTES: Record<string, string> = {
  hero: '/',
  'for-you': '/for-you',
  'ai-literacy': '/for-you',
  'ai-fluency': '/for-you',
  'tax-reimbursement': '/for-you',
  'manager-letter': '/for-you',
  story: '/about',
  advisory: '/about',
  partners: '/about',
  testimonials: '/about',
  team: '/about',
  'leaders-page': '/leaders',
  'solomon-interview': '/leaders',
  'solomon-engine': '/leaders',
  funding: '/leaders',
  'learning-architecture': '/organisation',
  'proof-ncemch': '/organisation',
  'community-workshops': '/organisation',
  'resources-hub': '/resources',
  'resource-card-manager-letter': '/resources',
  'resource-card-core4-worksheet': '/resources',
  'resource-card-trips-scorecard': '/resources',
  'resource-card-case-studies': '/resources',
  'resource-card-glossary': '/resources',
  'section-practitioners': '/roi',
  'section-leaders': '/roi',
};

// Ids that represent a whole destination page rather than an anchor on it —
// no matching DOM id exists there, so navigating should skip the hash.
const PAGE_ONLY_SECTIONS = new Set(['leaders-page', 'resources-hub', 'for-you']);

// Which nav category owns which route, for highlighting the active item —
// this is a real multi-page site now, not a single scrolling page.
const CATEGORY_ROUTES: Record<string, string> = {
  home: '/',
  about: '/about',
  'for-you': '/for-you',
  'for-leaders': '/leaders',
  'for-organizations': '/organisation',
  resources: '/resources',
  contact: '/contact',
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openContact } = useContact();
  const { openApproach } = useApproach();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: SectionId) => {
    const route = SECTION_ROUTES[sectionId] ?? '/';
    const isPageOnly = sectionId === 'hero' || PAGE_ONLY_SECTIONS.has(sectionId);

    if (pathname === route) {
      if (isPageOnly) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 108;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }

    router.push(isPageOnly ? route : `${route}#${sectionId}`);
  };

  const handleCategoryClick = (category: NavCategory) => {
    setActiveDropdownId(null);
    const route = CATEGORY_ROUTES[category.id];
    if (route) {
      router.push(route);
    }
  };

  const isCategoryActive = (categoryId: string) => {
    const route = CATEGORY_ROUTES[categoryId];
    if (!route) return false;
    if (route === '/') return pathname === '/';
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-[96px] sm:h-[102px] lg:h-[108px] flex items-center ${
          isScrolled
            ? 'bg-[#0c2940]/95 backdrop-blur-md border-b border-[#3f6d67]/30 shadow-lg shadow-black/25'
            : 'bg-[#0c2940] border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-4 lg:gap-8 h-full">
          {/* Logo & Brand Area */}
          <Link
            href="/"
            onClick={() => setActiveDropdownId(null)}
            className="group text-left flex items-center gap-3 sm:gap-4 focus:outline-none shrink-0"
            aria-label="The Bradbury Group Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://thebradburygroup.com/wp-content/uploads/2026/06/White-Monochrome-Text-2.png"
              alt="The Bradbury Group"
              className="h-12 sm:h-14 w-auto object-contain group-hover:opacity-80 transition-opacity shrink-0"
            />
          </Link>

          {/* Centered Primary Desktop Navigation Bar */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center justify-center gap-1 xl:gap-1.5 2xl:gap-3.5 flex-1 min-w-0 px-2"
          >
            {NAVIGATION_DATA.filter((category) => !category.isOptional).map((category) => {
              const isOpen = activeDropdownId === category.id;
              const isActive = isCategoryActive(category.id);
              const alignment =
                category.id === 'resources'
                  ? 'right'
                  : category.id === 'our-roi'
                  ? 'center'
                  : 'left';

              return (
                <div
                  key={category.id}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => {
                    if (category.hasDropdown) setActiveDropdownId(category.id);
                  }}
                  onMouseLeave={() => {
                    if (category.hasDropdown) setActiveDropdownId(null);
                  }}
                >
                  <button
                    onClick={() => handleCategoryClick(category)}
                    aria-expanded={category.hasDropdown ? isOpen : undefined}
                    aria-controls={category.hasDropdown ? `mega-menu-${category.id}` : undefined}
                    className={`font-h2 text-xs xl:text-sm 2xl:text-base font-semibold tracking-tight py-2 px-1.5 xl:px-2 transition-all duration-200 flex items-center gap-1 xl:gap-1.5 whitespace-nowrap focus:outline-none relative ${
                      isOpen || isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{category.label}</span>
                    {category.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="navActiveLine"
                        className="absolute -bottom-1.5 left-2 right-2 h-[3px] rounded-full bg-[#f8c51c]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {category.hasDropdown && (
                    <MegaMenu
                      category={category}
                      isOpen={isOpen}
                      onClose={() => setActiveDropdownId(null)}
                      onNavigate={handleNavigate}
                      onOpenContact={openContact}
                      onOpenApproach={openApproach}
                      alignment={alignment}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Primary CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={openContact}
              className="group hidden sm:flex bg-[#f8c51c] hover:bg-[#e0b018] text-[#0c2940] font-h2 text-sm sm:text-base xl:text-sm 2xl:text-base font-semibold h-12 sm:h-14 px-4 sm:px-5 xl:px-4 2xl:px-6 rounded-lg transition-all duration-200 items-center gap-2.5 xl:gap-1.5 2xl:gap-2.5 shadow-sm hover:shadow-md active:scale-95 shrink-0 whitespace-nowrap"
            >
              <span className="xl:hidden 2xl:inline">Book a Discovery Call</span>
              <span className="hidden xl:inline 2xl:hidden">Book a Call</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 xl:w-4 xl:h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white h-11 w-11 sm:h-12 sm:w-12 rounded-lg transition-colors focus:outline-none shrink-0"
              aria-label="Open Navigation Directory"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        onOpenContact={openContact}
        onOpenApproach={openApproach}
      />
    </>
  );
};
