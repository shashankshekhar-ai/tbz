import { ScoreGauge } from "@/components/ui/ScoreGauge";

const SAMPLE_RESULT = {
  overall_score: 62,
  maturity_level: "building",
  summary:
    "Your organization has early AI adoption in isolated pockets but lacks a shared playbook. Leadership alignment and a formal usage policy are the fastest path to the next tier.",
  recommendations: [
    "Adopt an org-wide AI usage policy",
    "Run a Solomon Engine cohort for senior leaders",
    "Stand up a lightweight AI governance council",
    "Instrument workflow tools with usage telemetry",
  ],
};

export default function DashboardReportPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 text-[var(--color-brand-navy)]">AI Readiness Report</h1>
      <p className="text-sm text-gray-500 mb-8">
        Sample preview — your real report will replace this once the assessment ships.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start bg-white border border-gray-200 rounded-2xl p-8">
        <ScoreGauge score={SAMPLE_RESULT.overall_score} maturityLevel={SAMPLE_RESULT.maturity_level} />

        <div>
          <p className="text-sm leading-relaxed text-gray-700 mb-6">{SAMPLE_RESULT.summary}</p>
          <h2 className="text-sm font-semibold text-[var(--color-brand-navy)] mb-3 uppercase tracking-wide">
            Recommended next steps
          </h2>
          <ul className="space-y-2">
            {SAMPLE_RESULT.recommendations.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-gold)] shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
