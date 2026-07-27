export type Question = {
  id: string;
  prompt: string;
  type: "choice" | "text";
  options?: string[];
};

export const QUESTIONS: Question[] = [
  {
    id: "strategy",
    prompt: "How would you describe your organization's current AI strategy?",
    type: "choice",
    options: [
      "No formal strategy",
      "Informal experimentation in a few teams",
      "Documented strategy for some teams",
      "Org-wide AI strategy tied to business goals",
    ],
  },
  {
    id: "adoption",
    prompt: "How many employees actively use AI tools in their daily work?",
    type: "choice",
    options: [
      "Almost none",
      "A handful of early adopters",
      "Multiple teams regularly",
      "Most employees",
    ],
  },
  {
    id: "governance",
    prompt: "Do you have an AI usage policy or governance guidelines?",
    type: "choice",
    options: [
      "No",
      "Draft in progress",
      "Yes, informally enforced",
      "Yes, formally enforced org-wide",
    ],
  },
  {
    id: "spend",
    prompt: "How is AI tool spend currently managed?",
    type: "choice",
    options: [
      "Ad hoc, individual purchases",
      "A few approved tools",
      "Centralized procurement",
      "Centralized procurement with budget forecasting",
    ],
  },
  {
    id: "leadership",
    prompt: "How would you rate leadership's understanding of AI capabilities and risks?",
    type: "choice",
    options: ["Low", "Basic awareness", "Solid working knowledge", "Deep, hands-on understanding"],
  },
  {
    id: "training",
    prompt: "Have you run any formal AI training or upskilling programs?",
    type: "choice",
    options: ["No", "Ad hoc sessions", "One program completed", "Ongoing structured programs"],
  },
  {
    id: "measurement",
    prompt: "How is AI's impact on workflows currently measured?",
    type: "choice",
    options: [
      "Not measured",
      "Anecdotal feedback only",
      "Some metrics tracked",
      "Dashboards & KPIs tied to business outcomes",
    ],
  },
  {
    id: "blocker",
    prompt: "What's the biggest blocker to scaling AI adoption at your organization?",
    type: "text",
  },
  {
    id: "outcome",
    prompt: "What outcome are you hoping AI will drive in the next 12 months?",
    type: "text",
  },
];
