'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/organisation/components/Hero';
import { LearningArchitecture } from '@/components/organisation/components/LearningArchitecture';
import { NcemchPartnership } from '@/components/organisation/components/NcemchPartnership';
import { ChooseYourPath } from '@/components/organisation/components/ChooseYourPath';
import { CommunityAndWorkshops } from '@/components/organisation/components/CommunityAndWorkshops';
import { ValueLostSection } from '@/components/organisation/components/ValueLostSection';
import { NextStepsConsultation } from '@/components/organisation/components/NextStepsConsultation';
import { DiscoveryCallModal } from '@/components/organisation/components/DiscoveryCallModal';

export default function OrganisationPage() {
  const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Header is fixed (~96-108px tall); this cancels the layout's compensating
    // pt since Hero already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
    <div className="zip-organisation min-h-screen bg-[#ffffff]">
      <main>
        <Hero onSeeHowItWorksClick={() => scrollToSection('proof-ncemch')} />
        <LearningArchitecture />
        <NcemchPartnership />
        <ChooseYourPath onSelectPath={() => setIsDiscoveryModalOpen(true)} />
        <CommunityAndWorkshops onExploreCommunityClick={() => setIsDiscoveryModalOpen(true)} />
        <ValueLostSection />
        <NextStepsConsultation onScheduleClick={() => setIsDiscoveryModalOpen(true)} />
      </main>

      <DiscoveryCallModal
        isOpen={isDiscoveryModalOpen}
        onClose={() => setIsDiscoveryModalOpen(false)}
      />
    </div>
    </div>
  );
}
