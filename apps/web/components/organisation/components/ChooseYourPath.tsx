'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Check, ArrowRight, Rocket, TrendingUp, RefreshCw } from 'lucide-react';

interface ChooseYourPathProps {
  onSelectPath: (pathName: string) => void;
}

export const ChooseYourPath: React.FC<ChooseYourPathProps> = ({ onSelectPath }) => {
  const paths = [
    {
      id: 'explore',
      name: 'EXPLORE',
      tagline: 'Start here. One conversation, zero commitment.',
      badge: 'Zero Commitment',
      badgeStyle: 'bg-[#39918d]/10 text-[#39918d] border-[#39918d]/30',
      icon: Compass,
      accentBorder: 'hover:border-[#39918d]',
      buttonBg: 'bg-[#39918d] hover:bg-[#327e7a] text-white',
      bullets: [
        'AI readiness assessment for you or your organization',
        'Strategic scoping: where AI fits and where it doesn\'t',
        'Clear recommendation on next steps',
      ],
      footerNote: 'Perfect for leaders asking "is this right for us?"',
    },
    {
      id: 'pilot',
      name: 'PILOT',
      tagline: 'Test the approach with a focused team or project.',
      badge: 'Team Proof of Concept',
      badgeStyle: 'bg-[#f8c51c]/20 text-[#0c2940] border-[#f8c51c]/50 font-bold',
      icon: Rocket,
      accentBorder: 'border-[#f8c51c] ring-2 ring-[#f8c51c]/30 shadow-xl',
      buttonBg: 'bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940]',
      bullets: [
        'Customized AI Fluency cohort for your team (role-specific, industry-specific)',
        'Small-group facilitation with 1:1 coaching touchpoints',
        'Built-in feedback loops and validation sessions',
        'AI Learning Assistant access',
        'Aligned with U.S. Department of Labor framework for workforce AI literacy',
      ],
      footerNote: 'Measurable competency growth tracked across dimensions: the same framework that compressed NCEMCH\'s review cycles by 75%.',
    },
    {
      id: 'scale',
      name: 'SCALE',
      tagline: 'Sustained strategic partnership. 6 to 12 month engagement.',
      badge: '6-12 Months',
      badgeStyle: 'bg-[#c57b4b]/15 text-[#c57b4b] border-[#c57b4b]/30',
      icon: TrendingUp,
      accentBorder: 'hover:border-[#c57b4b]',
      buttonBg: 'bg-[#0c2940] hover:bg-[#163e5e] text-white',
      bullets: [
        'Monthly strategic advisory',
        'Learning Architecture Blueprint: custom-designed for your organization',
        'Walter AI Learning Assistant access',
        'Continuous curriculum refinement as your priorities shift',
      ],
      footerNote: 'For organizations ready to embed intentionally and measure progress over time.',
    },
  ];

  return (
    <section id="choose-your-path" className="py-20 md:py-28 bg-[#f8fafb] text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center w-full mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 mb-4">
            <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#39918d]">
              Engagement Models
            </span>
          </div>

          <h2
             className="t-h2 text-[#0c2940] mb-5"
          >
            Choose Your Path
          </h2>

          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-lg sm:text-xl text-[#39918d] font-semibold mb-6 w-full"
          >
            Whether you're exploring or already scaling, there's an entry point that matches where you are right now.
          </p>

          <p
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="text-base sm:text-lg text-[#0c2940]/80 leading-relaxed w-full"
          >
            Every engagement includes strategic guidance, facilitation support, and access to our human and AI team. We walk with you through the process and measure across dimensions. The only question is scope.
          </p>
        </div>

        {/* 3 Grid Paths: Explore, Pilot, Scale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {paths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-[#ffffff] rounded-3xl p-8 sm:p-10 border border-[#0c2940]/15 shadow-lg flex flex-col justify-between transition-all duration-300 ${path.accentBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-[#0c2940]/5 border border-[#0c2940]/10 text-[#0c2940]">
                      <Icon className="w-6 h-6 text-[#0c2940]" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${path.badgeStyle}`}>
                      {path.badge}
                    </span>
                  </div>

                  <h3
                     className="t-h3 text-[#0c2940] mb-2"
                  >
                    {path.name}
                  </h3>

                  <p
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                    className="text-[#0c2940]/75 text-sm sm:text-base font-medium mb-6 leading-relaxed"
                  >
                    {path.tagline}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-3.5 mb-8">
                    {path.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-3 text-sm sm:text-base text-[#0c2940]/85">
                        <div className="w-5 h-5 rounded-full bg-[#39918d]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#39918d]" />
                        </div>
                        <span style={{ fontFamily: "'Roboto', sans-serif" }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#0c2940]/10">
                  <div className="bg-[#f8fafb] rounded-xl p-3.5 mb-6 border border-[#0c2940]/10">
                    <p
                      style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}
                      className="text-xs sm:text-sm text-[#0c2940]/80"
                    >
                      {path.footerNote}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectPath(path.name)}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className={`w-full font-bold text-base py-3.5 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center space-x-2 cursor-pointer ${path.buttonBg}`}
                  >
                    <span>Choose {path.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4th Path: TRANSFORM (Featured Full Width Card with 3 Depth Levels) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#0c2940] text-white rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f8c51c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-8 border-b border-white/10">
              <div>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#f8c51c]/20 border border-[#f8c51c]/40 mb-3">
                  <RefreshCw className="w-4 h-4 text-[#f8c51c]" />
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#f8c51c]">
                    Comprehensive Embedded Partnership
                  </span>
                </div>
                <h3
                   className="t-h3 text-white"
                >
                  TRANSFORM
                </h3>
                <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-white/80 text-base sm:text-lg mt-1">
                  Full embedded partnership at three levels of depth. Designed for organizations transforming how work moves through their teams.
                </p>
              </div>

              <button
                onClick={() => onSelectPath('TRANSFORM')}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="shrink-0 bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold text-base px-8 py-3.5 rounded-full transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Select Transform</span>
                <ArrowRight className="w-4 h-4 text-[#0c2940]" />
              </button>
            </div>

            {/* 3 Levels of Depth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Level 1: Foundation */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-lg font-bold text-white">
                      Foundation
                    </span>
                    <span className="text-xs font-bold text-[#39918d] bg-[#39918d]/20 border border-[#39918d]/40 px-2.5 py-1 rounded-full">
                      ~20 hrs/mo
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" />
                      <span>Strategic planning and roadmap development</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" />
                      <span>Custom AI assistant development</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" />
                      <span>Templatized frameworks and playbooks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" />
                      <span>2 facilitated training sessions per month</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#39918d] shrink-0 mt-0.5" />
                      <span>Walter AI Learning Assistant access</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Level 2: Growth */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-lg font-bold text-white">
                      Growth
                    </span>
                    <span className="text-xs font-bold text-[#f8c51c] bg-[#f8c51c]/20 border border-[#f8c51c]/40 px-2.5 py-1 rounded-full">
                      ~40 hrs/mo
                    </span>
                  </div>
                  <p className="text-xs text-[#f8c51c] font-semibold mb-3">
                    Everything in Foundation, plus:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#f8c51c] shrink-0 mt-0.5" />
                      <span>Dedicated Change Architecture Officer</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#f8c51c] shrink-0 mt-0.5" />
                      <span>Adoption facilitator embedded with frontline teams</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#f8c51c] shrink-0 mt-0.5" />
                      <span>Ongoing validation and review cycles</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Level 3: Enterprise */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-lg font-bold text-white">
                      Enterprise
                    </span>
                    <span className="text-xs font-bold text-[#c57b4b] bg-[#c57b4b]/20 border border-[#c57b4b]/40 px-2.5 py-1 rounded-full">
                      ~80 hrs/mo
                    </span>
                  </div>
                  <p className="text-xs text-[#c57b4b] font-semibold mb-3">
                    Everything in Growth, plus:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                      <span>Organizational AI Governance Framework design</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                      <span>Workflow Architecture optimization</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                      <span>Final audit and curriculum review</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#c57b4b] shrink-0 mt-0.5" />
                      <span>Optional extended partnership arrangements</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
