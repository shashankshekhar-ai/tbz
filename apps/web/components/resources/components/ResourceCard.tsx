'use client';

import React from 'react';
import { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
  isUnlocked: boolean;
  onInitiateDownload: (resource: ResourceItem) => void;
  onViewContent: (resource: ResourceItem) => void;
  allowWide?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isUnlocked,
  onInitiateDownload,
  onViewContent,
  allowWide = true,
}) => {
  const isHold = resource.status === 'content-hold';
  const span = !allowWide
    ? ''
    : resource.id === 'core4-worksheet'
      ? 'md:col-span-2 lg:col-span-3'
      : resource.id === 'trips-scorecard'
      ? 'lg:col-span-2'
      : '';
  const wide = span !== '';

  return (
    <article
      id={`resource-card-${resource.id}`}
      className={`relative flex flex-col justify-between rounded-xl border transition-all duration-200 bg-white p-5 sm:p-6 ${span} ${
        isHold
          ? 'border-amber-300 bg-amber-50/30'
          : isUnlocked
          ? 'border-[#39918d]/50 shadow-sm hover:shadow-md'
          : 'border-slate-200 shadow-sm hover:border-[#3f6d67]/40 hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Header Row: Resource Number & Category */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center font-h3 text-xs font-semibold px-2.5 py-1 rounded bg-[#0c2940] text-[#f8c51c]">
              {resource.badgeLabel}
            </span>
            <span className="font-body text-xs font-medium text-[#3f6d67]">
              {resource.category}
            </span>
          </div>

          {/* Unlocked or Hold indicator */}
          {isUnlocked ? (
            <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-[#3f6d67] bg-[#3f6d67]/10 px-2.5 py-0.5 rounded-full">
              <svg className="w-3.5 h-3.5 text-[#39918d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Unlocked
            </span>
          ) : isHold ? (
            <span className="inline-flex items-center gap-1 text-xs font-h3 font-semibold text-[#c57b4b] bg-[#c57b4b]/10 border border-[#c57b4b]/30 px-2 py-0.5 rounded">
              ⚠️ In Editorial Hold
            </span>
          ) : (
            <span className="font-caption text-xs text-slate-500">
              {resource.fileSizeApprox}
            </span>
          )}
        </div>

        {/* Card Headline: Montserrat Medium H3 */}
        <h2
          id={`resource-title-${resource.id}`}
          className="font-h3 text-xl text-[#0c2940] font-semibold tracking-tight leading-snug mb-3 [text-wrap:balance]"
        >
          {resource.cardHeadline}
        </h2>

        {/* Content Hold Banner (Specific to Resource 3 as described in prompt) */}
        {isHold && resource.statusNotice && (
          <div className="mb-4 rounded-lg bg-amber-100/70 border border-amber-300/80 p-3.5 text-xs font-body text-[#0c2940]">
            <div className="flex items-center gap-1.5 font-h3 font-bold text-amber-900 mb-1">
              <span>⚠️</span>
              <span>{resource.statusNotice.title}</span>
            </div>
            <p className="text-amber-950/90 leading-relaxed mb-2">
              {resource.statusNotice.details}
            </p>
            <div className="font-h3 font-medium text-amber-900 bg-white/60 p-2 rounded border border-amber-200">
              <strong>Action required:</strong> {resource.statusNotice.actionRequired}
            </div>
          </div>
        )}

        {/* Card Body: Roboto */}
        <p className="font-body text-sm sm:text-base text-slate-700 leading-relaxed mb-4 [text-wrap:pretty]">
          {resource.cardBody}
        </p>

        {/* Bullet Points if present (TRIPS dimensions, Tax Guide paths, Glossary terms) */}
        {resource.bulletPoints && resource.bulletPoints.length > 0 && (
          <ul className={`mb-4 border-l-2 border-[#39918d]/40 pl-3 sm:pl-3.5 py-1 ${wide ? 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3' : 'space-y-2'}`}>
            {resource.bulletPoints.map((item, idx) => (
              <li key={idx} className="font-body text-xs sm:text-sm text-slate-700 leading-normal [text-wrap:pretty]">
                <strong className="font-h3 font-semibold text-[#0c2940]">{item.label}:</strong>{' '}
                <span className="text-slate-600">{item.description}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Covers Section (Resource 1) */}
        {resource.covers && (
          <div className="mb-4 rounded-lg bg-slate-50 border border-slate-200/80 p-3 text-xs sm:text-sm font-body text-slate-700">
            <strong className="font-h3 font-semibold text-[#0c2940]">Covers: </strong>
            <span className="text-slate-600">{resource.covers}</span>
          </div>
        )}

        {/* Includes Section (Resource 4) */}
        {resource.includes && (
          <div className="mb-4 rounded-lg bg-slate-50 border border-slate-200/80 p-3 text-xs sm:text-sm font-body text-slate-700">
            <strong className="font-h3 font-semibold text-[#0c2940]">Includes: </strong>
            <span className="text-slate-600">{resource.includes}</span>
          </div>
        )}

        {/* Footer Note (Resource 2, 5, 6) */}
        {resource.footerNote && (
          <p className="font-caption text-xs sm:text-sm text-slate-600 mb-4 [text-wrap:pretty] bg-slate-50/50 p-2.5 rounded border border-slate-100">
            {resource.footerNote}
          </p>
        )}
      </div>

      {/* CTA Button and Interactive Area */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        {isHold ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="min-h-[48px] px-5 py-3 rounded-lg bg-slate-200 text-slate-500 font-h3 font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              [Coming Soon]
            </button>
            <button
              type="button"
              onClick={() => onInitiateDownload(resource)}
              className="min-h-[48px] flex-1 px-4 py-2.5 rounded-lg border border-[#c57b4b] text-[#c57b4b] hover:bg-[#c57b4b]/10 font-h3 font-semibold text-xs sm:text-sm transition-colors text-center flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#c57b4b]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notify Me When Available
            </button>
          </div>
        ) : isUnlocked ? (
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <button
              type="button"
              onClick={() => onViewContent(resource)}
              className="min-h-[48px] flex-1 px-4 py-3 rounded-lg bg-[#0c2940] hover:bg-[#0c2940]/90 text-white font-h3 font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#0c2940]"
            >
              <svg className="w-4 h-4 text-[#f8c51c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Document
            </button>
            <button
              type="button"
              onClick={() => onInitiateDownload(resource)}
              className="min-h-[48px] px-4 py-3 rounded-lg border border-[#3f6d67] text-[#3f6d67] hover:bg-[#3f6d67]/10 font-h3 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#3f6d67]"
            >
              <svg className="w-4 h-4 text-[#39918d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Again
            </button>
          </div>
        ) : (
          <button
            type="button"
            id={`cta-download-${resource.id}`}
            onClick={() => onInitiateDownload(resource)}
            className="w-full min-h-[48px] px-6 py-3.5 rounded-lg bg-[#0c2940] hover:bg-[#123959] text-white font-h3 font-semibold text-sm sm:text-base tracking-wide transition-all shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2.5 focus-visible:ring-2 focus-visible:ring-[#0c2940]"
          >
            <svg
              className="w-5 h-5 text-[#f8c51c]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{resource.ctaText}</span>
          </button>
        )}
      </div>
    </article>
  );
};
