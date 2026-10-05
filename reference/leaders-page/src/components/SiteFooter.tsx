import React from 'react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#0c2940] text-slate-300 py-12 border-t border-[#39918d]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-base font-bold text-white tracking-wide uppercase mb-1"
            >
              The Bradbury Group
            </div>
            <p 
              style={{ fontFamily: "'Open Sans', sans-serif" }}
              className="text-xs text-slate-400 italic"
            >
              Executive AI Architecture & Strategic Leadership
            </p>
          </div>

          <div 
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            className="text-xs text-slate-400 text-center sm:text-right"
          >
            <p>© {new Date().getFullYear()} The Bradbury Group. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
