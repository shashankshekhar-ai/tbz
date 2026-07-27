"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, PlayCircle, CheckCircle } from "lucide-react";

interface NodePoint {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel: string;
  color: string;
  details: string;
  labelSide: "left" | "right";
  labelTop: string;
}

const nodes: NodePoint[] = [
  {
    id: "data",
    x: 48,
    y: 22,
    label: "DATA",
    sublabel: "Connected",
    color: "#39918d",
    details: "Unifying enterprise knowledge graphs, unstructured data, and LLM context layers.",
    labelSide: "left",
    labelTop: "18%",
  },
  {
    id: "people",
    x: 40,
    y: 48,
    label: "PEOPLE",
    sublabel: "Empowered",
    color: "#3f6d67",
    details: "Establishing psychological safety, Agency First learning, and executive AI fluency.",
    labelSide: "left",
    labelTop: "45%",
  },
  {
    id: "intelligence",
    x: 84,
    y: 38,
    label: "INTELLIGENCE",
    sublabel: "Activated",
    color: "#c57b4b",
    details: "Deploying custom Solomon Engine agents and science-backed learning architecture.",
    labelSide: "right",
    labelTop: "36%",
  },
  {
    id: "outcomes",
    x: 82,
    y: 72,
    label: "OUTCOMES",
    sublabel: "Realized",
    color: "#f8c51c",
    details: "Measurable behavior transformation, ROI metrics, and ethical compliance standards.",
    labelSide: "right",
    labelTop: "68%",
  },
];

const networkPoints = [
  { x: 12, y: 28 },
  { x: 26, y: 16 },
  { x: 34, y: 38 },
  { x: 48, y: 22 },
  { x: 40, y: 48 },
  { x: 62, y: 38 },
  { x: 72, y: 20 },
  { x: 84, y: 38 },
  { x: 74, y: 56 },
  { x: 82, y: 72 },
  { x: 60, y: 78 },
  { x: 42, y: 82 },
  { x: 28, y: 68 },
  { x: 92, y: 82 },
  { x: 76, y: 90 },
];

const connections: [number, number][] = [
  [3, 4],
  [3, 5],
  [4, 5],
  [5, 7],
  [7, 8],
  [8, 9],
  [4, 12],
  [12, 11],
  [11, 10],
  [10, 9],
  [7, 6],
  [5, 6],
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [9, 13],
  [13, 14],
];

