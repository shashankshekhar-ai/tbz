'use client';

import React from 'react';

export const LogoSVG: React.FC<{ className?: string }> = ({ className = "h-11 w-auto" }) => (
  <svg
    viewBox="0 0 200 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="The Bradbury Group White Logo"
  >
    {/* Central Trunk */}
    <line x1="100" y1="15" x2="100" y2="265" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

    {/* Apex Arrow V-Shape */}
    <line x1="100" y1="15" x2="82" y2="45" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="100" y1="15" x2="118" y2="45" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="100" y1="65" x2="82" y2="45" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <line x1="100" y1="65" x2="118" y2="45" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

    {/* Upper Major Diagonal Branches */}
    <line x1="100" y1="145" x2="35" y2="55" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="100" y1="145" x2="165" y2="55" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />

    {/* Left Major Branch Cross/Forks */}
    <line x1="68" y1="98" x2="48" y2="82" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="68" y1="98" x2="82" y2="118" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="35" y1="55" x2="22" y2="72" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="35" y1="55" x2="48" y2="72" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

    {/* Right Major Branch Cross/Forks */}
    <line x1="132" y1="98" x2="152" y2="82" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="132" y1="98" x2="118" y2="118" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="165" y1="55" x2="178" y2="72" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="165" y1="55" x2="152" y2="72" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

    {/* Lower Minor Branches */}
    <line x1="100" y1="185" x2="52" y2="148" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="100" y1="185" x2="148" y2="148" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

    <line x1="72" y1="163" x2="62" y2="152" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="72" y1="163" x2="80" y2="152" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

    <line x1="128" y1="163" x2="138" y2="152" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="128" y1="163" x2="120" y2="152" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
