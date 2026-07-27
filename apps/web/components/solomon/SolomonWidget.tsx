"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, RefreshCw } from "lucide-react";

type ChatMessage = {
  id: string;
  sender: "user" | "solomon";
  text: string;
  timestamp: string;
  recommendations?: { title: string; link: string; category: string }[];
};

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function SolomonWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "solomon",
      text: "Congratulations on applying. I'm Solomon — I can answer questions about the cohort structure, tiers, or what to expect next while your application is reviewed.",
      timestamp: now(),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage(customPrompt?: string) {
    const textToSend = customPrompt ?? inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: textToSend, timestamp: now() }]);
    if (!customPrompt) setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch(`${apiBase()}/solomon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });
      if (!res.ok) throw new Error("Solomon request failed");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "solomon",
          text: data.reply ?? "Thanks for your interest in The Solomon Engine.",
          timestamp: now(),
          recommendations: data.recommendations ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "solomon",
          text: "Thanks for applying — our team reviews every submission personally. Feel free to book a discovery call in the meantime.",
          timestamp: now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-[#c57b4b] bg-white shadow-lg overflow-hidden">
      <div className="bg-[#0c2940] text-white p-4 flex items-center space-x-3 border-b border-[#c57b4b]/40">
        <div className="w-9 h-9 rounded-full bg-[#c57b4b] flex items-center justify-center text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-montserrat font-semibold text-sm text-white">Solomon</h3>
          <p className="text-[11px] text-[#BFC9CD] font-roboto">AI L&amp;D Strategist — The Solomon Engine</p>
        </div>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto space-y-4 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
            <div
              className={`p-3.5 rounded-2xl max-w-[85%] text-xs font-roboto leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#0c2940] text-white rounded-br-none"
                  : "bg-[#F7F8F9] text-[#0c2940] rounded-bl-none border border-[#D9E3E6]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-xs font-roboto text-[#60707A] bg-[#F7F8F9] p-3 rounded-xl w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c57b4b]" />
            <span>Solomon is thinking…</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-[#D9E3E6] flex items-center space-x-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask Solomon about the cohort…"
          className="flex-1 text-xs font-roboto px-3 py-2.5 bg-[#F7F8F9] border border-[#D9E3E6] rounded-xl focus:outline-none focus:border-[#c57b4b] text-[#0c2940]"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputPrompt.trim()}
          className="p-2.5 bg-[#0c2940] hover:bg-[#3f6d67] disabled:opacity-50 text-white rounded-xl transition-colors"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 text-[#c57b4b]" />
        </button>
      </div>
    </div>
  );
}
