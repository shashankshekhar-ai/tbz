import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs | The Bradbury Group",
  robots: { index: false, follow: false },
};

type Phase = {
  name: string;
  status: "done" | "in-progress" | "planned" | "blocked";
  items: string[];
};

const phases: Phase[] = [
  {
    name: "Phase 0 — Repo & continuity setup",
    status: "done",
    items: [
      "Git repo, planning docs, monorepo scaffold",
      "docker-compose (Postgres), root scripts, .gitignore/.editorconfig",
    ],
  },
  {
    name: "Phase 1 — Foundation architecture",
    status: "done",
    items: ["apps/web (Next.js 15)", "apps/cms (Payload)", "apps/api (FastAPI)", "Local Docker Compose Postgres"],
  },
  {
    name: "Phase 2 — Payload CMS content platform",
    status: "done",
    items: [
      "Collections: Pages, Navigation, Posts, Resources, CaseStudies, Testimonials, FAQs, Media",
      "Global: SiteSettings",
      "Page blocks in src/blocks",
    ],
  },
  {
    name: "Phase 3 — Next.js CMS-driven website",
    status: "done",
    items: [
      "App Router shell, Header/Footer, BlockRenderer",
      "CMS fetch via lib/cms.ts",
      "About, Resources, Insights, Contact pages",
      "done — Header AND Footer nav now read the Payload Navigation collection (location: header/footer, footerGroup for footer column headings). Seeded with the original hardcoded links as a starting point — edit/add/reorder in CMS admin's Navigation collection, no deploy needed. Falls back to hardcoded defaults only if the collection is empty or CMS is unreachable.",
      "done — Page templates: when creating a new Page in CMS admin, an 'Apply template' sidebar field (Blank / Landing page / Program page / Simple content page) pre-fills the Layout blocks on save if Layout is still empty (apps/cms/src/templates/pageTemplates.ts + Pages.ts beforeChange hook)",
      "done — Page Agent: custom CMS admin view at cms:3003/admin/page-agent (linked in the admin nav sidebar) — chat-based AI assistant that proposes a full page (title/slug/blocks) from a plain-English description, editable turn by turn against an existing page or from scratch. Nothing saves until you click Apply — the proposal is a preview. Provider is dynamic (AI_PROVIDER=anthropic|gemini, see lib/aiProvider.ts); fails safe with a 503 and a clear message if the selected provider's key is unset, never a crash. Auth-gated to logged-in CMS admins (401 otherwise).",
      "done — Content Agent: same pattern as Page Agent, generalized to Blog Posts / Resources / Case Studies (cms:3003/admin/content-agent). Per-collection field schema (lib/contentAgent.ts) drives the tool call and the system prompt, so the agent knows the exact fields for each content type (e.g. resourceType/gated for Resources, client/service/metrics for Case Studies). Same preview-then-Apply flow, same dynamic-provider fail-safe gating, same auth gate.",
      "done — GEO (Generative Engine Optimization) baseline, alongside classic SEO: Organization JSON-LD sitewide (layout.tsx, sourced from CMS SiteSettings), BlogPosting JSON-LD on Insights posts (lib/jsonLd.ts), /llms.txt route (markdown site index for LLM crawlers, per the emerging llmstxt.org convention), explicit robots.ts allow-rules for GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot, and a new aiSummary field in every collection's seo group — a direct quotable summary distinct from the meta description, meant for AI answer engines to cite verbatim (doc 14, D8)",
    ],
  },
  {
    name: "Phase 4 — FastAPI backend & database",
    status: "in-progress",
    items: [
      "done — health, config, db session, Alembic migrations (leads/forms/resources/assessment/audit + integration_events)",
      "done — models: Lead/LeadEvent, FormSubmission, ResourceDownload, Assessment*, AuditLog, IntegrationEvent",
      "done — Clerk JWT auth middleware (dev bypass when DEBUG=true and no CLERK_SECRET_KEY)",
      "done — /leads router (create/upsert, list, get, patch, events)",
      "done — /forms router (submit, list) — upserts lead, logs audit + n8n event",
      "done — /resources router (gated download, token verify, list) — upserts lead, logs audit + n8n event",
      "done — n8n webhook emitter + audit logger (core/integrations.py) — best-effort, never blocks the lead write",
      "done — /admin/audit-logs, /admin/integration-events (admin-only read endpoints for the above)",
      "done — AI scoring helper (core/ai_scoring.py) — score_assessment() calls the configured AI provider (core/ai_provider.py: Anthropic or Gemini, picked via AI_PROVIDER) with a forced structured-output call so output can only come back in the exact scored shape, validated against a pydantic schema (0-100 score, maturity_level enum, summary, recommendations). Bad output or a missing provider key raises AIScoringError instead of silently returning garbage",
      "done — /assessment router — public name decided (Phase 6): AI Readiness Assessment. Slug already matches, no rename needed",
      "done — HubSpot client (core/hubspot.py, upsert_contact) + ClickUp client (core/clickup.py, create_task) — same feature-flag pattern as n8n: without HUBSPOT_API_KEY / CLICKUP_API_KEY+CLICKUP_LIST_ID set, every call records an integration_events row with status=skipped and returns None, never blocks or fails the caller. Wired into /forms, /resources/download, and /assessment/{token}/complete",
      "done — dynamic AI provider (core/ai_provider.py, mirrored in CMS as lib/aiProvider.ts) — AI_PROVIDER env var picks Anthropic (default) or Gemini at runtime for every agent (scoring, lead follow-up, Page Agent, Content Agent). Both keys can be set at once; swapping providers is a config change, not a rebuild (doc 14, D7)",
      "planned — SES email (n8n plumbing is in place, downstream email action is not)",
    ],
  },
  {
    name: "Phase 5 — Forms, resources, CRM automation",
    status: "in-progress",
    items: [
      "done — form + resource submission emits an n8n event (see Flows below)",
      "done — direct HubSpot contact upsert + ClickUp task create wired into forms/resources/assessment (see Phase 4) — skipped, not failed, until real API keys are set",
      "planned — real n8n workflow (SES confirmation email) — currently no-ops unless N8N_WEBHOOK_URL is set",
    ],
  },
  {
    name: "Phase 6 — AI Readiness Assessment",
    status: "done",
    items: [
      "done — AI scoring helper, schema-validated/fail-safe (see Phase 4)",
      "done — /assessment router, public name AI Readiness Assessment (decided, doc 14 D1): POST /assessment/start (optional email → links a Lead), POST /assessment/{token}/answers (batch, re-submittable), POST /assessment/{token}/complete (calls the scoring helper, degrades to status=scoring_failed instead of a 500 if the model/API call fails), GET /assessment/{token}, GET /assessment (admin list)",
      "done — 8 tests covering start/answers/complete, the fail-safe path (no API key), a mocked success path, and idempotent re-completion",
      "done — successful completion also upserts a HubSpot contact (ai_readiness_score, ai_maturity_level) and creates a ClickUp review task",
      "done — web UI at /assessment: 9-question wizard (email optional/anonymous), calls the real API directly from the browser (start → answers → complete), results page uses the D3 score gauge. Homepage CTA now links here instead of /contact. On scoring_failed, shows a friendly fallback with a Book a Discovery Call link instead of an error page",
      "done — API CORS opened via allow_origin_regex for any host on :3002/:3003, since the LAN deployment is reached by IP and a fixed origin allowlist can't cover that",
      "done — PDF report generation (core/report_generator.py, reportlab) — branded one-pager (score, maturity level, summary, recommendations) built on every successful completion, saved to a named Docker volume (api_reports) so it survives restarts, served via GET /assessment/{token}/report. Best-effort: a report failure is logged and never blocks the completion response, and doesn't depend on any external API key",
      "done — lead follow-up agent (core/lead_agent.py, draft_followup()) — on successful completion with a linked lead, the configured AI provider drafts a short personalized outreach note (subject+body) referencing the score/maturity/recommendations for a human rep to review. Same fail-safe pattern as scoring: no provider key configured → LeadAgentError → skipped, logged, never blocks. When drafted, it's recorded as an audit-log entry (lead.followup_drafted) and, if the lead has a HubSpot contact, attached as a HubSpot note engagement (core/hubspot.py create_note, same skip-if-no-key pattern as everything else)",
    ],
  },
  {
    name: "Phase 7 — Clerk auth & lead portal",
    status: "in-progress",
    items: [
      "done — routes scaffolded: /sign-in, /sign-up, /dashboard, /dashboard/report, /dashboard/book-call",
      "done — middleware.ts protects /dashboard(.*) via Clerk when configured",
      "done — feature-flagged: without NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY/CLERK_SECRET_KEY, auth routes show a 'not configured yet' placeholder instead of breaking the site",
      "planned — real Clerk keys, JWT validation wired to FastAPI (middleware/auth.py already supports it), report/book-call content once Phase 6 data + Cal.com exist",
    ],
  },
  {
    name: "Phase 8 — AWS deployment & hardening",
    status: "planned",
    items: ["EC2/RDS/S3/CloudFront, GitHub Actions deploy, CloudWatch, Sentry"],
  },
  {
    name: "Phase 9 — QA, content load, launch",
    status: "in-progress",
    items: [
      "done — apps/api/tests: pytest suite (28 tests) covering health, leads, forms, resources, assessment, admin, report generation, and HubSpot/ClickUp skip-when-unconfigured behavior — runs against an in-memory SQLite DB via a get_db override, no Postgres needed to run it",
      "planned — full end-to-end validation checklist (doc 02): content load, forms/integration flows, mobile/accessibility, Lighthouse, WordPress redirects",
    ],
  },
];

