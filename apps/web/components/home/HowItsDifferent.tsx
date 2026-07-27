import Link from "next/link";
import { LayoutGrid, Users, ShieldCheck, ArrowRight } from "lucide-react";

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

function renderIcon(iconName: string) {
  const props = { className: "w-6 h-6 text-white" };
  switch (iconName) {
    case "grid":
      return <LayoutGrid {...props} />;
    case "people":
      return <Users {...props} />;
    case "shield":
    default:
      return <ShieldCheck {...props} />;
  }
}

export function HowItsDifferent({ differentiators }: { differentiators: DifferentiatorCard[] }) {
  return (
    <section id="how-its-different" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-[#0c2940]">Our Executive Operating Principles</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {differentiators.map((item) => {
          const isOrange = item.iconName === "people";
          return (
            <Link
              key={item.id}
              href={resolveHref(item.targetSection)}
              className="group relative rounded-[20px] bg-[#F7F8F9] hover:bg-white border border-[#D9E3E6] hover:border-[#39918d] p-8 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${
                    isOrange ? "bg-[#c57b4b]" : "bg-[#39918d]"
                  }`}
                >
                  {renderIcon(item.iconName)}
                </div>

                <h3 className="text-xl font-montserrat font-bold text-[#0c2940] mb-3 group-hover:text-[#39918d] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#60707A] font-roboto leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-[#EDF2F4] space-y-1">
                <div className="inline-flex items-center space-x-2 text-sm font-inter font-semibold text-[#39918d] group-hover:text-[#0c2940] transition-colors">
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[11px] font-roboto italic text-[#60707A]">{item.captionText}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
