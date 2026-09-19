import { ResourceItem } from '../types';

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'manager-letter',
    resourceNumber: 1,
    badgeLabel: 'Resource 1',
    cardHeadline: 'The Pre-Written Case Your Manager Needs',
    cardBody:
      "Business case, ROI language, role clarity, and what your manager's role actually is. We handled the hard part. Download, forward, or copy-paste.",
    covers:
      'regulatory alignment (DOL framework), competitive risk, cost breakdown, and what participation requires (2 sessions/week, ~2 hours + homework).',
    ctaText: 'Download PDF',
    status: 'available',
    category: 'Leadership & Case',
    fileFormat: 'PDF & Editable Document (.pdf / .docx)',
    fileSizeApprox: '240 KB',
    fullContent: {
      overview:
        "A field-tested executive proposal designed to secure organizational sponsorship for AI workforce development without friction.",
      keyTakeaways: [
        'DOL AI Literacy Framework regulatory alignment',
        'Direct cost-to-productivity ROI calculation model',
        'Specific managerial commitment guidelines (2 sessions/wk, ~2 hrs + practice)',
        'Pre-drafted executive email template ready for forward or send',
      ],
      documentContent: `EXECUTIVE BRIEFING & SPONSORSHIP REQUEST

To: [Manager Name / Leadership Team]
From: [Your Name, Title]
Date: [Current Date]
Subject: Formal Proposal: Strategic AI Workforce Development & Capability Upskilling

1. EXECUTIVE SUMMARY
Artificial intelligence is rapidly shifting from discretionary technology to core operational capability. According to the U.S. Department of Labor (DOL) AI Literacy Framework and prevailing Microsoft-IDC economic benchmarks, teams operating with systematic "Thinking Architecture" achieve measurable efficiency gains of 25–40% in routine operational tasks while mitigating unmonitored shadow-AI risks.

This proposal requests executive sponsorship for participation in the structured AI Workforce Enablement Cohort.

2. BUSINESS CASE & ROI VALUE PROPOSITION
- Time-to-Competence: Accelerates practical AI adoption across daily deliverables.
- Risk Mitigation: Enforces data security, classification boundaries, and audit-ready governance.
- Operational Value: Standardizes repetitive workflows, reporting, and process documentation.
- Estimated Return: Recovers an estimated 4–7 hours per week per practitioner within 30 days post-completion.

3. COMMITMENT & CAPACITY ALLOCATION
The program is specifically structured around working professionals to prevent operational disruptions:
- Time Commitment: 2 structured sessions per week (~2 hours total) plus practical workflow implementation assignments.
- Hands-on Application: Homework assignments are executed directly on our existing operational workflows, immediately generating tangible organizational work product.

4. BUDGET & POLICY OFFSET OPPORTUNITIES
This development can be offset through existing educational funding channels:
- Internal Professional Development Budget (IRC Section 162 deductible)
- Employer-provided Educational Assistance (IRS Section 127, up to $5,250/year tax-exempt)
- State retraining incentives where applicable.

5. NEXT STEPS
I have attached the complete cohort syllabus, DOL alignment matrix, and reimbursement documentation. Please let me know your availability for a 10-minute briefing this week.`,
      metadata: {
        'Target Audience': 'People Managers, Department Heads, HR/L&D Directors',
        'Sponsorship Rate': '92% approval upon first submission',
        'Compliance Alignment': 'DOL Framework Pillar 1 & 4',
      },
    },
  },
  {
    id: 'trips-scorecard',
    resourceNumber: 2,
    badgeLabel: 'Resource 2',
    cardHeadline: 'Decide Which AI Project to Start First',
    cardBody:
      'TRIPS is a prioritization framework we’ve repurposed from the marketing world for evaluating AI projects before you invest time or money. It scores opportunities across five dimensions:',
    bulletPoints: [
      {
        label: 'Time',
        description: 'How much time does this workflow currently consume?',
      },
      {
        label: 'Risk',
        description: 'What happens if this process fails or stays manual?',
      },
      {
        label: 'Impact',
        description: 'How many people or processes does this touch?',
      },
      {
        label: 'Pain',
        description: 'How much friction does this create daily?',
      },
      {
        label: 'Security',
        description: 'What data classification and governance constraints apply?',
      },
    ],
    footerNote:
      'Use this scorecard to rank your top 5 AI opportunities and make a defensible decision about where to start. The same framework we use with organizational partners to scope embedded engagements.',
    ctaText: 'Download Scorecard',
    status: 'available',
    category: 'Strategy & Prioritization',
    fileFormat: 'Interactive Evaluation Matrix & PDF (.xlsx / .pdf)',
    fileSizeApprox: '410 KB',
    fullContent: {
      overview:
        'The TRIPS Scoring Matrix provides an objective numerical score (1–5 on each dimension) to eliminate guesswork and subjective executive debates.',
      keyTakeaways: [
        '5 core evaluation vectors: Time, Risk, Impact, Pain, Security',
        'Defensible ranking methodology for Top 5 workflow candidates',
        'Identifies "Quick Win" automations vs. high-governance enterprise projects',
        'Pre-configured scoring thresholds used in commercial client engagements',
      ],
      documentContent: `TRIPS EVALUATION FRAMEWORK & SCORING PROTOCOL

Scale: Score each candidate project from 1 (Low/Minimal) to 5 (Critical/High).
Formula: Total TRIPS Score = (Time x 1.0) + (Risk x 1.2) + (Impact x 1.0) + (Pain x 1.0) - (Security Friction Factor)

DIMENSION 1: TIME (Weight: 1.0)
• 1 pt: < 2 hours/month expended across team
• 3 pts: 5–15 hours/week expended routinely
• 5 pts: > 25 hours/week of highly repetitive human effort

DIMENSION 2: RISK OF INACTION (Weight: 1.2)
• 1 pt: Negligible operational consequence if manual
• 3 pts: Moderate delay or bottleneck in deliverable delivery
• 5 pts: Critical compliance, deadline, or client retention liability

DIMENSION 3: IMPACT (Weight: 1.0)
• 1 pt: Localized to single individual
• 3 pts: Intersects departmental handoffs (3–10 staff)
• 5 pts: Organization-wide customer-facing or core revenue process

DIMENSION 4: PAIN & FRICTION (Weight: 1.0)
• 1 pt: Low cognitive load, comfortable execution
• 3 pts: High cognitive fatigue, prone to manual copy-paste errors
• 5 pts: Chronic morale drain, cited in employee retrospective complaints

DIMENSION 5: SECURITY & GOVERNANCE COMPLIANCE
• Safe Zone: Public data, open documentation, desensitized records
• Moderate: Internal procedural notes, anonymized customer operational logs
• Restricted: PII, HIPAA, financial statements, proprietary trade secrets (requires localized enterprise model guardrails)

DECISION THRESHOLDS:
• Score > 21: Tier 1 Immediate Priority ("Must Automate / Augment")
• Score 15–20: Tier 2 Secondary Candidate (Requires modular proof of concept)
• Score < 15: Defer or eliminate (Poor ROI on automation effort)`,
    },
  },
  {
    id: 'core4-worksheet',
    resourceNumber: 3,
    badgeLabel: 'Resource 3',
    cardHeadline: 'The Core 4 Worksheet',
    cardBody:
      'The Core 4 is a sequential framework designed to move professionals and organizations from "AI could help with something" to a defensible, measurable AI application. Four steps, each building on the one before it.',
    bulletPoints: [
      {
        label: '1. Pain Point',
        description:
          'Identify one specific, recurring source of friction in your work. Not a vague complaint. A named task that costs time, quality, or capacity every week. This is your anchor. Everything that follows ties back to it.',
      },
      {
        label: '2. Use Case',
        description:
          'Convert the pain point into a concrete plan: what AI will do, what it will work with, and what it will produce. A use case is not "AI could do this." A use case means "AI should do this, under these conditions, with these boundaries." Before a use case moves forward, it passes through a governance layer: What data does the AI need? Who is accountable? What are the risks? What should it never do?',
      },
      {
        label: '3. Pilot Project',
        description:
          'Test the use case in a small, controlled cycle. One bounded experiment with clear inputs and outputs. This is a prototype, not a rollout. Expect iteration. Expect friction. That friction is where you learn whether the use case holds.',
      },
      {
        label: '4. Success Metric',
        description:
          'Define what "better" looks like before you start. Compare a measured before state to a measured after state. Time saved, quality improved, capacity recovered, risk reduced. This is the language leadership needs to hear.',
      },
    ],
    footerNote:
      'Why it works: The Core 4 intentionally constrains focus. Instead of chasing ten possible AI applications, you prove one. That proof becomes your playbook for the next one. Organizations that succeed with AI do not scale from enthusiasm. They scale from evidence.',
    ctaText: 'Download Worksheet',
    status: 'available',
    category: 'Workforce Readiness',
    fileFormat: 'Framework Worksheet (.pdf)',
    fileSizeApprox: 'PDF',
    fullContent: {
      overview:
        'The Core 4 is a sequential framework designed to move professionals and organizations from "AI could help with something" to a defensible, measurable AI application.',
      keyTakeaways: [
        'Pain Point: one specific, recurring source of friction',
        'Use Case: what AI will do, with governance boundaries',
        'Pilot Project: a small, controlled cycle',
        'Success Metric: a measured before and after state',
      ],
      documentContent: `THE CORE 4 WORKSHEET

The Core 4 is a sequential framework designed to move professionals and organizations from "AI could help with something" to a defensible, measurable AI application. Four steps, each building on the one before it.

1. PAIN POINT
Identify one specific, recurring source of friction in your work. Not a vague complaint. A named task that costs time, quality, or capacity every week. This is your anchor. Everything that follows ties back to it.

2. USE CASE
Convert the pain point into a concrete plan: what AI will do, what it will work with, and what it will produce. A use case is not "AI could do this." A use case means "AI should do this, under these conditions, with these boundaries." Before a use case moves forward, it passes through a governance layer: What data does the AI need? Who is accountable? What are the risks? What should it never do?

3. PILOT PROJECT
Test the use case in a small, controlled cycle. One bounded experiment with clear inputs and outputs. This is a prototype, not a rollout. Expect iteration. Expect friction. That friction is where you learn whether the use case holds.

4. SUCCESS METRIC
Define what "better" looks like before you start. Compare a measured before state to a measured after state. Time saved, quality improved, capacity recovered, risk reduced. This is the language leadership needs to hear.

WHY IT WORKS
The Core 4 intentionally constrains focus. Instead of chasing ten possible AI applications, you prove one. That proof becomes your playbook for the next one.

Organizations that succeed with AI do not scale from enthusiasm. They scale from evidence.`,
    },
  },
  {
    id: 'case-studies',
    resourceNumber: 4,
    badgeLabel: 'Resource 4',
    cardHeadline: 'Every Number. One Document.',
    cardBody:
      'Aurilis, Teresa, Leah, Andy, and NCEMCH: all five case studies compiled into a single PDF with full metrics, methodology notes, and benchmark comparisons. Built to forward to a manager, a board, or a skeptical colleague.',
    includes:
      'individual cohort outcomes, executive ROI breakdown, organizational transformation metrics, and Microsoft-IDC benchmark context.',
    ctaText: 'Download Whitepaper',
    status: 'available',
    category: 'Evidence & Benchmarks',
    fileFormat: 'Executive Whitepaper (.pdf)',
    fileSizeApprox: '1.8 MB',
    fullContent: {
      overview:
        'Comprehensive empirical performance documentation across 5 distinct professional cohorts and institutional partners.',
      keyTakeaways: [
        '5 detailed real-world organizational case studies (Aurilis, Teresa, Leah, Andy, NCEMCH)',
        'Microsoft-IDC industry benchmark comparative analysis',
        'Hard metrics: 38% average cycle-time reduction, 4.2x ROI within 90 days',
        'Board-ready charts, methodology citations, and validation notes',
      ],
      documentContent: `EXECUTIVE CASE COMPENDIUM & EMPIRICAL BENCHMARKS

METHODOLOGY NOTE:
Outcomes tracked across 12-week embedded cohorts using the Integrated Performance Measurement Framework (IPMF). Baseline metrics established 30 days prior to commencement.

CASE 1: AURILIS (Healthcare Operations & Communications)
- Baseline: 18 hours/week spent on clinical trial reporting & multi-site communications.
- Post-Enablement: 6.5 hours/week.
- Net Outcome: 64% reduction in reporting lead time; zero compliance discrepancies reported.

CASE 2: TERESA (Non-Profit Program Administration)
- Baseline: Bi-weekly grant proposal synthesizing required 24 staff hours.
- Post-Enablement: Grant drafting turnaround reduced to 5.5 hours.
- Net Outcome: 77% capacity recapture; enabled $450k in supplemental funding submissions.

CASE 3: LEAH (Finance & Budgetary Forecasting)
- Baseline: Manual monthly ledger reconciliation and variance commentary.
- Post-Enablement: Automated anomaly detection through prompt-engineered structured audits.
- Net Outcome: Eliminated 11 hours of monthly manual reconciliation; 100% audit precision.

CASE 4: ANDY (Mid-Market B2B Professional Services)
- Baseline: Bespoke client RFP response creation averaging 4 business days.
- Post-Enablement: Built reusable proposal thinking architecture.
- Net Outcome: Response turnaround accelerated from 4 days to 4.5 hours with higher close rate.

CASE 5: NCEMCH (National Center for Education in Maternal and Child Health)
- Baseline: Extensive literature review synthesis and curriculum guideline distillation.
- Post-Enablement: Structured multi-persona analysis using the Solomon Engine.
- Net Outcome: Scaled educational output by 310% without headcount additions.

MICROSOFT-IDC BENCHMARK COMPARISON:
While general AI adopters realize average gains of 14–18%, cohort-trained participants employing systematic Thinking Architecture averaged 38.4% efficiency gains and sustained retention 6 months post-training.`,
    },
  },
  {
    id: 'tax-guide',
    resourceNumber: 5,
    badgeLabel: 'Resource 5',
    cardHeadline: 'Your AI Training May Already Be Funded',
    cardBody: 'A detailed guide covering three paths to offset your investment:',
    bulletPoints: [
      {
        label: 'IRS Section 127',
        description: 'Up to $5,250/employee/year in tax-free educational assistance',
      },
      {
        label: 'Georgia Retraining Tax Credit',
        description: '50% of direct training costs, up to $500/employee/year',
      },
      {
        label: 'IRC Section 162',
        description: 'Business expense deduction for professional development',
      },
      {
        label: 'Federal policy',
        description:
          'The bipartisan AI Workforce Training Act (H.R. 7576) and its small business provisions',
      },
    ],
    footerNote:
      'Includes an audit-proof checklist and paper trail templates. Share with your tax professional.',
    ctaText: 'Download Tax Guide PDF',
    status: 'available',
    category: 'Policy & Funding',
    fileFormat: 'Statutory Reference & Checklist (.pdf)',
    fileSizeApprox: '520 KB',
    fullContent: {
      overview:
        'A comprehensive guide for finance executives, HR leaders, and individual professionals to capitalize on statutory funding mechanisms.',
      keyTakeaways: [
        'IRS Section 127 qualification checklist ($5,250 annual per-employee benefit)',
        'State-specific credits including Georgia Retraining Tax Credit',
        'Ordinary & Necessary Business Expense guidelines under IRC Section 162',
        'Briefing on H.R. 7576 (Bipartisan AI Workforce Training Act)',
      ],
      documentContent: `STATUTORY TAX CREDIT & WORKFORCE FUNDING COMPLIANCE GUIDE

PATH 1: INTERNAL REVENUE CODE (IRC) SECTION 127
- Statutory Limit: Up to $5,250 per employee per calendar year in tax-free educational assistance.
- Employer Benefit: Full tax deduction; payments are exempt from FICA, FUTA, and income tax withholding.
- Core Requirements:
  1. Written Educational Assistance Program (EAP) plan document.
  2. Non-discriminatory offering across eligible employee classifications.
  3. Coursework does not strictly require degree matriculation; workforce skills training is permissible under current code.

PATH 2: STATE-LEVEL RETRAINING CREDITS (e.g., GEORGIA CODE § 48-7-40.5)
- Tax Benefit: 50% of direct training expenses up to $500 per employee per year.
- Eligibility: Programs upgrading employee skills for new technology, automated systems, or software modernization.
- Paper Trail Requirement: Retain course syllabus, certification records, and verified completion rosters for 3 years.

PATH 3: IRC SECTION 162 (TRADE OR BUSINESS EXPENSE)
- Criteria: Professional development that maintains or improves skills required in an individual's current employment.
- Treatment: Deductible as ordinary and necessary operational expense by the employer.

PATH 4: FEDERAL POLICY OUTLOOK — H.R. 7576 (AI WORKFORCE TRAINING ACT)
- Bipartisan legislation providing targeted grants and micro-incentives for small and mid-sized businesses upskilling teams in practical generative AI frameworks.

AUDIT-PROOF PAPER TRAIL CHECKLIST:
[ ] Formal written employer authorization or reimbursement agreement
[ ] Detailed course outline demonstrating work-related skills development
[ ] Receipt of payment with itemized tuition and materials breakdown
[ ] Certificate of completion issued by the training provider
[ ] Retained in employer corporate compliance file for audit defense`,
    },
  },
  {
    id: 'glossary',
    resourceNumber: 6,
    badgeLabel: 'Resource 6',
    cardHeadline: 'AI Terminology Without the Jargon',
    cardBody:
      'Plain-language definitions for the terms that matter in AI workforce development:',
    bulletPoints: [
      {
        label: 'AI Literacy vs. AI Fluency',
        description: '(and why the distinction matters)',
      },
      {
        label: 'Integrated Performance Measurement Framework (IPMF)',
        description: 'Rigorous accountability standard for tracking capability gains',
      },
      {
        label: 'U.S. Department of Labor AI Literacy Framework',
        description: '(the five pillars)',
      },
      {
        label: 'Thinking Architecture',
        description: 'Structuring human thought before prompting the model',
      },
      {
        label: 'Learning Architecture',
        description: 'Systematic scaffolding that turns one-off tricks into repeatable habits',
      },
      {
        label: 'The Solomon Engine vs. Solomon',
        description: '(the 12-week program) vs. (the AI assistant)',
      },
      {
        label: 'Phase 1 vs. Phase 2',
        description: '(what each covers and who each is for)',
      },
      {
        label: 'Results-Based Accountability (RBA)',
        description: 'Moving beyond activity tracking to verified client outcomes',
      },
    ],
    footerNote:
      'No acronym soup. No buzzwords. Just what you need to have an informed conversation.',
    ctaText: 'Download Glossary',
    status: 'available',
    category: 'Reference & Taxonomy',
    fileFormat: 'Reference Handbook & PDF (.pdf / .html)',
    fileSizeApprox: '380 KB',
    fullContent: {
      overview:
        'The definitive reference guide removing the opaque buzzwords from executive AI conversations.',
      keyTakeaways: [
        '8 core foundational concepts clearly defined in business language',
        'Direct contrast between passive awareness (Literacy) and operational mastery (Fluency)',
        'Exact breakdown of the 5 DOL Framework Pillars',
        'Clarification on The Solomon Engine methodology vs. assistive AI tools',
      ],
      documentContent: `PLAIN-LANGUAGE AI WORKFORCE GLOSSARY

1. AI LITERACY vs. AI FLUENCY
• AI Literacy: Knowing that AI exists, basic ethical risks, and how to type a prompt into an interface. Passive awareness.
• AI Fluency: The systematic ability to architect complex business workflows, evaluate model hallucination risks, enforce data governance, and consistently generate production-grade organizational value.

2. INTEGRATED PERFORMANCE MEASUREMENT FRAMEWORK (IPMF)
A validated measurement system that tracks skill acquisition across 3 dimensions: Time Saved (Cycle Efficiency), Quality of Output (Error Reduction), and Cognitive Transfer (applying techniques across unrelated business problems).

3. U.S. DEPARTMENT OF LABOR (DOL) AI LITERACY FRAMEWORK
The federal workforce framework specifying 5 foundational pillars:
- Pillar 1: Understanding AI Concepts & Limitations
- Pillar 2: Ethical, Safe, and Responsible Use
- Pillar 3: Data Literacy & Privacy Protection
- Pillar 4: Human-AI Collaboration in Daily Work
- Pillar 5: Continuous Learning & Adaptability

4. THINKING ARCHITECTURE
The discipline of structuring human analysis, business constraints, and strategic logic BEFORE drafting an AI prompt. Prevents garbage-in, garbage-out AI interactions.

5. LEARNING ARCHITECTURE
The operational scaffolding—rubrics, feedback loops, peer reviews, and practice cadences—that transforms short-lived workshop enthusiasm into permanent organizational capability.

6. THE SOLOMON ENGINE vs. SOLOMON
• The Solomon Engine: The complete 12-week immersion curriculum, coaching architecture, and performance-tracking methodology.
• Solomon: The purpose-configured AI assistant deployed within cohorts to simulate executive personas, peer review work, and stress-test workflows.

7. PHASE 1 vs. PHASE 2
• Phase 1 (Foundational Enablement): Geared for mainstream knowledge workers. Focuses on daily operational workflows, prompt architecture, and basic governance.
• Phase 2 (Advanced Systems & Automation): Geared for operational leads and managers. Focuses on multi-agent chaining, workflow automation, and organizational change leadership.

8. RESULTS-BASED ACCOUNTABILITY (RBA)
A management methodology answering three disciplined questions: "How much did we do?", "How well did we do it?", and "Is anyone better off?" Ensures AI adoption is evaluated on verifiable performance rather than vanity metrics.`,
    },
  },
];

export const POST_DOWNLOAD_LINE =
  "After you download, you'll hear from us with more resources like this. Useful frameworks, not sales pressure.";
