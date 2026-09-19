import {
  AggregateMetric,
  PractitionerCase,
  CohortOutcome,
  ExecutiveCase,
  OrgCase,
  SectorItem,
} from './types';

export const AGGREGATE_METRICS: AggregateMetric[] = [
  {
    id: 'annual-value',
    metric: 'Documented annual value (single executive engagement)',
    value: '$62,224',
    subtext: 'Validated executive return',
    icon: 'TrendingUp',
  },
  {
    id: 'timeline-compression',
    metric: 'Organizational timeline compression',
    value: '75%',
    subtext: '3–4 months reduced to 30 days',
    icon: 'Zap',
  },
  {
    id: 'workflow-speed',
    metric: 'Average workflow speed optimization',
    value: '~98%',
    subtext: '5+ hours reduced to <2 minutes',
    icon: 'Gauge',
  },
  {
    id: 'software-required',
    metric: 'New software required',
    value: '$0',
    subtext: 'Leveraging existing infrastructure',
    icon: 'ShieldCheck',
  },
];

export const PRACTITIONER_CASES: PractitionerCase[] = [
  {
    id: 'aurilis-sanchez',
    name: 'AURILIS SANCHEZ',
    role: 'Instructional Designer / L&D',
    categoryTag: 'Rapid AI Assistant Build',
    tagline: 'Built a working AI tool in under 2 hours.',
    narrative:
      "Aurilis had to debug PowerBI formulas she didn't fully understand. Five-plus hours of work. Multiple failed attempts. She built a custom AI assistant in less than two hours using what she learned in the cohort. The assistant diagnosed the error in under a minute.",
    metrics: [
      { metric: 'Time reduction', result: '98% (5+ hours → <2 minutes)' },
      { metric: 'Build time for solution', result: '<2 hours' },
      { metric: 'Resolution speed', result: '45–55 seconds per fix (confirmed live)' },
      { metric: 'New tools purchased', result: '$0' },
    ],
    skillGained:
      'A repeatable framework for AI assistant creation she now applies to other bottlenecks.',
  },
  {
    id: 'teresa-waggoner',
    name: 'TERESA WAGGONER',
    role: 'Learning Experience Designer',
    categoryTag: 'Multi-LLM Benchmarking',
    tagline: 'Tested 3 tools, picked the right one, saved weeks.',
    narrative:
      'Teresa needed quality content for scenario-based learning modules. Accessing SMEs was expensive and slow, costing 10–80 hours per project just for the research. She ran the same custom system prompt across Gemini, ChatGPT, and Claude. Then she compared outputs critically, judged which was best, and made her decision in under 7 minutes. Claude won: developer-ready output, deeper scenarios, better structure.',
    metrics: [
      { metric: 'Tools tested head-to-head', result: '3' },
      { metric: 'Best output generated in', result: '<7 minutes' },
      { metric: 'Research time reduction', result: '64%' },
      { metric: 'Hours saved per project', result: '10–80' },
    ],
    skillGained:
      'Critical evaluation of LLM outputs, the ability to run structured comparisons and make defensible tool decisions.',
  },
  {
    id: 'leah-otsig',
    name: 'LEAH OTSIG',
    role: 'eLearning Developer / Corporate Trainer (University System)',
    categoryTag: 'Institutional Governance',
    tagline: 'Cut her approval bottleneck from 14 days to 5.',
    narrative:
      "Leah spent 14 days and 40+ hour cycles waiting for storyboards to move from designed to approved. Four revision rounds. Inside a university system that doesn't move fast for anyone. She used university-approved tools to streamline the process: AI-assisted drafting, intelligent iteration, and structured revision. One revision round instead of four.",
    metrics: [
      { metric: 'Approval time', result: '14 days → 5 days (64% reduction)' },
      { metric: 'Revision rounds', result: '4 → 1 (75% fewer)' },
      { metric: 'Labor in revision loop', result: '80% less' },
      { metric: 'AI readiness score before human review', result: '9.2 / 10' },
      { metric: 'New tools purchased', result: '$0' },
    ],
    skillGained:
      'Workflow optimization and scaling AI inside constrained, institutional environments.',
  },
];

