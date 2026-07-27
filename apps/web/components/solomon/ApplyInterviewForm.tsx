"use client";

import { useState } from "react";

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

export function ApplyInterviewForm({ onUnlocked }: { onUnlocked: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", why: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const [firstName, ...rest] = form.name.trim().split(" ");
      const res = await fetch(`${apiBase()}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          first_name: firstName || undefined,
          last_name: rest.join(" ") || undefined,
          company: form.company || undefined,
          job_title: form.role || undefined,
          source: "solomon_interview",
          notes: form.why || undefined,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("done");
      onUnlocked();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="p-6 rounded-2xl bg-[#39918d]/10 border border-[#39918d]/40 text-center">
        <p className="font-montserrat font-bold text-[#0c2940] mb-1">Application received.</p>
        <p className="text-sm font-roboto text-[#60707A]">
          Solomon, our AI L&amp;D strategist, is now available below to answer questions about the
          program while our team reviews your submission.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-[#D9E3E6] rounded-2xl p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d]"
          />
        </div>
        <div>
          <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d]"
          />
        </div>
        <div>
          <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">Company</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d]"
          />
        </div>
        <div>
          <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">Role</label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-roboto font-medium text-[#60707A] mb-1">
          What are you hoping to get out of the cohort?
        </label>
        <textarea
          rows={3}
          value={form.why}
          onChange={(e) => setForm({ ...form, why: e.target.value })}
          className="w-full border border-[#D9E3E6] rounded-lg px-3 py-2.5 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-[#39918d] focus:border-[#39918d]"
        />
      </div>
      {status === "error" && (
        <p className="text-sm font-roboto text-red-600">Something went wrong — please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3.5 rounded-lg font-inter font-semibold bg-[#0c2940] text-white hover:bg-[#123856] disabled:opacity-50 transition-colors"
      >
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
