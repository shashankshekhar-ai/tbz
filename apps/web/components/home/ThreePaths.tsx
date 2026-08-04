"use client";

import Link from "next/link";
import { User, Crown, Building, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";

export interface PathCard {
  id: string;
  title: string;
  isPrimary?: boolean;
  description: string;
  audience: string;
  features: string[];
  ctaText: string;
  ctaTarget: string;
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
};

function resolveHref(anchor: string) {
  return ROUTE_MAP[anchor.replace("#", "")] ?? "/contact";
}

function renderIcon(iconName: string, accentColor: string) {
  const props = { className: "w-6 h-6", style: { color: accentColor } };
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
    <section id="three-paths" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-h2 text-[#0c2940]">Tailored Strategic Engagement</h2>
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
                    <span className="text-[10px] font-h3 font-bold uppercase tracking-wider px-3 py-1 bg-[#c57b4b]/15 text-[#c57b4b] rounded-full border border-[#c57b4b]/30">
                      {path.audience}
                    </span>
                  )}

                  <div
                    className="p-2 rounded-full border"
                    style={{ backgroundColor: isPrimary ? "#F8FAFB" : `${path.accentColor}1a`, borderColor: isPrimary ? "#D9E3E8" : `${path.accentColor}4d` }}
                  >
                    {renderIcon(path.iconName, path.accentColor)}
                  </div>
                </div>

                <h3 className="text-2xl font-h2 text-[#0c2940] mb-3">{path.title}</h3>

                <p className="text-xs font-body text-[#5d6b74] leading-relaxed mb-8">{path.description}</p>

                <ul className="space-y-4 mb-8">
                  {path.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-xs font-body text-[#5d6b74]">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: path.accentColor }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[#D9E3E8] flex items-center justify-between gap-3">
                <Link
                  href={resolveHref(path.ctaTarget)}
                  className="inline-flex items-center space-x-2 text-sm font-semibold transition-colors group/btn"
                  style={{ color: path.accentColor }}
                >
                  <span>{path.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => askColumbus(path.columbusTopic)}
                  className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-[#5d6b74] hover:text-[#0c2940] px-3 py-1.5 rounded border border-[#D9E3E8] hover:border-[#39918d] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" style={{ color: path.accentColor }} />
                  <span>Ask Columbus</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
