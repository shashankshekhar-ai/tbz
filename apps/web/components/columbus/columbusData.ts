import { ExpandableItem, ChecklistItem } from "./types";

export const EXPANDABLE_SECTIONS: ExpandableItem[] = [
  {
    id: "ask-about",
    title: "What I Ask About",
    subtitle: "Strategic priorities & team readiness",
    content:
      "Columbus asks about your team's current AI fluency, leadership priorities, organizational size, and timeline, then curates a recommendation across For You, For Leaders, and For Organizations engagement paths.",
    iconName: "HelpCircle",
  },
  {
    id: "happens-answers",
    title: "What Happens With Your Answers",
    subtitle: "Executive synthesis & tailored recommendation",
    content:
      "Your answers are synthesized in real time into a tailored path recommendation with relevant frameworks, cohort timing, and ROI context — specific to your organization's AI-readiness stage.",
    iconName: "Cpu",
  },
  {
    id: "where-goes",
    title: "Where This Goes",
    subtitle: "Reviewed by our executive team",
    content:
      "Session summaries are stored securely and shared only with Paige Bradbury and The Bradbury Group's executive team for follow-up — never used for public model training.",
    iconName: "ShieldCheck",
  },
  {
    id: "your-control",
    title: "Your Control",
    subtitle: "Full data ownership & sovereignty",
    content:
      "You maintain absolute control over your session. At any point during or after our conversation, you can pause recording, review transcript logs, download a summary, or permanently delete your session records.",
    iconName: "Sliders",
  },
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "check-audio",
    title: "Microphone & High-Fidelity Audio",
    description: "Calibrated for clear two-way voice interaction and real-time speech synthesis.",
    badge: "Audio Ready",
  },
  {
    id: "check-duration",
    title: "Estimated Duration: 3–5 Minutes",
    description: "Designed for a rapid, focused conversation about your AI transformation priorities.",
    badge: "3-5 Mins",
  },
  {
    id: "check-transcript",
    title: "Real-Time Transcription & Synthesis",
    description: "Automatic text generation and key takeaway extraction during the active session.",
    badge: "Auto-Notes",
  },
  {
    id: "check-confidential",
    title: "Confidential & Private Session",
    description: "Governed by The Bradbury Group's data protection standards and confidentiality practices.",
    badge: "Secured",
  },
];

export const QUICK_PROMPTS = [
  "Which path is best for my team?",
  "Summarize TBG's core frameworks",
  "How is TBG different from tutorials?",
  "Book a discovery call",
];

export const READINESS_QUESTIONS = [
  "What's your organization's biggest AI adoption challenge right now?",
  "Is this primarily for yourself, your team, or your whole organization?",
  "How would you describe your team's current AI fluency — early, developing, or advanced?",
  "What's your rough timeline for getting started?",
  "Who else needs to be involved in this decision?",
];
