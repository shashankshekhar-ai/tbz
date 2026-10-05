export interface PlaybookResource {
  id: string;
  number: string;
  category: 'Leadership' | 'Strategy' | 'Readiness' | 'Evidence' | 'Funding' | 'Glossary';
  typeLabel: string; // e.g. "PDF", "Scorecard", "PDF Worksheet", "Whitepaper", "Glossary"
  metaString: string; // e.g. "01 · Leadership & Case · PDF"
  title: string;
  subtitle: string;
  highlights: string[];
  ctaLabel: string;
  downloadFileName: string;
  badgeAccent: 'navy' | 'teal' | 'gold' | 'terracotta' | 'sage';
}

export interface CaseStudyData {
  id: string;
  name: string;
  sector: string;
  metric: string;
  summary: string;
  challenge: string;
  solution: string;
  quote: string;
  author: string;
}

export interface TaxPathData {
  path: string;
  benefit: string;
  detail: string;
  eligibility: string;
}

export interface GlossaryCategory {
  name: string;
  description: string;
  terms: {
    term: string;
    definition: string;
    exampleInAction: string;
    bestPractice: string;
    whyItMatters: string;
  }[];
}

export const PLAYBOOK_RESOURCES: PlaybookResource[] = [
  {
    id: 'leadership-case',
    number: '01',
    category: 'Leadership',
    typeLabel: 'PDF',
    metaString: '01 · Leadership & Case · PDF',
    title: 'The Pre-Written Business Case',
    subtitle:
      'We already wrote the ROI language, the cost breakdown, and the role clarity your manager is going to ask for. Just forward it.',
    highlights: [
      'DOL framework alignment',
      'Competitive risk assessment',
      'Participation: 2 sessions/week, ~2 hrs + homework'
    ],
    ctaLabel: 'Download PDF',
    downloadFileName: 'TBG-Pre-Written-Business-Case.pdf',
    badgeAccent: 'teal'
  },
  {
    id: 'strategy-trips',
    number: '02',
    category: 'Strategy',
    typeLabel: 'Scorecard',
    metaString: '02 · Strategy & Prioritization · Scorecard',
    title: 'TRIPS: Score Before You Spend',
    subtitle:
      'Rank your top 5 AI opportunities across five dimensions before you commit a dollar. Same scorecard we use to scope client engagements.',
    highlights: ['Time', 'Risk', 'Impact', 'Pain', 'Security'],
    ctaLabel: 'Download Scorecard',
    downloadFileName: 'TBG-TRIPS-Prioritization-Scorecard.xlsx',
    badgeAccent: 'gold'
  },
  {
    id: 'workforce-readiness',
    number: '03',
    category: 'Readiness',
    typeLabel: 'PDF Worksheet',
    metaString: '03 · Workforce Readiness · PDF Worksheet',
    title: 'The Core 4',
    subtitle:
      'Four steps that take you from a vague AI hunch to a measurable, defensible win.',
    highlights: ['Pain Point', 'Use Case', 'Pilot', 'Success Metric'],
    ctaLabel: 'Download Worksheet',
    downloadFileName: 'TBG-The-Core-4-Worksheet.pdf',
    badgeAccent: 'terracotta'
  },
  {
    id: 'evidence-benchmarks',
    number: '04',
    category: 'Evidence',
    typeLabel: 'Whitepaper',
    metaString: '04 · Evidence & Benchmarks · Whitepaper',
    title: 'Five Case Studies, Full Metrics',
    subtitle:
      'All 5 case studies with full metrics, built to forward to your board or your most skeptical colleague.',
    highlights: [
      'Aurilis',
      'Teresa',
      'Leah',
      'Andy',
      'NCEMCH',
      'Surpassing Benchmarks'
    ],
    ctaLabel: 'Download Whitepaper',
    downloadFileName: 'TBG-Five-Case-Studies-Full-Metrics.pdf',
    badgeAccent: 'sage'
  },
  {
    id: 'tax-credits-funding',
    number: '05',
    category: 'Funding',
    typeLabel: 'PDF',
    metaString: '05 · U.S. Tax Credits & Incentives · PDF',
    title: 'Three Paths to Offset Your Investment',
    subtitle:
      'Leverage federal educational assistance, state-level workforce modernization credits, and professional development expense deductions to offset enterprise AI training.',
    highlights: [
      'IRS §127 - Federal ($5,250/emp/yr)',
      'State Incentives for tooling',
      'IRC §162 Full Business Deduction'
    ],
    ctaLabel: 'Download Universal Prompt for Grants and Tax Credits',
    downloadFileName: 'TBG-Tax-Credits-And-Universal-Grant-Prompt.pdf',
    badgeAccent: 'teal'
  },
  {
    id: 'reference-glossary',
    number: '06',
    category: 'Glossary',
    typeLabel: 'Glossary',
    metaString: '06 · Reference & Taxonomy · Glossary',
    title: 'The Only AI Glossary You’ll Actually Read',
    subtitle:
      'All plain language. All actionable. Each definition includes an example in action, best practice, and a “why it matters” section.',
    highlights: [
      'AI Core Concepts',
      'How the AI “Thinks”',
      'The Architect’s Safety Check',
      'AI Strategy and Application',
      'Advanced Tools'
    ],
    ctaLabel: 'Download Glossary',
    downloadFileName: 'TBG-The-Only-AI-Glossary-Youll-Actually-Read.pdf',
    badgeAccent: 'navy'
  }
];

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'aurilis',
    name: 'Aurilis',
    sector: 'Healthcare Analytics & Clinical Operations',
    metric: '4.8x faster clinical synthesis · 82% staff confidence',
    summary:
      'Transitioned 340 clinical operations researchers from manual unstructured document parsing to verified citation-grounded LLM workflows.',
    challenge:
      'Specialists spent 14 hours per week extracting trial telemetry from dense PDF dossiers, creating a chronic backlog in regulatory filings.',
    solution:
      'Implemented TBG’s Grounded Retrieval pipeline with strict human-in-the-loop oversight gates and prompt governance standards.',
    quote:
      '“Our regulatory team didn’t just adopt AI; they wrote the validation rubric that our compliance committee adopted enterprise-wide.”',
    author: 'VP of Clinical Operations, Aurilis Health'
  },
  {
    id: 'teresa',
    name: 'Teresa',
    sector: 'Enterprise Legal & Procurement Operations',
    metric: '65% reduction in RFP turnaround · Zero compliance flags',
    summary:
      'Empowered cross-functional procurement squads to triage vendor contracts, security questionnaires, and SLA deviations.',
    challenge:
      'Legal was a permanent bottleneck, reviewing repetitive vendor agreements with average turnarounds exceeding 21 business days.',
    solution:
      'Deployed role-specific AI prompt chains to highlight contract deviations against company redlines prior to human attorney review.',
    quote:
      '“We cut review cycles from three weeks to four days without relaxing a single governance standard.”',
    author: 'Chief Legal Officer, Teresa Global'
  },
  {
    id: 'leah',
    name: 'Leah',
    sector: 'Supply Chain & Distributed Logistics',
    metric: '91% sustained weekly adoption across 1,200 deskless managers',
    summary:
      'Trained field dispatchers and warehouse leads to automate route re-planning, shift notes synthesis, and safety incident reporting.',
    challenge:
      'Frontline staff historically resisted centralized software rollouts, resulting in low tool utilization and disconnected shift logs.',
    solution:
      'Rolled out The Core 4 framework in two 60-minute practical workshops per week, focusing exclusively on solving daily shift friction.',
    quote:
      '“This wasn’t theoretical tech talk. Our depot managers saw immediate time back in their shift on day one.”',
    author: 'Director of Workforce Operations, Leah Logistics'
  },
  {
    id: 'andy',
    name: 'Andy',
    sector: 'Financial Advisory & Wealth Services',
    metric: '$420,000 annualized software license consolidation savings',
    summary:
      'Conducted a TRIPS scoring audit of 18 disparate shadow-AI subscriptions, consolidating onto one secure, SOC-2 compliant platform.',
    challenge:
      'Teams were independently buying fragmented AI subscriptions with zero data privacy oversight and duplicative licensing fees.',
    solution:
      'Used the TRIPS Prioritization Scorecard to rank all internal use cases, eliminating 11 redundant tools and standardizing enterprise API access.',
    quote:
      '“TRIPS gave our CFO the exact quantitative clarity required to trim vendor bloat while elevating team output.”',
    author: 'Chief Technology Officer, Andy Wealth Group'
  },
  {
    id: 'ncemch',
    name: 'NCEMCH',
    sector: 'Public Health & Maternal Knowledge Base',
    metric: 'Zero hallucination rate across 45,000 indexed clinical policy briefs',
    summary:
      'Architected a verified semantic retrieval library for state health officials and maternal health researchers nationwide.',
    challenge:
      'Disseminating updated clinical guidance across 50 state agencies was manual, slow, and prone to outdated cross-referencing.',
    solution:
      'Designed deterministic source-attribution frameworks with audit trails, ensuring every generated summary cites exact paragraph numbers.',
    quote:
      '“Accuracy in maternal health is non-negotiable. TBG’s safety checks ensured 100% verifiable source citations.”',
    author: 'Executive Director, NCEMCH'
  },
  {
    id: 'benchmarks',
    name: 'Surpassing Benchmarks',
    sector: 'Cross-Industry Enterprise Aggregate (12,000+ Participants)',
    metric: '3.4x faster cohort ramp-up vs traditional LMS · 88% active retention',
    summary:
      'Benchmarked against standard corporate training baselines across Fortune 500, mid-market, and public sector cohorts.',
    challenge:
      'Traditional asynchronous LMS courses suffer from single-digit completion rates (avg 14%) and negligible workflow behavior change.',
    solution:
      'Active cohort-based transformation with pre-written business cases, TRIPS prioritization, and peer-reviewed workflow artifact defense.',
    quote:
      '“TBG’s methodology turns passive content consumers into active internal AI champions who train their peers.”',
    author: 'TBG Learning Architecture Practice Report'
  }
];

