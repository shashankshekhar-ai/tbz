import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paige Bradbury is an instructional designer, AI consultant, and former CNN Radio correspondent helping leaders build AI-ready organizations.",
};

export default function AboutPage() {
  const metrics = [
    { value: "92%", label: "AI adoption rate" },
    { value: "20%", label: "Efficiency gains in 60 days" },
    { value: "83%", label: "Increased AI literacy post-training" },
    { value: "40%", label: "Reduction in content development time" },
  ];

  const credentials = [
    "IBM Certified in AI Fundamentals",
    "Learning Evaluation-Transfer Model (LTEM) — pursuing gold certification",
    "AI Build Lab — designing system instructions for AI assistants",
    "20+ years nonprofit training & adult learning theory",
    "Former TV producer & CNN Radio correspondent",
    "AI-powered course development: Coursera, Microsoft, SAP, Xbox",
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-brand-navy)] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Technology must serve people. Not the other way around.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            The Bradbury Group architects human performance around AI — helping leaders build
            effective, responsible AI-powered systems without the overwhelm.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--color-brand-navy)] mb-6">
            Paige Bradbury
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Paige Bradbury is an instructional designer and AI consultant with over 20 years of
              experience in nonprofit training, adult learning theory, and broadcast journalism as a
              former TV producer and CNN Radio correspondent.
            </p>
            <p>
              She has built AI-powered courses and learning systems for organizations including
              Coursera, Microsoft, SAP, and Xbox — combining deep expertise in generative AI with a
              principled, people-first philosophy.
            </p>
            <p>
              Her approach moves beyond the typical AI hype to focus on measurable adoption,
              transferable skills, and responsible implementation frameworks that stand up to real
              organizational scrutiny.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-4 bg-[var(--color-brand-off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-10 text-center">
            Results that speak
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-4xl font-bold text-[var(--color-brand-gold)]">{m.value}</p>
                <p className="text-sm text-gray-600 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-8">
            Credentials & Experience
          </h2>
          <ul className="space-y-3">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-[var(--color-brand-gold)] flex-shrink-0" />
                <span className="text-gray-700">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Guiding principles */}
      <section className="py-16 px-4 bg-[var(--color-brand-navy)] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Principled Leadership",
                body: "Every engagement is grounded in ethical AI governance — bias detection, human-in-the-loop verification, and learner transparency.",
              },
              {
                title: "People-First Partnerships",
                body: "We don't parachute in with off-the-shelf tools. Every strategy is built around your team's actual pain points and familiar workflows.",
              },
              {
                title: "Responsible Architecture",
                body: "SOC 2-compliant workflows, content attribution transparency, and frameworks that protect your organization and your learners.",
              },
            ].map((p) => (
              <div key={p.title} className="border border-white/20 rounded-xl p-6">
                <h3 className="font-semibold text-[var(--color-brand-gold)] mb-2">{p.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-4">
          Ready to build an AI-ready organization?
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-3 rounded font-semibold bg-[var(--color-brand-gold)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-gold-light)] transition-colors"
        >
          Book a Discovery Call
        </Link>
      </section>
    </div>
  );
}
