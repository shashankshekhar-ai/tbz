"use client";

import { AIPulseAvatar } from "./AIPulseAvatar";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { EXPECT_ITEMS } from "./columbusData";

export function ScreenOneGuidance({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full justify-between text-[#0c2940]">
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-3">
        <div className="flex items-start justify-between gap-3 sm:gap-4 pb-3 border-b border-[#E6EAF0]">
          <div className="space-y-1">
            <h1 className="t-h1 !text-[28px] text-[#0c2940]">Hi! I&rsquo;m Columbus.</h1>
            <h2 className="font-montserrat font-medium text-[#2d7773] text-sm sm:text-base">
              An AI voice assistant for The Bradbury Group.
            </h2>
          </div>

          <div className="shrink-0 pt-1">
            <AIPulseAvatar size="md" showMicBadge micAnimated />
          </div>
        </div>

        <div className="space-y-3 font-roboto text-sm text-[#5C6B78] leading-relaxed">
          <p>
            I&rsquo;m here to help you figure out where you stand with AI right now. If you&rsquo;re an executive or
            L&amp;D leader navigating AI adoption, I&rsquo;ll walk you through a quick five-question readiness
            snapshot&mdash;no fluff, just the insights you need to move forward.
          </p>
          <p>
            After our conversation, Paige Bradbury, CEO and Principal Learning Architect, reviews your responses
            personally and crafts tailored next steps for your organization.
          </p>
        </div>

        <div>
          <h3 className="font-montserrat font-semibold text-xs uppercase tracking-wider text-[#5C6B78] mb-2.5">
            What You Can Expect in the Interview?
          </h3>
          <div className="space-y-2">
            {EXPECT_ITEMS.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E6EAF0] flex items-start gap-3">
                <CheckCircle2 size={18} className="stroke-[2.2] text-[#39918d] shrink-0 mt-0.5" />
                <p className="font-roboto text-sm text-[#5C6B78] leading-snug">
                  <strong className="font-montserrat font-semibold text-[#0c2940]">{item.title}</strong>
                  {" — "}
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="pt-3 border-t border-[#E6EAF0] bg-white sticky bottom-0 z-20 flex items-center justify-between gap-3 shrink-0">
        <span className="text-xs text-[#5C6B78] hidden sm:inline-block italic font-roboto">Step 1 of 4</span>

        <button
          onClick={onNext}
          className="w-full sm:w-auto ml-auto px-6 h-12 sm:h-[52px] rounded-[14px] bg-[#39918d] hover:bg-[#3f6d67] text-white font-montserrat font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
        >
          <span>Continue to Prep</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