export const COHORT_OUTCOMES: CohortOutcome[] = [
  {
    metric: 'Confidence gains in AI use',
    result: '66–80% increase',
    detail: 'Measured through pre- and post-cohort diagnostic self-assessments',
  },
  {
    metric: 'Weekly time freed for strategic work',
    result: '2+ hours',
    detail: 'Eliminating repetitive manual bottlenecks and triage friction',
  },
  {
    metric: 'Average task completion improvement',
    result: '75%+ faster in targeted workflows',
    detail: 'Verified across prompt authoring, debugging, and synthesis pipelines',
  },
];

export const EXECUTIVE_CASE: ExecutiveCase = {
  name: 'ANDY IVEY',
  title: 'Fundraising Lead',
  organization: 'Family Legacy (8,000 sponsored children in Zambia)',
  tagline: 'From fear to $62K in annual value.',
  narrative:
    'Andy told me on our first call: "I\'m terrified of AI. I don\'t know where to start. And I\'m not sure it\'s for me." He was willing to try. Six weeks later, he had a 5-year strategic plan, three custom AI assistants, and a clear path to scale his impact without scaling his team.',
  recoveredHours: [
    { item: 'Presentation scripts', hours: '10 hours' },
    { item: 'Stewardship reporting', hours: '20 hours' },
    { item: 'Strategic planning (2030 roadmap)', hours: '40 hours' },
  ],
  freedTeamMembers: 7,
  immediateValueCaptured: '$20,000',
  roi: {
    trainingInvestment: '$4,500',
    projectedAnnualReturn: '$62,224',
    returnPerDollar: '$13.83',
    benchmarkComparison:
      'Outperforms Microsoft-IDC 2024 Global AI Research ($3.70 average, $10.30 "AI Leader" tier)',
  },
  quote:
    'I walked in convinced this wasn\'t for me. I walked out with a 5-year strategic plan, three custom AI assistants, and a clear path to scale my impact without scaling my team.',
};

