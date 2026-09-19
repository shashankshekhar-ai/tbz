'use client';

import React from 'react';

export const AdvisoryBoard: React.FC = () => {
  return (
    <section
      id="advisory"
      className="relative pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 px-6 sm:px-8 lg:px-12 bg-[#f8fafc] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-12 border-b border-slate-200 pb-6">
          <h2 className="t-h2 text-[#0c2940]">
            Advisory Board
          </h2>
        </div>
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
          <p className="font-body text-base text-slate-700">[Content pending from Paige]</p>
        </div>
      </div>
    </section>
  );
};
