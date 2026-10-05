import React from 'react';
import { Quote } from 'lucide-react';

export const Section2Proof: React.FC = () => {
  const tableData = [
    { label: 'Annualized value', value: '$62,224' },
    { label: 'ROI per dollar', value: '$13.83' },
    { label: 'Weekly hours reclaimed', value: '14 hours' },
    { label: 'Annual hours reclaimed', value: '728 hours' },
    { label: 'Presentation script', value: '10 hours reclaimed' },
    { label: 'Stewardship report', value: '20 hours reclaimed' },
    { label: 'Team members freed', value: '7 people' },
  ];

  return (
    <section id="proof" className="bg-[#ffffff] text-[#0c2940] py-20 lg:py-24 border-b border-[#39918d]/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest text-[#39918d] uppercase mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            THE PROOF (Andy Ivey)
          </div>
          <h2 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0c2940] tracking-tight leading-tight mb-3"
          >
            $62,224 in projected annual value. On a $4,500 investment.
          </h2>
          <p 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-base sm:text-lg font-medium text-[#3f6d67]"
          >
            Andy’s first six weeks, by the numbers:
          </p>
        </div>

        {/* Grid: Table + Key Breakdown Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Table Container (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#39918d]/30 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0c2940] text-white border-b border-[#39918d]/30">
                    <th 
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className="py-3.5 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase"
                    >
                      Data Point
                    </th>
                    <th 
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className="py-3.5 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase text-right"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#39918d]/15">
                  {tableData.map((row, idx) => (
                    <tr 
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#39918d]/5'}
                    >
                      <td 
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                        className="py-3.5 px-6 text-sm sm:text-base text-[#0c2940] font-medium"
                      >
                        {row.label}
                      </td>
                      <td 
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="py-3.5 px-6 text-sm sm:text-base font-bold text-[#3f6d67] text-right tabular-nums"
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Breakdown Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Card 1: How the $62,224 breaks down */}
            <div className="bg-[#3f6d67] text-white rounded-xl p-6 border border-[#39918d]/40 shadow-md">
              <h3 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-bold tracking-wider uppercase text-[#f8c51c] mb-2"
              >
                How the $62,224 breaks down
              </h3>
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-base sm:text-lg font-semibold text-white leading-snug"
              >
                $20,000 cost avoidance + $42,224 exec capacity at $58/hr
              </p>
            </div>

            {/* Card 2: Investment */}
            <div className="bg-[#0c2940] text-white rounded-xl p-6 border border-[#39918d]/30 shadow-md">
              <h3 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-bold tracking-wider uppercase text-[#f8c51c] mb-2"
              >
                Investment
              </h3>
              <p 
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
              >
                $4,500
              </p>
            </div>

            {/* Card 3: Custom AI assistants built */}
            <div className="bg-[#c57b4b] text-white rounded-xl p-6 border border-white/20 shadow-md">
              <h3 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-bold tracking-wider uppercase text-white/90 mb-2"
              >
                Custom AI assistants built
              </h3>
              <p 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-base sm:text-lg font-semibold text-white leading-snug"
              >
                Three (Mr. Miyagi, Vertical, Dash)
              </p>
            </div>

          </div>
        </div>

        {/* 3 Callout Cards / Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1: PROJECTED ANNUAL RETURN */}
          <div className="bg-[#0c2940] text-white rounded-xl p-6 border border-[#39918d]/30 flex flex-col justify-between">
            <div>
              <div 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-bold tracking-wider uppercase text-[#f8c51c] mb-3"
              >
                PROJECTED ANNUAL RETURN
              </div>
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal"
              >
                $13.83 returned for every dollar invested. Outperforming Microsoft-IDC 2025 Global AI Research benchmarks. Validated against TBG Cohort Pilot outcomes.
              </p>
            </div>
          </div>

          {/* Box 2: AND HE ISN'T THE ONLY ONE */}
          <div className="bg-[#39918d] text-white rounded-xl p-6 border border-white/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-xs font-bold tracking-wider uppercase text-white"
                >
                  AND HE ISN’T THE ONLY ONE
                </span>
                <Quote className="w-4 h-4 text-white/70" />
              </div>
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-sm sm:text-base text-white italic leading-relaxed mb-4 font-normal"
              >
                “Structured AI assistants moved me from ‘doer’ to ‘approver.’ Executive bandwidth is now for strategy, not coordination.”
              </p>
            </div>
            <p 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-xs text-white/90 font-medium border-t border-white/20 pt-3"
            >
              Executive Director, National Center for Education in Maternal and Child Health
            </p>
          </div>

          {/* Box 3: ACROSS SECTORS */}
          <div className="bg-[#3f6d67] text-white rounded-xl p-6 border border-[#39918d]/40 flex flex-col justify-between">
            <div>
              <div 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-bold tracking-wider uppercase text-[#f8c51c] mb-3"
              >
                ACROSS SECTORS
              </div>
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal"
              >
                Federal agencies. Municipalities. Nonprofits. Private-sector teams. The industries change, the framework adapts, and the results stay consistent.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
