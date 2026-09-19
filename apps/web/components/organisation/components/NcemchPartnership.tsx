'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Award, Clock, ArrowDownRight, Layers, GitBranch, Cpu, FileCheck, BrainCircuit, Quote } from 'lucide-react';

export const NcemchPartnership: React.FC = () => {
  const metrics = [
    {
      metric: 'Annual Review Cycle',
      before: '3-4 months',
      after: '30 days',
      impact: '75% compression',
      impactColor: 'text-[#f8c51c]',
      badgeColor: 'bg-[#f8c51c]/15 text-[#f8c51c] border-[#f8c51c]/30',
    },
    {
      metric: 'Executive Coordination Time',
      before: 'High',
      after: '50% reduction',
      impact: 'Strategy time restored',
      impactColor: 'text-[#39918d]',
      badgeColor: 'bg-[#39918d]/15 text-[#39918d] border-[#39918d]/30',
    },
    {
      metric: 'Research Synthesis',
      before: '3 weeks',
      after: '8 hours',
      impact: '95% faster',
      impactColor: 'text-[#f8c51c]',
      badgeColor: 'bg-[#f8c51c]/15 text-[#f8c51c] border-[#f8c51c]/30',
    },
    {
      metric: 'Prompt Iteration',
      before: '45 min',
      after: '4 min',
      impact: '91% speed gain',
      impactColor: 'text-[#c57b4b]',
      badgeColor: 'bg-[#c57b4b]/15 text-[#c57b4b] border-[#c57b4b]/30',
    },
  ];

  const practicePoints = [
    {
      title: 'Knowledge Architecture',
      desc: 'Unified database of 700+ evidence-based strategies. Researchers query institutional wisdom in seconds, not days.',
      icon: Layers,
    },
    {
      title: 'Intake & Triage',
      desc: 'Single entry point routes work to the right team with full context. No more dropped requests or context loss.',
      icon: GitBranch,
    },
    {
      title: 'Analyst Engine',
      desc: 'AI-powered synthesis frees analysts to focus on judgment, not assembly. One analyst now does what three used to.',
      icon: Cpu,
    },
    {
      title: 'Dynamic Reporting',
      desc: 'Automated compilation and formatting. Researchers review and approve, not coordinate and compile.',
      icon: FileCheck,
    },
    {
      title: 'AI as Thought Partner',
      desc: 'Executive director embraced strategic work with AI to enhance his vision and role, saving countless hours and unlocking more opportunities for his team.',
      icon: BrainCircuit,
    },
  ];

  const stakeholderVoices = [
    {
      role: 'Executive Director',
      insight: '"Structured AI assistants moved me from \'doer\' to \'approver.\' Executive bandwidth is now for strategy, not coordination."',
      bgColor: '#3f6d67',
    },
    {
      role: 'Research Lead',
      insight: '"AI handles synthesis. My analysts focus on what they\'re actually trained for."',
      bgColor: '#39918d',
    },
    {
      role: 'Project Lead',
      insight: '"It\'s a process redesign. That\'s the difference."',
      bgColor: '#c57b4b',
    },
  ];

  return (
    <section id="proof-ncemch" className="py-20 md:py-28 bg-[#0c2940] text-white border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#39918d]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#f8c51c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center w-full mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#39918d]/20 border border-[#39918d]/40 mb-4">
            <Award className="w-4 h-4 text-[#f8c51c]" />
            <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#f8c51c]">
              Embedded Training Partnership
            </span>
          </div>

          <h2
             className="t-h2 text-white mb-5"
          >
            Proof: The NCEMCH Partnership
          </h2>

          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-lg sm:text-xl text-[#f8c51c] font-semibold mb-6 w-full"
          >
            Six months embedded. Measurable transformation across every dimension.
          </p>

          <p
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="text-base sm:text-lg text-white/85 leading-relaxed w-full"
          >
            The National Center for Education in Maternal and Child Health (NCEMCH) embedded The Bradbury Group for six months to see how AI could support their day-to-day work. Here's what happened:
          </p>
        </div>

        {/* 1. Measurable Metrics Table / Cards */}
        <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl backdrop-blur-xs">
          <h3
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-xs font-bold uppercase tracking-wider text-[#39918d] mb-6 flex items-center space-x-2"
          >
            <Clock className="w-4 h-4" />
            <span>Measurable Impact Metrics</span>
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/15 text-xs font-bold uppercase tracking-wider text-white/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <th className="pb-4 font-semibold">Metric</th>
                  <th className="pb-4 font-semibold">Before</th>
                  <th className="pb-4 font-semibold">After</th>
                  <th className="pb-4 font-semibold">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10" style={{ fontFamily: "'Roboto', sans-serif" }}>
                {metrics.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4 font-bold text-white text-base">
                      {row.metric}
                    </td>
                    <td className="py-4 pr-4 text-white/70 text-sm">
                      {row.before}
                    </td>
                    <td className="py-4 pr-4 text-white text-sm font-semibold">
                      {row.after}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${row.badgeColor}`}>
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        <span>{row.impact}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {metrics.map((row, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm font-bold text-white">
                    {row.metric}
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${row.badgeColor}`}>
                    {row.impact}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10">
                  <div>
                    <span className="text-white/60 block">Before</span>
                    <span className="text-white/80 font-medium">{row.before}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">After</span>
                    <span className="text-white font-bold">{row.after}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. What This Looked Like in Practice */}
        <div className="mb-16">
          <div className="text-left mb-8">
            <h3
               className="t-h3 text-white mb-2"
            >
              What This Looked Like in Practice
            </h3>
            <div className="w-20 h-1 bg-[#39918d] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className={`rounded-2xl p-6 sm:p-7 border border-white/10 bg-white/5 hover:border-[#39918d]/50 transition-all flex flex-col justify-between ${
                    index === 4 ? 'md:col-span-2 lg:col-span-2 bg-linear-to-r from-white/5 to-[#39918d]/10' : ''
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#39918d]/20 text-[#39918d] flex items-center justify-center mb-4 border border-[#39918d]/40">
                      <Icon className="w-5 h-5 text-[#f8c51c]" />
                    </div>
                    <h4
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className="text-lg font-bold text-white mb-2"
                    >
                      {point.title}
                    </h4>
                    <p
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                      className="text-sm sm:text-base text-white/80 leading-relaxed"
                    >
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Stakeholder Voices */}
        <div className="mb-16">
          <div className="text-left mb-8">
            <h3
               className="t-h3 text-white mb-2"
            >
              Stakeholder Voices
            </h3>
            <div className="w-20 h-1 bg-[#f8c51c] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stakeholderVoices.map((item, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: item.bgColor }}
                className="text-white rounded-2xl p-7 border border-white/20 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 border border-white/25 px-3 py-1 rounded-full backdrop-blur-xs"
                    >
                      {item.role}
                    </span>
                    <Quote className="w-5 h-5 text-white/80" />
                  </div>
                  <p
                    style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}
                    className="text-sm sm:text-base text-white/95 leading-relaxed font-normal"
                  >
                    {item.insight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Breadth Statement & Quote */}
        <div className="bg-white/10 rounded-3xl p-8 sm:p-12 border border-white/20 text-center w-full mx-auto space-y-6">
          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-base sm:text-lg text-white/95 leading-relaxed font-medium w-full"
          >
            We've partnered with federal agencies, municipalities, nonprofits, and private-sector teams. The industries change. The framework adapts. The results are consistent.
          </p>
          <div className="pt-2">
            <blockquote
              style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}
              className="text-lg sm:text-xl md:text-2xl text-[#f8c51c] font-semibold leading-snug w-full"
            >
              "We embed inside your organization. We guide your team through the journey. You own the framework."
            </blockquote>
          </div>
        </div>

      </div>
    </section>
  );
};
