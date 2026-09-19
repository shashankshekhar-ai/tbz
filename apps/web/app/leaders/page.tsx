'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/leaders/components/HeroSection';
import { ProofSection } from '@/components/leaders/components/ProofSection';
import { PhilosophyQuoteSection } from '@/components/leaders/components/PhilosophyQuoteSection';
import { InterviewPathsSection } from '@/components/leaders/components/InterviewPathsSection';
import { SolomonEngineSection } from '@/components/leaders/components/SolomonEngineSection';
import { TaxReimbursementSection } from '@/components/leaders/components/TaxReimbursementSection';
import { ClosingSection } from '@/components/leaders/components/ClosingSection';

export default function LeadersPage() {
  const [selectedIntent] = useState<'interview' | 'enroll'>('interview');

  return (
    // Header is fixed (~96-108px tall); this cancels the layout's compensating
    // pt since HeroSection already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
      <main className="zip-leaders min-h-screen bg-[#f7f9fa]">
        <HeroSection />
        <ProofSection />
        <PhilosophyQuoteSection />
        <InterviewPathsSection />
        <SolomonEngineSection />
        <TaxReimbursementSection />
        <ClosingSection intent={selectedIntent} />
      </main>
    </div>
  );
}
