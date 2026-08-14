import { InsightCard } from "./InsightCard";
import type { Insight } from "./types";

export function RelatedInsights({ insights }: { insights: Insight[] }) {
  if (!insights.length) return null;

  return (
    <section aria-labelledby="continue-exploring" className="pt-4">
      <h2 id="continue-exploring" className="text-2xl font-montserrat font-bold text-[#0c2940] mb-8">
        Continue exploring
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </section>
  );
}
