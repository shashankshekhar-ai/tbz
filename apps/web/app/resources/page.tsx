'use client';

import React, { useState, useEffect } from 'react';
import { PlaybookPage } from '@/components/resources/components/PlaybookPage';
import { EmailCaptureModal } from '@/components/resources/components/EmailCaptureModal';
import { DocumentViewerModal } from '@/components/resources/components/DocumentViewerModal';
import { RESOURCES_DATA } from '@/components/resources/data/resources';
import { ResourceItem, UserLead } from '@/components/resources/types';

export default function ResourcesPage() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('playbook_unlocked_ids');
      if (saved) setUnlockedIds(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const [selectedResourceForCapture, setSelectedResourceForCapture] =
    useState<ResourceItem | null>(null);
  const [selectedResourceForViewer, setSelectedResourceForViewer] =
    useState<ResourceItem | null>(null);

  // PlaybookPage lists the same six resources in the same order as
  // RESOURCES_DATA; the email gate still runs once per resource.
  const handleBeforeDownload = (resourceIndex: number) => {
    const resource = RESOURCES_DATA[resourceIndex];
    if (!resource || unlockedIds.includes(resource.id)) return true;
    setSelectedResourceForCapture(resource);
    return false;
  };

  const handleSuccessUnlock = (resourceId: string, _lead: UserLead) => {
    setUnlockedIds((prev) => {
      if (prev.includes(resourceId)) return prev;
      const updated = [...prev, resourceId];
      try {
        localStorage.setItem('playbook_unlocked_ids', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist unlock', e);
      }
      return updated;
    });
  };

  return (
    // Header is fixed (~96-108px tall); this cancels the layout's compensating
    // pt since the PlaybookPage hero already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
    <div className="zip-resources min-h-screen bg-[#ffffff] text-[#0c2940] selection:bg-[#f8c51c] selection:text-[#0c2940]">
      <main id="resources-main">
        <PlaybookPage onBeforeDownload={handleBeforeDownload} />
      </main>

      <EmailCaptureModal
        resource={selectedResourceForCapture}
        isOpen={!!selectedResourceForCapture}
        onClose={() => setSelectedResourceForCapture(null)}
        onSuccessUnlock={handleSuccessUnlock}
        onOpenViewer={setSelectedResourceForViewer}
      />

      <DocumentViewerModal
        resource={selectedResourceForViewer}
        isOpen={!!selectedResourceForViewer}
        onClose={() => setSelectedResourceForViewer(null)}
      />
    </div>
    </div>
  );
}
