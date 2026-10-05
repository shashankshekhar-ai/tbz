'use client';

import React, { useState } from 'react';
import { Section1Hero } from '@/components/leaders/components/Section1Hero';
import { Section2Proof } from '@/components/leaders/components/Section2Proof';
import { Section3DelayedGratification } from '@/components/leaders/components/Section3DelayedGratification';
import { Section4AiInterview } from '@/components/leaders/components/Section4AiInterview';
import { Section5TwelveWeekJourney } from '@/components/leaders/components/Section5TwelveWeekJourney';
import { Section6Reimbursement } from '@/components/leaders/components/Section6Reimbursement';
import { Section7WalterTrack } from '@/components/leaders/components/Section7WalterTrack';
import { Section8ClosingCta } from '@/components/leaders/components/Section8ClosingCta';
import { AiInterviewModal } from '@/components/leaders/components/AiInterviewModal';
import { TaxGuideModal } from '@/components/leaders/components/TaxGuideModal';

export default function LeadersPage() {
  const [isAiInterviewModalOpen, setIsAiInterviewModalOpen] = useState(false);
  const [isTaxGuideModalOpen, setIsTaxGuideModalOpen] = useState(false);

  const scrollToEnrollForm = () => {
    document.getElementById('closing-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Header is fixed (~96-108px tall); this cancels the layout's compensating
    // pt since Section1Hero already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
      <main className="zip-leaders min-h-screen bg-[#ffffff] text-[#0c2940] font-sans selection:bg-[#f8c51c] selection:text-[#0c2940]">
        <Section1Hero
          onTryInterview={() => setIsAiInterviewModalOpen(true)}
          onEnrollDirectly={scrollToEnrollForm}
        />
        <Section2Proof />
        <Section3DelayedGratification />
        <Section4AiInterview
          onStartInterview={() => setIsAiInterviewModalOpen(true)}
          onEnrollNow={scrollToEnrollForm}
        />
        <Section5TwelveWeekJourney />
        <Section6Reimbursement onDownloadTaxGuide={() => setIsTaxGuideModalOpen(true)} />
        <Section7WalterTrack onOrganizationsClick={() => setIsAiInterviewModalOpen(true)} />
        <Section8ClosingCta />

        <AiInterviewModal
          isOpen={isAiInterviewModalOpen}
          onClose={() => setIsAiInterviewModalOpen(false)}
        />
        <TaxGuideModal
          isOpen={isTaxGuideModalOpen}
          onClose={() => setIsTaxGuideModalOpen(false)}
        />
      </main>
    </div>
  );
}
