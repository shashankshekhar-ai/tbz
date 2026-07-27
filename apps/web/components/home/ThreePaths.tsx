import Link from "next/link";
import { User, Crown, Building, ArrowRight, CheckCircle2 } from "lucide-react";

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
    <section id="three-paths" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-[#0c2940]">Tailored Strategic Engagement</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map((path) => {
          const isPrimary = path.isPrimary;
          return (
            <div
              key={path.id}
              className={`group relative rounded-[20px] p-8 transition-all duration-300 flex flex-col justify-between ${
                isPrimary
                  ? "bg-[#F7F8F9] border-2 border-[#39918d] shadow-lg ring-1 ring-[#39918d]/20 hover:shadow-xl"
                  : path.id === "path-for-leaders"
                    ? "bg-[#F7F8F9] border border-[#c57b4b]/40 hover:border-[#c57b4b] hover:shadow-lg"
                    : "bg-[#EDF2F4] border border-[#D9E3E6] hover:border-[#39918d] hover:shadow-lg"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {isPrimary ? (
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#39918d] bg-[#39918d]/10 px-3 py-1 rounded-md border border-[#39918d]/30">
                      primary
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-[#60707A] bg-[#EDF2F4] px-2.5 py-1 rounded-md">
                      {path.audience}
                    </span>
                  )}

                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {renderIcon(path.iconName, path.accentColor)}
                  </div>
                </div>

                <h3 className="text-2xl font-montserrat font-bold text-[#0c2940] mb-3 group-hover:text-[#39918d] transition-colors">
                  {path.title}
                </h3>

                <p className="text-sm text-[#60707A] font-roboto leading-relaxed mb-6">{path.description}</p>

                <ul className="space-y-2.5 mb-8">
                  {path.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2.5 text-xs text-[#0c2940] font-roboto">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: path.accentColor }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#D9E3E6]">
                <Link
                  href={resolveHref(path.ctaTarget)}
                  className="inline-flex items-center space-x-2 text-sm font-inter font-semibold transition-colors group/btn"
                  style={{ color: path.accentColor }}
                >
                  <span>{path.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
