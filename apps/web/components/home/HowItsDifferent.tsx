import { LayoutGrid, Users2, ShieldCheck } from "lucide-react";

export interface DifferentiatorCard {
  id: string;
  title: string;
  iconName: "grid" | "people" | "shield";
  description: string;
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
    <section id="principles" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-h2 text-[#0c2940]">How It&apos;s Different</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {differentiators.map((item) => {
          const color = item.iconName === "people" ? "#c57b4b" : item.iconName === "shield" ? "#3f6d67" : "#39918d";
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 border border-[#D9E3E8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${color}1a` }}
                >
                  {renderIcon(item.iconName, color)}
                </div>

                <h3 className="text-xl font-h2 text-[#0c2940] mb-3">{item.title}</h3>

                <p className="text-normal font-body text-[#5d6b74] leading-relaxed mb-8">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
