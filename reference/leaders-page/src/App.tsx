import React, { useState } from 'react';
import { Section1Hero } from './components/Section1Hero';
import { Section2Proof } from './components/Section2Proof';
import { Section3DelayedGratification } from './components/Section3DelayedGratification';
import { Section4AiInterview } from './components/Section4AiInterview';
import { Section5TwelveWeekJourney } from './components/Section5TwelveWeekJourney';
import { Section6Reimbursement } from './components/Section6Reimbursement';
import { Section7WalterTrack } from './components/Section7WalterTrack';
import { Section8ClosingCta } from './components/Section8ClosingCta';
import { SiteFooter } from './components/SiteFooter';
import { AiInterviewModal } from './components/AiInterviewModal';
import { TaxGuideModal } from './components/TaxGuideModal';

export default function App() {
  const [isAiInterviewModalOpen, setIsAiInterviewModalOpen] = useState(false);
  const [isTaxGuideModalOpen, setIsTaxGuideModalOpen] = useState(false);

  const scrollToEnrollForm = () => {
    const el = document.getElementById('closing-cta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInterview = () => {
    const el = document.getElementById('ai-interview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsAiInterviewModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0c2940] flex flex-col font-sans selection:bg-[#f8c51c] selection:text-[#0c2940]">
      {/* HEADER REMOVED COMPLETELY AS REQUESTED */}

      {/* Section 1: HERO */}
      <Section1Hero
        onTryInterview={() => setIsAiInterviewModalOpen(true)}
        onEnrollDirectly={scrollToEnrollForm}
      />

      {/* Section 2: THE PROOF (Andy Ivey) */}
      <Section2Proof />

      {/* Section 3: Delayed Gratification */}
      <Section3DelayedGratification />

      {/* Section 4: THE AI INTERVIEW (Two Paths) */}
      <Section4AiInterview
        onStartInterview={() => setIsAiInterviewModalOpen(true)}
        onEnrollNow={scrollToEnrollForm}
      />

      {/* Section 5: THE 12-WEEK JOURNEY */}
      <Section5TwelveWeekJourney />

      {/* Section 6: REIMBURSEMENT */}
      <Section6Reimbursement
        onDownloadTaxGuide={() => setIsTaxGuideModalOpen(true)}
      />

      {/* Section 7: WALTER TRACK */}
      <Section7WalterTrack
        onOrganizationsClick={() => setIsAiInterviewModalOpen(true)}
      />

      {/* Section 8: CLOSING CTA */}
      <Section8ClosingCta />

      {/* Brand Signature & Footer */}
      <SiteFooter />

      {/* Interactive Modals */}
      <AiInterviewModal
        isOpen={isAiInterviewModalOpen}
        onClose={() => setIsAiInterviewModalOpen(false)}
      />

      <TaxGuideModal
        isOpen={isTaxGuideModalOpen}
        onClose={() => setIsTaxGuideModalOpen(false)}
      />
    </div>
  );
}
