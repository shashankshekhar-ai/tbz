"use client";

function apiBase(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.protocol}//${window.location.hostname}:8000`;
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.detail ?? `Request failed (${res.status})`);
  }
  return res.json();
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export type AssessmentStartPayload = {
  email?: string;
  first_name?: string;
  company?: string;
  source?: string;
};

export type AssessmentResult = {
  overall_score: number;
  maturity_level: string;
  summary: string;
  recommendations: string[];
};

export type AssessmentSession = {
  session_token: string;
  status: "in_progress" | "completed" | "scoring_failed";
  completed_at: string | null;
  result: AssessmentResult | null;
};

export const startAssessment = (payload: AssessmentStartPayload) =>
  post<AssessmentSession>("/assessment/start", payload);

export const submitAnswers = (token: string, answers: { question_id: string; answer: string }[]) =>
  post<{ status: string; answers_saved: number }>(`/assessment/${token}/answers`, { answers });

export const completeAssessment = (token: string) =>
  post<AssessmentSession>(`/assessment/${token}/complete`);

export const getAssessment = (token: string) => get<AssessmentSession>(`/assessment/${token}`);
