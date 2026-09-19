'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/home/components/Hero';
import { UpdatesCarousel } from '@/components/home/components/UpdatesCarousel';
import { StrategicEngagement } from '@/components/home/components/StrategicEngagement';
import { OperatingPrinciples } from '@/components/home/components/OperatingPrinciples';
import { CtaBanner } from '@/components/home/components/CtaBanner';
import { BookingModal } from '@/components/home/components/BookingModal';
import MeetColumbus from '@/components/home/components/MeetColumbus';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    // Header is fixed (~96-108px tall); this cancels the layout's compensating
    // pt since this page's own Hero already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
      <main className="zip-home">
        <Hero />
        <MeetColumbus />
        <UpdatesCarousel />
        <StrategicEngagement />
        <OperatingPrinciples />
        <CtaBanner onOpenBooking={() => setBookingOpen(true)} />
      </main>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
