"use client";

import { PREP_ITEMS } from "./columbusData";
import { AIPulseAvatar } from "./AIPulseAvatar";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

export function ScreenTwoHeadsUp({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="flex flex-col h-full text-[#0c2940] justify-between">
      <div className="flex-1 overflow-y-auto space-y-3.5 sm:space-y-4 pr-1 pb-3">
        <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-[#E6EAF0]">
          <h2 className="t-h2 !text-xl text-[#0c2940]">A Quick Heads-Up Before We Talk</h2>
          <div className="shrink-0 flex items-center pt-1 sm:pt-0">
            <AIPulseAvatar size="md" showMicBadge micAnimated />
          </div>
        </div>

        <div className="space-y-2">
          {PREP_ITEMS.map((item) => (
            <div key={item.id} className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E6EAF0] flex items-start gap-3">
              <CheckCircle2 size={18} className="stroke-[2.2] text-[#39918d] shrink-0 mt-0.5" />
              <p className="font-roboto text-sm text-[#5C6B78] leading-snug">
                <strong className="font-montserrat font-semibold text-[#0c2940]">{item.title}</strong>
                {" — "}
                {item.description}
              </p>
            </div>
          ))}
        </div>
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
          onClick={onNext}
          className="w-full flex-1 h-12 sm:h-[52px] px-6 rounded-[14px] bg-[#39918d] hover:bg-[#3f6d67] text-white font-montserrat font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
        >
          <span>Continue</span>
          <ArrowRight size={16} />
        </button>
      </footer>
    </div>
  );
}
