"use client";

import { useState } from "react";
import Link from "next/link";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Award,
  Calendar,
  Check,
  Play,
  ArrowRight,
  X,
  CheckCircle2,
  Download,
  Compass,
  Eye,
  Lock,
  ExternalLink,
  Info,
  Landmark,
  Copy,
} from "lucide-react";

const managerLetterText = `"Start Building Something That Works Today"

"Your employee needs baseline AI fluency to stay competitive. This is your roadmap to compliance and measurable impact.

The Business Case:
Regulatory alignment: The U.S. Department of Labor framework is the federal standard for workforce readiness.
Competitive risk: Teams without AI fluency fall behind on productivity and retention. This isn't speculative.
Cost & speed: An investment of less than $1,500; structured learning, not random tutorials; implementation immediate.

What they'll master: Understand AI, Use AI Effectively, Direct AI Effectively, Evaluate Outputs Responsibly, Use AI Responsibly
Here's the ROI: 66–80% confidence gains, 2+ hrs/week freed, 75%+ faster task completion

Your role: Approve enrollment and allocate 2 sessions/week (~2 hours + homework)
Our role: Deliver cohort-based learning with measurable outcomes and ROI."`;

const businessCaseCards = [
  {
    icon: Landmark,
    title: "The federal standard is already here",
    body: "The Department of Labor published an AI Literacy Framework. Five pillars that enable individuals to use and evaluate AI technologies responsibly. That's the standard now in workforce development. We align to all of them, so that our clients have the skills and confidence to navigate a changing work environment.",
  },
  {
    icon: TrendingDown,
    title: "The gap is already costly",
    body: "Companies without AI fluency are slower and are at risk of losing employees who are learning the skills. Decision-making bottlenecks compound.",
  },
  {
    icon: Target,
    title: "Structured beats random. Every time.",
    body: "Cohort-based, live, with peer support. Personalized and impactful in your own work. An actual performance measurement framework you can take with you to measure, demonstrate, and continuously improve the impact of AI capability development for you and your organization.",
  },
];

const masteryCompetencies = [
  {
    icon: Compass,
    title: "Understand AI",
    description: "The mental models to work with it, know its limitations, foundational vocabulary.",
  },
  {
    icon: TrendingUp,
    title: "Use AI Effectively",
    description: "Practical ways to use AI in real-world workplace settings.",
  },
  {
    icon: Target,
    title: "Direct AI Effectively",
    description: "Spot errors, maintain control, iterate strategically.",
  },
  {
    icon: Eye,
    title: "Evaluate Outputs Responsibly",
    description: "Apply human judgment and domain expertise, verification process, ethical use.",
  },
  {
    icon: Lock,
    title: "Use AI Responsibly",
    description: "Protect sensitive data, maintain accountability for outcomes, comply with workplace and legal standards.",
  },
];

const caseStudies = [
  {
    id: "aurilis",
    name: "Aurilis Sanchez",
    role: "Instructional Designer/L&D",
    headline: "Built a working AI tool in under 2 hours",
    problem:
      "Aurilis had to debug PowerBI formulas she didn't fully understand. 5+ hours of work. Multiple failed attempts. Frustrated.",
    solution:
      "She built a custom AI assistant in less than 2 hours using what she learned. The assistant diagnosed the error in under a minute.",
    metrics: [
      "98% time reduction (5+ hours → <2 minutes)",
      "<2 hours to build the solution",
      "45–55 seconds per resolution (confirmed live)",
      "$0 in new tools",
    ],
    skillGained: "Framework for AI assistant creation",
  },
  {
    id: "teresa",
    name: "Teresa Waggoner",
    role: "Learning Experience Designer",
    headline: "Tested 3 tools, picked the right one, saved weeks",
    problem:
      "Teresa needed quality content for scenario-based learning modules. Accessing SMEs was expensive and slow. The research alone cost 10–80 hours per project.",
    solution:
      "She ran a custom system prompt across Gemini, ChatGPT, and Claude. Then she compared outputs critically, judged which was best, and made her decision.",
    metrics: [
      "3 tools tested head-to-head",
      "<7 minutes for best output time",
      "Claude won (developer-ready output, deeper scenarios, better structure)",
      "64% less time on research",
    ],
    skillGained: "Critical analysis and \"taste\" from LLM outputs",
  },
  {
    id: "leah",
    name: "Leah Otsig",
    role: "eLearning Developer/Corporate Trainer (University)",
    headline: "Cut approval bottleneck from 14 days to 5 days",
    problem:
      "Leah spent 14 days and 40+ hour cycles waiting for storyboards to move from designed → approved. Revision cycles were brutal (4 rounds). Bottlenecks slowed everything.",
    solution:
      "She used university-approved tools to streamline the process. AI helped her draft faster, she iterated intelligently, and the approval phase shrank to 5 days with only ONE revision round.",
    metrics: [
      "14 days → 5 days (64% reduction in approval time)",
      "4 revision rounds → 1 revision round (75% fewer revisions)",
      "80% less labor in the revision loop",
      "9.2/10 readiness score before first human review",
    ],
    skillGained: "Workflow optimization and scaling AI in constrained environments",
  },
];

