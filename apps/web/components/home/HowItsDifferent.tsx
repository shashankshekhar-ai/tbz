import Link from "next/link";
import { LayoutGrid, Users2, ShieldCheck, ArrowRight } from "lucide-react";

export interface DifferentiatorCard {
  id: string;
  title: string;
  linkText: string;
  captionText: string;
  targetSection: string;
  iconName: "grid" | "people" | "shield";
  description: string;
}

const ROUTE_MAP: Record<string, string> = {
  resources: "/resources",
  "for-leaders": "/the-solomon-engine",
  "our-roi": "/our-ai-return",
};

function resolveHref(anchor: string) {
  return ROUTE_MAP[anchor.replace("#", "")] ?? "/resources";
}

function renderIcon(iconName: string, color: string) {
  const props = { className: "w-6 h-6", style: { color } };
  switch (iconName) {
    case "grid":
      return <LayoutGrid {...props} />;
    case "people":
      return <Users2 {...props} />;
    case "shield":
    default:
      return <ShieldCheck {...props} />;
  }
}

export function HowItsDifferent({ differentiators }: { differentiators: DifferentiatorCard[] }) {
  return (
    <section id="how-its-different" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-[#0c2940]">
          Our Executive Operating Principles
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {differentiators.map((item) => {
          const color = item.iconName === "people" ? "#c57b4b" : item.iconName === "shield" ? "#3f6d67" : "#39918d";
          return (
            <Link
              key={item.id}
              href={resolveHref(item.targetSection)}
              className="bg-white rounded-2xl p-8 border border-[#D9E3E8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${color}1a` }}
                >
                  {renderIcon(item.iconName, color)}
                </div>

                <h3 className="text-xl font-montserrat font-bold text-[#0c2940] mb-3">{item.title}</h3>

                <p className="text-xs font-roboto text-[#5d6b74] leading-relaxed mb-8">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-[#D9E3E8]">
                <div className="inline-flex items-center gap-1.5 text-xs font-inter font-semibold" style={{ color }}>
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <p className="text-[10px] font-roboto italic text-[#5d6b74] mt-1">{item.captionText}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
