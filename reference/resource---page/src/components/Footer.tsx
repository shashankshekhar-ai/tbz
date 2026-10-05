import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c2940] border-t border-white/10 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Exact User Brief Content: "After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click." */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-body">
          <ShieldCheck className="w-4 h-4 text-[#f8c51c] shrink-0" />
          <span>
            After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.
          </span>
        </div>

        {/* Quiet Copyright */}
        <div className="text-xs text-slate-400 font-body">
          <span>© {new Date().getFullYear()} The Bradbury Group. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