const roiExamples = [
  {
    name: "Aurilis's outcome",
    fields: [
      ["Investment", "$995 (12-week Cohort 1 bundle)"],
      ["Time saved per project", "5+ hours"],
      ["Annual impact (1 project/month)", "60+ hours"],
      ["Cost per hour saved", "~$17"],
      ["Payback period", "<3 weeks"],
    ],
  },
  {
    name: "Teresa's outcome",
    fields: [
      ["Investment", "$995"],
      ["Hours saved per project", "10–80 (research elimination)"],
      ["Projects per year", "4–6"],
      ["Total annual savings", "40–480 hours"],
      ["Payback period", "<2 weeks"],
    ],
  },
  {
    name: "Leah's outcome",
    fields: [
      ["Investment", "$995"],
      ["Time saved per approval cycle", "8+ days"],
      ["Approval cycles per year", "12"],
      ["Total annual savings", "96+ days of effort"],
      ["Payback period", "<1 week"],
    ],
  },
];

export function ForYouPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [letterCopied, setLetterCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    referral: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to POST /api/contact once the FastAPI endpoint is live (see app/contact/page.tsx)
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", role: "", message: "", referral: "" });
      setFormSubmitted(false);
    }, 4000);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPhases = () => {
    document.getElementById("ai-literacy")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToInvestment = () => {
    document.getElementById("investment-roi")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyLetter = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(managerLetterText);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      // Fallback for sandboxed/insecure contexts where the Clipboard API is blocked.
      const textarea = document.createElement("textarea");
      textarea.value = managerLetterText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {
        // Ignore — UI still confirms below so the user can select/copy manually if needed.
      }
      document.body.removeChild(textarea);
    }
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 2000);
  };

  return (
    <div className="bg-white">
      {/* ============================================================ */}
      {/* SECTION 1: HERO + URGENCY */}
      {/* ============================================================ */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-[#0c2940] text-white min-h-[85vh] flex flex-col justify-center py-[4vh] border-b border-[#3f6d67]/30"
      >
        {/* Ambient Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#39918d]/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#c57b4b]/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3f6d67]/15 blur-3xl pointer-events-none rounded-full" />

        <ParticleBackground variant="dark" className="z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="t-h1 text-white">
                We rebuilt how our team learns AI. Here&apos;s the playbook.
              </h1>

              <p className="text-white/90 font-opensans text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-medium [@media(max-height:820px)]:text-base">
                Random tutorials weren&apos;t cutting it. Neither was &quot;figure it out
                yourself.&quot; So we built a 12-week system that actually works, and now
                we&apos;re opening it up.
              </p>

              <div className="space-y-2.5 text-slate-300 font-opensans text-base leading-relaxed max-w-2xl [@media(max-height:820px)]:text-sm [@media(max-height:820px)]:space-y-2">
                <p>
                  We watched smart, capable people spend months dabbling with AI tools and
                  getting nowhere. No structure. No feedback. No measurable outcome.
                </p>
                <p>
                  So we redesigned the whole approach. A structured, evidence-based 12-week
                  program aligned with the U.S. Department of Labor framework. Two phases. Real
                  outcomes. Measurable ROI.
                </p>
                <p>
                  In Phase 1, you shift from &quot;AI sounds intimidating&quot; to &quot;I can
                  use this every day.&quot; In Phase 2, you build something real: solve an actual
                  business problem, measure the impact, and walk out with a credential that
                  proves you can deliver.
                </p>
                <p>
                  This is not &quot;get comfortable with ChatGPT or Gemini or Claude.&quot; This
                  is &quot;become the person your team relies on when AI decisions need to
                  happen.&quot;
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  id="hero-primary-btn"
                  onClick={scrollToPhases}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#f8c51c] hover:bg-[#e5b310] active:scale-95 text-[#0c2940] font-montserrat text-sm sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg group w-fit cursor-pointer"
                >
                  <span>Now It&apos;s Your Turn</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-video-trigger"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 text-white hover:text-[#f8c51c] font-montserrat font-bold text-sm sm:text-base transition-colors py-2 px-1 cursor-pointer w-fit group"
                >
                  <span>Watch Aurilis&apos;s story</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-[1.5px] border-white group-hover:border-[#f8c51c] flex items-center justify-center transition-colors">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  </div>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="relative w-full flex flex-col bg-[#123652]/90 backdrop-blur-md rounded-2xl border-2 border-[#39918d]/50 shadow-2xl overflow-hidden group min-h-[300px]">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#39918d] via-[#f8c51c] to-[#c57b4b]" />

                <div className="relative flex-1 flex flex-col items-center justify-center text-center gap-4 p-7 sm:p-8">
                  <button
                    id="hero-video-play-card-btn"
                    onClick={() => setIsVideoOpen(true)}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white text-[#134e52] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-white/20"
                    aria-label="Play Aurilis's story"
                  >
                    <Play className="w-8 h-8 fill-current ml-1 text-[#134e52]" />
                  </button>

                  <div className="space-y-2">
                    <h3 className="t-h3 text-white">
                      Watch Aurilis&apos;s story
                    </h3>
                    <p className="text-slate-200/90 font-roboto text-sm sm:text-base leading-relaxed max-w-xs">
                      Troubleshooting PowerBI: 5+ hours → &lt;2 minutes.
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-3.5 right-4 bg-black/70 backdrop-blur-sm text-white text-base font-mono px-3 py-1 rounded-md border border-white/10 font-bold">
                  0:30
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: BUSINESS CASE */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white border-b border-[#3f6d67]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>01 / BUSINESS CASE</span>
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            Here&apos;s what we know.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businessCaseCards.map((card) => (
            <div
              key={card.title}
              className="bg-white border-2 border-[#0c2940]/10 rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-[#39918d]/60 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] flex items-center justify-center mb-4">
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="t-h3 text-[#0c2940] mb-3">
                {card.title}
              </h3>
              <p className="text-slate-600 font-roboto text-base sm:text-base leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <button
            id="business-case-cta-btn"
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 bg-[#c57b4b] hover:bg-[#b06738] active:scale-95 text-white font-montserrat font-semibold text-base px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all group cursor-pointer"
          >
            <span>What&apos;s the one workflow you&apos;d fix with AI?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div></section>

      {/* ============================================================ */}
      {/* SECTION 3: DECISION FRAMEWORK (Phase 1 vs Phase 2) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f7f9fa] border-b border-[#3f6d67]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>02 / DECISION FRAMEWORK</span>
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            Two phases.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* PHASE 1 */}
          <div
            id="ai-literacy"
            className="bg-white border-2 border-[#3f6d67] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 scroll-mt-24 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#3f6d67]" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] flex items-center justify-center">
                  <Brain className="w-7 h-7" />
                </div>
                <span className="bg-[#3f6d67] text-white text-sm font-montserrat font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  PHASE 1 — AI LITERACY &amp; FOUNDATIONS
                </span>
              </div>

              <h3 className="t-h3 text-[#0c2940] mb-4">Learn to speak AI</h3>

              <div className="mb-5">
                <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-sm">Best if:</div>
                <ul className="space-y-1.5 text-base text-slate-700 font-roboto">
                  {[
                    "You're new to AI concepts",
                    "You want foundational confidence before exploring tools",
                    "You need a safe space to ask \"dumb\" questions",
                    "Your manager wants you to start with the basics",
                    "You want to reskill and increase your wage premium opportunities",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-2">
                <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-sm">What you&apos;ll learn:</div>
                <ul className="space-y-1.5 text-base text-slate-700 font-roboto">
                  {[
                    "The case for AI literacy in today's world",
                    "How AI actually works (and what it can't do)",
                    "Data security and responsible AI use",
                    "Prompting fundamentals: how to interact with AI the right way",
                    "Disciplined prompting frameworks that produce usable outputs",
                    "Intro to building a simple AI assistant",
                    "Capstone: apply your learning to your own workflow",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 pb-4 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-sm font-montserrat font-bold text-slate-700 leading-tight">
                    6 weeks | 2 sessions/week | 60 min each
                  </span>
                  <span className="text-sm font-caption text-slate-500">Duration</span>
                </div>
                <div className="flex flex-col items-center border-l border-slate-100 px-1">
                  <Award className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-sm font-montserrat font-bold text-slate-700 leading-tight">
                    AI Literacy Specialist
                  </span>
                  <span className="text-sm font-caption text-slate-500">Certificate of Participation</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToInvestment}
                  className="text-base font-montserrat font-semibold text-[#39918d] hover:text-[#0a3d42] underline underline-offset-2 cursor-pointer"
                >
                  Find out more
                </button>
              </div>

              <a
                id="phase1-cta-btn"
                href="#" /* TODO: replace with Maven enrollment link, pre-filled for Phase 1 */
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact();
                }}
                className="mt-3 w-full bg-[#0c2940] hover:bg-[#163e5e] text-white font-montserrat font-bold text-sm py-3 rounded-xl shadow-md transition-all text-center block cursor-pointer"
              >
                Apply for Phase 1
              </a>
            </div>
          </div>

          {/* PHASE 2 */}
          <div
            id="ai-fluency"
            className="bg-white border-2 border-[#c57b4b] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 scroll-mt-24 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#c57b4b]" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#c57b4b]/10 border border-[#c57b4b]/30 text-[#c57b4b] flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <span className="bg-[#c57b4b] text-white text-sm font-montserrat font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  PHASE 2 — AI FLUENCY &amp; INTEGRATION
                </span>
              </div>

              <h3 className="t-h3 text-[#0c2940] mb-4">Solve a real problem</h3>

              <div className="mb-5">
                <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-sm">Best if:</div>
                <ul className="space-y-1.5 text-base text-slate-700 font-roboto">
                  {[
                    "You've completed Phase 1",
                    "You're ready to go deeper: build something, evaluate outputs, solve a real pain point",
                    "You want measurable performance metrics and a use case to prove your learning",
                    "You have a workflow or project you want to optimize with AI",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-2">
                <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-sm">What you&apos;ll learn:</div>
                <ul className="space-y-1.5 text-base text-slate-700 font-roboto">
                  {[
                    "Identify a pain point in your work where AI can help",
                    "Frameworks for developing practical use cases (not theory)",
                    "Tool vetting and selection (how to pick the right AI for your job)",
                    "The soft skills needed to cross-collaborate with others using AI",
                    "Pilot architecture and grounding documents",
                    "Executing your pilot (live, with feedback)",
                    "AI governance and responsible scaling",
                    "Measuring impact and Return on Investment (ROI)",
                    "Capstone: present your solution and its impact to the cohort",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 pb-4 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-sm font-montserrat font-bold text-slate-700 leading-tight">
                    6 weeks | 2 sessions/week | 60 min each
                  </span>
                  <span className="text-sm font-caption text-slate-500">Duration</span>
                </div>
                <div className="flex flex-col items-center border-l border-slate-100 px-1">
                  <Award className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-sm font-montserrat font-bold text-slate-700 leading-tight">
                    AI Integration Specialist
                  </span>
                  <span className="text-sm font-caption text-slate-500">Certificate of Participation</span>
                </div>
              </div>

              <a
                id="phase2-cta-btn"
                href="#" /* TODO: replace with Maven enrollment link, pre-filled for Phase 2 */
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact();
                }}
                className="mt-3 w-full bg-[#0c2940] hover:bg-[#163e5e] text-white font-montserrat font-bold text-sm py-3 rounded-xl shadow-md transition-all text-center block cursor-pointer"
              >
                Apply for Phase 2
              </a>
            </div>
          </div>
        </div>
      </div></section>

      {/* ============================================================ */}
      {/* SECTION 4: WHAT YOU'LL MASTER (DOL competencies) */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white border-b border-[#3f6d67]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>03 / WHAT YOU&apos;LL MASTER</span>
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            Five U.S. Department of Labor framework competencies. Covered.
          </h2>
          <p className="font-opensans text-base sm:text-lg text-[#0c2940]/80 leading-relaxed max-w-2xl mx-auto">
            Every module aligns with the U.S. Department of Labor&apos;s Federal AI Literacy
            Framework. Here&apos;s what competence looks like when someone can do the actual
            work:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {masteryCompetencies.map((item) => (
            <div
              key={item.title}
              className="bg-white border-2 border-[#0c2940]/10 hover:border-[#39918d]/50 rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-[#39918d]/10 border border-[#39918d]/30 flex items-center justify-center text-[#39918d] flex-shrink-0">
                <item.icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="font-montserrat font-bold text-[#0c2940] text-base mb-1">{item.title}</div>
                <p className="text-base font-roboto text-slate-600 leading-snug">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 font-roboto text-base italic max-w-2xl mx-auto">
          Together, we call the progression of these competencies The Integrated Performance
          Measurement Framework.
        </p>

        <div className="flex justify-center">
          <button
            onClick={scrollToPhases}
            className="inline-flex items-center gap-2 text-[#0c2940] hover:text-[#39918d] font-montserrat font-semibold text-sm sm:text-base transition-colors cursor-pointer underline underline-offset-2"
          >
            Where are the gaps for you or your team right now?
          </button>
        </div>
      </div></section>

      {/* ============================================================ */}
      {/* SECTION 5: PROOF FROM REAL COHORTS */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f7f9fa] border-b border-[#3f6d67]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>04 / PROOF</span>
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            This is what happens when people commit to the process.
          </h2>
          <p className="font-opensans text-base sm:text-lg text-[#0c2940]/80 leading-relaxed max-w-2xl mx-auto">
            Came in scared. Confidently graduated with DOL-aligned skills and competencies. These
            are real people from our cohorts who walked in with a problem and walked out with a
            working solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white border-2 border-[#0c2940]/10 hover:border-[#39918d]/50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3.5"
            >
              <div>
                <div className="text-sm font-montserrat font-bold uppercase tracking-wider text-[#39918d]">
                  {study.name}
                </div>
                <div className="text-sm font-roboto text-slate-500">{study.role}</div>
              </div>

              <h3 className="t-h3 text-[#0c2940]">
                {study.headline}
              </h3>

              <div className="text-base font-roboto text-slate-600 leading-relaxed space-y-2">
                <p>
                  <span className="font-semibold text-[#0c2940]">The Problem: </span>
                  {study.problem}
                </p>
                <p>
                  <span className="font-semibold text-[#0c2940]">The Solution: </span>
                  {study.solution}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-base font-montserrat font-bold text-[#0c2940] mb-1.5">The Metrics:</div>
                <ul className="space-y-1 text-base text-slate-700 font-roboto">
                  {study.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-[#39918d] flex-shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-base font-roboto text-slate-500 italic border-t border-slate-100 pt-2.5">
                Skill gained: {study.skillGained}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#f0f6f8] border border-[#d9e6eb] rounded-2xl p-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-300 text-center">
            {[
              "66–80% confidence gains in AI use",
              "2+ hrs/week freed for strategic work",
              "75%+ faster task completion in specific workflows",
            ].map((stat) => (
              <div key={stat} className="pt-3 sm:pt-0 font-montserrat font-bold text-[#0c2940] text-base px-2">
                {stat}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 bg-[#c57b4b] hover:bg-[#b06738] active:scale-95 text-white font-montserrat font-semibold text-base px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all group cursor-pointer"
          >
            <span>I want results like this</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div></section>

      {/* ============================================================ */}
      {/* SECTION 6: WHAT YOU'LL EARN */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white border-b border-[#3f6d67]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
              <span>05 / CREDENTIALS</span>
            </div>

            <h2 className="t-h2 text-[#0c2940]">
              Credentials come through building the skills.
            </h2>
            <p className="text-slate-600 font-roboto text-base sm:text-base leading-relaxed">
              Certification is a process that we take seriously. Because there is no governing
              body just yet to verify what constitutes an AI literate citizen, we will credential
              you through our evidence-based learning and Integrated Performance Measurement
              Framework (IPMF).
            </p>

            <div className="flex items-start gap-2.5 bg-[#f0f6f8] border border-[#d9e6eb] rounded-xl p-3.5">
              <Info className="w-4 h-4 text-[#39918d] flex-shrink-0 mt-0.5" />
              <p className="text-base font-roboto text-slate-600 leading-relaxed">
                The IPMF enables organizations to determine whether AI capability development
                improved workplace performance, supported strategic objectives, and contributed
                to measurable organizational results. Unlike traditional training evaluations,
                it&apos;s designed to transform a training program into an evidence-based
                business solution.
              </p>
            </div>

            <p className="text-slate-600 font-roboto text-base sm:text-base leading-relaxed">
              The fact is this: You will leave with defensible, demonstrable skills, and at a
              minimum, one use case to back up your work. That is more powerful — and
              employable — than any certificate on the market can offer you.
            </p>

            <ul className="space-y-2 text-sm font-roboto text-slate-700">
              {[
                "Professionally designed (suitable for LinkedIn, resumes, portfolio)",
                "Verified (includes unique ID, date of completion)",
                "Meaningful (employers recognize DOL-aligned training)",
                "Shareable (download, frame, or email)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#39918d] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div
              id="certificate-preview-box"
              onClick={() => setIsCertificateModalOpen(true)}
              className="bg-[#f7fafb] border-2 border-dashed border-[#39918d]/40 rounded-xl p-6 text-center cursor-pointer hover:border-[#39918d] transition-colors relative group"
            >
              <div className="border border-[#39918d]/30 p-5 rounded-lg bg-white shadow-2xs blur-[1.5px] select-none">
                <div className="text-base font-montserrat font-extrabold tracking-widest text-[#0c2940] uppercase mb-0.5">
                  CERTIFICATE
                </div>
                <div className="text-[10px] font-montserrat tracking-wider text-slate-500 uppercase mb-4">
                  OF PARTICIPATION
                </div>
                <div className="w-11 h-11 mx-auto rounded-full bg-[#0c2940] text-[#f8c51c] flex items-center justify-center shadow-xs">
                  <Award className="w-6 h-6" />
                </div>
                <div className="mt-4 flex justify-center gap-8">
                  <div className="w-14 h-0.5 bg-slate-300" />
                  <div className="w-14 h-0.5 bg-slate-300" />
                </div>
              </div>
              <span className="absolute bottom-2 right-3 text-sm font-caption text-[#39918d] opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view ↗
              </span>
            </div>
            <p className="text-center text-base font-roboto text-slate-500 mt-3">
              Your credential of participation, signed by Paige Bradbury, CEO &amp; Principal
              Learning Architect
            </p>
          </div>
        </div>
      </div></section>

      {/* ============================================================ */}
      {/* SECTION 7: THE INVESTMENT & ROI */}
      {/* ============================================================ */}
      <section id="investment-roi" className="py-16 md:py-24 bg-[#f7f9fa] border-b border-[#3f6d67]/20 scroll-mt-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39918d]/10 border border-[#39918d]/30 text-[#39918d] font-montserrat font-bold text-xs uppercase tracking-wider">
            <span>06 / INVESTMENT &amp; ROI</span>
          </div>

          <h2 className="t-h2 text-[#0c2940]">
            What it costs. What you get back.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT: PRICING */}
          <div className="bg-white border-2 border-[#39918d] rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#39918d]" />
            <h3 className="t-h3 text-[#0c2940] mb-1">
              Transparent pricing. No hidden anything.
            </h3>
            <p className="text-base font-roboto text-slate-500 mb-5">
              Pricing valid through July 31. Starts August 1 at $1,325 for the bundle.
            </p>

            <div className="space-y-2 text-sm mb-6">
              {[
                { name: "Phase 1: AI Literacy", detail: "6 weeks · 2×60 min", price: "$495", status: "Individual" },
                { name: "Phase 2: AI Fluency", detail: "6 weeks · 2×60 min", price: "$695", status: "Individual" },
                { name: "Bundle: Both phases", detail: "12 weeks · 2×60 min", price: "$995", status: "Save $195" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between border-b border-slate-50 py-2.5 font-roboto"
                >
                  <div>
                    <div className="font-montserrat font-semibold text-[#0c2940]">{row.name}</div>
                    <div className="text-sm text-slate-500">{row.detail}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-montserrat font-bold text-[#0c2940]">{row.price}</div>
                    <div className="text-sm text-[#39918d] font-semibold">{row.status}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-slate-600 font-roboto mb-6">
              <div className="font-montserrat font-bold text-[#0c2940] text-sm mb-1">
                What&apos;s included in each phase:
              </div>
              {[
                "Live cohort-based training (peer learning)",
                "Digital workbook and resources",
                "Expert feedback on your work",
                "Certificate upon completion",
                "Lifetime access to recorded sessions",
              ].map((item) => (
                <div key={item} className="flex items-start gap-1.5 text-base">
                  <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              id="pricing-cta-btn"
              href="https://share-na2.hsforms.com/2T9Meps13RsyPWay9SckNaQ42qq7r"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#f8c51c] hover:bg-[#e5b310] active:scale-[0.99] text-[#0c2940] font-montserrat font-bold text-sm sm:text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enroll now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* RIGHT: TAX / ROI */}
          <div
            id="tax-reimbursement"
            className="bg-[#EDF2F4] border-2 border-[#0c2940]/10 rounded-2xl p-6 sm:p-7 shadow-md scroll-mt-24"
          >
            <h3 className="t-h3 text-[#0c2940] mb-1">
              The real cost is probably lower than you think.
            </h3>
            <p className="text-base font-roboto text-[#60707A] leading-relaxed mb-5">
              Your company may offset this entirely through tax credits and retraining programs.
              We&apos;ve done the research so you don&apos;t have to.
            </p>

            <div className="space-y-3 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200/70">
                <div className="font-montserrat font-bold text-[#0c2940] text-base mb-1">
                  Option 1: Georgia Retraining Tax Credit (if applicable)
                </div>
                <p className="text-base font-roboto text-slate-600 leading-relaxed">
                  Businesses in Georgia can claim a tax credit equal to 50% of direct training
                  costs, up to $500 per full-time W-2 employee per year (up to $1,250 if the
                  employee completes multiple programs). Talk to your tax advisor about whether
                  your state has similar credits.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/70">
                <div className="font-montserrat font-bold text-[#0c2940] text-base mb-1">
                  Option 2: IRS Section 127
                </div>
                <p className="text-base font-roboto text-slate-600 leading-relaxed mb-1.5">
                  Reclaim up to $5,250 per employee per year in tax-free educational assistance.
                  AI upskilling is included. This is likely the biggest lever. Most companies
                  don&apos;t know about it.
                </p>
                <a
                  href="https://www.irs.gov/publications/p15-b#en_US_2024_publink1000170950"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base font-semibold text-[#39918d] hover:text-[#0a3d42]"
                >
                  IRS Section 127 — Educational Assistance <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/70">
                <div className="font-montserrat font-bold text-[#0c2940] text-base mb-1">
                  Option 3: Federal Policy Shift
                </div>
                <p className="text-base font-roboto text-slate-600 leading-relaxed mb-1.5">
                  The bipartisan AI Workforce Training Act (H.R. 7576) is moving through Congress
                  with explicit orders to launch outreach efforts to help small and mid-size
                  businesses leverage training credits. Federal support is coming. Position
                  yourself now.
                </p>
                <a
                  href="https://www.congress.gov/bill/118th-congress/house-bill/7576"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base font-semibold text-[#39918d] hover:text-[#0a3d42]"
                >
                  H.R. 7576 — AI Workforce Training Act (Congress.gov) <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="border-t border-slate-300/60 pt-4">
              <div className="font-montserrat font-bold text-[#0c2940] text-base mb-2.5">ROI Examples:</div>
              <div className="space-y-3">
                {roiExamples.map((ex) => (
                  <div key={ex.name} className="text-base font-roboto text-slate-700 leading-relaxed">
                    <div className="font-semibold text-[#0c2940]">{ex.name}</div>
                    <ul className="space-y-0.5 mt-1">
                      {ex.fields.map(([label, value]) => (
                        <li
                          key={label}
                          className={label === "Payback period" ? "text-[#39918d] font-semibold" : undefined}
                        >
                          {label}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-base font-roboto text-slate-500 mt-4 leading-relaxed">
              These are real outcomes from recent cohorts. Your mileage will vary based on your
              role and workflow, but the pattern holds: structured learning done in community
              pays for itself fast.
            </p>
          </div>
        </div>
      </div></section>

      {/* ============================================================ */}
      {/* SECTION 8: MANAGER RECOMMENDATION LETTER */}
      {/* ============================================================ */}
      <section id="manager-letter" className="py-16 md:py-24 bg-white border-b border-[#3f6d67]/20 scroll-mt-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="rounded-2xl bg-[#0c2940] text-white p-6 sm:p-10">
          <div className="max-w-2xl mb-6">
            <h2 className="t-h2 mb-2">
              Need your manager&apos;s sign-off? We wrote the letter.
            </h2>
            <p className="text-base font-roboto text-[#D9E3E6] leading-relaxed">
              We&apos;ve handled the hard part. Below is a pre-written letter your manager can
              read in 60 seconds. It covers business case, ROI, and what we need from them.
              Download, forward, or copy-paste. No pitch. Just the facts they need to say yes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="bg-white/5 border border-white/15 rounded-xl p-5 text-[#D9E3E6]">
              <h4 className="text-base font-montserrat font-bold text-white mb-3">
                &quot;Start Building Something That Works Today&quot;
              </h4>
              <p className="text-base font-roboto leading-[1.7]">
                &quot;Your employee needs baseline AI fluency to stay competitive. This is your
                roadmap to compliance and measurable impact.
                <br />
                <br />
                <span className="font-semibold text-white">The Business Case:</span>
                <br />
                Regulatory alignment: The U.S. Department of Labor framework is the federal
                standard for workforce readiness.
                <br />
                Competitive risk: Teams without AI fluency fall behind on productivity and
                retention. This isn&apos;t speculative.
                <br />
                Cost &amp; speed: An investment of less than $1,500; structured learning, not
                random tutorials; implementation immediate.
                <br />
                <br />
                What they&apos;ll master: Understand AI, Use AI Effectively, Direct AI
                Effectively, Evaluate Outputs Responsibly, Use AI Responsibly
                <br />
                Here&apos;s the ROI: 66–80% confidence gains, 2+ hrs/week freed, 75%+ faster task
                completion
                <br />
                <br />
                <span className="font-semibold text-white">Your role:</span> Approve enrollment
                and allocate 2 sessions/week (~2 hours + homework)
                <br />
                <span className="font-semibold text-white">Our role:</span> Deliver cohort-based
                learning with measurable outcomes and ROI.&quot;
              </p>
              <p className="text-sm font-roboto text-[#8fa4ad] mt-3">
                Full letter included in download. Customize as needed.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/15 rounded-xl p-5">
              <Link
                href="/resources#resource-card-manager-letter"
                className="inline-flex items-center space-x-2 bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-semibold px-6 py-3.5 rounded-lg shadow-lg transition-all whitespace-nowrap w-full justify-center"
              >
                <Download className="w-4 h-4" />
                <span>Download manager letter (PDF)</span>
              </Link>

              <button
                onClick={handleCopyLetter}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-montserrat font-semibold text-sm px-6 py-3 rounded-lg transition-all w-full cursor-pointer"
              >
                {letterCopied ? <Check className="w-3.5 h-3.5 text-[#39918d]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{letterCopied ? "Copied!" : "Copy text"}</span>
              </button>

              <span className="text-base font-roboto text-[#8fa4ad]">Or copy-paste the text below</span>

              <pre className="w-full max-h-56 overflow-y-auto bg-black/20 border border-white/15 rounded-xl p-3.5 text-sm font-mono text-[#D9E3E6] leading-relaxed whitespace-pre-wrap select-all cursor-text">
                {managerLetterText}
              </pre>
            </div>
          </div>
        </div>
      </div></section>

      {/* ============================================================ */}
      {/* SECTION 9: APPLY FOR YOUR COHORT */}
      {/* ============================================================ */}
      <section
        id="contact"
        className="w-full bg-[#f7f9fa] px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto bg-white border border-[#d9e6eb] rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-4 space-y-4">
              <div>
                <h2 className="t-h2 text-[#0c2940]">
                  Let&apos;s get you into a cohort.
                </h2>
                <p className="text-sm sm:text-sm font-roboto text-slate-600 mt-2 leading-relaxed max-w-sm">
                  Choose the phase that fits you, tell us a bit about your situation, and
                  we&apos;ll get you connected with the right community. Cohorts launch every 6
                  to 8 weeks. We keep them small on purpose.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              {formSubmitted ? (
                <div className="bg-white border border-[#39918d]/40 rounded-2xl p-8 text-center space-y-4 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://thebradburygroup.com/wp-content/uploads/2026/06/White-Monochrome-Text-2.png"
                    alt="The Bradbury Group"
                    className="h-9 w-auto object-contain mx-auto bg-[#0c2940] rounded-lg px-3 py-2"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#eef7f9] text-[#39918d] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-montserrat font-bold text-[#0c2940]">
                    You&apos;re in! We&apos;ll be in touch soon.
                  </h4>
                  <p className="text-sm font-roboto text-slate-600 max-w-md mx-auto">
                    Watch for an email from [team email]. We&apos;ll confirm your cohort start
                    date.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#39918d] hover:text-[#0a3d42] font-montserrat font-semibold text-sm underline underline-offset-2"
                  >
                    Back to home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0c2940]/20 text-sm sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0c2940]/20 text-sm sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0c2940]/20 text-sm sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                    />
                    <input
                      type="text"
                      placeholder="Your role (optional)"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0c2940]/20 text-sm sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Which phase? What's your biggest AI challenge right now? (optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-sm sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] resize-none"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="How did you hear about us? (optional)"
                      value={formData.referral}
                      onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0c2940]/20 text-sm sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="bg-[#f8c51c] hover:bg-[#e5b310] active:scale-95 text-[#0c2940] font-montserrat font-bold text-sm sm:text-sm px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Let&apos;s get started
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STICKY FOOTER CTA (mobile only) */}
      {/* ============================================================ */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c2940] border-t border-[#3f6d67]/40 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <span className="text-white font-montserrat font-bold text-base">Ready?</span>
        <button
          onClick={scrollToContact}
          className="inline-flex items-center gap-2 bg-[#f8c51c] hover:bg-[#e5b310] active:scale-95 text-[#0c2940] font-montserrat font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <span>Now It&apos;s Your Turn</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/* MODALS */}
      {/* ============================================================ */}
      {isVideoOpen && (
        <div
          id="video-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="bg-[#0c2940] text-white rounded-2xl max-w-2xl w-full p-6 relative border border-teal-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close video modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-montserrat font-bold mb-2">Watch Aurilis&apos;s story</h3>
            <p className="text-sm font-roboto text-slate-300 mb-4">
              Troubleshooting PowerBI: 5+ hours → &lt;2 minutes.
            </p>
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center border border-white/10 relative">
              <div className="w-16 h-16 rounded-full bg-[#f8c51c] text-slate-900 flex items-center justify-center animate-pulse mb-3">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
              <span className="text-sm font-montserrat font-semibold text-slate-200">Video Preview Mode Active</span>
            </div>
          </div>
        </div>
      )}

      {isCertificateModalOpen && (
        <div
          id="certificate-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsCertificateModalOpen(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-8 relative border-4 border-[#0c2940] shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCertificateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-2 border-[#0c2940] p-6 rounded-2xl bg-[#fafcfc]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#0c2940] text-[#f8c51c] flex items-center justify-center mb-3 shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-xs font-montserrat tracking-widest text-slate-500 uppercase">
                THE BRADBURY GROUP
              </div>
              <h3 className="text-2xl font-inter font-black text-[#0c2940] my-2 tracking-wide uppercase">
                Certificate of Participation
              </h3>
              <p className="text-sm font-roboto text-slate-600 max-w-md mx-auto mb-6">
                Your credential of participation, signed by Paige Bradbury, CEO &amp; Principal
                Learning Architect.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
