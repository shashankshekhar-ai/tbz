"use client";

import { useState } from "react";
import Link from "next/link";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import {
  startAssessment,
  submitAnswers,
  completeAssessment,
  type AssessmentSession,
} from "@/lib/assessmentApi";
import { QUESTIONS } from "./questions";

type Stage = "intro" | "questions" | "submitting" | "results" | "error";

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const started = await startAssessment({
        email: email || undefined,
        first_name: firstName || undefined,
        company: company || undefined,
        source: "assessment_page",
      });
      setToken(started.session_token);
      setStage("questions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't start the assessment");
    }
  }

  function answerCurrent(value: string) {
    setAnswers((prev) => ({ ...prev, [QUESTIONS[step].id]: value }));
  }

  async function handleNext() {
    if (!token) return;
    const question = QUESTIONS[step];
    const value = answers[question.id];
    if (!value || !value.trim()) return;

    try {
      await submitAnswers(token, [{ question_id: question.id, answer: value }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save that answer");
      return;
    }

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
      return;
    }

    setStage("submitting");
    try {
      const result = await completeAssessment(token);
      setSession(result);
      setStage(result.status === "scoring_failed" ? "error" : "results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't score the assessment");
      setStage("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {stage === "intro" && (
        <>
          <span className="inline-block text-xs font-inter font-bold tracking-widest uppercase text-[#39918d] mb-3">
            Free Assessment
          </span>
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-[#0c2940]">
            AI Readiness Assessment
          </h1>
          <p className="font-roboto text-[#60707A] mb-8">
            Nine questions, about 3 minutes. You&apos;ll get a maturity score and recommended next
            steps at the end.
          </p>
          <form onSubmit={handleStart} className="space-y-4 bg-white border border-[#D9E3E6] rounded-2xl p-6">
            <div>
              <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                placeholder="you@company.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">First name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d] transition-colors"
                />
              </div>
            </div>
            <p className="text-xs font-roboto text-[#BFC9CD]">Email is optional — you can take the assessment anonymously.</p>
            {error && <p className="text-sm font-roboto text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-inter font-semibold bg-[#0c2940] text-white hover:bg-[#123856] transition-colors"
            >
              Start Assessment
            </button>
          </form>
        </>
      )}

      {stage === "questions" && (
        <div>
          <div className="flex items-center justify-between mb-2 text-xs font-roboto text-[#60707A]">
            <span>
              Question {step + 1} of {QUESTIONS.length}
            </span>
          </div>
          <div className="h-1.5 bg-[#EDF2F4] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[#f8c51c] transition-all"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h2 className="text-xl font-montserrat font-bold mb-6 text-[#0c2940]">
            {QUESTIONS[step].prompt}
          </h2>

          {QUESTIONS[step].type === "choice" ? (
            <div className="space-y-3 mb-8">
              {QUESTIONS[step].options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => answerCurrent(opt)}
                  className={`w-full text-left px-4 py-3 rounded-lg border font-roboto transition-colors ${
                    answers[QUESTIONS[step].id] === opt
                      ? "border-[#39918d] bg-[#39918d]/10"
                      : "border-[#D9E3E6] hover:border-[#39918d]/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[QUESTIONS[step].id] ?? ""}
              onChange={(e) => answerCurrent(e.target.value)}
              rows={4}
              className="w-full border border-[#D9E3E6] rounded-lg px-4 py-3 mb-8 font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d]"
              placeholder="Type your answer…"
            />
          )}

          {error && <p className="text-sm font-roboto text-red-600 mb-4">{error}</p>}

          <div className="flex justify-between">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className="px-5 py-2 text-sm font-roboto text-[#60707A] disabled:opacity-0"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[QUESTIONS[step].id]?.trim()}
              className="px-6 py-2 rounded-lg font-inter font-semibold bg-[#0c2940] text-white disabled:opacity-40 hover:bg-[#123856] transition-colors"
            >
              {step + 1 < QUESTIONS.length ? "Next →" : "Get my score"}
            </button>
          </div>
        </div>
      )}

      {stage === "submitting" && (
        <div className="text-center py-24">
          <p className="font-roboto text-[#60707A]">Scoring your answers…</p>
        </div>
      )}

      {stage === "results" && session?.result && (
        <div className="bg-white border border-[#D9E3E6] rounded-2xl p-8">
          <h2 className="text-2xl font-montserrat font-bold mb-6 text-[#0c2940]">
            Your AI Readiness Result
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
            <ScoreGauge score={session.result.overall_score} maturityLevel={session.result.maturity_level} />
            <div>
              <p className="text-sm font-roboto leading-relaxed text-[#60707A] mb-6">{session.result.summary}</p>
              <h3 className="text-sm font-inter font-bold text-[#0c2940] mb-3 uppercase tracking-wide">
                Recommended next steps
              </h3>
              <ul className="space-y-2 mb-8">
                {session.result.recommendations.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm font-roboto text-[#60707A]">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#f8c51c] shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-inter font-semibold bg-[#f8c51c] text-[#0c2940] hover:bg-[#e0b016] transition-colors"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      )}

      {stage === "error" && (
        <div className="text-center py-16">
          <h2 className="text-xl font-montserrat font-bold mb-2 text-[#0c2940]">
            We couldn&apos;t score your assessment right now
          </h2>
          <p className="font-roboto text-[#60707A] mb-6">
            {error ?? "Your answers were saved — please try again in a moment, or book a call and we'll walk through it live."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-inter font-semibold bg-[#0c2940] text-white"
          >
            Book a Discovery Call
          </Link>
        </div>
      )}
    </div>
  );
}
