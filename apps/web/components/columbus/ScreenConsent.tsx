"use client";

import { useState } from "react";
import { Lock, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PRIVACY_CONSENT_TEXT } from "./columbusData";

export function ScreenConsent({ onBack, onStartTalk }: { onBack: () => void; onStartTalk: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const toggle = () => setAgreed((prev) => !prev);

  return (
    <div className="flex flex-col h-full text-[#0c2940] justify-between">
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-3">
        <div className="pb-3 border-b border-[#E6EAF0]">
          <h2 className="t-h2 !text-xl text-[#0c2940]">Privacy Consent</h2>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#39918d]/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#39918d]/10 text-[#39918d] shrink-0 mt-0.5">
              <Lock size={16} className="stroke-[2]" />
            </div>
            <p className="font-roboto text-sm text-[#5C6B78] leading-relaxed">{PRIVACY_CONSENT_TEXT}</p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E6EAF0]">
            <div
              role="checkbox"
              aria-checked={agreed}
              tabIndex={0}
              onClick={toggle}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), toggle())}
              className="flex items-center gap-2.5 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d] rounded-md p-0.5"
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                  agreed ? "bg-[#39918d] border-[#39918d] text-white" : "bg-white border-slate-300 group-hover:border-[#39918d]"
                }`}
              >
                {agreed && <Check size={14} className="stroke-[3]" />}
              </div>
              <span className="font-montserrat font-semibold text-sm text-[#0c2940] leading-snug">
                I Agree
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-3 text-center">
        <a href="#" onClick={(e) => e.preventDefault()} className="font-roboto text-sm font-medium text-[#2d7773] underline underline-offset-2 hover:text-[#3f6d67]">
          Learn more about Columbus from Paige
        </a>
      </div>

      <footer className="pt-3 border-t border-[#E6EAF0] bg-white sticky bottom-0 z-20 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shadow-xs">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-4 h-12 sm:h-[52px] rounded-[14px] border border-[#E6EAF0] hover:border-slate-400 text-[#0c2940] font-roboto text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 shrink-0 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <button
          onClick={() => agreed && onStartTalk()}
          disabled={!agreed}
          className={`w-full flex-1 h-12 sm:h-[52px] px-6 rounded-[14px] text-white font-montserrat font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d] bg-[#39918d] ${
            agreed ? "hover:bg-[#3f6d67] shadow-md active:scale-[0.99]" : "opacity-40 cursor-not-allowed"
          }`}
        >
          <span>I&rsquo;m Ready &mdash; Let&rsquo;s Talk</span>
          <ArrowRight size={18} />
        </button>
      </footer>
    </div>
  );
}
