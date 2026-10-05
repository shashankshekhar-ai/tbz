import { Workshop, EnterprisePillar } from '../types';

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: 'governance-human-in-the-loop',
    category: 'leadership',
    formatTag: 'LEADERSHIP SERIES • LIVE MASTERCLASS',
    title: 'Designing Governance & Human-in-the-Loop Workflows',
    description: 'An interactive session on building oversight processes for AI-assisted decision-making.',
    fullOverview: 'An interactive session on building oversight processes for AI-assisted decision-making. Learn how to architect human checkpoints, audit trails, and risk triage frameworks.',
    duration: 'Live Masterclass',
    level: 'Executive',
    targetAudience: 'Leadership, Risk, Governance Leads',
    availableDates: [
      {
        id: 'gov-1',
        date: 'Thursday, October 15, 2026',
        time: '14:00 - 16:00',
        timezone: 'BST',
        seatsLeft: 4,
        format: 'Live Virtual'
      },
      {
        id: 'gov-2',
        date: 'Tuesday, November 3, 2026',
        time: '15:00 - 17:00',
        timezone: 'BST',
        seatsLeft: 9,
        format: 'Live Virtual'
      }
    ],
    facilitator: {
      name: 'Dr. Alistair Bradbury',
      role: 'Head of AI Governance Practice'
    },
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Decision Autonomy & Oversight Gates',
        topics: ['Risk thresholds for autonomous actions', 'Designing human checkpoints']
      },
      {
        moduleNumber: 2,
        title: 'Auditability & Traceability',
        topics: ['Telemetry capture for AI outputs', 'Verifiable compliance reporting']
      }
    ],
    keyTakeaways: [
      'Ready-to-deploy Human-in-the-Loop Decision Matrix',
      'Step-by-step risk scoring rubric for AI-assisted operations'
    ]
  },
  {
    id: 'ai-literacy-non-technical',
    category: 'all-staff',
    formatTag: 'ALL STAFF • HALF-DAY WORKSHOP',
    title: 'AI Literacy for Non-Technical Teams',
    description: 'A hands-on introduction to working with AI tools safely and effectively.',
    fullOverview: 'A hands-on introduction to working with AI tools safely and effectively across operations, marketing, HR, and business workflows.',
    duration: 'Half-Day Workshop',
    level: 'Foundational',
    targetAudience: 'All Staff, Non-Technical Teams',
    availableDates: [
      {
        id: 'lit-1',
        date: 'Wednesday, October 21, 2026',
        time: '09:30 - 13:00',
        timezone: 'BST',
        seatsLeft: 8,
        format: 'Live Virtual'
      },
      {
        id: 'lit-2',
        date: 'Thursday, November 12, 2026',
        time: '13:30 - 17:00',
        timezone: 'GMT',
        seatsLeft: 14,
        format: 'Live Virtual'
      }
    ],
    facilitator: {
      name: 'Eleanor Vance',
      role: 'Director of Workforce Capability'
    },
    syllabus: [
      {
        moduleNumber: 1,
        title: 'AI Mental Models & Prompt Principles',
        topics: ['How LLMs interpret context', 'Data privacy & enterprise guidelines']
      },
      {
        moduleNumber: 2,
        title: 'Daily Workflow Acceleration',
        topics: ['Synthesizing documents & structured extraction', 'Drafting with tone control']
      }
    ],
    keyTakeaways: [
      'Enterprise Prompt Playbook for daily productivity',
      'Data protection and confidentiality checklist'
    ]
  },
  {
    id: 'prompt-architecture-domain-experts',
    category: 'sme',
    formatTag: 'SUBJECT MATTER EXPERTS • FULL-DAY WORKSHOP',
    title: 'Prompt Architecture for Domain Experts',
    description: 'Moving beyond prompt tricks into durable, reusable context architecture.',
    fullOverview: 'Moving beyond prompt tricks into durable, reusable context architecture. Built for subject matter experts codifying domain knowledge into reliable prompts.',
    duration: 'Full-Day Workshop',
    level: 'Intermediate',
    targetAudience: 'Subject Matter Experts, Senior Analysts, Specialists',
    availableDates: [
      {
        id: 'prm-1',
        date: 'Tuesday, October 27, 2026',
        time: '09:30 - 16:30',
        timezone: 'BST',
        seatsLeft: 5,
        format: 'Live Virtual'
      },
      {
        id: 'prm-2',
        date: 'Thursday, November 19, 2026',
        time: '09:30 - 16:30',
        timezone: 'GMT',
        seatsLeft: 7,
        format: 'Live Virtual'
      }
    ],
    facilitator: {
      name: 'Julian Thorne',
      role: 'Principal Architecture Lead'
    },
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Context Windows & System Prompt Layering',
        topics: ['Context density & token budgets', 'Multi-turn instructions']
      },
      {
        moduleNumber: 2,
        title: 'Few-Shot Calibration & Deterministic Outputs',
        topics: ['Structuring JSON/Markdown schema', 'Evaluation benchmarks']
      }
    ],
    keyTakeaways: [
      'Reusable prompt repository template',
      'Evaluation rubric to measure output reliability'
    ]
  }
];

export const ENTERPRISE_PILLARS: EnterprisePillar[] = [
  {
    id: 'learning-architecture',
    title: 'Learning Architecture Design',
    shortDescription: "A custom-built learning architecture mapped to your organization's roles, risk profile, and existing L&D infrastructure — not a generic course library.",
    fullDetails: "A custom-built learning architecture mapped to your organization's roles, risk profile, and existing L&D infrastructure.",
    iconType: 'learning',
    tag: 'LEARNING ARCHITECTURE',
    deliverables: [
      'Role-based competency mapping',
      'Integration with existing enterprise L&D infrastructure',
      'Risk-tiered curriculum architecture'
    ],
    metrics: 'Custom-built for enterprise roles'
  },
  {
    id: 'embedded-partnership',
    title: 'Embedded Training Partnership',
    shortDescription: 'Our facilitators embed directly within your teams over multiple quarters, building capability in the flow of real work rather than one-off workshops.',
    fullDetails: 'Our facilitators embed directly within your teams over multiple quarters, building capability in the flow of real work.',
    iconType: 'embedded',
    tag: 'EMBEDDED PARTNERSHIP',
    deliverables: [
      'Multi-quarter direct squad enablement',
      'Real deliverable co-piloting',
      'Sustained internal capability transfer'
    ],
    metrics: 'Embedded in real workflows'
  },
  {
    id: 'community-upskilling',
    title: 'Community Upskilling Workshops',
    shortDescription: 'Open-enrollment workshops for broader workforce upskilling — see the full catalog for upcoming sessions and topics.',
    fullDetails: 'Open-enrollment workshops for broader workforce upskilling across leadership, all-staff, and subject matter expert tiers.',
    iconType: 'community',
    tag: 'COMMUNITY UPSKILLING',
    deliverables: [
      'Live interactive cohorts',
      'Hands-on scenario practice',
      'Practical enterprise toolkits'
    ],
    metrics: 'Open-enrollment workforce sessions',
    actionText: 'See Workshop Catalog →',
    actionTarget: 'workshops'
  }
];