const statusStyle: Record<Phase["status"], string> = {
  done: "bg-green-100 text-green-800",
  "in-progress": "bg-amber-100 text-amber-800",
  planned: "bg-gray-100 text-gray-600",
  blocked: "bg-red-100 text-red-700",
};

const statusLabel: Record<Phase["status"], string> = {
  done: "Done",
  "in-progress": "In progress",
  planned: "Planned",
  blocked: "Blocked",
};

const logins = [
  {
    where: "Payload CMS admin — cms:3003/admin",
    who: "Content editors (Paige/Aparna + team)",
    what: "Payload's own auth (email/password, users collection). Required to create/edit any Pages, Posts, Resources, Navigation, etc.",
  },
  {
    where: "API admin endpoints — GET /leads, GET /forms, GET /resources, GET /admin/audit-logs, GET /admin/integration-events",
    who: "Internal/admin use only",
    what: "Clerk JWT Bearer token with an admin role claim (middleware/auth.py: require_admin). In local dev, if DEBUG=true and no CLERK_SECRET_KEY is set, auth is bypassed with a mock admin user — no token needed on localhost.",
  },
  {
    where: "Public site + all POST endpoints (/leads, /forms, /resources/download)",
    who: "Anyone",
    what: "No login. These are the public-facing capture points — contact form, resource gate, etc.",
  },
  {
    where: "Customer-facing login — /sign-in, /sign-up, /dashboard",
    who: "Assessment/report users, once launched",
    what: "Routes are scaffolded but not live — no Clerk keys configured yet. Visiting /dashboard right now shows a 'not configured yet' placeholder instead of a real login.",
  },
  {
    where: "/admin (internal viewer, this app)",
    who: "Team — read-only view of leads, submissions, downloads, integration events, audit logs",
    what: "No real auth yet — same dev bypass as the API admin routes above. Do not expose publicly until Clerk is wired up.",
  },
];