export function AboutHero() {
  const [activeNode, setActiveNode] = useState<NodePoint | null>(null);

  return (
    <section
      id="hero"
      className="relative -mt-20 min-h-screen pt-28 pb-16 bg-[#0c2940] text-white overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123856_0%,#0c2940_45%,#081b2a_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-inter font-bold tracking-widest text-[#39918d] uppercase block">
              About Us
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-inter font-extrabold tracking-tight leading-[1.12] text-white">
              Human Intelligence. <br />
              <span className="text-[#39918d]">AI Transformation.</span> <br />
              Built on Trust.
            </h1>

            <p className="text-sm sm:text-base font-roboto text-[#D9E3E6] leading-relaxed max-w-xl">
              Transformation begins with people — not technology. The Bradbury Group helps
              leaders, organizations and teams build lasting AI capability through
              psychology-first learning architecture, executive guidance and ethical
              implementation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#founder"
                className="bg-[#39918d] hover:bg-[#2d7774] text-white font-inter font-semibold text-sm px-6 py-3.5 rounded-lg shadow-lg hover:shadow-[#39918d]/30 hover:scale-[1.02] transition-all duration-200 flex items-center space-x-2 group"
              >
                <span>Meet Paige</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#philosophy"
                className="border border-white/30 hover:border-[#39918d] text-white font-inter font-medium text-sm px-6 py-3.5 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-200 flex items-center space-x-2.5"
              >
                <PlayCircle className="w-4 h-4 text-white" />
                <span>Explore Our Framework</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
            <div className="relative w-full h-[480px] sm:h-[520px]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#39918d" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#3f6d67" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c57b4b" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                <circle cx="68%" cy="42%" r="64" stroke="#39918d" strokeWidth="0.8" strokeOpacity="0.2" fill="none" />
                <circle cx="68%" cy="42%" r="44" stroke="#39918d" strokeWidth="1" strokeOpacity="0.35" fill="none" />
                <circle cx="68%" cy="42%" r="24" stroke="#39918d" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
                <circle cx="68%" cy="42%" r="8" fill="#39918d" className="animate-ping opacity-60" />
                <circle cx="68%" cy="42%" r="5" fill="#39918d" />

                {connections.map(([p1, p2], idx) => {
                  const pt1 = networkPoints[p1];
                  const pt2 = networkPoints[p2];
                  return (
                    <line
                      key={idx}
                      x1={`${pt1.x}%`}
                      y1={`${pt1.y}%`}
                      x2={`${pt2.x}%`}
                      y2={`${pt2.y}%`}
                      stroke="url(#lineGrad)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                {networkPoints.map((pt, i) => (
                  <circle
                    key={i}
                    cx={`${pt.x}%`}
                    cy={`${pt.y}%`}
                    r={i % 4 === 0 ? "4" : "2.5"}
                    fill={i % 3 === 0 ? "#c57b4b" : i % 2 === 0 ? "#f8c51c" : "#39918d"}
                    opacity="0.85"
                  />
                ))}

                <path d="M 170 115 L 230 115 L 270 130" stroke="#39918d" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
                <path d="M 170 250 L 235 250" stroke="#39918d" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
                <path d="M 460 200 L 420 200" stroke="#39918d" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
                <path d="M 460 365 L 420 365" stroke="#39918d" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
              </svg>

              {nodes.map((node) => {
                const isSelected = activeNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    onMouseEnter={() => setActiveNode(node)}
                    onClick={() => setActiveNode(isSelected ? null : node)}
                  >
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-50"
                      style={{ backgroundColor: node.color, animationDuration: "3s" }}
                    />
                    <div
                      className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-lg ${
                        isSelected ? "scale-125 ring-4 ring-white/30" : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: node.color, borderColor: "#ffffff" }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                );
              })}

              {nodes.map((node) => (
                <div
                  key={`label-${node.id}`}
                  className={`absolute z-20 pointer-events-none ${
                    node.labelSide === "left" ? "left-[10%] text-left" : "right-[6%] text-right"
                  }`}
                  style={{ top: node.labelTop }}
                >
                  <span className="block text-[11px] font-inter font-bold tracking-wider text-[#39918d] uppercase">
                    {node.label}
                  </span>
                  <span className="block text-xs font-montserrat font-medium text-white/90">{node.sublabel}</span>
                </div>
              ))}

              {activeNode && (
                <div className="absolute bottom-4 left-4 right-4 bg-[#0c2940]/95 backdrop-blur-md border border-[#39918d] rounded-xl p-4 shadow-2xl z-30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeNode.color }} />
                      <span className="text-xs font-inter font-bold tracking-wider text-[#39918d] uppercase">
                        {activeNode.label} — {activeNode.sublabel}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveNode(null)}
                      className="text-xs text-[#BFC9CD] hover:text-white"
                      aria-label="Close detail"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-2 text-xs font-roboto text-[#EDF2F4] leading-relaxed">{activeNode.details}</p>
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center space-x-1 text-[11px] text-[#f8c51c]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Enterprise Capability</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-6 flex items-center justify-between">
        <div className="w-24 hidden sm:block" />

        <div className="mx-auto flex flex-col items-center justify-center space-y-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-inter font-bold tracking-widest text-[#BFC9CD] uppercase">
            SCROLL DOWN
          </span>
          <a
            href="#founder"
            className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#39918d] hover:text-[#39918d] transition-all"
            aria-label="Scroll to founder section"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
