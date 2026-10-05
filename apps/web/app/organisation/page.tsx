'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/organisation/components/Hero';
import { HowItWorks } from '@/components/organisation/components/HowItWorks';
import { Proof } from '@/components/organisation/components/Proof';
import { EngagementPaths } from '@/components/organisation/components/EngagementPaths';
import { Community } from '@/components/organisation/components/Community';
import { ValueGaps } from '@/components/organisation/components/ValueGaps';
import { ConsultationCTA } from '@/components/organisation/components/ConsultationCTA';
import { ConsultationModal } from '@/components/organisation/components/ConsultationModal';

export default function OrganisationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState('Pilot');

  const handleOpenConsultation = (scope = 'Pilot') => {
    setSelectedScope(scope);
    setModalOpen(true);
  };

  return (
    // Header is fixed (~96-108px tall); this cancels the layout's compensating
    // pt since Hero already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
    <div className="zip-organisation min-h-screen bg-[#f8fafc] overflow-x-hidden">
      <main>
        <Hero onOpenConsultation={() => handleOpenConsultation('Pilot')} />
        <HowItWorks />
        <Proof />
        <EngagementPaths onSelectScope={handleOpenConsultation} />
        <Community onOpenConsultation={handleOpenConsultation} />
        <ValueGaps />
        <ConsultationCTA onOpenConsultation={() => handleOpenConsultation('Pilot')} />
      </main>

      <ConsultationModal
        key={selectedScope}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialScope={selectedScope}
      />
    </div>
    </div>
  );
}
