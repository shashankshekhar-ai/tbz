import React from 'react';

interface FooterProps {
  onBookCallClick: () => void;
  onNavigateTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookCallClick, onNavigateTo }) => {
  return (
    <footer className="bg-[#0c2940] text-white border-t border-white/10 pt-16 pb-12">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Left Column: Brand */}
          <div className="lg:col-span-6 space-y-4">
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

            <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-white/75 text-sm leading-relaxed max-w-md pt-2">
              We redesign how work moves through your organization, so AI adoption becomes sustainable, not just shiny.
            </p>
          </div>

          {/* Center Column: Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#f8c51c]">
              Architecture Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigateTo('learning-architecture')}
                  className="text-white/80 hover:text-[#39918d] transition-colors cursor-pointer"
                >
                  Learning Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('proof-ncemch')}
                  className="text-white/80 hover:text-[#39918d] transition-colors cursor-pointer"
                >
                  Proof: NCEMCH Partnership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('choose-your-path')}
                  className="text-white/80 hover:text-[#39918d] transition-colors cursor-pointer"
                >
                  Choose Your Path
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('community-workshops')}
                  className="text-white/80 hover:text-[#39918d] transition-colors cursor-pointer"
                >
                  Community & Workshops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('where-value-gets-lost')}
                  className="text-white/80 hover:text-[#39918d] transition-colors cursor-pointer"
                >
                  Where Value Gets Lost
                </button>
              </li>
            </ul>
          </div>

          {/* Right Column: Connect */}
          <div className="lg:col-span-3 space-y-3">
            <h4 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#f8c51c]">
              Admissions & Advisory
            </h4>
            <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-xs text-white/75 leading-relaxed">
              Ready to explore where friction lives in your organization and how work moves?
            </p>
            <div className="pt-2">
              <button
                id="footer-book-discovery-call-btn"
                onClick={onBookCallClick}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}>
            © 2026 The Bradbury Group. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}>
            Transforming how work moves through organizations.
          </p>
        </div>
      </div>
    </footer>
  );
};
