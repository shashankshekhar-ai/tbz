'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ApproachModal } from './ApproachModal';
import { useContact } from './ContactProvider';

interface ApproachContextValue {
  openApproach: () => void;
}

const ApproachContext = createContext<ApproachContextValue | null>(null);

export const ApproachProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openContact } = useContact();
  const [isOpen, setIsOpen] = useState(false);

  const openApproach = useCallback(() => setIsOpen(true), []);
  const closeApproach = useCallback(() => setIsOpen(false), []);

  return (
    <ApproachContext.Provider value={{ openApproach }}>
      {children}
      <ApproachModal isOpen={isOpen} onClose={closeApproach} onOpenContact={openContact} />
    </ApproachContext.Provider>
  );
};

export function useApproach(): ApproachContextValue {
  const ctx = useContext(ApproachContext);
  if (!ctx) {
    throw new Error('useApproach must be used within an ApproachProvider');
  }
  return ctx;
}
