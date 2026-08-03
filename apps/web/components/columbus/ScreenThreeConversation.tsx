"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChatMessage } from "./types";
import { READINESS_QUESTIONS } from "./columbusData";
import {
  Send,
  Mic,
  ArrowRight,
  Download,
  ArrowLeft,
  ShieldCheck,
  Pause,
  Square,
  Play,
  Wifi,
} from "lucide-react";

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const ROUTE_MAP: Record<string, string> = {
  "for-you": "/ai-fluency-cohort",
  "for-leaders": "/the-solomon-engine",
  "for-organizations": "/for-organizations",
  "our-roi": "/our-ai-return",
  resources: "/resources",
  insights: "/insights",
  about: "/about",
  "book-call": "/contact",
};

export function ScreenThreeConversation({
  onBackToPrep,
  initialPrompt,
}: {
  onBackToPrep: () => void;
  initialPrompt?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "columbus",
      text: "Greetings. I'm Columbus, your AI Executive Advisor at The Bradbury Group. I'll ask a few quick questions to recommend the right path for you.",
      timestamp: now(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(1);
  const [micDeniedMessage, setMicDeniedMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const initialSentRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialSentRef.current) return;
    if (initialPrompt) {
      initialSentRef.current = true;
      handleSendMessage(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  function navigate(link: string) {
    const target = ROUTE_MAP[link.replace("#", "")];
    if (target) router.push(target);
  }

  function startSpeechRecognition() {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInput(transcript);
        if (event.results[0].isFinal) handleSendMessage(transcript);
      }
    };
    recognitionRef.current.onerror = (event: any) => {
      if (event.error === "not-allowed") {
        setMicDeniedMessage("Microphone access is required for voice conversation. You can continue with text input.");
      }
      setIsListening(false);
    };
    recognitionRef.current.onend = () => {
      if (isListening && !isPaused) {
        try {
          recognitionRef.current?.start();
        } catch {
          setIsListening(false);
        }
      }
    };

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setMicDeniedMessage(null);
          stream.getTracks().forEach((t) => t.stop());
          startSpeechRecognition();
        })
        .catch(() => {
          setIsListening(false);
          setMicDeniedMessage("Microphone access is required for voice conversation. You can continue with text input.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleMicListening() {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setIsListening(true);
        setIsPaused(false);
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  }

  function handlePauseToggle() {
    if (isPaused) {
      setIsPaused(false);
      setIsListening(true);
      try {
        recognitionRef.current?.start();
      } catch {}
    } else {
      setIsPaused(true);
      setIsListening(false);
      try {
        recognitionRef.current?.stop();
      } catch {}
    }
  }

  function handleStopConversation() {
    setIsListening(false);
    setIsPaused(true);
    try {
      recognitionRef.current?.stop();
    } catch {}
  }

  async function handleSendMessage(customMessage?: string) {
    const textToSend = (customMessage ?? input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: "user", text: textToSend, timestamp: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${apiBase()}/columbus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          context: { activeSection: pathname.replace("/", "") || "home" },
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });
      if (!res.ok) throw new Error("Columbus request failed");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "columbus",
          text: data.reply ?? "I'm ready to guide your executive strategy.",
          timestamp: now(),
          recommendations: data.recommendations ?? [],
        },
      ]);
      if (activeQuestionIndex < READINESS_QUESTIONS.length) setActiveQuestionIndex((prev) => prev + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "columbus",
          text: "I'm ready to assist with your executive strategy. You can explore our paths or book a discovery call directly.",
          timestamp: now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDownloadTranscript() {
    const text = messages.map((m) => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Columbus_TBG_Transcript_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col h-full justify-between text-[#0c2940]">
      <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1 pb-2">
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-[#E6EAF0]">
          <button
            onClick={onBackToPrep}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#E6EAF0] text-xs font-montserrat font-semibold text-[#0c2940] hover:bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
          >
            <ArrowLeft size={14} />
            <span>Back to Prep</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-roboto">
            <span className="flex items-center gap-1 text-[#39918d] font-medium bg-[#39918d]/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-[#39918d]/20">
              <Wifi size={12} className="animate-pulse text-[#39918d]" />
              Encrypted
            </span>
            <span className="flex items-center gap-1 text-[#5C6B78] bg-[#F8F9FA] px-2 sm:px-2.5 py-0.5 rounded-full border border-[#E6EAF0]">
              <Mic size={12} className={isListening ? "text-[#39918d] animate-pulse" : "text-slate-400"} />
              Mic Ready
            </span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-montserrat font-bold text-base sm:text-lg md:text-xl text-[#0c2940] tracking-tight">
            Let&rsquo;s Find Your Right Path
          </h2>
          <p className="font-roboto text-xs text-[#5C6B78] max-w-md mx-auto leading-relaxed px-1">
            Columbus will ask a few quick questions to recommend the best engagement path for you.
          </p>
        </div>

        {micDeniedMessage && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <p className="font-roboto text-xs leading-relaxed">{micDeniedMessage}</p>
            <button
              onClick={() => textInputRef.current?.focus()}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-montserrat font-semibold text-xs transition-colors"
            >
              Continue with Text
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center my-1 sm:my-2 p-3 sm:p-4 rounded-2xl bg-[#F8F9FA] border border-[#E6EAF0] relative overflow-hidden">
          <div className="relative my-2 sm:my-3 flex items-center justify-center">
            <div
              className={`absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#39918d]/30 ${isListening ? "animate-ping" : ""}`}
              style={{ animationDuration: "3s" }}
            />
            <div
              className={`absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#f8c51c]/40 ${isListening ? "animate-ping" : ""}`}
              style={{ animationDuration: "2s" }}
            />

            <button
              onClick={toggleMicListening}
              className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#39918d]/40 ${
                isListening
                  ? "bg-gradient-to-tr from-[#0c2940] via-[#39918d] to-[#3f6d67] text-white ring-4 ring-[#39918d]/30 scale-105"
                  : "bg-white border-2 border-[#E6EAF0] text-[#0c2940] hover:border-[#39918d]"
              }`}
            >
              <Mic size={28} className={isListening ? "text-[#f8c51c] animate-pulse" : "text-[#39918d]"} />
            </button>
          </div>

          <div className="text-center space-y-1 mt-1">
            <p className="font-montserrat font-bold text-xs sm:text-sm text-[#0c2940] flex items-center justify-center gap-1.5">
              {isListening ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#39918d] animate-ping" />
                  <span>&ldquo;I&rsquo;m Listening...&rdquo;</span>
                </>
              ) : isPaused ? (
                <span className="text-[#c57b4b]">Conversation Paused</span>
              ) : (
                <span>Tap Microphone to Speak, or Type Below</span>
              )}
            </p>
            <p className="text-[11px] italic text-[#5C6B78] px-2 truncate max-w-full font-roboto">
              Question {activeQuestionIndex} of {READINESS_QUESTIONS.length}:{" "}
              {READINESS_QUESTIONS[activeQuestionIndex - 1]}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border border-[#E6EAF0] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-montserrat font-semibold text-[#5C6B78]">
            <span>Live Transcription Log</span>
            <button
              onClick={handleDownloadTranscript}
              className="flex items-center gap-1 text-[#39918d] hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#39918d]"
            >
              <Download size={12} />
              <span className="hidden sm:inline">Export Transcript</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>

          <div className="max-h-[140px] overflow-y-auto space-y-1.5 pr-1 font-roboto text-xs text-[#0c2940]">
            {messages.slice(-4).map((m) => (
              <div key={m.id} className="p-2 rounded-lg bg-[#F8F9FA] border border-[#E6EAF0]">
                <span className="font-bold font-montserrat text-[#39918d] text-[10px] uppercase block mb-0.5">
                  {m.sender === "columbus" ? "Columbus AI" : "You"}
                </span>
                <p className="text-xs text-[#0c2940] leading-relaxed break-words">{m.text}</p>
                {m.recommendations && m.recommendations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.recommendations.map((rec) => (
                      <button
                        key={rec.title}
                        onClick={() => navigate(rec.link)}
                        className="inline-flex items-center gap-1 text-[10px] font-roboto font-medium bg-white hover:bg-[#39918d] text-[#0c2940] hover:text-white px-2 py-0.5 rounded-md border border-[#39918d]/40 transition-colors"
                      >
                        <span>{rec.title}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && <p className="text-[11px] italic text-[#5C6B78]">Columbus is thinking…</p>}
            <div ref={messagesEndRef} />
          </div>

          <div className="pt-2 flex items-center gap-2 border-t border-[#E6EAF0]">
            <input
              ref={textInputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type answer or voice transcript..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#F8F9FA] border border-[#E6EAF0] text-xs text-[#0c2940] placeholder-[#5C6B78] focus:outline-none focus:border-[#39918d]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-lg bg-[#39918d] hover:bg-[#3f6d67] text-white disabled:opacity-40 transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
            >
              <Send size={14} />
            </button>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-[#F8F9FA] border border-[#E6EAF0] flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-[#39918d] shrink-0 mt-0.5" />
          <div className="space-y-0.5 min-w-0">
            <h3 className="font-montserrat font-bold text-xs text-[#0c2940]">Secure &amp; Confidential</h3>
            <p className="font-roboto text-[11px] text-[#5C6B78] leading-tight">
              Responses are encrypted in real time and shared only with Paige Bradbury for executive review.
            </p>
          </div>
        </div>
      </div>

      <footer className="pt-2.5 border-t border-[#E6EAF0] bg-white sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 shrink-0">
        <button
          onClick={handlePauseToggle}
          className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-[#E6EAF0] bg-white hover:bg-[#F8F9FA] text-[#0c2940] font-montserrat font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39918d]"
        >
          {isPaused ? <Play size={14} className="text-[#39918d]" /> : <Pause size={14} className="text-[#c57b4b]" />}
          <span>{isPaused ? "Resume Conversation" : "Pause Conversation"}</span>
        </button>

        <button
          onClick={handleStopConversation}
          className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-montserrat font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Square size={14} className="fill-red-600 text-red-600" />
          <span>Stop Conversation</span>
        </button>
      </footer>
    </div>
  );
}
