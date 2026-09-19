'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TeamIntroProps {
  onOpenContact?: () => void;
  onOpenApproach?: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  accent: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'paige-bradbury',
    name: 'Paige Bradbury',
    role: 'Founder & Principal Architect',
    initials: 'PB',
    accent: '#f8c51c',
  },
  {
    id: 'team-pending-1',
    name: '[Name pending]',
    role: '[Title pending]',
    initials: 'TBD',
    accent: '#39918d',
  },
  {
    id: 'team-pending-2',
    name: '[Name pending]',
    role: '[Title pending]',
    initials: 'TBD',
    accent: '#3f6d67',
  },
];

export const TeamIntro: React.FC<TeamIntroProps> = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <section
      id="team"
      className="relative pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 bg-gradient-to-b from-[#0c2940] via-[#092033] to-[#0c2940] border-b border-[#3f6d67]/30 overflow-hidden"
    >
      {/* Ambient Gradient Glows without any dot grids */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-[#39918d]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-16 right-12 w-80 h-80 bg-[#f8c51c]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mb-10 sm:mb-14">
        {/* Display Headline in White for Navy Theme */}
        <h2 className="t-h2 text-white">
          Our Team
        </h2>
      </div>

      {/* Static 3-Card Row & Navy Blue Theme */}
      <div className="relative w-full pt-6 pb-12">
        <div className="flex flex-wrap items-end justify-center gap-5 sm:gap-6 px-6">
          {TEAM_MEMBERS.map((member) => {
            const isHovered = hoveredCardId === member.id;

            return (
              <motion.div
                key={member.id}
                onMouseEnter={() => setHoveredCardId(member.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                animate={{
                  y: isHovered ? -12 : 0,
                  scale: isHovered ? 1.03 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
                className={`relative w-56 sm:w-64 h-80 sm:h-92 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between p-5 sm:p-6 flex-shrink-0 transition-all duration-300 select-none bg-[#092236] border-2 ${
                  isHovered
                    ? 'border-[#39918d] shadow-2xl shadow-black/60 z-30'
                    : 'border-[#3f6d67]/40 hover:border-[#39918d] shadow-md z-10'
                }`}
              >
                {/* Clean Subtle Geometric Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 pointer-events-none" />

                {/* Architectural Blueprint Vector Motif */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 200 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="100" cy="120" r="75" stroke="#39918d" strokeWidth="1.2" strokeDasharray="4 4" />
                    <circle cx="100" cy="120" r="45" stroke="#39918d" strokeWidth="1" />
                    <line x1="15" y1="120" x2="185" y2="120" stroke="#39918d" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="100" y1="35" x2="100" y2="205" stroke="#39918d" strokeWidth="0.8" strokeDasharray="3 3" />
                    <circle cx="100" cy="120" r="5" fill="#39918d" />
                  </svg>
                </div>

                {/* Top Subtle Monogram / Initials Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0c2940]/90 border border-[#3f6d67]/60 text-xs font-bold text-white shadow-xs font-caption"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: member.accent }}
                    />
                    <span>{member.initials}</span>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full transition-opacity duration-300 ${
                      isHovered ? 'bg-[#f8c51c] opacity-100 animate-ping' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Center Abstract Graphic Emblem */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-lg"
                    style={{
                      backgroundColor: isHovered ? '#0c2940' : '#071f33',
                      borderColor: isHovered ? '#39918d' : '#3f6d67',
                    }}
                  >
                    <span
                      className="font-h1 font-black text-2xl tracking-widest transition-colors duration-300"
                      style={{ color: isHovered ? '#f8c51c' : '#ffffff' }}
                    >
                      {member.initials}
                    </span>
                  </div>
                </div>

                {/* Bottom Clean Info Card */}
                <div className="relative z-10 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0c2940]/95 backdrop-blur-md border border-[#3f6d67]/40 text-left transition-colors duration-300">
                  <h4 className="font-h2 font-bold text-sm sm:text-base text-white tracking-tight leading-snug">
                    {member.name}
                  </h4>
                  <p className="font-h3 font-medium text-xs sm:text-[13px] text-slate-300 mt-0.5 truncate">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
