"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  Users,
  Settings,
  BookOpen,
  ShieldCheck,
  Brain,
  Target,
  Award,
  Calendar,
  Clock,
  UserCheck,
  Filter,
  Check,
  Play,
  ArrowRight,
  FileText,
  Rocket,
  ChevronDown,
  X,
  CheckCircle2,
  Download,
} from "lucide-react";

const curriculumSteps = [
  { number: "01", icon: BookOpen, title: "Orientation" },
  { number: "02", icon: Settings, title: "Tool Setup" },
  { number: "03", icon: Target, title: "Workflow Design" },
  { number: "04", icon: Filter, title: "Guided Practice" },
  { number: "05", icon: ShieldCheck, title: "Governance Review" },
  { number: "06", icon: TrendingUp, title: "Capstone" },
];

const testimonialSeats = [
  { id: "t1", title: "VP of Operations", organization: "Enterprise Client" },
  { id: "t2", title: "Director of L&D", organization: "Enterprise Client" },
  { id: "t3", title: "Chief of Staff", organization: "Enterprise Client" },
];

export function ForYouPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    cohort: "",
    message: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to POST /api/contact once the FastAPI endpoint is live (see app/contact/page.tsx)
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", topic: "", cohort: "", message: "" });
      setFormSubmitted(false);
    }, 4000);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section id="hero-section" className="pt-10 pb-4 sm:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-20 sm:h-22 bg-[#1b6e70] rounded-full flex-shrink-0 mt-1" />
                <h1 className="text-4xl sm:text-5xl font-inter font-black text-[#0c2940] tracking-tight leading-[1.12]">
                  Executive AI
                  <br />
                  Fluency, For You
                </h1>
              </div>

              <div className="space-y-3.5 text-slate-600 font-roboto text-[13.5px] sm:text-[14px] leading-relaxed max-w-lg">
                <p>
                  Individual executive coaching, personal AI agent workflows, and foundational
                  upskilling — a two-phase path that takes you from AI literacy to daily AI
                  fluency.
                </p>
                <p>
                  Delivered in small cohorts alongside peer executives, with 1:1 coaching
                  touchpoints and a certificate of completion you can bring back to your
                  organization.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  id="hero-primary-btn"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0a3d42] hover:bg-[#082f33] active:scale-95 text-white font-montserrat text-xs sm:text-sm font-semibold px-5 py-2.5 sm:py-3 rounded-full transition-all shadow-md group w-fit cursor-pointer"
                >
                  <span>Book a Discovery Call</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-video-trigger"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 text-[#0c2940] hover:text-[#1b6e70] font-montserrat font-bold text-xs sm:text-[13.5px] transition-colors py-2 px-1 cursor-pointer w-fit group"
                >
                  <span>Watch the Overview</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-[1.5px] border-[#0c2940] flex items-center justify-center group-hover:border-[#1b6e70] transition-colors">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  </div>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#134e52] text-white p-7 sm:p-10 border border-[#1b6e70]/40 group min-h-[260px] sm:min-h-[300px] flex items-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
                    <circle cx="280" cy="110" r="32" fill="white" />
                    <polygon points="170,290 290,130 400,290" fill="white" />
                    <polygon points="260,290 380,160 490,290" fill="white" opacity="0.6" />
                  </svg>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full">
                  <div className="sm:col-span-5 flex items-center justify-center">
                    <button
                      id="hero-video-play-card-btn"
                      onClick={() => setIsVideoOpen(true)}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white text-[#134e52] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-white/20"
                      aria-label="Play introduction video"
                    >
                      <Play className="w-8 h-8 fill-current ml-1 text-[#134e52]" />
                    </button>
                  </div>

                  <div className="sm:col-span-7 space-y-2 text-left">
                    <h3 className="text-2xl sm:text-3xl font-montserrat font-bold tracking-tight text-white leading-tight">
                      AI Fluency Cohort
                      <br />
                      Overview
                    </h3>
                    <p className="text-slate-200/90 font-roboto text-xs sm:text-[13px] leading-relaxed max-w-xs">
                      A two-minute primer on the cohort format, curriculum, and outcomes.
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-3.5 right-4 bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono px-3 py-1 rounded-md border border-white/10 font-bold">
                  2:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURE STRIP */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <div className="bg-[#f0f6f8] border border-[#dce8ec] rounded-2xl p-3.5 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-slate-300/60">
            {[
              { icon: Settings, title: "Personalized", subtitle: "Adaptive Curriculum" },
              { icon: BookOpen, title: "Self-Paced", subtitle: "Learn on Your Schedule" },
              { icon: TrendingUp, title: "Applied", subtitle: "Real Workflow Practice" },
              { icon: ShieldCheck, title: "Vetted", subtitle: "Governance-First Approach" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3.5 px-3 sm:px-5">
                <div className="text-[#0c2940] flex-shrink-0">
                  <item.icon className="w-7 h-7 stroke-[1.75]" />
                </div>
                <div className="text-xs sm:text-[13.5px] leading-snug">
                  <div className="font-montserrat font-bold text-[#0c2940]">{item.title}</div>
                  <div className="font-roboto font-normal text-slate-700">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3 PILLARS + CTA */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 space-y-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1.5px] bg-[#c57b4b]/60 w-16 sm:w-28 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-[#0c2940] tracking-tight text-center">
            What You&apos;ll Build
          </h2>
          <div className="h-[1.5px] bg-[#c57b4b]/60 w-16 sm:w-28 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Building2,
              title: "Organizational Fluency",
              description:
                "Learn to evaluate, adopt, and apply AI tools inside your actual role — not generic use cases.",
            },
            {
              icon: TrendingUp,
              title: "Measurable ROI",
              description:
                "Leave with a personal productivity blueprint you can point to time saved and outcomes delivered.",
            },
            {
              icon: Users,
              title: "Peer Network",
              description:
                "Work alongside a small cohort of fellow executives navigating the same transformation.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#39918d]/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#eef7f9] text-[#39918d] flex items-center justify-center flex-shrink-0">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-montserrat font-bold text-[#0c2940] leading-snug">{card.title}</h3>
              </div>
              <p className="text-slate-600 font-roboto text-xs sm:text-[13px] leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <button
            id="pillars-cta-btn"
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 bg-[#c57b4b] hover:bg-[#b06738] active:scale-95 text-white font-montserrat font-semibold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all group cursor-pointer"
          >
            <span>Ready to Get Started?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PHASE 1 / PHASE 2 / CERTIFICATE */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 space-y-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1.5px] bg-[#c57b4b]/60 w-16 sm:w-28 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-[#0c2940] tracking-tight text-center">
            The Two-Phase Path
          </h2>
          <div className="h-[1.5px] bg-[#c57b4b]/60 w-16 sm:w-28 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* PHASE 1 */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#eef7f9] text-[#39918d] flex items-center justify-center">
                  <Brain className="w-7 h-7" />
                </div>
                <span className="bg-[#3f6d67] text-white text-[11px] font-montserrat font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  PHASE 1
                </span>
              </div>

              <h3 className="text-lg font-montserrat font-bold text-[#0c2940] mb-1">AI Literacy</h3>
              <p className="text-slate-500 font-roboto text-xs mb-5">
                Foundational understanding of how modern AI systems work.
              </p>

              <div className="grid grid-cols-2 gap-3 text-[11.5px] text-slate-700 mb-6 font-roboto">
                <div>
                  <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-xs">Core Concepts:</div>
                  <ul className="space-y-1.5">
                    {["Core concepts & mental models", "Prompting fundamentals", "Risk & governance basics"].map(
                      (item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div>
                  <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-xs">Outcomes:</div>
                  <ul className="space-y-1.5">
                    {[
                      "Confident tool evaluation",
                      "Safe daily use",
                      "Shared vocabulary for AI",
                      "Baseline governance awareness",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 pb-4 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-[10px] font-montserrat font-bold text-slate-700 leading-tight">6 Weeks</span>
                  <span className="text-[9px] font-caption text-slate-500">Duration</span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-100 px-1">
                  <Clock className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-[10px] font-montserrat font-bold text-slate-700 leading-tight">3 hrs/wk</span>
                  <span className="text-[9px] font-caption text-slate-500">Commitment</span>
                </div>
                <div className="flex flex-col items-center">
                  <UserCheck className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-[10px] font-montserrat font-bold text-slate-700 leading-tight">Cohort</span>
                  <span className="text-[9px] font-caption text-slate-500">Format</span>
                </div>
              </div>

              <button
                id="phase1-cta-btn"
                onClick={scrollToContact}
                className="w-full bg-[#0c2940] hover:bg-[#163e5e] text-white font-montserrat font-semibold text-xs py-2.5 rounded-lg transition-colors text-center block cursor-pointer"
              >
                Reserve a Seat
              </button>
            </div>
          </div>

          {/* PHASE 2 */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#eef7f9] text-[#39918d] flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <span className="bg-[#3f6d67] text-white text-[11px] font-montserrat font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  PHASE 2
                </span>
              </div>

              <h3 className="text-lg font-montserrat font-bold text-[#0c2940] mb-1">AI Fluency</h3>
              <p className="text-slate-500 font-roboto text-xs mb-5">
                Applied workflow design for daily executive work.
              </p>

              <div className="grid grid-cols-2 gap-3 text-[11.5px] text-slate-700 mb-6 font-roboto">
                <div>
                  <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-xs">Applied Skills:</div>
                  <ul className="space-y-1.5">
                    {[
                      "Custom agent workflow design",
                      "Personal productivity blueprint",
                      "Ongoing capability coaching",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-montserrat font-bold text-[#0c2940] mb-2 text-xs">Outcomes:</div>
                  <ul className="space-y-1.5">
                    {[
                      "Repeatable AI workflows",
                      "Personal agent library",
                      "Weekly time savings",
                      "Coaching accountability",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 pb-4 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-[10px] font-montserrat font-bold text-slate-700 leading-tight">6 Weeks</span>
                  <span className="text-[9px] font-caption text-slate-500">Duration</span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-100 px-1">
                  <Clock className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-[10px] font-montserrat font-bold text-slate-700 leading-tight">3 hrs/wk</span>
                  <span className="text-[9px] font-caption text-slate-500">Commitment</span>
                </div>
                <div className="flex flex-col items-center">
                  <UserCheck className="w-4 h-4 text-[#39918d] mb-1" />
                  <span className="text-[10px] font-montserrat font-bold text-slate-700 leading-tight">Cohort</span>
                  <span className="text-[9px] font-caption text-slate-500">Format</span>
                </div>
              </div>

              <button
                id="phase2-cta-btn"
                onClick={scrollToContact}
                className="w-full bg-[#0c2940] hover:bg-[#163e5e] text-white font-montserrat font-semibold text-xs py-2.5 rounded-lg transition-colors text-center block cursor-pointer"
              >
                Reserve a Seat
              </button>
            </div>
          </div>

          {/* CERTIFICATE */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-base font-montserrat font-bold text-[#0c2940] mb-4 text-center">
                Certificate of Completion
              </h3>

              <div
                id="certificate-preview-box"
                onClick={() => setIsCertificateModalOpen(true)}
                className="bg-[#f7fafb] border-2 border-dashed border-[#39918d]/40 rounded-xl p-4 sm:p-5 text-center cursor-pointer hover:border-[#39918d] transition-colors relative mb-5 group"
              >
                <div className="border border-[#39918d]/30 p-3 rounded-lg bg-white shadow-2xs">
                  <div className="text-[11px] font-montserrat font-extrabold tracking-widest text-[#0c2940] uppercase mb-0.5">
                    CERTIFICATE
                  </div>
                  <div className="text-[8.5px] font-montserrat tracking-wider text-slate-500 uppercase mb-3">
                    OF COMPLETION
                  </div>
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#0c2940] text-[#f8c51c] flex items-center justify-center shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="mt-3 flex justify-center gap-6">
                    <div className="w-12 h-0.5 bg-slate-300" />
                    <div className="w-12 h-0.5 bg-slate-300" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-2 text-[9px] font-caption text-[#39918d] opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view ↗
                </span>
              </div>

              <ul className="space-y-2 text-xs font-roboto text-slate-700 mb-4">
                {[
                  "Signed by The Solomon Engine",
                  "Verifiable credential ID",
                  "Shareable on LinkedIn",
                  "Counts toward Enterprise Architecture track",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#39918d] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] font-roboto text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
              Certificates are issued upon completion of each phase and can support employer
              reimbursement requests.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CURRICULUM STEPS + PRICING */}
      {/* ============================================================ */}
      <section id="curriculum-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-[#0c2940] tracking-tight">
                How the Cohort Works
              </h2>
              <p className="text-xs font-roboto text-slate-500 mt-1">
                Six steps from onboarding to a working AI practice.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-3.5 flex-grow items-stretch">
              {curriculumSteps.map((step) => (
                <div
                  key={step.number}
                  className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-between hover:border-[#39918d] hover:bg-white transition-all shadow-xs min-h-[160px] sm:min-h-[220px]"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 shadow-2xs flex items-center justify-center text-[#39918d]">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-montserrat font-extrabold text-[#0c2940] my-2">{step.number}</div>
                  <div className="text-[11px] font-montserrat font-medium text-slate-600 leading-tight">
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-montserrat font-bold text-[#0c2940] mb-5 text-center">
                Tuition &amp; What&apos;s Included
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5 border-b border-slate-100 text-xs">
                <div className="space-y-2.5">
                  <div className="font-montserrat font-bold text-[#0c2940]">Pricing:</div>
                  <div className="flex justify-between items-center text-slate-600 py-1 font-roboto border-b border-slate-50">
                    <span>Phase 1 (6 weeks)</span>
                    <span className="font-montserrat font-bold text-[#0c2940]">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 py-1 font-roboto border-b border-slate-50">
                    <span>Phase 2 (6 weeks)</span>
                    <span className="font-montserrat font-bold text-[#0c2940]">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 py-1 font-roboto">
                    <span>Bundle (Both Phases)</span>
                    <span className="font-montserrat font-bold text-[#0c2940]">$2,000</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-slate-600 font-roboto">
                  <div className="font-montserrat font-bold text-[#0c2940]">What&apos;s Included</div>
                  {[
                    "Live weekly sessions",
                    "1:1 coaching touchpoint",
                    "Certificate of completion",
                    "Private cohort community",
                    "Lifetime resource access",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-1.5 text-[11.5px]">
                      <Check className="w-3.5 h-3.5 text-[#39918d] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-3 text-[11.5px] font-roboto text-slate-600 font-medium my-4">
                <a href="#tax-reimbursement" className="hover:text-[#39918d] transition-colors">
                  Tax &amp; Reimbursement Info
                </a>
                <span className="text-slate-300">|</span>
                <a href="#manager-letter" className="hover:text-[#39918d] transition-colors">
                  Manager Sign-Off Letter
                </a>
              </div>

              <button
                id="pricing-cta-btn"
                onClick={scrollToContact}
                className="w-full bg-[#f8c51c] hover:bg-[#e2b110] active:scale-[0.99] text-slate-900 font-montserrat font-bold text-xs sm:text-sm py-3 rounded-lg shadow-sm transition-all text-center block cursor-pointer"
              >
                Book a Discovery Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TAX / REIMBURSEMENT + MANAGER LETTER */}
      {/* ============================================================ */}
      <section
        id="tax-reimbursement"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 scroll-mt-24"
      >
        <div className="rounded-2xl bg-[#EDF2F4] p-8 sm:p-10">
          <h3 className="text-lg font-montserrat font-bold text-[#0c2940] mb-3">Tax &amp; Employer Reimbursement</h3>
          <p className="text-sm font-roboto text-[#60707A] leading-relaxed">
            Cohort tuition often qualifies for employer professional-development reimbursement or
            as a deductible continuing-education expense. We recommend checking with your
            employer&apos;s learning budget or a tax professional — we can provide an itemized
            invoice and program outline on request.
          </p>
        </div>
      </section>

      <section id="manager-letter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 scroll-mt-24">
        <div className="rounded-2xl bg-[#0c2940] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-2">Need manager sign-off?</h3>
            <p className="text-sm font-roboto text-[#D9E3E6] max-w-md">
              Download a pre-written recommendation letter template to make the case for your
              manager to approve enrollment.
            </p>
          </div>
          <Link
            href="/resources/manager-recommendation-letter"
            className="inline-flex items-center space-x-2 bg-[#f8c51c] hover:bg-[#e0b016] text-[#0c2940] font-inter font-semibold px-6 py-3.5 rounded-lg shadow-lg transition-all whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download Letter</span>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS + PDF + STATS */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 space-y-6">
        <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-[#0c2940] tracking-tight text-center">
          What Cohort Members Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonialSeats.map((seat) => (
            <div key={seat.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden flex-shrink-0">
                    <svg className="w-6 h-6 fill-current text-slate-400" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-montserrat font-bold text-[#0c2940]">{seat.title}</h4>
                    <p className="text-[10px] font-roboto text-slate-500">{seat.organization}</p>
                  </div>
                </div>
                <p className="text-[11.5px] font-roboto text-slate-500 italic leading-relaxed">
                  Quote pending confirmation &amp; release.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 mt-3 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-[10px] text-[#b45309] font-caption font-semibold w-fit">
                <Clock className="w-3 h-3" />
                <span>Pending</span>
              </div>
            </div>
          ))}

          {/* Resource Download */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#eef7f9] text-[#39918d] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-montserrat font-bold text-[#0c2940]">Cohort Overview</h4>
              </div>
              <p className="text-[11.5px] font-roboto text-slate-600 leading-relaxed">
                A one-page summary of curriculum, pricing, and dates you can share internally.
              </p>
            </div>
            <Link
              href="/resources"
              className="mt-4 w-full bg-[#0c2940] hover:bg-[#163e5e] text-white font-montserrat font-semibold text-xs py-2 rounded-lg transition-colors text-center block cursor-pointer"
            >
              View Resources (PDF)
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-[#f0f6f8] border border-[#d9e6eb] rounded-2xl p-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
            <div className="flex items-center justify-center gap-3.5 pt-2 sm:pt-0">
              <Users className="w-7 h-7 text-[#39918d] flex-shrink-0" />
              <div>
                {/* TODO: replace with a verified completion-rate metric */}
                <div className="text-xl sm:text-2xl font-montserrat font-extrabold text-[#0c2940] tracking-tight">
                  —
                </div>
                <div className="text-xs font-roboto text-slate-600 font-medium">Completion Rate</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 pt-4 sm:pt-0">
              <Clock className="w-7 h-7 text-[#39918d] flex-shrink-0" />
              <div>
                <div className="text-xl sm:text-2xl font-montserrat font-extrabold text-[#0c2940] tracking-tight">
                  3 HRS/WEEK
                </div>
                <div className="text-xs font-roboto text-slate-600 font-medium">Typical Commitment</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 pt-4 sm:pt-0">
              <Rocket className="w-7 h-7 text-[#39918d] flex-shrink-0" />
              <div>
                {/* TODO: replace with a verified time-savings metric */}
                <div className="text-xl sm:text-2xl font-montserrat font-extrabold text-[#0c2940] tracking-tight">
                  —
                </div>
                <div className="text-xs font-roboto text-slate-600 font-medium">Reported Time Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT FORM */}
      {/* ============================================================ */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 mb-16 sm:mb-20 scroll-mt-24"
      >
        <div className="bg-[#f0f6f8] border border-[#d9e6eb] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 95 L50 15" stroke="#0c2940" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M50 70 L25 50" stroke="#39918d" strokeWidth="3" strokeLinecap="round" />
                  <path d="M50 70 L75 50" stroke="#39918d" strokeWidth="3" strokeLinecap="round" />
                  <path d="M50 50 L30 32" stroke="#3f6d67" strokeWidth="3" strokeLinecap="round" />
                  <path d="M50 50 L70 32" stroke="#3f6d67" strokeWidth="3" strokeLinecap="round" />
                  <path d="M50 32 L35 18" stroke="#c57b4b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M50 32 L65 18" stroke="#c57b4b" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="50" cy="12" r="4.5" fill="#f8c51c" />
                  <circle cx="23" cy="48" r="4" fill="#39918d" />
                  <circle cx="77" cy="48" r="4" fill="#39918d" />
                  <circle cx="28" cy="30" r="3.5" fill="#3f6d67" />
                  <circle cx="72" cy="30" r="3.5" fill="#3f6d67" />
                  <circle cx="34" cy="16" r="3" fill="#c57b4b" />
                  <circle cx="66" cy="16" r="3" fill="#c57b4b" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-montserrat font-extrabold text-[#0c2940] leading-tight">
                  Ready to Get
                  <br />
                  Started?
                </h3>
                <p className="text-xs sm:text-sm font-roboto text-slate-600 mt-2 leading-relaxed max-w-sm">
                  Tell us a bit about your goals and preferred cohort, and our enterprise learning
                  directors will follow up to help you enroll.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              {formSubmitted ? (
                <div className="bg-white border border-[#39918d]/40 rounded-2xl p-8 text-center space-y-3 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#eef7f9] text-[#39918d] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-montserrat font-bold text-[#0c2940]">Inquiry Received</h4>
                  <p className="text-xs font-roboto text-slate-600 max-w-md mx-auto">
                    Thank you for contacting The Bradbury Group. Our enterprise learning directors
                    will review your inquiry and follow up shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <select
                        aria-label="Topic of interest"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full appearance-none px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm font-roboto text-slate-600 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] cursor-pointer"
                      >
                        <option value="">Topic of Interest</option>
                        <option value="phase1">AI Literacy (Phase 1)</option>
                        <option value="phase2">AI Fluency (Phase 2)</option>
                        <option value="custom">Custom Corporate Cohort</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        aria-label="Preferred cohort"
                        value={formData.cohort}
                        onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                        className="w-full appearance-none px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm font-roboto text-slate-600 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] cursor-pointer"
                      >
                        <option value="">Preferred Cohort</option>
                        <option value="q3-2026">Q3 Executive Cohort</option>
                        <option value="q4-2026">Q4 Executive Cohort</option>
                        <option value="enterprise">Direct Enterprise Deployment</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Anything else we should know?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm font-roboto text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#39918d] focus:ring-1 focus:ring-[#39918d] resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="bg-[#f8c51c] hover:bg-[#e2b110] active:scale-95 text-slate-900 font-montserrat font-bold text-xs sm:text-sm px-7 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

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
            <h3 className="text-xl font-montserrat font-bold mb-2">AI Fluency Cohort Overview</h3>
            <p className="text-xs font-roboto text-slate-300 mb-4">
              A two-minute primer on the cohort format, curriculum, and outcomes.
            </p>
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center border border-white/10 relative">
              <div className="w-16 h-16 rounded-full bg-[#f8c51c] text-slate-900 flex items-center justify-center animate-pulse mb-3">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
              <span className="text-xs font-montserrat font-semibold text-slate-200">Video Preview Mode Active</span>
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
                Certificate of Completion
              </h3>
              <p className="text-xs font-roboto text-slate-600 max-w-md mx-auto mb-6">
                This credential certifies that the candidate has completed the executive
                curriculum in AI fluency, governance, and organizational transformation.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-left text-xs font-roboto">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Issued By</span>
                  <span className="font-montserrat font-bold text-[#0c2940]">The Solomon Engine™</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Accreditation</span>
                  <span className="font-montserrat font-bold text-[#39918d]">C-Suite AI Cohort</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
