'use client';

import React from 'react';
import { POST_DOWNLOAD_LINE } from '../data/resources';

export const PostDownloadBanner: React.FC = () => {
  return (
    <section aria-labelledby="post-download-commitment-title" className="w-full mt-14 sm:mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0c2940] text-white p-8 sm:p-10 md:p-12 shadow-xl border border-[#0c2940]">
          {/* Subtle geometric background accent */}
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#39918d]/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#c57b4b]/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#f8c51c] text-xs font-h3 font-semibold mb-3.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>OUR ENGAGEMENT COMMITMENT</span>
              </div>

              {/* Exact Post-Download Line */}
              <h2
                id="post-download-commitment-title" className="t-h2 text-white"
              >
                {POST_DOWNLOAD_LINE}
              </h2>

              <p className="font-body text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                Unsubscribe anytime in 1 click.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
