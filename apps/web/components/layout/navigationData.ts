export type SectionId =
  | 'hero'
  | 'for-you'
  | 'ai-literacy'
  | 'ai-fluency'
  | 'tax-reimbursement'
  | 'manager-letter'
  | 'story'
  | 'advisory'
  | 'partners'
  | 'testimonials'
  | 'team'
  | 'contact'
  | 'leaders-page'
  | 'solomon-interview'
  | 'solomon-engine'
  | 'funding'
  | 'learning-architecture'
  | 'proof-ncemch'
  | 'community-workshops'
  | 'section-practitioners'
  | 'section-leaders'
  | 'resources-hub'
  | 'resource-card-manager-letter'
  | 'resource-card-core4-worksheet'
  | 'resource-card-trips-scorecard'
  | 'resource-card-case-studies'
  | 'resource-card-glossary';

export interface NavItemChild {
  id: string;
  number: string;
  label: string;
  subtitle: string;
  badge?: string;
  actionType: 'navigate' | 'contact' | 'approach';
  targetSection?: SectionId;
}

export interface NavCategory {
  id: string;
  label: string;
  shortLabel?: string;
  microcopy?: string;
  hasDropdown: boolean;
  isOptional?: boolean;
  children?: NavItemChild[];
  featuredLink?: {
    title: string;
    description: string;
    ctaText: string;
    actionType: 'contact' | 'approach' | 'navigate';
    targetSection?: SectionId;
  };
}

