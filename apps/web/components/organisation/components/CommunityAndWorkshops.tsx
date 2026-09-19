'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Users, ArrowRight, Quote, Calendar, GraduationCap, Building } from 'lucide-react';

interface CommunityAndWorkshopsProps {
  onExploreCommunityClick: () => void;
}

export const CommunityAndWorkshops: React.FC<CommunityAndWorkshopsProps> = ({
  onExploreCommunityClick,
}) => {
  const workshopFormats = [
    { title: 'Half-Day Intensives', desc: 'Accelerated tactical labs for teams tackling specific workflow bottlenecks.' },
    { title: 'Full-Day Workshops', desc: 'Comprehensive alignment sessions covering hands-on prompt fluency & governance.' },
    { title: 'Multi-Week Series', desc: 'Structured learning arcs paired with real-time peer project sprints.' },
    { title: 'Custom Retreats', desc: 'Executive leadership architecture summits for strategic transformation.' },
  ];

  const pastPartners = [
    "Enterprise Technology Association's Atlanta AI Week",
    "Gwinnett Entrepreneur Center",
    "ACE Speed Coaching program",
    "AI Ready Ohio",
    "Municipal Agencies & Virtual Summits",
  ];

  return (
    <section id="community-workshops" className="py-20 md:py-28 bg-[#ffffff] text-[#0c2940] border-b border-[#0c2940]/10">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center w-full mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 mb-4">
            <Users className="w-4 h-4 text-[#39918d]" />
            <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#39918d]">
              Community and Awareness
            </span>
          </div>

          <h2
             className="t-h2 text-[#0c2940] mb-5"
          >
            Start With Curiosity
          </h2>

          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-lg sm:text-xl text-[#39918d] font-semibold mb-6 w-full"
          >
            Free entry points for organizations and practitioners exploring AI capability.
          </p>

          <p
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="text-base sm:text-lg text-[#0c2940]/80 leading-relaxed w-full"
          >
            We host Lightning Lessons (free 30-minute live sessions on Maven), facilitate a Community of Practice for instructional designers and L&D professionals, and deliver custom workshops for organizations of every size, from small business groups to municipal agencies to enterprise teams.
          </p>
        </div>

        {/* Feature Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Free Lightning Lessons & Community */}
          <div className="bg-[#f8fafb] rounded-3xl p-8 sm:p-10 border border-[#0c2940]/15 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#39918d]/15 text-[#39918d] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl font-bold text-[#0c2940]">
                    Lightning Lessons & Practice
                  </h3>
                  <span className="text-xs text-[#39918d] font-semibold">Free Maven Live Sessions</span>
                </div>
              </div>

              <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-[#0c2940]/80 leading-relaxed mb-6">
                30-minute live, interactive sessions designed to unpack single topics—from cognitive friction reduction to instructional prompt engineering. Connect with fellow practitioners in our ongoing Community of Practice.
              </p>

              <div className="space-y-3 pt-2 border-t border-[#0c2940]/10">
                <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold uppercase tracking-wider text-[#0c2940]/70 block">
                  Past Workshops & Engagements:
                </span>
                <div className="flex flex-wrap gap-2">
                  {pastPartners.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-[#0c2940]/15 px-3 py-1.5 rounded-lg text-xs font-medium text-[#0c2940]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreCommunityClick}
                className="text-[#39918d] hover:text-[#2d7370] font-bold text-sm flex items-center space-x-1.5 group cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>Browse upcoming sessions and the full workshop catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Custom Organizational Workshops */}
          <div className="bg-[#0c2940] text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8c51c]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#f8c51c] flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl font-bold text-white">
                    Custom Team Workshops
                  </h3>
                  <span className="text-xs text-[#f8c51c] font-semibold">Tailored Delivery Formats</span>
                </div>
              </div>

              <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                We design and facilitate tailored programs that meet your teams where they are, eliminating the blank-page struggle with evidence-based frameworks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                {workshopFormats.map((f, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 p-3 rounded-xl">
                    <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xs font-bold text-[#f8c51c] mb-1">
                      {f.title}
                    </p>
                    <p style={{ fontFamily: "'Roboto', sans-serif" }} className="text-[11px] text-white/70 leading-normal">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                onClick={onExploreCommunityClick}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="w-full bg-[#f8c51c] hover:bg-[#ebba15] text-[#0c2940] font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE COMMUNITY & WORKSHOPS</span>
                <ArrowRight className="w-4 h-4 text-[#0c2940]" />
              </button>
            </div>
          </div>

        </div>

        {/* Section Quote Banner */}
        <div className="bg-[#f8fafb] rounded-3xl p-8 sm:p-12 border border-[#0c2940]/15 text-center w-full mx-auto shadow-sm">
          <Quote className="w-8 h-8 text-[#39918d] mx-auto mb-4" />
          <blockquote
            style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'italic' }}
            className="text-lg sm:text-xl md:text-2xl text-[#0c2940] font-medium leading-relaxed w-full"
          >
            "Free learning is how the best partnerships begin. People show up curious, bring real questions, and the relationship evolves from there."
          </blockquote>
        </div>

      </div>
    </section>
  );
};
