"use client";

import { Mic, Volume2 } from "lucide-react";

interface AIPulseAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  isSpeaking?: boolean;
  isListening?: boolean;
  showMicBadge?: boolean;
  micAnimated?: boolean;
}

export function AIPulseAvatar({
  size = "md",
  isSpeaking = false,
  isListening = false,
  showMicBadge = true,
  micAnimated = true,
}: AIPulseAvatarProps) {
  const sizeMap = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-20 h-20", xl: "w-28 h-28" };
  const coreSizeMap = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12", xl: "w-16 h-16" };
  const iconSizeMap = { sm: 14, md: 18, lg: 24, xl: 32 };

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={`absolute rounded-full border border-[#f8c51c] ${sizeMap[size]} ${
          isSpeaking || isListening ? "animate-ping" : "opacity-20 scale-105"
        }`}
      />
      <div
        className={`absolute rounded-full border border-[#39918d] ${sizeMap[size]} ${
          isSpeaking || isListening ? "animate-ping" : "opacity-20 scale-110"
        }`}
      />

      <div
        className={`relative rounded-full bg-white flex items-center justify-center p-1 border border-[#39918d]/30 shadow-md transition-all duration-500 ${sizeMap[size]} ${
          isSpeaking ? "scale-105 ring-2 ring-[#f8c51c]" : ""
        }`}
      >
        <div
          className={`rounded-full bg-gradient-to-tr from-[#0c2940] via-[#39918d] to-[#3f6d67] flex items-center justify-center shadow-inner relative overflow-hidden transition-all duration-300 ${coreSizeMap[size]}`}
        >
          <div className="relative z-10 flex items-center justify-center text-white">
            {isSpeaking ? (
              <Volume2 size={iconSizeMap[size]} className="text-[#f8c51c] animate-pulse" />
            ) : (
              <div className="flex items-center gap-0.5 h-4">
                <span className="w-1 h-2 bg-[#f8c51c] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1 h-3.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1 h-2.5 bg-[#39918d] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showMicBadge && (
        <div className="absolute -bottom-1 -right-1 bg-white border border-[#39918d]/40 text-[#0c2940] rounded-full p-1 shadow-md flex items-center gap-1">
          <div className={`relative ${micAnimated || isListening ? "text-[#39918d]" : "text-slate-400"}`}>
            <Mic size={13} className={isListening ? "animate-bounce" : ""} />
            {(micAnimated || isListening) && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#f8c51c] rounded-full animate-ping" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
