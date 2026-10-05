'use client';

import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

interface Section7WalterTrackProps {
  onOrganizationsClick?: () => void;
}

export const Section7WalterTrack: React.FC<Section7WalterTrackProps> = ({
  onOrganizationsClick,
}) => {
  return (
    <section className="bg-[#0c2940] text-white py-14 lg:py-16 border-b border-[#39918d]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="w-full bg-[#3f6d67]/30 border border-[#39918d]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="w-4 h-4 text-[#f8c51c]" />
              <span 
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                className="text-xs font-bold tracking-widest text-[#f8c51c] uppercase"
              >
                WALTER TRACK
              </span>
            </div>
            <p 
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              className="text-base sm:text-lg font-medium text-white leading-relaxed"
            >
              Rolling AI out across departments instead? <span className="text-[#f8c51c] font-semibold">For Organizations</span> is the page you want.
            </p>
          </div>

          <button
            onClick={onOrganizationsClick}
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            className="self-start sm:self-center shrink-0 px-5 py-2.5 bg-[#39918d] hover:bg-[#3f6d67] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-lg border border-[#39918d]/50 transition-all duration-200 flex items-center space-x-2"
          >
            <span>FOR ORGANIZATIONS</span>
            <ArrowRight className="w-4 h-4 text-[#f8c51c]" />
          </button>
        </div>
      </div>
    </section>
  );
};
