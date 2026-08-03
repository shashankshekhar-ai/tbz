"use client";

import { useState, useEffect } from "react";
import { Check, Mic, Maximize2 } from "lucide-react";
import { ColumbusScreen } from "./types";
import { AIPulseAvatar } from "./AIPulseAvatar";
import { ScreenOneGuidance } from "./ScreenOneGuidance";
import { ScreenTwoHeadsUp } from "./ScreenTwoHeadsUp";
import { ScreenThreeConversation } from "./ScreenThreeConversation";

export function ColumbusWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ColumbusScreen>("screen1");
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    function handleOpenColumbus(e: Event) {
      const topic = (e as CustomEvent<string>).detail;
      setIsOpen(true);
      if (topic) {
        setInitialPrompt(`Tell me more about: ${topic}`);
        setCurrentScreen("conversation");
      }
    }
    window.addEventListener("open-columbus", handleOpenColumbus);
    return () => window.removeEventListener("open-columbus", handleOpenColumbus);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Columbus AI Executive Advisor"
          className="group relative bg-white px-4 py-3 rounded-[20px] border border-[#E6EAF0] shadow-xl hover:border-[#39918d] transition-all duration-300 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
        >
          <AIPulseAvatar size="sm" showMicBadge micAnimated />

          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-montserrat font-bold text-xs sm:text-sm text-[#0c2940] group-hover:text-[#39918d] transition-colors">
                Columbus AI
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#39918d]/10 text-[#39918d] font-roboto text-[10px] font-semibold">
                EXECUTIVE ADVISOR
              </span>
            </div>
            <p className="font-roboto text-[11px] text-[#5C6B78] flex items-center gap-1">
              <Mic size={10} className="text-[#39918d]" />
              Talk to Assistant
            </p>
          </div>

          <div className="p-1.5 rounded-full bg-[#F8F9FA] text-[#5C6B78] group-hover:text-[#0c2940] transition-colors">
            <Maximize2 size={14} />
          </div>
        </button>
      ) : (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Columbus AI Executive Advisor"
          className="w-[92vw] sm:w-[420px] h-[85vh] sm:h-[640px] lg:h-[680px] bg-white rounded-[20px] border border-[#E6EAF0] p-4 sm:p-5 shadow-2xl shadow-[#0c2940]/12 flex flex-col relative overflow-hidden transition-all duration-300"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0c2940] via-[#39918d] to-[#f8c51c]" />

          <header className="flex items-center justify-between pb-3 mb-2 border-b border-[#E6EAF0] relative z-20 shrink-0 bg-white">
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentScreen("screen1")}
                aria-current={currentScreen === "screen1" ? "step" : undefined}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-montserrat transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d] ${
                  currentScreen === "screen1"
                    ? "border border-[#39918d] bg-[#39918d]/10 text-[#39918d] font-semibold shadow-xs"
                    : currentScreen === "screen2" || currentScreen === "conversation"
                      ? "bg-[#F8F9FA] text-[#39918d] font-medium border border-[#E6EAF0]"
                      : "text-[#5C6B78] opacity-60 hover:opacity-100"
                }`}
              >
                {currentScreen === "screen2" || currentScreen === "conversation" ? (
                  <Check size={12} className="stroke-[3] text-[#39918d]" />
                ) : (
                  <span className="font-semibold text-[11px]">①</span>
                )}
                <span>Expectations</span>
              </button>

              <span className="text-[#E6EAF0] text-xs font-light">/</span>

              <button
                onClick={() => setCurrentScreen("screen2")}
                aria-current={currentScreen === "screen2" ? "step" : undefined}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-montserrat transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d] ${
                  currentScreen === "screen2"
                    ? "border border-[#39918d] bg-[#39918d]/10 text-[#39918d] font-semibold shadow-xs"
                    : currentScreen === "conversation"
                      ? "bg-[#F8F9FA] text-[#39918d] font-medium border border-[#E6EAF0]"
                      : "text-[#5C6B78] opacity-60 hover:opacity-100"
                }`}
              >
                {currentScreen === "conversation" ? (
                  <Check size={12} className="stroke-[3] text-[#39918d]" />
                ) : (
                  <span className="font-semibold text-[11px]">②</span>
                )}
                <span>Prep</span>
              </button>

              <span className="text-[#E6EAF0] text-xs font-light">/</span>

              <button
                onClick={() => setCurrentScreen("conversation")}
                aria-current={currentScreen === "conversation" ? "step" : undefined}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-montserrat transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d] ${
                  currentScreen === "conversation" ? "border border-[#39918d] bg-[#39918d]/10 text-[#39918d] font-semibold shadow-xs" : "text-[#5C6B78] opacity-60 hover:opacity-100"
                }`}
              >
                <span className="font-semibold text-[11px]">③</span>
                <span>Talk</span>
              </button>
            </nav>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 flex items-center justify-center rounded-lg hover:text-[#0c2940] hover:bg-[#F8F9FA] transition-colors font-bold text-lg leading-none text-[#5C6B78] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
              aria-label="Close Columbus"
            >
              ×
            </button>
          </header>

          <main className="relative z-10 flex-1 overflow-hidden">
            {currentScreen === "screen1" && <ScreenOneGuidance onNext={() => setCurrentScreen("screen2")} />}
            {currentScreen === "screen2" && (
              <ScreenTwoHeadsUp onBack={() => setCurrentScreen("screen1")} onStartTalk={() => setCurrentScreen("conversation")} />
            )}
            {currentScreen === "conversation" && (
              <ScreenThreeConversation onBackToPrep={() => setCurrentScreen("screen2")} initialPrompt={initialPrompt} />
            )}
          </main>
        </div>
      )}
    </div>
  );
}
