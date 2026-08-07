"use client";

import Link from "next/link";
import { User, Crown, Building, ArrowRight, MessageSquare } from "lucide-react";

export interface PathCard {
  id: string;
  title: string;
  isPrimary?: boolean;
  description: string;
  audience: string;
  ctaTarget: string;
  columbusButtonText: string;
  accentColor: string;
  iconName: "user" | "crown" | "building";
  columbusTopic: string;
}

function askColumbus(topic: string) {
  window.dispatchEvent(new CustomEvent("open-columbus", { detail: topic }));
}

const ROUTE_MAP: Record<string, string> = {
  "for-you": "/ai-fluency-cohort",
  "for-leaders": "/the-solomon-engine",
  "for-organizations": "/for-organizations",
  about: "/about",
};

function resolveHref(anchor: string) {
  return ROUTE_MAP[anchor.replace("#", "")] ?? "/contact";
}

function renderIcon(iconName: string, accentColor: string) {
  const props = { className: "w-5 h-5", style: { color: accentColor } };
  switch (iconName) {
    case "user":
      return <User {...props} />;
    case "crown":
      return <Crown {...props} />;
    case "building":
    default:
      return <Building {...props} />;
  }
}

export function ThreePaths({ paths }: { paths: PathCard[] }) {
  return (
    <section id="tailored-engagement" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-h2 text-[#0c2940]">Already Know What You Need? Explore Directly.</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {paths.map((path) => {
          const isPrimary = path.isPrimary;
          return (
            <div
              key={path.id}
              className={`bg-white rounded-2xl p-8 transition-all flex flex-col justify-between relative group ${
                isPrimary
                  ? "border border-[#D9E3E8] shadow-sm hover:shadow-lg"
                  : "border-2 border-[#c57b4b]/60 shadow-md hover:shadow-xl"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {isPrimary ? (
                    <span className="text-[10px] font-h3 font-bold uppercase tracking-wider px-3 py-1 bg-[#39918d]/15 text-[#39918d] rounded-full border border-[#39918d]/30">
                      PRIMARY
                    </span>
                  ) : (
                    <span
                      className="text-[10px] font-h3 font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: path.accentColor === "#c57b4b" ? "#c57b4b26" : "#F8FAFB",
                        color: path.accentColor === "#c57b4b" ? "#c57b4b" : "#5d6b74",
                        borderColor: path.accentColor === "#c57b4b" ? "#c57b4b4d" : "#D9E3E8",
                      }}
                    >
                      {path.audience}
                    </span>
                  )}

                  <div
                    className="p-2 rounded-full border"
                    style={{ backgroundColor: isPrimary ? "#F8FAFB" : `${path.accentColor}1a`, borderColor: isPrimary ? "#D9E3E8" : "transparent" }}
                  >
                    {renderIcon(path.iconName, isPrimary ? "#0c2940" : path.accentColor)}
                  </div>
                </div>

                <h3 className="text-2xl font-h2 text-[#0c2940] mb-3">{path.title}</h3>

                <p className="text-normal font-body text-[#5d6b74] leading-relaxed mb-8">{path.description}</p>
              </div>

              <div className="pt-6 border-t border-[#D9E3E8] flex items-center justify-between">
                <Link
                  href={resolveHref(path.ctaTarget)}
                  className="text-xs font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: isPrimary ? "#0c2940" : path.accentColor }}
                >
                  <span />
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: path.accentColor }} />
                </Link>
                <button
                  onClick={() => askColumbus(path.columbusTopic)}
                  className="text-[11px] font-semibold text-[#5d6b74] hover:text-[#0c2940] px-3 py-1.5 rounded border border-[#D9E3E8] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" style={{ color: path.accentColor }} />
                  <span>{path.columbusButtonText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
