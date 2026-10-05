import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  ArrowRight,
  FileText,
  Calculator,
  Layers,
  Award,
  DollarSign,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Shield,
  HelpCircle,
  Eye
} from 'lucide-react';
import {
  PLAYBOOK_RESOURCES,
  CASE_STUDIES,
  TAX_INCENTIVES_DATA,
  GLOSSARY_CATEGORIES,
  PlaybookResource,
  UNIVERSAL_GRANT_PROMPT
} from '../data/playbookData';
import { ParticleCanvas } from './ParticleCanvas';

interface PlaybookViewProps {
  onSelectResourceForDownload: (resource: PlaybookResource) => void;
  onOpenTripsCalculator: () => void;
  onOpenPromptViewer: () => void;
  onOpenBusinessCasePreview: () => void;
  onBookDiscovery: () => void;
}

type FilterCategory = 'All' | 'Leadership' | 'Strategy' | 'Readiness' | 'Evidence' | 'Funding' | 'Glossary';

export const PlaybookView: React.FC<PlaybookViewProps> = ({
  onSelectResourceForDownload,
  onOpenTripsCalculator,
  onOpenPromptViewer,
  onOpenBusinessCasePreview,
  onBookDiscovery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('aurilis');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('AI Core Concepts');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const filterTabs: FilterCategory[] = [
    'All',
    'Leadership',
    'Strategy',
    'Readiness',
    'Evidence',
    'Funding',
    'Glossary'
  ];

  // Filtered resources
  const filteredResources = useMemo(() => {
    return PLAYBOOK_RESOURCES.filter((res) => {
      const matchesCategory =
        selectedCategory === 'All' || res.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        res.title.toLowerCase().includes(q) ||
        res.subtitle.toLowerCase().includes(q) ||
        res.metaString.toLowerCase().includes(q) ||
        res.highlights.some((h) => h.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCaseStudy = useMemo(() => {
    return CASE_STUDIES.find((cs) => cs.id === selectedCaseId) || CASE_STUDIES[0];
  }, [selectedCaseId]);

  const activeGlossaryGroup = useMemo(() => {
    return (
      GLOSSARY_CATEGORIES.find((g) => g.name === selectedGlossaryCategory) ||
      GLOSSARY_CATEGORIES[0]
    );
  }, [selectedGlossaryCategory]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(UNIVERSAL_GRANT_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2400);
  };

  return (
    <div className="w-full bg-white text-[#0c2940]">
      {/* ──────────────────────────────────────────────────
          HERO SECTION with Moving Particle Animation
          ────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#0c2940] text-white pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-white/10">
        {/* Animated Particle Canvas in TBG palette */}
        <ParticleCanvas className="opacity-90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Unboxed Brand Subtitle / Kicker */}
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#f8c51c]">
            <span>The Bradbury Group</span>
            <span aria-hidden="true">·</span>
            <span>Open Executive Playbook</span>
          </div>

          {/* User Brief Hero Headline */}
          <h1 className="font-h1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight text-balance">
            Our Playbook, It’s Open
          </h1>

          {/* User Brief Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed">
            The frameworks below come straight from paid engagements. Download what you need, skip what you don’t.
          </p>

          {/* Quiet Trust Anchors */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39918d]"></span>
              Field-tested across 12,000+ professionals
            </span>
            <span className="hidden sm:inline text-slate-600" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f8c51c]"></span>
              No paywalls or sales calls required
            </span>
            <span className="hidden sm:inline text-slate-600" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c57b4b]"></span>
              Direct forward-to-manager formats
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          FILTER BAR & SEARCH SECTION
          ────────────────────────────────────────────────── */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3.5">
          {/* Filter Bar: All | Leadership | Strategy | Readiness | Evidence | Funding | Glossary */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {filterTabs.map((tab) => {
                const isActive = selectedCategory === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedCategory(tab)}
                    className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0c2940] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0c2940] hover:bg-slate-200/70'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🔍 Search resources input */}
          <div className="w-full md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0c2940] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          MAIN FRAMEWORK CARDS & PLAYBOOK CONTENT
          ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* Results Counter if Filtered */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
            <span>
              Showing {filteredResources.length} of {PLAYBOOK_RESOURCES.length} frameworks
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-[#39918d] hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <p className="font-h2 text-base font-bold text-[#0c2940]">No resources found</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No playbook frameworks matched your search. Try resetting filters or search for "ROI", "Scorecard", or "Tax".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-[#0c2940] text-white rounded-lg cursor-pointer"
            >
              Show All Resources
            </button>
          </div>
        ) : null}

        {/* ──────────────────────────────────────────────────
            01 · Leadership & Case · PDF
            The Pre-Written Business Case
            ────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Leadership') &&
          (!searchQuery ||
            'the pre-written business case 01 leadership dol framework roi competitive risk'.includes(
              searchQuery.toLowerCase()
            )) && (
            <article className="relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Meta Header - Unboxed Zero-Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#39918d]">
                    <span>01</span>
                    <span aria-hidden="true">·</span>
                    <span>Leadership &amp; Case</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">PDF Memo &amp; Slide Deck</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Ready to forward</span>
                </div>

                {/* Title and Description */}
                <div className="space-y-2 max-w-3xl">
                  <h2 className="font-h2 text-2xl sm:text-3xl font-bold text-[#0c2940]">
                    The Pre-Written Business Case
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                    We already wrote the ROI language, the cost breakdown, and the role clarity your manager is going to ask for. Just forward it.
                  </p>
                </div>

                {/* Highlights Line matching exact user brief */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 flex flex-wrap items-center gap-y-2 gap-x-4">
                  <span className="text-[#39918d] font-bold">→</span>
                  <span className="font-medium text-[#0c2940]">DOL framework</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-medium text-[#0c2940]">Competitive risk</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-600">
                    Participation: <strong className="text-[#0c2940]">2 sessions/week</strong>, ~2 hrs + homework
                  </span>
                </div>

                {/* Pre-written Memo Snippet Teaser */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white/70 text-xs text-slate-600 font-mono space-y-1">
                  <div className="text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                    Forwardable Email Pitch Preview
                  </div>
                  <p className="text-slate-700 line-clamp-2 italic">
                    "I wanted to share a concrete proposal to systematically upskill our team in operational AI rather than continuing with fragmented individual tools. TBG runs an applied cohort aligned with federal DOL standards..."
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const res = PLAYBOOK_RESOURCES.find((r) => r.id === 'leadership-case')!;
                      onSelectResourceForDownload(res);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={onOpenBusinessCasePreview}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-[#0c2940] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Preview &amp; Copy Email Memo</span>
                  </button>
                </div>
              </div>
            </article>
          )}

        {/* ──────────────────────────────────────────────────
            02 · Strategy & Prioritization · Scorecard
            TRIPS: Score Before You Spend
            ────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Strategy') &&
          (!searchQuery ||
            'trips score before you spend 02 strategy prioritization time risk impact pain security'.includes(
              searchQuery.toLowerCase()
            )) && (
            <article className="relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#c57b4b]">
                    <span>02</span>
                    <span aria-hidden="true">·</span>
                    <span>Strategy &amp; Prioritization</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">Executive Scorecard</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Scoping model</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 max-w-3xl">
                  <h2 className="font-h2 text-2xl sm:text-3xl font-bold text-[#0c2940]">
                    TRIPS: Score Before You Spend
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                    Rank your top 5 AI opportunities across five dimensions before you commit a dollar. Same scorecard we use to scope client engagements.
                  </p>
                </div>

                {/* Highlights Line: Time · Risk · Impact · Pain · Security */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 flex flex-wrap items-center gap-y-2 gap-x-4">
                  <span className="text-[#c57b4b] font-bold">→</span>
                  <span className="font-medium text-[#0c2940]">Time</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-medium text-[#0c2940]">Risk</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-medium text-[#0c2940]">Impact</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-medium text-[#0c2940]">Pain</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-medium text-[#0c2940]">Security</span>
                </div>

                {/* Interactive Visual Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs text-center">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-[#0c2940] block font-h2">Time</span>
                    <span className="text-slate-500 text-[11px]">Speed to value</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-[#0c2940] block font-h2">Risk</span>
                    <span className="text-slate-500 text-[11px]">Containment</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-[#0c2940] block font-h2">Impact</span>
                    <span className="text-slate-500 text-[11px]">Revenue/Output</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-[#0c2940] block font-h2">Pain</span>
                    <span className="text-slate-500 text-[11px]">Staff friction</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-[#0c2940] block font-h2">Security</span>
                    <span className="text-slate-500 text-[11px]">Zero PII leakage</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const res = PLAYBOOK_RESOURCES.find((r) => r.id === 'strategy-trips')!;
                      onSelectResourceForDownload(res);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Scorecard</span>
                  </button>

                  <button
                    onClick={onOpenTripsCalculator}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-[#0c2940] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#c57b4b]" />
                    <span>Test Your Initiative (Interactive Calculator)</span>
                  </button>
                </div>
              </div>
            </article>
          )}

        {/* ──────────────────────────────────────────────────
            03 · Workforce Readiness · PDF Worksheet
            The Core 4
            ────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Readiness') &&
          (!searchQuery ||
            'the core 4 workforce readiness 03 pain point use case pilot success metric worksheet'.includes(
              searchQuery.toLowerCase()
            )) && (
            <article className="relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#3f6d67]">
                    <span>03</span>
                    <span aria-hidden="true">·</span>
                    <span>Workforce Readiness</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">PDF Worksheet</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">4-Stage Implementation</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 max-w-3xl">
                  <h2 className="font-h2 text-2xl sm:text-3xl font-bold text-[#0c2940]">
                    The Core 4
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                    Four steps that take you from a vague AI hunch to a measurable, defensible win.
                  </p>
                </div>

                {/* Interactive Stepper / Pipeline: Pain Point → Use Case → Pilot → Success Metric */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0c2940] uppercase tracking-wider">
                    <span>The Core 4 Progression</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#3f6d67]">STEP 01</span>
                      <h4 className="font-h2 text-xs font-bold text-[#0c2940]">Pain Point</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Identify chronic weekly friction (&gt;4 hrs lost).
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#3f6d67]">STEP 02</span>
                      <h4 className="font-h2 text-xs font-bold text-[#0c2940]">Use Case</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Define strict inputs, transformations, and outputs.
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#3f6d67]">STEP 03</span>
                      <h4 className="font-h2 text-xs font-bold text-[#0c2940]">Pilot</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Run a 30-day contained sandbox with 5 champions.
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#3f6d67]">STEP 04</span>
                      <h4 className="font-h2 text-xs font-bold text-[#0c2940]">Success Metric</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Measure hours saved, error rate, and adoption.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editorial Quote matching exact user brief */}
                <div className="pl-4 border-l-2 border-[#f8c51c] py-1 text-sm sm:text-base text-slate-700 italic font-medium font-body">
                  “Prove one use case. That proof becomes the playbook for the next.”
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const res = PLAYBOOK_RESOURCES.find((r) => r.id === 'workforce-readiness')!;
                      onSelectResourceForDownload(res);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Worksheet</span>
                  </button>
                </div>
              </div>
            </article>
          )}

        {/* ──────────────────────────────────────────────────
            04 · Evidence & Benchmarks · Whitepaper
            Five Case Studies, Full Metrics
            ────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Evidence') &&
          (!searchQuery ||
            'five case studies full metrics 04 evidence benchmarks whitepaper aurilis teresa leah andy ncemch'.includes(
              searchQuery.toLowerCase()
            )) && (
            <article className="relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#39918d]">
                    <span>04</span>
                    <span aria-hidden="true">·</span>
                    <span>Evidence &amp; Benchmarks</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">Whitepaper &amp; Field Data</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Board-ready metrics</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 max-w-3xl">
                  <h2 className="font-h2 text-2xl sm:text-3xl font-bold text-[#0c2940]">
                    Five Case Studies, Full Metrics
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                    All 5 case studies with full metrics, built to forward to your board or your most skeptical colleague.
                  </p>
                </div>

                {/* Interactive Chips matching exact user brief: Aurilis · Teresa · Leah · Andy · NCEMCH · Surpassing Benchmarks */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Select a case study to view verified outcomes:
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                    {CASE_STUDIES.map((cs) => {
                      const isSelected = selectedCaseId === cs.id;
                      return (
                        <button
                          key={cs.id}
                          onClick={() => setSelectedCaseId(cs.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-white text-[#0c2940] shadow-xs'
                              : 'text-slate-600 hover:text-[#0c2940]'
                          }`}
                        >
                          {cs.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Case Study Detail Box */}
                <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <div className="text-xs text-[#39918d] font-bold font-h2 uppercase tracking-wide">
                        {activeCaseStudy.sector}
                      </div>
                      <h4 className="font-h2 text-lg sm:text-xl font-bold text-[#0c2940]">
                        {activeCaseStudy.name}
                      </h4>
                    </div>

                    <div className="text-xs sm:text-sm font-mono font-bold text-[#0c2940] bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs self-start sm:self-auto">
                      {activeCaseStudy.metric}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
                    {activeCaseStudy.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-700 block mb-0.5">The Challenge</span>
                      <span className="text-slate-600">{activeCaseStudy.challenge}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-700 block mb-0.5">TBG Solution</span>
                      <span className="text-slate-600">{activeCaseStudy.solution}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs italic text-slate-600 border-t border-slate-200">
                    {activeCaseStudy.quote} — <span className="font-semibold text-slate-700 not-italic">{activeCaseStudy.author}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const res = PLAYBOOK_RESOURCES.find((r) => r.id === 'evidence-benchmarks')!;
                      onSelectResourceForDownload(res);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Whitepaper</span>
                  </button>
                </div>
              </div>
            </article>
          )}

        {/* ──────────────────────────────────────────────────
            05 · U.S. Tax Credits & Incentives · PDF
            Three Paths to Offset Your Investment
            ────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Funding') &&
          (!searchQuery ||
            'three paths to offset your investment 05 us tax credits incentives irs 127 162 state grant prompt'.includes(
              searchQuery.toLowerCase()
            )) && (
            <article className="relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#39918d]">
                    <span>05</span>
                    <span aria-hidden="true">·</span>
                    <span>U.S. Tax Credits &amp; Incentives</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">PDF &amp; Prompt Generator</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Financial offsets</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 max-w-3xl">
                  <h2 className="font-h2 text-2xl sm:text-3xl font-bold text-[#0c2940]">
                    Three Paths to Offset Your Investment
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                    Leverage federal educational assistance, state-level workforce modernization credits, and professional development expense deductions to offset enterprise AI training.
                  </p>
                </div>

                {/* Financial Table matching exact user brief */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#0c2940] text-white font-h2 text-[11px] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Path</th>
                          <th className="py-3 px-4 font-semibold">Benefit</th>
                          <th className="py-3 px-4 font-semibold">Detail</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white font-body">
                        {TAX_INCENTIVES_DATA.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-[#0c2940] whitespace-nowrap font-h2">
                              {row.path}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-medium text-[#39918d] whitespace-nowrap tabular-nums">
                              {row.benefit}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              {row.detail}
                              <span className="block text-[11px] text-slate-400 mt-0.5">
                                {row.eligibility}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Universal Prompt Card Feature */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#39918d]" />
                      <h4 className="font-h2 text-xs sm:text-sm font-bold text-[#0c2940]">
                        Universal Prompt for Grants and Tax Credits
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyPrompt}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-700 transition-colors cursor-pointer"
                      >
                        {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPrompt ? 'Copied' : 'Quick Copy'}</span>
                      </button>
                      <button
                        onClick={onOpenPromptViewer}
                        className="inline-flex items-center gap-1 text-xs text-[#39918d] hover:underline font-semibold cursor-pointer"
                      >
                        <span>Expand Prompt</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-normal">
                    Pre-structured corporate tax prompt drafted by senior grants counsel. Input your cohort size and budget to generate compliant §127 plan memorandums and state workforce training applications in minutes.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const res = PLAYBOOK_RESOURCES.find((r) => r.id === 'tax-credits-funding')!;
                      onSelectResourceForDownload(res);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Universal Prompt for Grants and Tax Credits</span>
                  </button>
                </div>
              </div>
            </article>
          )}

        {/* ──────────────────────────────────────────────────
            06 · Reference & Taxonomy · Glossary
            The Only AI Glossary You’ll Actually Read
            ────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Glossary') &&
          (!searchQuery ||
            'the only ai glossary youll actually read 06 reference taxonomy ai core concepts how the ai thinks safety check'.includes(
              searchQuery.toLowerCase()
            )) && (
            <article className="relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#0c2940]">
                    <span>06</span>
                    <span aria-hidden="true">·</span>
                    <span>Reference &amp; Taxonomy</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">Living Lexicon</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Plain language · Actionable</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 max-w-3xl">
                  <h2 className="font-h2 text-2xl sm:text-3xl font-bold text-[#0c2940]">
                    The Only AI Glossary You’ll Actually Read
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                    All plain language. All actionable. Each definition includes an example in action, best practice, and a “why it matters” section.
                  </p>
                </div>

                {/* 5 Core Sections matching user brief:
                    AI Core Concepts · How the AI “Thinks” · The Architect’s Safety Check · AI Strategy and Application · Advanced Tools */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Explore Glossary Modules:
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                    {GLOSSARY_CATEGORIES.map((cat) => {
                      const isSelected = selectedGlossaryCategory === cat.name;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedGlossaryCategory(cat.name)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-white text-[#0c2940] shadow-xs'
                              : 'text-slate-600 hover:text-[#0c2940]'
                          }`}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Category Term Cards */}
                <div className="space-y-4">
                  <div className="text-xs text-slate-500 italic">
                    {activeGlossaryGroup.description}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeGlossaryGroup.terms.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-h2 text-base font-bold text-[#0c2940]">
                            {item.term}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            TERM 0{idx + 1}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-body">
                          {item.definition}
                        </p>

                        <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                          <div>
                            <span className="font-semibold text-[#0c2940] block text-[11px] uppercase tracking-wider">
                              Example in action:
                            </span>
                            <span className="text-slate-600">{item.exampleInAction}</span>
                          </div>

                          <div>
                            <span className="font-semibold text-[#39918d] block text-[11px] uppercase tracking-wider">
                              Best practice:
                            </span>
                            <span className="text-slate-600">{item.bestPractice}</span>
                          </div>

                          <div>
                            <span className="font-semibold text-[#c57b4b] block text-[11px] uppercase tracking-wider">
                              Why it matters:
                            </span>
                            <span className="text-slate-600">{item.whyItMatters}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const res = PLAYBOOK_RESOURCES.find((r) => r.id === 'reference-glossary')!;
                      onSelectResourceForDownload(res);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f8c51c] hover:bg-[#f8c51c]/90 text-[#0c2940] text-xs font-bold uppercase tracking-wider font-h3 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Glossary</span>
                  </button>
                </div>
              </div>
            </article>
          )}
      </div>

      {/* ──────────────────────────────────────────────────
          FOLLOW-UP LEAD CAPTURE & REASSURANCE BANNER
          "After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click."
          ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="w-10 h-10 bg-[#f8c51c]/20 text-[#0c2940] rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 text-[#39918d]" />
          </div>
          <h3 className="font-h2 text-xl sm:text-2xl font-bold text-[#0c2940]">
            Continuous Framework Updates
          </h3>
          <p className="text-sm text-slate-600 font-body max-w-lg mx-auto">
            After you download, we’ll follow up with more frameworks like these. Unsubscribe in 1 click anytime.
          </p>
          <div className="pt-2">
            <button
              onClick={onBookDiscovery}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0c2940] hover:bg-[#0c2940]/90 text-white text-xs font-bold uppercase tracking-wider font-h3 transition-all cursor-pointer"
            >
              <span>Speak with a TBG Practice Partner</span>
              <ArrowRight className="w-4 h-4 text-[#f8c51c]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
