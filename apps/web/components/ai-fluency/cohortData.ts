export interface CohortCapability {
  title: string;
  description: string;
}

export interface CohortPhaseData {
  id: "literacy" | "fluency";
  phaseNumber: number;
  title: string;
  badge: string;
  tagline: string;
  accentColor: string;
  capabilities: CohortCapability[];
}

export const COHORT_PHASES: CohortPhaseData[] = [
  {
    id: "literacy",
    phaseNumber: 1,
    title: "AI Literacy",
    badge: "PHASE 1",
    tagline:
      "Foundational understanding of how modern AI systems work, where they help, where they fail, and how to evaluate a tool before adopting it.",
    accentColor: "#c57b4b",
    capabilities: [
      {
        title: "Core Concepts & Mental Models",
        description:
          "Deconstruct how modern AI systems, context windows, and reasoning mechanisms actually operate without hype or guesswork.",
      },
      {
        title: "Prompting Fundamentals & Structured Outputs",
        description:
          "Master precision prompt architectures, structured outputs, and reproducible formatting for executive deliverables.",
      },
      {
        title: "Risk & Governance Basics",
        description:
          "Understand enterprise data safety, zero-retention guardrails, and compliance parameters before tool adoption.",
      },
      {
        title: "Model Evaluation & Tool Selection",
        description:
          "Evaluate frontier vs. specialized AI tools with an objective business benchmark framework.",
      },
    ],
  },
  {
    id: "fluency",
    phaseNumber: 2,
    title: "AI Fluency",
    badge: "PHASE 2",
    tagline:
      "Applied workflow design — building your own repeatable AI-assisted processes and personal agent workflows for daily executive work.",
    accentColor: "#39918d",
    capabilities: [
      {
        title: "Custom Agent Workflow Design",
        description:
          "Architect multi-step autonomous agent pipelines tailored to your specific recurring executive workload.",
      },
      {
        title: "Personal Productivity Blueprint",
        description:
          "Deploy personalized AI systems that synthesize documents, prepare briefs, and eliminate cognitive overhead.",
      },
      {
        title: "Ongoing Capability Coaching",
        description:
          "Private 1-on-1 executive coaching sessions to refine, test, and validate your live workflows.",
      },
      {
        title: "Multi-Model Orchestration & Delegation",
        description:
          "Coordinate multiple specialized AI models to handle complex strategic analyses and team-wide playbooks.",
      },
    ],
  },
];
