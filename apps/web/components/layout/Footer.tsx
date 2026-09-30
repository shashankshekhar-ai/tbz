'use client';

import React from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about#story' },
  { label: 'For You', href: '/for-you' },
  { label: 'For Leaders', href: '/leaders' },
  { label: 'For Organizations', href: '/organisation' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c2940] text-white border-t border-[#39918d]/20">
      <div className="max-w-[1680px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* =====================================================
            TOP ROW — LOGO + NAVIGATION
        ====================================================== */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-start
            lg:items-center
            justify-between
            gap-10
            pt-14
            pb-12
          "
        >

          {/* Logo */}
          <Link
            href="/"
            aria-label="The Bradbury Group Home"
            className="shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://thebradburygroup.com/wp-content/uploads/2026/06/White-Monochrome-Text-2.png"
              alt="The Bradbury Group: Partners in Learning & Growth"
              className="
                w-auto
                h-[76px]
                sm:h-[82px]
                object-contain
                object-left
              "
            />
          </Link>

          {/* Navigation + Address */}
          <div
            className="
              w-full
              lg:w-auto
              lg:ml-auto
              flex
              flex-col
              items-start
              lg:items-end
            "
          >

            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <ul
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-start
                  lg:justify-end
                  gap-x-7
                  gap-y-4
                  text-[15px]
                  sm:text-base
                  font-medium
                  text-white
                "
              >
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        inline-block
                        whitespace-nowrap
                        transition-colors
                        duration-200
                        hover:text-[#f8c51c]
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Address — single line, right aligned underneath navigation */}
            <address
              className="
                not-italic
                mt-5
                text-sm
                sm:text-[15px]
                leading-6
                font-body
                text-slate-400
                text-left
                lg:text-right
                whitespace-nowrap
              "
            >
              267 LANGLEY DR, UNIT #4480, LAWRENCEVILLE, GA 30046, USA
            </address>

          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}
        <div className="w-full border-t border-[#3f6d67]/30" />

        {/* =====================================================
            BOTTOM ROW — COPYRIGHT + EMAIL + SOCIAL
        ====================================================== */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-6
            py-8
          "
        >

          {/* Copyright */}
          <p
            className="
              text-sm
              sm:text-base
              font-body
              text-slate-400
            "
          >
            © 2026 The Bradbury Group. All rights reserved.
          </p>

          {/* Email + Social */}
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-start
              md:justify-end
              gap-x-6
              gap-y-3
              text-sm
            "
          >

            {/* Company Email */}
            <a
              href="mailto:tbgtraining@thebradburygroup.net"
              className="
                font-body
                text-slate-400
                hover:text-[#f8c51c]
                transition-colors
                whitespace-nowrap
              "
            >
              tbgtraining@thebradburygroup.net
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/paigebradbury/home/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Bradbury Group on LinkedIn"
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-lg
                border
                border-[#3f6d67]/50
                bg-[#082033]
                text-slate-200
                text-sm
                font-medium
                hover:border-[#39918d]
                hover:bg-[#3f6d67]/30
                transition-all
                duration-200
                whitespace-nowrap
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#39918d]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>

              <span>LinkedIn</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@TheBradburyGroup1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Bradbury Group on YouTube"
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-lg
                border
                border-[#3f6d67]/50
                bg-[#082033]
                text-slate-200
                text-sm
                font-medium
                hover:border-[#c57b4b]
                hover:bg-[#3f6d67]/30
                transition-all
                duration-200
                whitespace-nowrap
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#c57b4b]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>

              <span>YouTube</span>
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;