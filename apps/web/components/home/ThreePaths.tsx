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
    <section id="tailored-engagement" className="-mt-20 pt-0 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-h2 text-[#0c2940]">Already Know What You Need? Explore Directly.</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {paths.map((path) => {
          const isPrimary = path.isPrimary;
          return (
            <div
              key={path.id}
              className={`rounded-2xl p-8 border transition-all flex flex-col justify-between relative group ${
                isPrimary ? "shadow-sm hover:shadow-lg" : "shadow-md hover:shadow-xl"
              }`}
              style={{ backgroundColor: path.accentColor, borderColor: path.accentColor }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-h3 font-bold uppercase tracking-wider px-3 py-1 bg-white/10 text-white rounded-full border border-white/30">
                    {isPrimary ? "PRIMARY" : path.audience}
                  </span>

                  <div className="p-2 bg-white/10 text-white rounded-full border border-white/30">
                    {renderIcon(path.iconName, "#ffffff")}
                  </div>
                </div>

                <h3 className="text-2xl font-h2 text-white mb-3">{path.title}</h3>

                <p className="text-normal font-body text-white leading-relaxed mb-8">{path.description}</p>
              </div>

              <div className="pt-6 border-t border-white/30 flex items-center justify-between">
                <Link
                  href={resolveHref(path.ctaTarget)}
                  className="text-xs font-semibold text-white hover:text-white/80 flex items-center gap-1 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
                <button
                  onClick={() => askColumbus(path.columbusTopic)}
                  className="text-[11px] font-semibold text-white px-3 py-1.5 rounded border border-white/40 hover:border-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
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
