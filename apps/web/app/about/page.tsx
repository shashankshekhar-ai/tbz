'use client';

import React, { useState } from 'react';
import { AdvisoryBoard } from '@/components/about/components/AdvisoryBoard';
import { PaigeStory } from '@/components/about/components/PaigeStory';
import { PartnerSpotlight } from '@/components/about/components/PartnerSpotlight';
import { Testimonials } from '@/components/about/components/Testimonials';
import { TeamIntro } from '@/components/about/components/TeamIntro';
import { ColumbusModal } from '@/components/about/components/ColumbusModal';
import { useContact } from '@/components/layout/ContactProvider';

export default function AboutPage() {
  const { openContact } = useContact();
  const [isColumbusOpen, setIsColumbusOpen] = useState(false);

  return (
    <div>
      <main>
        <PaigeStory />
        <AdvisoryBoard />
        <PartnerSpotlight onOpenContact={openContact} />
        <Testimonials />
        <TeamIntro onOpenContact={openContact} />
      </main>

      <ColumbusModal
        isOpen={isColumbusOpen}
        onClose={() => setIsColumbusOpen(false)}
        onOpenContact={openContact}
      />
    </div>
  );
}