export const NAVIGATION_DATA: NavCategory[] = [
  {
    id: 'home',
    label: 'Home',
    hasDropdown: false,
  },
  {
    id: 'about',
    label: 'About',
    microcopy: 'Meet the people, partners, and thinking behind The Bradbury Group.',
    hasDropdown: true,
    children: [
      {
        id: 'paiges-story',
        number: '01',
        label: "Paige's Story",
        subtitle: "Founder's story & vision for human-centered AI",
        actionType: 'navigate',
        targetSection: 'story',
      },
      {
        id: 'advisory-board',
        number: '02',
        label: 'Advisory Board',
        subtitle: 'Advisors guiding The Bradbury Group',
        actionType: 'navigate',
        targetSection: 'advisory',
      },
      {
        id: 'partner-spotlight',
        number: '03',
        label: 'Partner Spotlight',
        subtitle: 'Current partner focus includes Falcon AI',
        badge: 'Falcon AI',
        actionType: 'navigate',
        targetSection: 'partners',
      },
      {
        id: 'testimonials',
        number: '04',
        label: 'Testimonials',
        subtitle: 'Stories and impact from our community',
        actionType: 'navigate',
        targetSection: 'testimonials',
      },
      {
        id: 'our-team',
        number: '05',
        label: 'Our Team',
        subtitle: 'Learning architects, engineers & AI strategists',
        actionType: 'navigate',
        targetSection: 'team',
      },
    ],
  },
  {
    id: 'for-you',
    label: 'For You',
    microcopy: 'Individual Learning & Capability Tracks',
    hasDropdown: true,
    children: [
      {
        id: 'phase-1-ai-literacy',
        number: '01',
        label: 'Phase 1: AI Literacy',
        subtitle: 'Learn to speak AI',
        actionType: 'navigate',
        targetSection: 'ai-literacy',
      },
      {
        id: 'phase-2-ai-fluency',
        number: '02',
        label: 'Phase 2: AI Fluency',
        subtitle: 'Solve a real problem',
        actionType: 'navigate',
        targetSection: 'ai-fluency',
      },
      {
        id: 'tax-reimbursement-block',
        number: '03',
        label: 'Tax & Reimbursement',
        subtitle: 'Employer tuition reimbursement & Section 127 plans',
        actionType: 'navigate',
        targetSection: 'tax-reimbursement',
      },
      {
        id: 'manager-rec-letter',
        number: '04',
        label: 'Manager Recommendation Letter',
        subtitle: 'Pre-written letter for your manager’s sign-off',
        actionType: 'navigate',
        targetSection: 'manager-letter',
      },
    ],
  },
  {
    id: 'for-leaders',
    label: 'For Leaders',
    microcopy: 'Build AI capability across your people, teams, and organization.',
    hasDropdown: true,
    children: [
      {
        id: 'try-ai-interview',
        number: '01',
        label: 'Try the AI Interview',
        subtitle: 'A 30-minute conversation with the Solomon assistant',
        actionType: 'navigate',
        targetSection: 'solomon-interview',
      },
      {
        id: 'the-12-week-journey',
        number: '02',
        label: 'The 12-Week Journey',
        subtitle: 'Foundation, custom AI assistants, and strategy synthesis',
        actionType: 'navigate',
        targetSection: 'solomon-engine',
      },
      {
        id: 'reimbursement-support',
        number: '03',
        label: 'Reimbursement & Support',
        subtitle: 'IRC Section 162 tax deduction guidance',
        actionType: 'navigate',
        targetSection: 'funding',
      },
    ],
  },
  {
    id: 'for-organizations',
    label: 'For Organizations',
    microcopy: 'Design and embed AI capability across your organization.',
    hasDropdown: true,
    children: [
      {
        id: 'learning-architecture-design',
        number: '01',
        label: 'Learning Architecture Design',
        subtitle: 'Custom learning taxonomy & AI skill mapping',
        actionType: 'navigate',
        targetSection: 'learning-architecture',
      },
      {
        id: 'embedded-training-partnership',
        number: '02',
        label: 'Embedded Training Partnership',
        subtitle: 'Co-pilot learning implementation with core teams',
        actionType: 'navigate',
        targetSection: 'proof-ncemch',
      },
      {
        id: 'community-upskilling-workshops',
        number: '03',
        label: 'Community Upskilling Workshops',
        subtitle: 'Workshop Catalog & hands-on capability labs',
        badge: 'Catalog',
        actionType: 'navigate',
        targetSection: 'community-workshops',
      },
      {
        id: 'team-ai-enablement',
        number: '04',
        label: 'Team AI Enablement',
        subtitle: 'Cross-link to For You for team cohort enrollment',
        actionType: 'navigate',
        targetSection: 'for-you',
      },
    ],
  },
  {
    id: 'our-roi',
    label: 'Our ROI',
    shortLabel: 'Our ROI',
    microcopy: 'Measurable impact across individual and leadership levels.',
    hasDropdown: true,
    isOptional: true,
    children: [
      {
        id: 'for-you-results',
        number: '01',
        label: 'For You Results',
        subtitle: 'Individual efficiency, confidence, and fluency metrics',
        actionType: 'navigate',
        targetSection: 'section-practitioners',
      },
      {
        id: 'for-leaders-results',
        number: '02',
        label: 'For Leaders Results',
        subtitle: 'Organizational productivity, retention, and AI ROI',
        actionType: 'navigate',
        targetSection: 'section-leaders',
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    microcopy: 'Practical tools, frameworks, and resources.',
    hasDropdown: true,
    children: [
      {
        id: 'manager-rec-letter-res',
        number: '01',
        label: 'Manager Recommendation Letter',
        subtitle: 'Sponsorship template for corporate approval',
        actionType: 'navigate',
        targetSection: 'resource-card-manager-letter',
      },
      {
        id: 'core4-worksheet',
        number: '02',
        label: 'Core4 Worksheet',
        subtitle: 'Diagnostic tool for baseline AI capability',
        actionType: 'navigate',
        targetSection: 'resource-card-core4-worksheet',
      },
      {
        id: 'trips-scorecard',
        number: '03',
        label: 'TRIPS Scorecard',
        subtitle: 'Framework for evaluating enterprise AI readiness',
        actionType: 'navigate',
        targetSection: 'resource-card-trips-scorecard',
      },
      {
        id: 'case-study-whitepapers',
        number: '04',
        label: 'Case Study Whitepapers',
        subtitle: 'Real-world ROI case studies and blueprints',
        actionType: 'navigate',
        targetSection: 'resource-card-case-studies',
      },
      {
        id: 'glossary',
        number: '05',
        label: 'Glossary',
        subtitle: 'Key concepts in AI learning architecture',
        actionType: 'navigate',
        targetSection: 'resource-card-glossary',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    hasDropdown: false,
  },
];