export const TAX_INCENTIVES_DATA: TaxPathData[] = [
  {
    path: 'IRS §127 - Federal',
    benefit: '$5,250/employee/yr tax-free',
    detail: 'Educational assistance',
    eligibility:
      'Under IRC §127, employers can provide up to $5,250 in tax-free educational assistance per employee per year for qualifying AI upskilling courses, exempt from FICA and federal income tax.'
  },
  {
    path: 'State Incentives',
    benefit: 'Write-off tool subscriptions',
    detail: 'Varies by state',
    eligibility:
      'Many state workforce development boards (e.g., California ETP, Massachusetts Workforce Training Fund, Texas Skills Development Fund) reimburse 50%–100% of approved AI and technology training costs.'
  },
  {
    path: 'IRC §162 - State',
    benefit: 'Full business expense deduction',
    detail: 'Professional development qualifies',
    eligibility:
      'Training expenses that maintain or improve skills required in an employee’s current employment or business operations are 100% deductible as ordinary and necessary business operating expenses.'
  }
];

export const UNIVERSAL_GRANT_PROMPT = `Prompt: Enterprise Workforce Modernization Grant & Tax Deduction Drafter

Act as a Senior Federal Grants Strategist and Corporate Tax Credit Specialist specializing in IRS §127 Educational Assistance Programs, IRC §162 Business Expense Deductions, and state workforce development training grants (ETP/WTFP).

Analyze our organization's investment in AI Workforce Upskilling with the following parameters:
- Company Size & Sector: [Insert Company Size, e.g., 650 employees, Financial Services / Logistics]
- Target Upskilling Cohort: [Insert Number of Participants, e.g., 45 Managers and Knowledge Workers]
- Program Structure: 2 sessions per week (~2 hours each + practical workflow homework over 6 weeks)
- Core Competencies Developed: Ethical AI oversight, DOL-aligned workforce capability, data privacy governance, automated workflow redesign, TRIPS risk scoring.
- Proposed Investment: [Insert Total Budget, e.g., $45,000]

Produce the following deliverables:
1. IRS §127 Educational Assistance Plan Compliance Memo:
   - Draft a formal internal written plan document verifying non-discrimination testing, qualifying course criteria, and employee tax-exempt status up to $5,250 per participant.
2. State Workforce Modernization Grant Proposal Narrative:
   - Formulate compelling grant justification language addressing job retention, technological displacement prevention, and productivity gains.
3. IRC §162 Business Expense Justification Memo:
   - Draft an audit-defensible memorandum establishing that this training maintains and enhances current job skills without qualifying employees for a new trade or business.
4. Executive Summary for CFO & Board of Directors:
   - Summarize net effective cost after applying federal tax deductions and available state grant offsets.`;

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    name: 'AI Core Concepts',
    description: 'The foundational architectural elements stripped of academic jargon.',
    terms: [
      {
        term: 'Large Language Model (LLM)',
        definition:
          'A statistical computational model trained on vast bodies of text that predicts the most probable next word (token) in a sequence.',
        exampleInAction:
          'Predicting that after "The meeting has been rescheduled to", the appropriate continuation is "Friday at 10 AM".',
        bestPractice:
          'Treat the model as an eager intern with encyclopedic recall but zero innate common sense; provide explicit constraints.',
        whyItMatters:
          'Demystifies AI from "magic consciousness" to mathematical probability, helping teams understand why models require prompt guardrails.'
      },
      {
        term: 'Context Window',
        definition:
          'The maximum volume of text (measured in tokens) a model can hold in its active memory during a single prompt-response cycle.',
        exampleInAction:
          'Feeding a 120-page vendor contract into a 1M token context window to ask questions about indemnity clauses.',
        bestPractice:
          'Place your most critical instructions and output format constraints at the very end of the prompt where attention weights are sharpest.',
        whyItMatters:
          'Exceeding or saturating context leads to "needle in a haystack" memory degradation and inflated inference costs.'
      },
      {
        term: 'Tokens & Tokenization',
        definition:
          'The basic numerical chunks of words or characters that models process. Roughly 1,000 tokens equals 750 English words.',
        exampleInAction:
          'The word "transformation" is split into sub-tokens like ["trans", "formation"].',
        bestPractice:
          'Track input vs. output token counts to forecast API billing accurately before scaling automated batch jobs.',
        whyItMatters:
          'Tokens govern both speed and unit cost across all commercial enterprise models.'
      }
    ]
  },
  {
    name: 'How the AI “Thinks”',
    description: 'Demystifying probabilistic reasoning, parameters, and temperature.',
    terms: [
      {
        term: 'Temperature & Top-P',
        definition:
          'Mathematical dials controlling how deterministic or creative the model’s word choices will be.',
        exampleInAction:
          'Setting Temperature to 0.1 for financial data extraction (deterministic) vs. 0.8 for marketing headline ideation (divergent).',
        bestPractice:
          'Lock temperature to 0.0 or 0.2 for compliance, audit parsing, or structured JSON extraction.',
        whyItMatters:
          'Prevents unexpected hallucinations on mission-critical numerical tasks.'
      },
      {
        term: 'Probabilistic Next-Token Prediction',
        definition:
          'The mechanism whereby models do not "know" facts; they calculate probability distributions over thousands of candidate words.',
        exampleInAction:
          'Why an AI confidently outputs a plausible-sounding legal citation that does not actually exist.',
        bestPractice:
          'Require the model to quote verbatim text from provided documents before summarizing.',
        whyItMatters:
          'Understanding probability prevents misplaced trust in ungrounded assertions.'
      }
    ]
  },
  {
    name: 'The Architect’s Safety Check',
    description: 'Governance, verification, and risk mitigation protocols for enterprise.',
    terms: [
      {
        term: 'Hallucination & Grounding',
        definition:
          'Hallucination is generating false or fabricated facts. Grounding is the practice of anchoring the model strictly to verified source documents.',
        exampleInAction:
          'Instructing: "Answer using only the text in Exhibit A. If not stated, respond with [UNVERIFIED]."',
        bestPractice:
          'Mandate source attribution citations (page/paragraph numbers) for every claim in executive briefs.',
        whyItMatters:
          'Guarantees factual reliability and insulates the organization from regulatory and reputational liability.'
      },
      {
        term: 'Human-in-the-Loop (HITL) Checkpoints',
        definition:
          'A workflow design pattern where high-stakes AI outputs cannot trigger external actions without explicit human validation.',
        exampleInAction:
          'AI drafts an email response to an upset enterprise client, but an account manager must approve send.',
        bestPractice:
          'Define clear risk tiers (e.g., Low: auto-draft; High: dual-human sign-off required).',
        whyItMatters:
          'Maintains regulatory compliance and accountability in automated customer-facing or financial workflows.'
      }
    ]
  },
  {
    name: 'AI Strategy and Application',
    description: 'Framing, prioritization, and organizational execution.',
    terms: [
      {
        term: 'The TRIPS Framework',
        definition:
          'TBG’s proprietary evaluation methodology scoring AI initiatives across Time, Risk, Impact, Pain, and Security.',
        exampleInAction:
          'Evaluating an automated invoicing tool: High Pain (4/5), High Impact (4/5), Low Risk (2/5) = Prioritize immediately.',
        bestPractice:
          'Score initiatives with cross-functional stakeholders (Ops, IT, Compliance, Finance) before scoping pilots.',
        whyItMatters:
          'Prevents committing budget to shiny AI experiments that fail to solve acute business problems.'
      },
      {
        term: 'RAG (Retrieval-Augmented Generation)',
        definition:
          'Searching your internal company databases or docs first, then passing relevant excerpts into the LLM prompt as context.',
        exampleInAction:
          'An HR bot that searches the latest 2026 employee handbook to answer questions about parental leave.',
        bestPractice:
          'Clean, deduplicate, and properly chunk internal documents before indexing them in a vector database.',
        whyItMatters:
          'Delivers up-to-date, private company-specific answers without expensive model fine-tuning.'
      }
    ]
  },
  {
    name: 'Advanced Tools',
    description: 'Agents, fine-tuning, embeddings, and multimodal architectures.',
    terms: [
      {
        term: 'AI Agents & Tool Calling',
        definition:
          'LLMs configured with access to external software tools (calendars, SQL databases, email, calculators) to execute multi-step workflows.',
        exampleInAction:
          'An agent that reads an inbound customer request, queries the inventory database, and drafts a purchase order.',
        bestPractice:
          'Set strict permission boundaries and idempotency keys to prevent duplicate transaction executions.',
        whyItMatters:
          'Represents the leap from passive conversational chatbots to active enterprise workflow automation.'
      },
      {
        term: 'Vector Embeddings & Semantic Search',
        definition:
          'Converting text into mathematical coordinate vectors where concepts with similar meanings sit near each other in multi-dimensional space.',
        exampleInAction:
          'A search for "unhappy client" successfully retrieving tickets containing "customer was furious with delayed delivery".',
        bestPractice:
          'Combine vector search with keyword/BM25 search (hybrid search) for optimal accuracy on technical acronyms.',
        whyItMatters:
          'Powers intelligent enterprise knowledge search that understands human intent rather than exact keyword matches.'
      }
    ]
  }
];
