import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero — CMS-driven content will replace this placeholder once blocks are wired */}
      <section className="bg-[var(--color-brand-navy)] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build an AI-Ready Organization
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            The Bradbury Group delivers AI fluency programs, executive coaching, and
            organizational transformation for leaders who refuse to be left behind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded font-semibold bg-[var(--color-brand-gold)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-gold-light)] transition-colors"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/the-solomon-engine"
              className="inline-flex items-center justify-center px-8 py-3 rounded font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              Explore The Solomon Engine
            </Link>
          </div>
        </div>
      </section>

      {/* Programs overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-brand-navy)]">
            Programs & Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Fluency Cohort",
                href: "/ai-fluency-cohort",
                description:
                  "Cohort-based AI literacy and workflow transformation for professional teams.",
              },
              {
                title: "The Solomon Engine",
                href: "/the-solomon-engine",
                description:
                  "12-week executive program for senior leaders navigating AI-driven transformation.",
              },
              {
                title: "For Organizations",
                href: "/for-organizations",
                description:
                  "Custom AI readiness assessments, workshops, and implementation support.",
              },
            ].map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group block p-8 rounded-xl border border-gray-200 hover:border-[var(--color-brand-gold)] hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-gold)] transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
