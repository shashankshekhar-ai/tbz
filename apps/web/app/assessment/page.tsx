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
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--color-brand-gold)] mb-3">
            Free Assessment
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-brand-navy)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            AI Readiness Assessment
          </h1>
          <p className="text-gray-600 mb-8">
            Nine questions, about 3 minutes. You&apos;ll get a maturity score and recommended next
            steps at the end.
          </p>
          <form onSubmit={handleStart} className="space-y-4 bg-white border border-gray-200 rounded-xl p-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="you@company.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">Email is optional — you can take the assessment anonymously.</p>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded font-semibold bg-[var(--color-brand-navy)] text-white hover:bg-[var(--color-brand-navy)]/90 transition-colors"
            >
              Start Assessment
            </button>
          </form>
        </>
      )}

      {stage === "questions" && (
        <div>
          <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
            <span>
              Question {step + 1} of {QUESTIONS.length}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[var(--color-brand-gold)] transition-all"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h2 className="text-xl font-semibold mb-6 text-[var(--color-brand-navy)]">
            {QUESTIONS[step].prompt}
          </h2>

          {QUESTIONS[step].type === "choice" ? (
            <div className="space-y-3 mb-8">
              {QUESTIONS[step].options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => answerCurrent(opt)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    answers[QUESTIONS[step].id] === opt
                      ? "border-[var(--color-brand-gold)] bg-[var(--color-brand-gold)]/10"
                      : "border-gray-200 hover:border-gray-300"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-8"
              placeholder="Type your answer…"
            />
          )}

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          <div className="flex justify-between">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className="px-5 py-2 text-sm text-gray-500 disabled:opacity-0"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[QUESTIONS[step].id]?.trim()}
              className="px-6 py-2 rounded font-semibold bg-[var(--color-brand-navy)] text-white disabled:opacity-40 hover:bg-[var(--color-brand-navy)]/90 transition-colors"
            >
              {step + 1 < QUESTIONS.length ? "Next →" : "Get my score"}
            </button>
          </div>
        </div>
      )}

      {stage === "submitting" && (
        <div className="text-center py-24">
          <p className="text-gray-500">Scoring your answers…</p>
        </div>
      )}

      {stage === "results" && session?.result && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-brand-navy)]" style={{ fontFamily: "var(--font-heading)" }}>
            Your AI Readiness Result
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
            <ScoreGauge score={session.result.overall_score} maturityLevel={session.result.maturity_level} />
            <div>
              <p className="text-sm leading-relaxed text-gray-700 mb-6">{session.result.summary}</p>
              <h3 className="text-sm font-semibold text-[var(--color-brand-navy)] mb-3 uppercase tracking-wide">
                Recommended next steps
              </h3>
              <ul className="space-y-2 mb-8">
                {session.result.recommendations.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-gold)] shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded font-semibold bg-[var(--color-brand-gold)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-gold-light)] transition-colors"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      )}

      {stage === "error" && (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-brand-navy)]">
            We couldn&apos;t score your assessment right now
          </h2>
          <p className="text-gray-500 mb-6">
            {error ?? "Your answers were saved — please try again in a moment, or book a call and we'll walk through it live."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded font-semibold bg-[var(--color-brand-navy)] text-white"
          >
            Book a Discovery Call
          </Link>
        </div>
      )}
    </div>
  );
}
