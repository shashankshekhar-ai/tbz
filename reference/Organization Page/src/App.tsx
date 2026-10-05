/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Proof } from './components/Proof';
import { EngagementPaths } from './components/EngagementPaths';
import { Community } from './components/Community';
import { ValueGaps } from './components/ValueGaps';
import { ConsultationCTA } from './components/ConsultationCTA';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState('Pilot');

  const handleOpenConsultation = (scope = 'Pilot') => {
    setSelectedScope(scope);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-['Open_Sans'] text-[#0c2940] antialiased flex flex-col selection:bg-[#f8c51c] selection:text-[#0c2940] overflow-x-hidden">
      {/* Main Content: Hero is Navy with 50% opacity constellation particle animation, rest in Light Theme */}
      <main className="relative z-10 flex-1">
        <Hero onOpenConsultation={() => handleOpenConsultation('Pilot')} />
        <HowItWorks />
        <Proof />
        <EngagementPaths onSelectScope={handleOpenConsultation} />
        <Community onOpenConsultation={handleOpenConsultation} />
        <ValueGaps />
        <ConsultationCTA onOpenConsultation={() => handleOpenConsultation('Pilot')} />
      </main>

      {/* Interactive Consultation Scheduler Dialog */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={handleCloseConsultation}
        initialScope={selectedScope}
      />
    </div>
  );
}
