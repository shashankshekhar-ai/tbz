"use client";

import { useState } from "react";
import { Radio, Heart, BookOpen, Compass, Award, Sparkles, Sprout, Dumbbell, ChefHat, CheckCircle2 } from "lucide-react";

const personalInterests = [
  { name: "History Buff", Icon: BookOpen, desc: "Geeking out on historical archives & narratives" },
  { name: "Audiobooks", Icon: Compass, desc: "Constant learning on the go" },
  { name: "Culinary Arts", Icon: ChefHat, desc: "Experimental home cooking & recipes" },
  { name: "Fitness", Icon: Dumbbell, desc: "Daily workouts & endurance" },
  { name: "Garden & Pollinators", Icon: Sprout, desc: "Using AI to chart pollinator gardens & keep front yard green" },
  { name: "Custom AI Assistants", Icon: Sparkles, desc: "Building bespoke AI tools for everyday fun" },
];

export function PaigeStory() {
  const [activeTab, setActiveTab] = useState<"philosophy" | "personal">("philosophy");

  return (
    <section id="story" className="relative py-24 px-6 sm:px-8 lg:px-12 bg-white border-b border-slate-200 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline mb-16 border-b border-slate-200 pb-8">
          <div className="lg:col-span-3 flex items-baseline gap-4">
            <span className="font-h1 font-black text-6xl sm:text-8xl lg:text-9xl text-slate-200 tracking-tighter select-none">
              01
            </span>
            <div className="h-12 w-[1px] bg-slate-200 hidden lg:block" />
          </div>

          <div className="lg:col-span-9 space-y-2">
            <span className="font-h2 text-xs font-bold uppercase tracking-[0.2em] text-[#c57b4b]">
              Founder &amp; Principal Learning Architect
            </span>
            <h2 className="font-h2 font-extrabold text-3xl sm:text-5xl text-[#0c2940]">Paige&rsquo;s Story</h2>
            <p className="font-caption text-sm text-slate-600 font-medium">
              The human journey behind The Bradbury Group&rsquo;s learning architecture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-h2 font-medium text-2xl sm:text-3xl text-[#0c2940] leading-snug">
              Paige Bradbury is the Founder and Principal Learning Architect of{" "}
              <span className="text-[#39918d] font-bold">The Bradbury Group</span>.
            </p>
            <p className="font-body text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              She spent over <span className="font-semibold text-[#0c2940]">15+ years in international training</span>,
              working across sectors and cultures — building on an earlier career as a{" "}
              <span className="font-semibold text-[#c57b4b]">broadcast journalist and CNN Radio correspondent</span>.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#3f6d67]/10 border border-[#3f6d67]/30 p-8 rounded-2xl relative overflow-hidden group hover:border-[#39918d] transition-colors shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-15 group-hover:opacity-25 transition-opacity">
              <Radio className="w-24 h-24 text-[#39918d]" />
            </div>
            <span className="font-h1 font-black text-6xl sm:text-7xl text-[#0c2940] block mb-2">15+</span>
            <span className="font-h2 font-bold text-xs uppercase tracking-widest text-[#0f766e] block mb-3">
              Years in International Training
            </span>
            <p className="font-body text-xs text-slate-700 leading-relaxed font-normal">
              Global perspective spanning cross-cultural organizations, corporate workforce development, and
              investigative broadcast journalism.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#c57b4b]/10 border border-[#c57b4b]/30 flex items-center justify-center text-[#c57b4b]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-h2 font-bold text-2xl text-[#0c2940]">Psychological Safety First</h3>
            <p className="font-body text-slate-700 leading-relaxed font-normal">
              Her approach starts with giving people{" "}
              <strong className="text-[#0c2940] font-semibold">explicit permission to exercise their own agency</strong>{" "}
              to push back on learning and struggle with something new.
            </p>
            <p className="font-caption text-sm text-[#c57b4b] border-l-2 border-[#c57b4b] pl-4 py-1 italic font-medium">
              &ldquo;This wrestling match builds confidence through small, early wins instead of overwhelming them all
              at once.&rdquo;
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm">
            <div>
              <span className="font-caption text-xs text-[#0f766e] uppercase tracking-widest block mb-2 font-bold">
                Core Methodology
              </span>
              <h3 className="font-h2 font-bold text-2xl text-[#0c2940] mb-4">A Layered Way of Learning AI</h3>
              <p className="font-body text-slate-700 text-sm mb-6 font-normal">
                Transformation requires shifting focus away from tool checklists and compliance boxes toward
                enduring human capability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <span className="font-h1 font-bold text-xs text-[#c57b4b] block mb-1">01</span>
                <span className="font-h2 text-xs font-bold text-[#0c2940] block">Choose to start</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <span className="font-h1 font-bold text-xs text-[#39918d] block mb-1">02</span>
                <span className="font-h2 text-xs font-bold text-[#0c2940] block">Embrace messy middle</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <span className="font-h1 font-bold text-xs text-[#c57b4b] block mb-1">03</span>
                <span className="font-h2 text-xs font-bold text-[#0c2940] block">Focus on skills</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
            <h3 className="font-h2 text-xl font-bold text-[#0c2940]">Leadership, Ecosystem &amp; The Human Side</h3>
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveTab("philosophy")}
                className={`px-4 py-2 rounded-lg text-xs font-h2 uppercase tracking-wider transition-all ${
                  activeTab === "philosophy"
                    ? "bg-[#0c2940] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-[#0c2940]"
                }`}
              >
                Ecosystem Leadership
              </button>
              <button
                onClick={() => setActiveTab("personal")}
                className={`px-4 py-2 rounded-lg text-xs font-h2 uppercase tracking-wider transition-all ${
                  activeTab === "personal"
                    ? "bg-[#c57b4b] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-[#0c2940]"
                }`}
              >
                Outside of Work
              </button>
            </div>
          </div>

          {activeTab === "philosophy" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-h2 font-bold text-[#0c2940] text-lg">Georgia AI Alliance</h4>
                </div>
                <p className="font-body text-slate-700 text-sm leading-relaxed font-normal">
                  Paige is a key stakeholder in the <strong className="text-[#0c2940]">Georgia AI Alliance</strong>,
                  which is part of a national network shaping workforce AI readiness and economic preparedness.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b45309]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-h2 font-bold text-[#0c2940] text-lg">Ethical Science-Backed Standards</h4>
                </div>
                <p className="font-body text-slate-700 text-sm leading-relaxed font-normal">
                  Founding member of an international initiative building{" "}
                  <strong className="text-[#0c2940]">ethical, science-backed standards</strong> for how organizations
                  measure learning and performance in the AI era.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalInterests.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 hover:border-[#c57b4b] transition-colors shadow-xs"
                  >
                    <div className="p-2 bg-[#c57b4b]/10 text-[#c57b4b] rounded-lg shrink-0">
                      <item.Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-h2 text-xs font-bold text-[#0c2940] block mb-0.5">{item.name}</span>
                      <span className="font-caption text-[11px] text-slate-600 block leading-normal font-medium">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-center">
                <p className="font-caption text-xs text-[#78350f] italic font-medium">
                  &ldquo;She may or may not be using AI to chart out a pollinator garden and keep her front yard
                  green.&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