const flows = [
  {
    name: "Contact / newsletter form submit",
    steps: [
      "User submits a form on the Next.js site",
      "Next.js POSTs to FastAPI POST /forms",
      "API upserts the Lead by email, stores the raw payload in form_submissions, logs a LeadEvent",
      "API writes an AuditLog row (action=form.submitted)",
      "API records an IntegrationEvent (target=n8n) and POSTs it to N8N_WEBHOOK_URL if configured",
      "API upserts a HubSpot contact (firstname/lastname/company) and creates a ClickUp task for the submission — each skipped+recorded, not failed, until real keys are set",
      "planned: n8n workflow adds SES confirmation email",
    ],
  },
  {
    name: "Gated resource download",
    steps: [
      "User enters email to unlock a resource",
      "Next.js POSTs to FastAPI POST /resources/download",
      "API upserts the Lead, creates a resource_downloads row with a signed access_token, logs a LeadEvent",
      "API writes an AuditLog row + IntegrationEvent (n8n), same as the form flow",
      "API upserts a HubSpot contact (no ClickUp task for downloads)",
      "Client calls GET /resources/access/{token} to verify before serving the actual file",
      "planned: n8n triggers a drip email sequence",
    ],
  },
  {
    name: "n8n / HubSpot / ClickUp dispatch (shared by forms, resources, assessment)",
    steps: [
      "core/integrations.py, core/hubspot.py, core/clickup.py each always write an integration_events row first (status=pending)",
      "If the relevant key (N8N_WEBHOOK_URL / HUBSPOT_API_KEY / CLICKUP_API_KEY+CLICKUP_LIST_ID) is unset, status is marked 'skipped' — record kept, nothing sent (current dev state)",
      "If set, the real call is made; response/error is written back onto the same row (status=success/failed)",
      "Design intent: a failed or skipped integration call never rolls back or blocks the lead/form/resource/assessment write — it's logged for retry, not silently dropped",
      "Visible at GET /admin/integration-events (filterable by ?status=)",
    ],
  },
  {
    name: "AI Readiness Assessment",
    steps: [
      "User takes the assessment at /assessment (web) — a 9-question wizard calling the API directly from the browser",
      "Starts assessment (POST /assessment/start, optional email) → AssessmentSession created with a session_token",
      "Multi-step answers submitted via POST /assessment/{token}/answers, re-submittable while in_progress",
      "POST /assessment/{token}/complete calls the AI scoring helper (Claude, forced tool call, schema-validated) → AssessmentResult (score, maturity level, summary, recommendations)",
      "On success: upserts a HubSpot contact with the score/maturity level, creates a ClickUp review task, generates a branded PDF report (downloadable at GET /assessment/{token}/report), and has Claude draft a personalized follow-up note attached to the HubSpot contact as a note engagement",
      "If scoring fails (bad/missing API key, invalid model output), session status becomes scoring_failed instead of a 500 — no HubSpot/ClickUp/report/follow-up steps happen in that case",
      "Report generation and follow-up drafting are independent, best-effort steps — a failure in either is logged and never blocks the completion response the browser receives",
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-2">Docs</h1>
      <p className="text-sm text-gray-500 mb-10">
        Internal build guide for the team — what&apos;s done, what&apos;s planned, where login is required, and how
        the main flows work end-to-end. Not indexed for search.
      </p>

      <div className="mb-12 border border-[var(--color-brand-gold)]/40 bg-[var(--color-brand-gold)]/10 rounded-lg p-4 flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-brand-navy)]">
          Need to know what&apos;s blocking on the org side — credentials, decisions, content?
        </p>
        <Link
          href="/docs/needs"
          className="shrink-0 text-sm font-semibold text-[var(--color-brand-navy)] underline hover:no-underline"
        >
          What we need →
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Where login is required</h2>
        <div className="space-y-4">
          {logins.map((l) => (
            <div key={l.where} className="border rounded-lg p-4">
              <p className="font-medium text-sm">{l.where}</p>
              <p className="text-xs text-gray-500 mt-1">Who: {l.who}</p>
              <p className="text-sm text-gray-600 mt-2">{l.what}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Flows</h2>
        <div className="space-y-6">
          {flows.map((f) => (
            <div key={f.name} className="border rounded-lg p-5">
              <p className="font-semibold text-sm mb-3">{f.name}</p>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                {f.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Phase-by-phase status</h2>
        <div className="space-y-8">
          {phases.map((phase) => (
            <div key={phase.name} className="border rounded-lg p-5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="font-semibold">{phase.name}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded ${statusStyle[phase.status]}`}>
                  {statusLabel[phase.status]}
                </span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
