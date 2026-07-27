import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What we need | Docs | The Bradbury Group",
  robots: { index: false, follow: false },
};

type Need = {
  item: string;
  why: string;
  blocks: string;
  owner: string;
};

const decisions: Need[] = [
  {
    item: "Domain / DNS for production",
    why: "Need the target domain (and whether WordPress redirects are required from the old site) before deploy + CloudFront can be configured.",
    blocks: "Phase 8 — AWS deployment",
    owner: "The Bradbury Group",
  },
];

const credentials: Need[] = [
  {
    item: "ANTHROPIC_API_KEY and/or GEMINI_API_KEY",
    why: "Powers every AI agent (assessment scoring, lead follow-up, Page Agent, Content Agent). Provider is dynamic — set AI_PROVIDER=anthropic (default) or gemini to pick which key is live; both can be configured at once.",
    blocks: "Phase 6 — assessment completion (currently fails safe with status=scoring_failed, no crash)",
    owner: "The Bradbury Group (Anthropic and/or Google AI account) or agency",
  },
  {
    item: "HUBSPOT_API_KEY (private app token, CRM scope: contacts write)",
    why: "Client wrapper (core/hubspot.py) is built and wired into forms, resource downloads, and assessment completion — just needs a key to stop skipping.",
    blocks: "Phase 5 — CRM sync (currently records status=skipped, no lead loss)",
    owner: "The Bradbury Group HubSpot admin",
  },
  {
    item: "CLICKUP_API_KEY + CLICKUP_LIST_ID",
    why: "Client wrapper (core/clickup.py) is built and creates a task per form/assessment submission once configured.",
    blocks: "Phase 5 — internal task routing (currently skipped, no data lost)",
    owner: "The Bradbury Group ClickUp workspace admin",
  },
  {
    item: "N8N_WEBHOOK_URL",
    why: "Generic outbound event dispatch target — currently the only place SES confirmation emails would be triggered from.",
    blocks: "Phase 5 — confirmation emails (not built at all yet, downstream of this)",
    owner: "The Bradbury Group (or agency) n8n instance",
  },
  {
    item: "CLERK_SECRET_KEY + NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY + CLERK_JWKS_URL",
    why: "Customer-facing login (/sign-in, /sign-up, /dashboard) and real API admin auth are both feature-flagged off without these — everything currently runs on a dev bypass.",
    blocks: "Phase 7 — lead portal auth, and locking down /admin + admin API routes for real",
    owner: "The Bradbury Group (new Clerk account) or agency",
  },
  {
    item: "AWS account (or access to an existing one) — EC2/RDS/S3/CloudFront/IAM",
    why: "No hosting target exists yet; everything currently runs on local Docker Compose only.",
    blocks: "Phase 8 — production deployment",
    owner: "The Bradbury Group",
  },
  {
    item: "SES verified sending domain/email",
    why: "Confirmation emails (form submit, resource download, assessment complete) are planned but have no verified sender yet.",
    blocks: "Phase 5 — confirmation emails",
    owner: "The Bradbury Group",
  },
];

const content: Need[] = [
  {
    item: "Final assessment questions + scoring rubric",
    why: "The AI scoring helper currently accepts arbitrary Q&A pairs and lets Claude free-form the rubric — a fixed question set and scoring intent would make results consistent and reviewable.",
    blocks: "Phase 6 — assessment content",
    owner: "The Bradbury Group (subject-matter input)",
  },
  {
    item: "Sign-off on WordPress → new site content parity",
    why: "Phase 9's QA checklist includes a full content-load pass and old-URL redirect map; needs the old site's URL/content inventory to check against.",
    blocks: "Phase 9 — QA, content load, launch",
    owner: "The Bradbury Group",
  },
];

function NeedTable({ title, rows }: { title: string; rows: Need[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {rows.map((n) => (
          <div key={n.item} className="border rounded-lg p-4">
            <p className="font-medium text-sm text-[var(--color-brand-navy)]">{n.item}</p>
            <p className="text-sm text-gray-600 mt-2">{n.why}</p>
            <p className="text-xs text-gray-500 mt-2">Blocks: {n.blocks}</p>
            <p className="text-xs text-gray-500">Owner: {n.owner}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function NeedsFromOrgPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/docs" className="text-sm text-[var(--color-brand-gold)] hover:underline">
        ← Back to Docs
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">What we need from The Bradbury Group</h1>
      <p className="text-sm text-gray-500 mb-10">
        Everything below is code-complete and feature-flagged safe to ship without it — nothing
        breaks or loses data while these are outstanding. This is the list of decisions and
        credentials that turn "skipped" into "live."
      </p>

      <NeedTable title="Decisions" rows={decisions} />
      <NeedTable title="Credentials / accounts" rows={credentials} />
      <NeedTable title="Content" rows={content} />
    </div>
  );
}
