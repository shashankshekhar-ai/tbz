/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { PlaybookPage } from './components/PlaybookPage';

export default function App() {
  // Ensure pure light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('bradbury-theme');
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#0c2940] antialiased selection:bg-[#f8c51c] selection:text-[#0c2940]">
      <PlaybookPage />
    </div>
  );
}
