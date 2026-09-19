'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Database, Bot, Wrench, BarChart3, Quote } from 'lucide-react';

export const LearningArchitecture: React.FC = () => {
  const comparisonData = [
    {
      whatWeDo: 'Knowledge Codification',
      icon: Database,
      whatItSolves: 'Decades of senior expertise are trapped in unstructured formats (slide decks, brain dumps, inboxes)',
      realWorldResults: 'Converts raw, complex institutional wisdom into structured, market-ready training assets',
      badgeColor: 'text-[#39918d] bg-[#39918d]/10 border-[#39918d]/30',
    },
    {
      whatWeDo: 'Guided AI Co-Creation',
      icon: Bot,
      whatItSolves: 'Subject Matter Experts lack the time and learning design background to structure their own content',
      realWorldResults: 'An intuitive AI assistant interviews the expert step-by-step, eliminating blank-page friction',
      badgeColor: 'text-[#f8c51c] bg-[#f8c51c]/10 border-[#f8c51c]/40',
    },
    {
      whatWeDo: 'Actionable Program Design',
      icon: Wrench,
      whatItSolves: 'Traditional training yields passive reading material rather than real workplace execution',
      realWorldResults: 'Every module yields a hands-on tool (audit scorecards, decision maps, trackers) learners use on the job',
      badgeColor: 'text-[#c57b4b] bg-[#c57b4b]/10 border-[#c57b4b]/30',
    },
    {
      whatWeDo: 'Performance Alignment',
      icon: BarChart3,
      whatItSolves: 'Organizations struggle to connect training initiatives to actual business dashboard metrics',
      realWorldResults: 'Direct alignment between learning activities and observable workplace performance metrics',
      badgeColor: 'text-[#39918d] bg-[#39918d]/10 border-[#39918d]/30',
    },
  ];

  return (
    <section id="learning-architecture" className="py-20 md:py-28 bg-[#ffffff] text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center w-full mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 mb-4">
            <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#39918d]">
              Learning Architecture Design
            </span>
          </div>

          <h2
             className="t-h2 text-[#0c2940] mb-5"
          >
            Learning Design Redefined: From Trapped Wisdom to Measurable Impact
          </h2>

          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-lg sm:text-xl text-[#39918d] font-semibold mb-6 w-full"
          >
            We bridge the gap between unstructured expert knowledge and real-world workplace performance through guided AI co-creation.
          </p>

          <p
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="text-base sm:text-lg text-[#0c2940]/80 leading-relaxed w-full"
          >
            We transform decades of unstructured institutional expertise into scalable, high-impact learning systems. Powered by guided AI co-creation and evidence-based learning design, we help experts turn raw domain knowledge into market-ready workbooks, workshops, and toolkits—built for real workplace execution without the blank-page struggle.
          </p>
        </div>

        {/* Structured Table / Grid */}
        <div className="bg-[#f8fafb] rounded-3xl border border-[#0c2940]/15 shadow-xl overflow-hidden mb-12">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 bg-[#0c2940] text-white py-4 px-8 text-xs font-bold uppercase tracking-wider border-b border-white/10" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="col-span-3 text-[#f8c51c]">What We Do</div>
            <div className="col-span-4 text-white/90">What It Solves</div>
            <div className="col-span-5 text-[#39918d]">The Real-World Results</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#0c2940]/10">
            {comparisonData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="p-6 sm:p-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center hover:bg-white/80 transition-colors"
                >
                  {/* What We Do */}
                  <div className="lg:col-span-3 mb-4 lg:mb-0 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0c2940]/5 border border-[#0c2940]/10 flex items-center justify-center shrink-0 text-[#0c2940]">
                      <Icon className="w-5 h-5 text-[#0c2940]" />
                    </div>
                    <div>
                      <span className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#39918d] block mb-0.5">
                        What We Do
                      </span>
                      <h3
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-lg font-bold text-[#0c2940]"
                      >
                        {item.whatWeDo}
                      </h3>
                    </div>
                  </div>

                  {/* What It Solves */}
                  <div className="lg:col-span-4 mb-4 lg:mb-0">
                    <span className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#0c2940]/60 block mb-1">
                      What It Solves
                    </span>
                    <p
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                      className="text-sm sm:text-base text-[#0c2940]/80 leading-relaxed"
                    >
                      {item.whatItSolves}
                    </p>
                  </div>

                  {/* The Real-World Results */}
                  <div className="lg:col-span-5">
                    <span className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#39918d] block mb-1">
                      The Real-World Results
                    </span>
                    <div className="bg-white rounded-xl p-4 border border-[#39918d]/30 shadow-xs">
                      <p
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                        className="text-sm sm:text-base font-medium text-[#0c2940] leading-relaxed"
                      >
                        {item.realWorldResults}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quote & Succession Planning Callout */}
        <div className="bg-[#0c2940] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#39918d]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <p
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#f8c51c]"
              >
                With AI, the pathways are now endless.
              </p>
              <blockquote
                style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}
                className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-snug"
              >
                "One of the best succession planning initiatives you can do is a project like this."
              </blockquote>
            </div>

            <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 text-[#f8c51c]">
              <Quote className="w-8 h-8" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
