import React from 'react';
import { HeroSection } from '@/components/roi/components/HeroSection';
import { Section1Practitioners } from '@/components/roi/components/Section1Practitioners';
import { Section2Leaders } from '@/components/roi/components/Section2Leaders';
import { Section3Organization } from '@/components/roi/components/Section3Organization';
import { Section4Sectors } from '@/components/roi/components/Section4Sectors';
import { ClosingNavigation } from '@/components/roi/components/ClosingNavigation';

export default function RoiPage() {
  return (
    // Header is fixed (~96-108px tall); this cancels the layout's compensating
    // pt since HeroSection already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
      <main className="min-h-screen bg-[#fbfdfd]">
        <HeroSection />
        <Section1Practitioners />
        <Section2Leaders />
        <Section3Organization />
        <Section4Sectors />
        <ClosingNavigation />
      </main>
    </div>
  );
}
