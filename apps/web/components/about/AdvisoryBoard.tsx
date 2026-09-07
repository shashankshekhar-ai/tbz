"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, UserPlus, Clock, Sparkles } from "lucide-react";

const placeholderCards = [
  { id: 1, role: "AI Strategy & Governance" },
  { id: 2, role: "Enterprise Learning Systems" },
  { id: 3, role: "Workforce Policy & Readiness" },
  { id: 4, role: "Ethical Science & Metrics" },
];

export function AdvisoryBoard() {
  const [notified, setNotified] = useState(false);

  return (
    <section id="advisory" className="relative py-24 px-6 sm:px-8 lg:px-12 bg-[#f8fafc] border-b border-slate-200 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 glow-teal pointer-events-none opacity-50 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline mb-16 border-b border-slate-200 pb-8">
          <div className="lg:col-span-3 flex items-baseline gap-4">
            <span className="font-h1 font-black text-6xl sm:text-8xl lg:text-9xl text-slate-200 tracking-tighter select-none">
              02
            </span>
            <div className="h-12 w-[1px] bg-slate-200 hidden lg:block" />
          </div>

          <div className="lg:col-span-9 space-y-2">
            <span className="font-h2 text-xs font-bold uppercase tracking-[0.2em] text-[#c57b4b]">
              Strategic Network
            </span>
            <h2 className="font-h2 font-extrabold text-3xl sm:text-5xl text-[#0c2940]">Advisory Board</h2>
            <p className="font-body text-slate-700 text-base sm:text-lg font-normal max-w-2xl">
              A network of experienced voices helping shape the future of learning, performance, and AI readiness.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {placeholderCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden group hover:border-[#39918d] transition-all duration-300 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-h2 text-[10px] font-bold uppercase tracking-widest text-[#39918d] bg-[#39918d]/10 px-2.5 py-1 rounded border border-[#39918d]/30">
                  ADVISORY BOARD
                </span>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="my-6 space-y-3">
                <div className="w-12 h-12 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 mx-auto group-hover:border-[#0c2940] group-hover:text-[#0c2940] transition-colors">
                  <ShieldCheck className="w-5 h-5 text-[#39918d]" />
                </div>
                <div className="text-center">
                  <span className="font-h3 text-xs text-slate-800 block font-bold">{card.role}</span>
                  <span className="font-caption text-xs text-[#c57b4b] block mt-1 font-medium">
                    Profiles coming soon
                  </span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-slate-200 group-hover:bg-[#39918d]/40 transition-colors" />
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#39918d]">
              <Sparkles className="w-4 h-4" />
              <span className="font-h2 text-xs font-bold uppercase tracking-widest">Ecosystem Growth</span>
            </div>
            <h3 className="font-h2 text-lg font-bold text-[#0c2940]">
              Interested in contributing to the advisory network?
            </h3>
            <p className="font-caption text-xs text-slate-600 font-medium">
              We welcome strategic dialogue with leaders across AI ethics, workforce transformation, and
              organizational psychology.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setNotified((prev) => !prev)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:text-[#0c2940] hover:border-[#0c2940] text-xs font-h2 font-bold transition-all flex items-center gap-2 shadow-xs"
            >
              <Clock className="w-3.5 h-3.5 text-[#39918d]" />
              <span>{notified ? "Notification Enabled" : "Notify Me Upon Launch"}</span>
            </button>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-[#0c2940] hover:bg-[#163a59] text-white text-xs font-h2 font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#f8c51c]" />
              <span>Inquire for Advisory</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
