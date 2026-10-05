import React from 'react';

export const Section04Credentials: React.FC = () => {
  return (
    <section className="bg-[#fbfdfd] text-[#0c2940] py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-h3 font-medium uppercase tracking-widest text-[#39918d] mb-2">
          CREDENTIALS
        </div>

        <h2 className="font-h2 text-2xl sm:text-4xl font-bold text-[#0c2940] tracking-tight mb-4">
          Credentials come through building the skills.
        </h2>

        <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          There’s no governing body yet to verify what makes someone AI-literate. We credential you
          through evidence-based learning and our proprietary Integrated Performance Measurement
          Framework. IPMF is our evidence-based method for turning training into a measurable
          business solution. It can be applied for professional development or across organizational
          learning.
        </p>

        <p className="font-body text-base text-slate-700 leading-relaxed mb-10">
          You’ll leave with defensible, demonstrable skills. At minimum, you’ll have one completed
          use case and business brief to present to leadership for running an AI pilot project.
        </p>

        {/* Credential Specs */}
        <div className="pt-6 border-t border-slate-200">
          <div className="text-xs font-h3 font-bold uppercase tracking-wider text-[#0c2940] mb-4">
            Credential specs:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body text-sm text-slate-700">
            <li className="flex items-start gap-2.5 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#3f6d67] font-bold text-lg leading-none shrink-0">•</span>
              <span>
                <strong>Professionally designed</strong> (LinkedIn, resume, portfolio-ready)
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#3f6d67] font-bold text-lg leading-none shrink-0">•</span>
              <span>
                <strong>Verified</strong> (unique ID, completion date)
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#3f6d67] font-bold text-lg leading-none shrink-0">•</span>
              <span>
                <strong>Meaningful</strong> (employers recognize DOL-aligned training)
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#3f6d67] font-bold text-lg leading-none shrink-0">•</span>
              <span>
                <strong>Shareable</strong> (download, frame, or email)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
