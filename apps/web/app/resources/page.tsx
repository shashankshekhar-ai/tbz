'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Hero } from '@/components/resources/components/Hero';
import { ResourceCard } from '@/components/resources/components/ResourceCard';
import { EmailCaptureModal } from '@/components/resources/components/EmailCaptureModal';
import { DocumentViewerModal } from '@/components/resources/components/DocumentViewerModal';
import { PostDownloadBanner } from '@/components/resources/components/PostDownloadBanner';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Tools');

  const categories = useMemo(() => {
    return ['All Tools', ...Array.from(new Set(RESOURCES_DATA.map((r) => r.category)))];
  }, []);

  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Tools' || item.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inHeadline = item.cardHeadline.toLowerCase().includes(q);
      const inBody = item.cardBody.toLowerCase().includes(q);
      const inCovers = item.covers?.toLowerCase().includes(q);
      const inIncludes = item.includes?.toLowerCase().includes(q);
      const inBullets = item.bulletPoints?.some(
        (b) => b.label.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
      );

      return inHeadline || inBody || inCovers || inIncludes || inBullets;
    });
  }, [searchQuery, selectedCategory]);

  const handleInitiateDownload = (resource: ResourceItem) => {
    setSelectedResourceForCapture(resource);
  };

  const handleOpenViewer = (resource: ResourceItem) => {
    setSelectedResourceForViewer(resource);
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
    // pt since Hero already bakes in that top spacing.
    <div className="-mt-24 sm:-mt-[102px] lg:-mt-[108px]">
    <div className="zip-resources min-h-screen bg-[#ffffff]">
      <main id="resources-main" className="pb-16 sm:pb-24">
        <Hero
          unlockedCount={unlockedIds.length}
          totalCount={RESOURCES_DATA.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={categories}
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
          {filteredResources.length === 0 ? (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200">
              <svg
                className="mx-auto h-12 w-12 text-slate-400 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-h3 text-lg font-semibold text-[#0c2940]">
                No matching frameworks found
              </h3>
              <p className="font-body text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Try clearing your search query or switching back to &quot;All Tools&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Tools');
                }}
                className="mt-4 min-h-[44px] px-5 py-2 rounded-lg bg-[#0c2940] text-white font-h3 text-xs sm:text-sm font-semibold transition-all hover:bg-[#123959]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              id="resources-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
            >
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isUnlocked={unlockedIds.includes(resource.id)}
                  onInitiateDownload={handleInitiateDownload}
                  onViewContent={handleOpenViewer}
                  allowWide={selectedCategory === 'All Tools' && !searchQuery}
                />
              ))}
            </div>
          )}

          <PostDownloadBanner />
        </div>
      </main>

      <EmailCaptureModal
        resource={selectedResourceForCapture}
        isOpen={!!selectedResourceForCapture}
        onClose={() => setSelectedResourceForCapture(null)}
        onSuccessUnlock={handleSuccessUnlock}
        onOpenViewer={handleOpenViewer}
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
