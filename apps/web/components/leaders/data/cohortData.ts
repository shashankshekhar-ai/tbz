export interface AndyStat {
  metric: string;
  detail: string;
  hoursOrCount: string;
}

export const ANDY_STATS: AndyStat[] = [
  {
    metric: 'Presentation Scripts',
    detail: 'Hours reclaimed on high-stakes presentation writing',
    hoursOrCount: '10 hrs'
  },
  {
    metric: 'Stewardship Reporting',
    detail: 'Hours reclaimed on recurring donor stewardship reports',
    hoursOrCount: '20 hrs'
  },
  {
    metric: 'Strategic Planning',
    detail: 'Hours saved formulating the 2030 organizational roadmap',
    hoursOrCount: '40 hrs'
  },
  {
    metric: 'Team Capacity Unlocked',
    detail: 'Team members freed to focus directly on mission-critical work',
    hoursOrCount: '7 staff'
  }
];

export const ANDY_CASE_STUDY = {
  headline: 'From Fear to $62K in Annual Value',
  subheading: "Andy Ivey, first six weeks",
  body: "Andy didn't just learn about AI. He built a strategic blueprint his organization now executes on.",
  immediateValue: '$20,000',
  investment: '$4,500',
  projectedAnnualValue: '$62,224',
  roiPerDollar: '$13.83 returned for every dollar invested',
  benchmarkContext: 'outperforming Microsoft-IDC 2024 Global AI Research benchmarks and validated against TBG Cohort Pilot outcomes.',
  quote: '"I walked in convinced this wasn\'t for me. I walked out with a 5-year strategic plan, three custom AI assistants, and a clear path to scale my impact without scaling my team."',
  author: 'Andy Ivey',
  authorTitle: 'Fundraising Lead, Family Legacy. 8,000 sponsored children in Zambia.'
};

export const SOLOMON_ASSISTANTS = [
  {
    id: 'miyagi',
    name: 'Mr. Miyagi',
    role: 'Strategic Coach',
    description: 'Your thinking partner for strategic decisions, board presentations, and five-year planning. Your personal AI advisor.',
    badge: 'STRATEGIC ADVISOR',
    color: '#c57b4b'
  },
  {
    id: 'vertical',
    name: 'Vertical',
    role: 'Custom Domain Engine',
    description: 'Built for your specific needs. Grant writing, financial analysis, data strategy, whatever accelerates your highest-leverage work.',
    badge: 'CUSTOM DOMAIN',
    color: '#39918d'
  },
  {
    id: 'dash',
    name: 'Dash',
    role: 'Brand Content Engine',
    description: 'Maintain your voice while accelerating your messaging, thought leadership, and communications. Your brand amplifier.',
    badge: 'BRAND AMPLIFIER',
    color: '#f8c51c'
  }
];

export const ASSISTANTS = SOLOMON_ASSISTANTS;

export const JOURNEY_TIMELINE = [
  {
    period: 'Weeks 1 to 4',
    tabLabel: '01 / WEEKS 1 TO 4',
    title: "You're building confidence",
    subtitle: 'Foundation, psychology, frameworks',
    outcome: "This is where psychological safety comes first. You build genuine confidence, not fake expertise, and the mental frameworks to think like an AI-augmented leader.",
    status: "You're building confidence"
  },
  {
    period: 'Weeks 5 to 8',
    tabLabel: '02 / WEEKS 5 TO 8',
    title: "You're getting skilled",
    subtitle: 'Building your custom AI arsenal',
    outcome: "Hands-on practice. You build two to three custom AI assistants tailored to how you actually work, calibrated from what I learned in your interview.",
    status: "You're getting skilled"
  },
  {
    period: 'Weeks 9 to 12',
    tabLabel: '03 / WEEKS 9 TO 12',
    title: "You're shipping",
    subtitle: 'Strategy synthesis and blueprint',
    outcome: "The synthesis weeks. You pull twelve weeks of practice into a capstone your board can read, and decide what your organization does next.",
    status: "You're shipping"
  }
];

export const TIMELINE = JOURNEY_TIMELINE;

export const TAX_QUALIFICATIONS = [
  'Executive AI coaching programs',
  'AI tool subscriptions used during and after learning',
  'Strategic training and custom automations'
];

export const DEDUCTION_REQUIREMENTS = [
  'Training must sharpen skills for your current role',
  'Cannot qualify you for an entirely new profession',
  'Must be ordinary and necessary for your business'
];

export const WHAT_WE_PROVIDE = [
  'Course syllabus and learning materials',
  'Detailed invoice and receipt',
  'Certificate of completion',
  'Letter of proof of training',
  'Custom implementation summary (optional)'
];

export const DEFAULT_RECOMMENDATION_LETTER = `Subject: Executive Professional Development Request: The Solomon Engine AI Mastery Journey

Dear [Manager Name],

I am writing to request approval to enroll in The Solomon Engine: AI Mastery for Individual Executives, conducted by The Bradbury Group under Paige Bradbury (CEO & Principal Learning Architect).

As [Company Name] navigates accelerated technological transformation, developing executive AI fluency is essential to scale our leadership impact without expanding headcount.

Program Overview:
• Duration: 12-week intensive 1-on-1 executive coaching journey
• Applied Outcomes: Designing and deploying two to three custom AI assistants (strategic coaching, domain analysis, brand messaging) tailored directly to our workflows.
• Enterprise ROI: Formulating a comprehensive Organizational AI Blueprint including governance frameworks, risk assessment, and phased team rollout strategies.
• Documented Impact: Case studies demonstrate an average $13.83 return for every dollar invested, validated against Microsoft-IDC Global AI benchmarks.

Tax & Budget Qualification:
Tuition qualifies as a deductible professional development and continuing education expense under IRC Section 162. The Bradbury Group provides an itemized corporate invoice, official syllabus, proof of training documentation, and certificate of completion.

Thank you for considering this strategic investment in [Company Name]'s executive capabilities.

Sincerely,

[Your Name]
[Your Title], [Company Name]`;

export const ORGANIZATIONAL_BLUEPRINT = {
  toggleHeading: 'You also leave with an organizational blueprint',
  toggleSubhead: 'A scalable strategy for rolling AI across your organization safely',
  items: [
    '40,000-foot AI strategy aligned to your business goals',
    'Risk assessment and governance framework',
    'Phased rollout plan: who learns first, how to measure success',
    'Team implementation roadmap',
    'Five-year vision document',
  ],
};

export const INVESTMENT_AND_COHORTS = {
  investment: "Customized to your situation, timeline, and scope. Andy's engagement was $4,500.",
  nextCohorts: 'Q4 2026 · Q1 2027 · Q2 2027',
  applicationNote: 'Applications close 30 days before start',
};

export const COHORT_PHASES = [
  {
    phase: 'Phase 1',
    title: 'Executive AI Literacy',
    duration: 'Weeks 1 to 4',
    focus: 'Foundation, Psychology, Mental Models',
    capabilities: [
      'Deconstructing LLM reasoning and agency',
      'Prompt engineering frameworks for executive decision-making',
      'Strategic bottleneck mapping and capability assessment'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Executive AI Fluency',
    duration: 'Weeks 5 to 12',
    focus: 'Custom Assistant Architecture, Operations Engine, Strategic Blueprint',
    capabilities: [
      'Building and deploying 3 custom AI assistants',
      'End-to-end workflow automation and decision synthesis',
      '5-Year Strategic Blueprint and organizational rollout roadmap'
    ]
  }
];

