'use client';

import React, { useState, useMemo } from 'react';
import { ParticleCanvas } from './ParticleCanvas';
import { Download, Search, Check } from 'lucide-react';

type FilterTab = 'All' | 'Leadership' | 'Strategy' | 'Readiness' | 'Evidence' | 'Funding' | 'Glossary';

interface PlaybookPageProps {
  // Return false to hold the download (e.g. while the email gate is open).
  onBeforeDownload?: (resourceIndex: number) => boolean;
}

export const PlaybookPage: React.FC<PlaybookPageProps> = ({ onBeforeDownload }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filterTabs: FilterTab[] = [
    'All',
    'Leadership',
    'Strategy',
    'Readiness',
    'Evidence',
    'Funding',
    'Glossary'
  ];

  const handleDownload = (filename: string, title: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(title);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4000);
  };

  // 6 Resource definitions strictly containing only the word-for-word brief content
  const resources = [
    {
      id: '01',
      category: 'Leadership' as FilterTab,
      meta: '01 · Leadership & Case · PDF',
      title: 'The Pre-Written Business Case',
      description:
        'We already wrote the ROI language, the cost breakdown, and the role clarity your manager is going to ask for. Just forward it.',
      highlight:
        '→ DOL framework · Competitive risk · Participation: 2 sessions/week, ~2 hrs + homework',
      cta: 'Download PDF',
      filename: '01_The_Pre_Written_Business_Case.txt',
      fileContent: `THE BRADBURY GROUP
01 · Leadership & Case · PDF
The Pre-Written Business Case

We already wrote the ROI language, the cost breakdown, and the role clarity your manager is going to ask for. Just forward it.

→ DOL framework · Competitive risk · Participation: 2 sessions/week, ~2 hrs + homework

After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.`
    },
    {
      id: '02',
      category: 'Strategy' as FilterTab,
      meta: '02 · Strategy & Prioritization · Scorecard',
      title: 'TRIPS: Score Before You Spend',
      description:
        'Rank your top 5 AI opportunities across five dimensions before you commit a dollar. Same scorecard we use to scope client engagements.',
      highlight: '→ Time · Risk · Impact · Pain · Security',
      cta: 'Download Scorecard',
      filename: '02_TRIPS_Scorecard.txt',
      fileContent: `THE BRADBURY GROUP
02 · Strategy & Prioritization · Scorecard
TRIPS: Score Before You Spend

Rank your top 5 AI opportunities across five dimensions before you commit a dollar. Same scorecard we use to scope client engagements.

→ Time · Risk · Impact · Pain · Security

After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.`
    },
    {
      id: '03',
      category: 'Readiness' as FilterTab,
      meta: '03 · Workforce Readiness · PDF Worksheet',
      title: 'The Core 4',
      description:
        'Four steps that take you from a vague AI hunch to a measurable, defensible win.',
      steps: 'Pain Point → Use Case → Pilot → Success Metric',
      quote: '“Prove one use case. That proof becomes the playbook for the next.”',
      cta: 'Download Worksheet',
      filename: '03_The_Core_4_Worksheet.txt',
      fileContent: `THE BRADBURY GROUP
03 · Workforce Readiness · PDF Worksheet
The Core 4

Four steps that take you from a vague AI hunch to a measurable, defensible win.

Pain Point → Use Case → Pilot → Success Metric

“Prove one use case. That proof becomes the playbook for the next.”

After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.`
    },
    {
      id: '04',
      category: 'Evidence' as FilterTab,
      meta: '04 · Evidence & Benchmarks · Whitepaper',
      title: 'Five Case Studies, Full Metrics',
      description:
        'All 5 case studies with full metrics, built to forward to your board or your most skeptical colleague.',
      chips: [
        'Aurilis',
        'Teresa',
        'Leah',
        'Andy',
        'NCEMCH',
        'Surpassing Benchmarks'
      ],
      cta: 'Download Whitepaper',
      filename: '04_Five_Case_Studies_Full_Metrics.txt',
      fileContent: `THE BRADBURY GROUP
04 · Evidence & Benchmarks · Whitepaper
Five Case Studies, Full Metrics

All 5 case studies with full metrics, built to forward to your board or your most skeptical colleague.

Chips: Aurilis · Teresa · Leah · Andy · NCEMCH · Surpassing Benchmarks

After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.`
    },
    {
      id: '05',
      category: 'Funding' as FilterTab,
      meta: '05 · U.S. Tax Credits & Incentives · PDF',
      title: 'Three Paths to Offset Your Investment',
      tableData: [
        {
          path: 'IRS §127 - Federal',
          benefit: '$5,250/employee/yr tax-free',
          detail: 'Educational assistance'
        },
        {
          path: 'State Incentives',
          benefit: 'Write-off tool subscriptions',
          detail: 'Varies by state'
        },
        {
          path: 'IRC §162 - State',
          benefit: 'Full business expense deduction',
          detail: 'Professional development qualifies'
        }
      ],
      cta: 'Download Universal Prompt for Grants and Tax Credits',
      filename: '05_Universal_Prompt_Grants_and_Tax_Credits.txt',
      fileContent: `THE BRADBURY GROUP
05 · U.S. Tax Credits & Incentives · PDF
Three Paths to Offset Your Investment

Path                    | Benefit                           | Detail
------------------------+-----------------------------------+------------------------------------
IRS §127 - Federal      | $5,250/employee/yr tax-free       | Educational assistance
State Incentives        | Write-off tool subscriptions      | Varies by state
IRC §162 - State        | Full business expense deduction   | Professional development qualifies

[Download Universal Prompt for Grants and Tax Credits]

After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.`
    },
    {
      id: '06',
      category: 'Glossary' as FilterTab,
      meta: '06 · Reference & Taxonomy · Glossary',
      title: 'The Only AI Glossary You’ll Actually Read',
      chips: [
        'AI Core Concepts',
        'How the AI “Thinks”',
        'The Architect’s Safety Check',
        'AI Strategy and Application',
        'Advanced Tools'
      ],
      description:
        'All plain language. All actionable. Each definition includes an example in action, best practice, and a “why it matters” section.',
      cta: 'Download Glossary',
      filename: '06_The_Only_AI_Glossary_Youll_Actually_Read.txt',
      fileContent: `THE BRADBURY GROUP
06 · Reference & Taxonomy · Glossary
The Only AI Glossary You’ll Actually Read

AI Core Concepts · How the AI “Thinks” · The Architect’s Safety Check · AI Strategy and Application · Advanced Tools

All plain language. All actionable. Each definition includes an example in action, best practice, and a “why it matters” section.

After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.`
    }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchFilter = activeFilter === 'All' || res.category === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchFilter;

      const matchQuery =
        res.title.toLowerCase().includes(q) ||
        (res.description ?? "").toLowerCase().includes(q) ||
        res.meta.toLowerCase().includes(q) ||
        (res.highlight && res.highlight.toLowerCase().includes(q)) ||
        (res.steps && res.steps.toLowerCase().includes(q)) ||
        (res.chips && res.chips.some((c) => c.toLowerCase().includes(q)));

      return matchFilter && matchQuery;
    });
  }, [activeFilter, searchQuery, resources]);

  return (
    <div className="w-full bg-[#ffffff] text-[#0c2940]">
      {/* ──────────────────────────────────────────────────
          HERO SECTION (Matching Max-W-7XL Width & Typography of TBG Design)
          ────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#0c2940] text-[#ffffff] pt-[calc(96px+4rem)] pb-20 sm:pt-[calc(102px+5rem)] sm:pb-24 lg:pt-[calc(108px+5rem)] border-b border-[#3f6d67]/30 overflow-hidden">
        {/* Moving particle animation canvas background with TBG palette */}
        <ParticleCanvas className="opacity-90" />

        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#39918d]/20 to-transparent blur-3xl pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Brand Name */}
          <span className="font-h3 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#f8c51c] block">
            The Bradbury Group
          </span>

          {/* Title - Inter H1 (Matching TBG Scale: 4xl / 5xl / 6xl) */}
          <h1 className="font-h1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#ffffff] leading-[1.15] max-w-4xl mx-auto">
            Our Playbook, It’s Open
          </h1>

          {/* Subtitle - Montserrat H2 (Matching TBG Scale: base / lg / xl) */}
          <p className="font-h2 text-base sm:text-lg md:text-xl font-normal text-slate-200 max-w-3xl mx-auto leading-relaxed pt-1">
            The frameworks below come straight from paid engagements. Download what you need, skip what you don’t.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          FILTER BAR & SEARCH RESOURCES (Matching Max-W-7XL Container)
          ────────────────────────────────────────────────── */}
      <section className="sticky top-24 sm:top-[102px] lg:top-[108px] z-30 bg-[#ffffff] border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Filter Bar: All | Leadership | Strategy | Readiness | Evidence | Funding | Glossary */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 text-xs sm:text-sm font-h3 font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0c2940] text-[#ffffff] shadow-xs'
                        : 'text-slate-600 hover:text-[#0c2940] hover:bg-slate-200/80'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🔍 Search resources */}
          <div className="w-full md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources"
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm font-h3 bg-slate-50 border border-slate-200 rounded-lg text-[#0c2940] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:bg-[#ffffff] transition-all"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          MAIN CONTENT (Max-W-7XL Width Matching Reference App Design)
          ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {filteredResources.map((item) => (
          <article
            key={item.id}
            className="w-full rounded-2xl bg-[#ffffff] border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md p-6 sm:p-8 lg:p-10 space-y-5"
          >
            {/* Meta String (e.g. 01 · Leadership & Case · PDF) */}
            <div className="font-h3 text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#39918d]">
              {item.meta}
            </div>

            {/* Title - Montserrat H2 (Matching TBG Scale: 2xl / 3xl font-bold) */}
            <h2 className="font-h2 text-2xl sm:text-3xl font-bold text-[#0c2940] leading-tight">
              {item.title}
            </h2>

            {/* Description (for 01, 02, 03, 04) - Montserrat H2 (sm / base) */}
            {item.description && item.id !== '06' && (
              <p className="font-h2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-4xl">
                {item.description}
              </p>
            )}

            {/* 01: Bullet / Highlight */}
            {item.highlight && (
              <div className="font-h3 text-xs sm:text-sm text-[#0c2940] font-semibold pt-1">
                {item.highlight}
              </div>
            )}

            {/* 03: Steps & Quote */}
            {item.steps && (
              <div className="font-h3 text-xs sm:text-sm text-[#0c2940] font-semibold pt-1">
                {item.steps}
              </div>
            )}
            {item.quote && (
              <blockquote className="font-caption text-sm sm:text-base text-slate-600 pl-4 border-l-2 border-[#f8c51c] py-0.5">
                {item.quote}
              </blockquote>
            )}

            {/* 04: Chips: Aurilis · Teresa · Leah · Andy · NCEMCH · Surpassing Benchmarks */}
            {item.id === '04' && item.chips && (
              <div className="font-h3 text-xs sm:text-sm text-[#0c2940] font-medium flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[#3f6d67] font-semibold">Chips:</span>
                <span>{item.chips.join(' · ')}</span>
              </div>
            )}

            {/* 05: U.S. Tax Credits Table */}
            {item.tableData && (
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs mt-2">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#0c2940] text-[#ffffff] font-h3 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
                    <tr>
                      <th className="py-3 px-5">Path</th>
                      <th className="py-3 px-5">Benefit</th>
                      <th className="py-3 px-5">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-[#ffffff] font-h3">
                    {item.tableData.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-[#0c2940] whitespace-nowrap font-h2">
                          {row.path}
                        </td>
                        <td className="py-3.5 px-5 text-[#39918d] font-semibold whitespace-nowrap">
                          {row.benefit}
                        </td>
                        <td className="py-3.5 px-5 text-slate-600">
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 06: Chips & Description */}
            {item.id === '06' && (
              <div className="space-y-3 pt-1">
                {item.chips && (
                  <div className="font-h3 text-xs sm:text-sm text-[#0c2940] font-semibold">
                    {item.chips.join(' · ')}
                  </div>
                )}
                {item.description && (
                  <p className="font-h2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-4xl">
                    {item.description}
                  </p>
                )}
              </div>
            )}

            {/* Download CTA Button */}
            <div className="pt-3">
              <button
                onClick={() => {
                  if (onBeforeDownload && !onBeforeDownload(resources.indexOf(item))) return;
                  handleDownload(item.filename, item.title, item.fileContent);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] font-h3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-xs hover:shadow"
              >
                <Download className="w-4 h-4" />
                <span>[{item.cta}]</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="w-full bg-[#0c2940] text-[#ffffff] py-8 px-4 sm:px-6 lg:px-8 border-t border-[#3f6d67]/30">
        <p className="max-w-7xl mx-auto font-h3 text-xs sm:text-sm text-slate-200 text-center sm:text-left">
          After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click.
        </p>
      </div>

      {/* Toast Notification upon Download */}
      {downloadToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#0c2940] text-[#ffffff] px-4 py-3 rounded-lg shadow-xl border border-[#f8c51c]/40 flex items-center gap-2.5 text-xs font-h3 animate-fade-in">
          <Check className="w-4 h-4 text-[#f8c51c]" />
          <span>
            Downloaded <strong>{downloadToast}</strong>. After you download, we’ll follow up with more frameworks like these.
          </span>
        </div>
      )}
    </div>
  );
};