export const ORG_CASE: OrgCase = {
  name: 'NATIONAL CENTER FOR EDUCATION IN MATERNAL AND CHILD HEALTH (NCEMCH)',
  tagline: 'Six months embedded. Measurable transformation across every dimension.',
  narrative:
    'NCEMCH operates at the intersection of public health research and federal program evaluation. Their executive director had a choice: continue pushing his small staff through bottleneck after bottleneck, or rethink how work moves through the organization entirely. He chose the second, and he led the way personally.\n\nWe embedded for six months and built four operational pillars: a unified knowledge architecture for 700+ evidence-based strategies, an automated intake and triage system, an AI-powered analyst engine, and a dynamic report generator. The human team shifted from data processing to judgment and strategy.',
  fourPillars: [
    {
      title: '1. Unified Knowledge Architecture',
      desc: 'Centralized and vector-indexed 700+ evidence-based public health strategies for instantaneous reference.',
    },
    {
      title: '2. Automated Intake & Triage System',
      desc: 'Pre-screens, formats, and routes incoming evaluation submissions directly into structured workspaces.',
    },
    {
      title: '3. AI-Powered Analyst Engine',
      desc: 'Calculates preliminary evidence matching scores, pre-populating analytical drafts before review.',
    },
    {
      title: '4. Dynamic Report Generator',
      desc: 'Assembles review-ready executive briefs and federal reporting documentation in minutes.',
    },
  ],
  benchmarks: [
    {
      benchmark: 'Annual review cycle',
      before: '3–4 months',
      after: '30 days',
      impact: '75% compression',
    },
    {
      benchmark: 'Executive coordination time',
      before: 'High-friction tactical management',
      after: 'Delegated execution',
      impact: '50% reduction',
    },
    {
      benchmark: 'Research synthesis',
      before: '3 weeks',
      after: '8 hours',
      impact: '95% faster',
    },
    {
      benchmark: 'Prompt iteration',
      before: '45 minutes per setup',
      after: '4 minutes',
      impact: '91% speed gain',
    },
    {
      benchmark: 'Evidence matching (700+ strategies)',
      before: 'Manual cross-referencing',
      after: 'Instant semantic search',
      impact: 'From hours to seconds',
    },
  ],
  quotes: [
    {
      genericRole: 'Executive Director',
      fullName: 'John Richards',
      leadTask: 'Operational Governance & Bandwidth',
      quote:
        "I know I often become the bottleneck because I hold the big picture. Having structured AI assistants moves me from being the 'doer' to the 'approver,' protecting executive bandwidth for high-level strategy.",
    },
    {
      genericRole: 'Research Lead',
      fullName: 'Dr. Lan Le',
      leadTask: 'Literature Review & Scientific Rigor',
      quote:
        'Automating our data collection and synthesis through structured prompts removes the manual friction of literature reviews, allowing the team to focus on scientific rigor and strategy alignment.',
    },
    {
      genericRole: 'Project Lead',
      fullName: 'Becky Burns',
      leadTask: 'ESM Testing & Measure Processing',
      quote:
        "Taking ownership of the ESM testing with 'Scout' showed how quickly we can process measures when the initial extraction and evidence matching are pre-calculated for us.",
    },
    {
      genericRole: 'Research & Operations Staff',
      fullName: 'Sarah',
      leadTask: 'Delimiters & Prompt Engineering',
      quote:
        'Learning to use delimiters and meta-prompts dropped our iteration times from 45 minutes down to under 5 minutes. It transformed AI from an unpredictable chat box into a reliable daily worktool.',
    },
  ],
};

export const SECTOR_DATA: SectorItem[] = [
  {
    id: 'federal',
    title: 'Federal Agencies & Research Centers',
    example: 'Federal Program Evaluation & Maternal Health Center (NCEMCH)',
    challenge: 'Heavy regulatory oversight, 700+ complex evidence-based standards, 3-week literature review bottlenecks.',
    transformation: '75% timeline compression; instant semantic cross-referencing; shifted scientists from data scrubbing to critical evaluation.',
  },
  {
    id: 'education',
    title: 'Higher Education & University Systems',
    example: 'Major State University Corporate Training Division (Leah Otsig)',
    challenge: 'Institutional bureaucracy, rigid governance, multi-week 4-stage approval loops with 14+ day cycle lag.',
    transformation: '64% approval time reduction (14 days down to 5), 75% fewer revision loops using pre-existing, approved internal tools.',
  },
  {
    id: 'nonprofit',
    title: 'Global Nonprofits & NGOs',
    example: 'Family Legacy (Serving 8,000 sponsored children in Zambia)',
    challenge: 'Leadership initial skepticism, lean staff overwhelmed by strategic planning and stewardship reporting.',
    transformation: 'Recovered 70+ executive hours in 6 weeks, freed 7 team members for on-the-ground mission work, generated $62K+ annual return.',
  },
  {
    id: 'municipal',
    title: 'Municipalities & Public Sector',
    example: 'Local Government Workflow & Public Service Teams',
    challenge: 'Under-resourced public servants handling high volume citizen queries and documentation compliance.',
    transformation: 'Repeatable prompt frameworks that triage and synthesize public records with $0 added software budget.',
  },
  {
    id: 'private',
    title: 'Private-Sector & Enterprise Teams',
    example: 'Instructional & Product Design Teams (Aurilis Sanchez, Teresa Waggoner)',
    challenge: 'SME access cost bottlenecks ($10–80h research per module), formula errors blocking delivery.',
    transformation: '98% debug speed optimization; multi-model selection (Claude/Gemini/ChatGPT) evaluated in under 7 minutes.',
  },
];
