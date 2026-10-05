import React from 'react';
import { Compass, Bot, FileText, Calendar } from 'lucide-react';

export const Section5TwelveWeekJourney: React.FC = () => {
  const phases = [
    {
      code: '01 / WEEKS 1-4',
      title: 'You’re building confidence',
      desc: 'Psychological safety comes first. Genuine confidence, not fake expertise, plus the mental frameworks to think like an AI-savvy leader.',
      accent: '#39918d',
    },
    {
      code: '02 / WEEKS 5-8',
      title: 'You’re unlocking skills',
      desc: 'Hands-on practice. Two to three custom AI assistants built for how you actually work.',
      accent: '#3f6d67',
    },
    {
      code: '03 / WEEKS 9-12',
      title: 'You’re getting strategic',
      desc: 'Twelve weeks of practice pulled into a capstone your board can read and a decision about what your organization does next.',
      accent: '#c57b4b',
    },
  ];

  const partners = [
    {
      name: 'Mr. Miyagi (Your AI Sensei)',
      desc: 'Thinking partner for learning the basics of interacting with AI, strategic decision-making, and stress-testing your ideas before the board hears them.',
    },
    {
      name: 'Vertical (Custom Domain)',
      desc: 'Grant writing, financial analysis, data strategy. Whatever aligns with your capstone project.',
    },
    {
      name: 'Dash (Brand Content Engine)',
      desc: 'Digging into the power of clean data, knowledge bases, and their impact on AI output and credibility.',
    },
  ];

  return (
    <section className="bg-[#0c2940] text-white py-20 lg:py-24 border-b border-[#39918d]/20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-xs font-bold tracking-widest text-[#f8c51c] uppercase mb-2"
          >
            THE 12-WEEK JOURNEY
          </div>
          <div 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-xs sm:text-sm font-semibold text-[#39918d] uppercase tracking-wider mb-2"
          >
            12 weeks, one on one or cohort format
          </div>
          <h2 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-4"
          >
            Your Week 3 looks nothing like anyone else’s.
          </h2>
          <p 
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal"
          >
            Leaders are learning the strategic skills aligned with the U.S. Department of Labor’s framework for upskilling the U.S. workforce. This time, it’s on a strategic level. AI is a tool in your executive toolbelt. You’re learning AI while solving real problems in your business.
          </p>
        </div>

        {/* 3 Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {phases.map((phase, idx) => (
            <div 
              key={idx}
              className="bg-[#0c2940]/90 border border-[#39918d]/30 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#f8c51c]/40 transition-all duration-200"
            >
              <div>
                <div 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-xs font-bold tracking-wider text-[#f8c51c] uppercase mb-2"
                >
                  {phase.code}:
                </div>
                <h3 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-lg font-bold text-white mb-3"
                >
                  {phase.title}
                </h3>
                <p 
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                  className="text-sm text-slate-200 leading-relaxed font-normal"
                >
                  {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* YOUR AI THINKING PARTNERS */}
        <div className="bg-[#3f6d67]/30 border border-[#39918d]/30 rounded-2xl p-7 sm:p-9 mb-10">
          <div className="flex items-center space-x-2 mb-6">
            <Bot className="w-5 h-5 text-[#f8c51c]" />
            <h3 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-sm font-bold tracking-widest text-[#f8c51c] uppercase"
            >
              YOUR AI THINKING PARTNERS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, idx) => (
              <div key={idx} className="bg-[#0c2940]/80 border border-[#39918d]/30 rounded-xl p-5">
                <p 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-sm sm:text-base font-bold text-white mb-2"
                >
                  {partner.name}
                </p>
                <p 
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                  className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal"
                >
                  {partner.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Organizational Blueprint + Investment & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Organizational Blueprint (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c2940]/90 border border-[#39918d]/30 rounded-xl p-7 flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-[#39918d]" />
              <h3 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-bold tracking-wider text-[#39918d] uppercase"
              >
                Organizational Blueprint
              </h3>
            </div>
            <p 
              style={{ fontFamily: "'Open Sans', sans-serif" }}
              className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal"
            >
              You also leave with an organizational blueprint: a phased rollout strategy, governance framework, and implementation roadmap your team can execute on.
            </p>
          </div>

          {/* Investment & Cohorts (5 cols) */}
          <div className="lg:col-span-5 bg-[#3f6d67] border border-[#39918d]/40 rounded-xl p-7 flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <Calendar className="w-4 h-4 text-[#f8c51c]" />
                <span 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-xs font-bold tracking-wider text-[#f8c51c] uppercase"
                >
                  Cohort Details
                </span>
              </div>
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-sm text-white font-medium mb-3"
              >
                <strong className="font-semibold text-white">Investment:</strong> Customized to your situation, timeline, and scope. Andy’s engagement was $4,500.
              </p>
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-sm text-white font-medium"
              >
                <strong className="font-semibold text-white">Next cohorts:</strong> Leadership cohorts will run quarterly beginning in 2027
              </p>
            </div>
            <div className="border-t border-white/20 pt-3">
              <p 
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                className="text-xs text-white/90 italic"
              >
                Applications close 30 days before start.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
