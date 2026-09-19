'use client';

import React, { createContext, useContext, useCallback } from 'react';

interface ColumbusContextValue {
  openColumbus: (topic?: string) => void;
}

const ColumbusContext = createContext<ColumbusContextValue | null>(null);

export const ColumbusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routes through the original Columbus widget (components/columbus/ColumbusWidget),
  // which listens for this same event — keeps that assistant's UI as-is instead of
  // opening a second, fixes-provided chat modal.
  const openColumbus = useCallback((t?: string) => {
    window.dispatchEvent(new CustomEvent('open-columbus', { detail: t }));
  }, []);

  return (
    <ColumbusContext.Provider value={{ openColumbus }}>
      {children}
    </ColumbusContext.Provider>
  );
};

export function useColumbus(): ColumbusContextValue {
  const ctx = useContext(ColumbusContext);
  if (!ctx) {
    throw new Error('useColumbus must be used within a ColumbusProvider');
  }
  return ctx;
}
