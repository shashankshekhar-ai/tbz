export type WorkshopCategory = "leadership" | "all-staff" | "sme";

export interface Workshop {
  id: string;
  category: WorkshopCategory;
  formatTag: string;
  title: string;
  description: string;
}

export const WORKSHOP_CATEGORIES: { id: WorkshopCategory | "all"; label: string }[] = [
  { id: "all", label: "All Sessions" },
  { id: "leadership", label: "Leadership Series" },
  { id: "all-staff", label: "All Staff" },
  { id: "sme", label: "Subject Matter Experts" },
];

export const WORKSHOPS: Workshop[] = [
  {
    id: "governance-human-in-the-loop",
    category: "leadership",
    formatTag: "Leadership Series • Live Masterclass",
    title: "Designing Governance & Human-in-the-Loop Workflows",
    description:
      "An interactive session on building oversight processes for AI-assisted decision-making.",
  },
  {
    id: "ai-literacy-non-technical",
    category: "all-staff",
    formatTag: "All Staff • Half-Day Workshop",
    title: "AI Literacy for Non-Technical Teams",
    description: "A hands-on introduction to working with AI tools safely and effectively.",
  },
  {
    id: "prompt-architecture-domain-experts",
    category: "sme",
    formatTag: "Subject Matter Experts • Full-Day Workshop",
    title: "Prompt Architecture for Domain Experts",
    description: "Moving beyond prompt tricks into durable, reusable context architecture.",
  },
];
