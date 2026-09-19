'use client';

import React from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'For Organizations', href: '/organisation' },
  { label: 'Resources', href: '/resources' },
  { label: 'Case Studies', href: '/resources#resource-card-case-studies' },
  { label: 'About Paige', href: '/about#story' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c2940] text-white border-t border-[#39918d]/20">
      <div className="max-w-[1680px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 py-12 lg:py-16 border-b border-white/10">
          <Link href="/" aria-label="The Bradbury Group Home" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://thebradburygroup.com/wp-content/uploads/2026/06/White-Monochrome-Text-2.png"
              alt="The Bradbury Group: Partners in Learning & Growth"
              className="h-24 sm:h-28 w-auto object-contain"
            />
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-3 font-h2 text-base text-white">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[#f8c51c] transition-colors">
                {link.label}
              </Link>
            ))}

          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8 text-sm font-body text-slate-400">
          <p>© 2026 The Bradbury Group. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="mailto:tbgtraining@thebradburygroup.net" className="hover:text-[#f8c51c] transition-colors">
              tbgtraining@thebradburygroup.net
            </a>
            <a href="mailto:paige@thebradburygroup.com" className="hover:text-[#f8c51c] transition-colors">
              paige@thebradburygroup.com
            </a>
            <a
              href="https://linkedin.com/in/paigebradbury"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/[0.03] text-sm font-h2 font-medium text-white hover:border-[#39918d] hover:bg-white/[0.06] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#39918d]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
