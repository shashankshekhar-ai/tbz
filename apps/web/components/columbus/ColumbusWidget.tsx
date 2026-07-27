"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Compass, Send, X, ArrowRight, RefreshCw } from "lucide-react";

type ChatMessage = {
  id: string;
  sender: "user" | "columbus";
  text: string;
  timestamp: string;
  recommendations?: { title: string; link: string; category: string }[];
};

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

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const quickPrompts = [
  "Which path is best for my team?",
  "Summarize TBG's core frameworks",
  "How is TBG different from tutorials?",
  "Book a discovery call",
];

export function ColumbusWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "columbus",
      text: "Greetings. I am Columbus, your AI Executive Advisor at The Bradbury Group. I can answer questions regarding our executive strategy, recommend tailored paths, or schedule a discovery brief.",
      timestamp: now(),
      recommendations: [
        { title: "For Leaders Path", link: "#for-leaders", category: "Path" },
        { title: "Enterprise AI ROI", link: "#our-roi", category: "ROI" },
        { title: "Book Discovery Call", link: "#book-call", category: "Booking" },
      ],
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  function navigate(link: string) {
    const target = ROUTE_MAP[link.replace("#", "")];
    if (target) router.push(target);
  }

  async function handleSendMessage(customPrompt?: string) {
    const textToSend = customPrompt ?? inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: "user", text: textToSend, timestamp: now() };
    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputPrompt("");
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
          text: data.reply ?? "I am ready to guide your executive strategy.",
          timestamp: now(),
          recommendations: data.recommendations ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "columbus",
          text: "I am ready to assist you with executive strategy. You can explore our paths or book a discovery call directly.",
          timestamp: now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-3 bg-[#0c2940] hover:bg-[#123856] text-white pl-3 pr-5 py-2.5 rounded-full shadow-2xl glow-teal border border-[#39918d]/50 transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-[#39918d]/30 animate-ping opacity-40 pointer-events-none" />
            <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#39918d] to-[#0c2940] border border-[#f8c51c]/60 flex items-center justify-center flex-shrink-0">
              <Compass className="w-4 h-4 text-[#f8c51c]" />
            </span>
            <span className="relative flex flex-col items-start leading-tight">
              <span className="text-sm font-inter font-bold tracking-tight text-white">Columbus</span>
              <span className="text-[10px] font-roboto text-[#39918d] group-hover:text-[#f8c51c] transition-colors">
                AI Executive Advisor
              </span>
            </span>
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] h-[580px] bg-white rounded-[20px] shadow-2xl border-2 border-[#39918d] flex flex-col overflow-hidden">
          <div className="bg-[#0c2940] text-white p-4 flex items-center justify-between border-b border-[#39918d]/40">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#39918d] flex items-center justify-center text-[#f8c51c]">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-montserrat font-semibold text-sm text-white">Columbus AI</h3>
                <p className="text-[11px] text-[#BFC9CD] font-roboto">Executive AI Assistant — The Bradbury Group</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#BFC9CD] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close Columbus"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-[#60707A] font-roboto">
                  <span>{msg.sender === "user" ? "You" : "Columbus"}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] text-xs font-roboto leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#0c2940] text-white rounded-br-none"
                      : "bg-[#EDF2F4] text-[#0c2940] rounded-bl-none border border-[#D9E3E6]"
                  }`}
                >
                  {msg.text}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-[#D9E3E6] space-y-1.5">
                      <p className="text-[10px] font-inter font-semibold text-[#39918d] uppercase tracking-wider">
                        Recommended Actions:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.recommendations.map((rec) => (
                          <button
                            key={rec.title}
                            onClick={() => navigate(rec.link)}
                            className="inline-flex items-center space-x-1 text-[11px] font-roboto font-medium bg-white hover:bg-[#39918d] text-[#0c2940] hover:text-white px-2.5 py-1 rounded-md border border-[#39918d]/40 transition-colors shadow-xs"
                          >
                            <span>{rec.title}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-xs font-roboto text-[#60707A] bg-[#EDF2F4] p-3 rounded-xl w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#39918d]" />
                <span>Columbus is synthesizing executive intelligence...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-2 bg-[#F7F8F9] border-t border-[#EDF2F4] flex overflow-x-auto space-x-2">
            {quickPrompts.map((qp) => (
              <button
                key={qp}
                onClick={() => (qp === "Book a discovery call" ? navigate("#book-call") : handleSendMessage(qp))}
                className="flex-shrink-0 text-[11px] font-inter text-[#0c2940] bg-white hover:bg-[#39918d] hover:text-white px-2.5 py-1 rounded-full border border-[#D9E3E6] transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-[#D9E3E6] flex items-center space-x-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask Columbus about strategy, ROI, or paths..."
              className="flex-1 text-xs font-roboto px-3 py-2.5 bg-[#F7F8F9] border border-[#D9E3E6] rounded-xl focus:outline-none focus:border-[#39918d] text-[#0c2940]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 bg-[#0c2940] hover:bg-[#3f6d67] disabled:opacity-50 text-white rounded-xl transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#f8c51c]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
