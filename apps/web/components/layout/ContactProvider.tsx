'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ContactModal } from './ContactModal';

interface ContactContextValue {
  openContact: () => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContact} />
    </ContactContext.Provider>
  );
};

export function useContact(): ContactContextValue {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return ctx;
}
