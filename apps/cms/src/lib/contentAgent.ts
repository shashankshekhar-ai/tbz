import { AIProviderError, runAgentTurn, type AgentChatMessage } from "./aiProvider";
import { lexicalToPlainText, plainTextToLexical } from "./pageAgent";

export const CONTENT_KINDS = ["post", "resource", "case-study", "faq", "testimonial"] as const;
export type ContentKind = (typeof CONTENT_KINDS)[number];

export type { AgentChatMessage };

export class ContentAgentError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentState = Record<string, any>;

type KindConfig = {
  collectionSlug: string;
  label: string;
  fieldsDescription: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolSchema: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromPayloadDoc: (doc: any) => ContentState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toPayloadData: (state: ContentState) => Record<string, any>;
};

const tagsArrayField = {
  type: "array" as const,
  items: { type: "object" as const, properties: { tag: { type: "string" } } },
};

const KIND_CONFIG: Record<ContentKind, KindConfig> = {
  post: {
    collectionSlug: "posts",
    label: "Blog post",
    fieldsDescription:
      "- title (string, required)\n- slug (string, lowercase-hyphenated, required)\n- status (\"draft\" | \"published\")\n- author (string)\n- excerpt (string, short teaser, 120+ characters — Payload rejects anything shorter)\n- content (string — plain text/simple paragraphs, one per line — the article body)\n- category (one of: \"leadership\", \"organizational-strategy\", \"workplace-culture\", \"talent-and-teams\", \"research-and-trends\" — defaults to \"leadership\" if not given, but pick the one that actually fits the post)\n- publishedAt (ISO date string — defaults to right now if not given)\n- tags (array of short strings)",
    toolSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        status: { type: "string", enum: ["draft", "published"] },
        author: { type: "string" },
        excerpt: { type: "string" },
        content: { type: "string" },
        category: {
          type: "string",
          enum: ["leadership", "organizational-strategy", "workplace-culture", "talent-and-teams", "research-and-trends"],
        },
        publishedAt: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
      },
      required: ["title", "slug", "content"],
    },
    fromPayloadDoc: (doc) => ({
      title: doc.title,
      slug: doc.slug,
      status: doc.status,
      author: doc.author,
      excerpt: doc.excerpt,
      content: lexicalToPlainText(doc.content),
      category: doc.category,
      publishedAt: doc.publishedAt,
      tags: (doc.tags ?? []).map((t: { tag: string }) => t.tag),
    }),
    // category/publishedAt are required by the Posts collection itself
    // (see collections/Posts.ts) but were never being set here — every
    // brand-new post created through this agent failed outright with a
    // 400 from Payload's own validation ("Published At"/"Category" field
    // required), confirmed live. Same default-if-missing convention as
    // `status` right below already used for exactly this reason.
    toPayloadData: (state) => ({
      title: state.title,
      slug: state.slug,
      status: state.status ?? "draft",
      author: state.author,
      excerpt: state.excerpt,
      content: plainTextToLexical(String(state.content ?? "")),
      category: state.category ?? "leadership",
      publishedAt: state.publishedAt ?? new Date().toISOString(),
      tags: (state.tags ?? []).map((tag: string) => ({ tag })),
    }),
  },
  resource: {
    collectionSlug: "resources",
    label: "Resource",
    fieldsDescription:
      "- title (string, required)\n- slug (string, lowercase-hyphenated, required)\n- status (\"draft\" | \"published\")\n- resourceType (\"guide\" | \"template\" | \"checklist\" | \"webinar\" | \"case-study\" | \"tool\")\n- gated (boolean — require email capture to download)\n- description (string, required)\n- externalUrl (string, optional — if the file lives outside S3)\n- tags (array of short strings)",
    toolSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        status: { type: "string", enum: ["draft", "published"] },
        resourceType: {
          type: "string",
          enum: ["guide", "template", "checklist", "webinar", "case-study", "tool"],
        },
        gated: { type: "boolean" },
        description: { type: "string" },
        externalUrl: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
      },
      required: ["title", "slug", "resourceType", "description"],
    },
    fromPayloadDoc: (doc) => ({
      title: doc.title,
      slug: doc.slug,
      status: doc.status,
      resourceType: doc.resourceType,
      gated: doc.gated,
      description: doc.description,
      externalUrl: doc.externalUrl,
      tags: (doc.tags ?? []).map((t: { tag: string }) => t.tag),
    }),
    toPayloadData: (state) => ({
      title: state.title,
      slug: state.slug,
      status: state.status ?? "draft",
      resourceType: state.resourceType,
      gated: state.gated ?? true,
      description: state.description,
      externalUrl: state.externalUrl,
      tags: (state.tags ?? []).map((tag: string) => ({ tag })),
    }),
  },
  "case-study": {
    collectionSlug: "case-studies",
    label: "Case study",
    fieldsDescription:
      "- title (string, required)\n- slug (string, lowercase-hyphenated, required)\n- status (\"draft\" | \"published\")\n- client (string, client name)\n- service (\"training\" | \"consulting\" | \"solomon-engine\" | \"speaking\")\n- summary (string, required, short overview)\n- challenge (string — plain text paragraphs, one per line)\n- solution (string — plain text paragraphs, one per line)\n- results (string — plain text paragraphs, one per line)\n- metrics (array of { label, value } — e.g. { label: \"Time saved\", value: \"30%\" })",
    toolSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        status: { type: "string", enum: ["draft", "published"] },
        client: { type: "string" },
        service: { type: "string", enum: ["training", "consulting", "solomon-engine", "speaking"] },
        summary: { type: "string" },
        challenge: { type: "string" },
        solution: { type: "string" },
        results: { type: "string" },
        metrics: {
          type: "array",
          items: {
            type: "object",
            properties: { label: { type: "string" }, value: { type: "string" } },
          },
        },
      },
      required: ["title", "slug", "summary"],
    },
    fromPayloadDoc: (doc) => ({
      title: doc.title,
      slug: doc.slug,
      status: doc.status,
      client: doc.client,
      service: doc.service,
      summary: doc.summary,
      challenge: lexicalToPlainText(doc.challenge),
      solution: lexicalToPlainText(doc.solution),
      results: lexicalToPlainText(doc.results),
      metrics: doc.metrics ?? [],
    }),
    toPayloadData: (state) => ({
      title: state.title,
      slug: state.slug,
      status: state.status ?? "draft",
      client: state.client,
      service: state.service,
      summary: state.summary,
      challenge: plainTextToLexical(String(state.challenge ?? "")),
      solution: plainTextToLexical(String(state.solution ?? "")),
      results: plainTextToLexical(String(state.results ?? "")),
      metrics: state.metrics ?? [],
    }),
  },
  faq: {
    collectionSlug: "faqs",
    label: "FAQ",
    fieldsDescription:
      "- question (string, required)\n- answer (string — plain text paragraphs, one per line, required)\n- category (\"general\" | \"training\" | \"consulting\" | \"assessment\" | \"solomon-engine\" | \"ethics\")\n- order (number — controls display order, lower first)\n\nNo slug and no draft/publish state — an FAQ is live as soon as it's saved.",
    toolSchema: {
      type: "object",
      properties: {
        question: { type: "string" },
        answer: { type: "string" },
        category: {
          type: "string",
          enum: ["general", "training", "consulting", "assessment", "solomon-engine", "ethics"],
        },
        order: { type: "number" },
      },
      required: ["question", "answer"],
    },
    fromPayloadDoc: (doc) => ({
      question: doc.question,
      answer: lexicalToPlainText(doc.answer),
      category: doc.category,
      order: doc.order,
    }),
    toPayloadData: (state) => ({
      question: state.question,
      answer: plainTextToLexical(String(state.answer ?? "")),
      category: state.category,
      order: state.order ?? 0,
    }),
  },
  testimonial: {
    collectionSlug: "testimonials",
    label: "Testimonial",
    fieldsDescription:
      "- quote (string, required)\n- name (string, required — the person being quoted)\n- title (string, their job title)\n- company (string)\n- photo (string — a media doc id, from a prior `media` action's result; not a URL or filename)\n- featured (boolean — show on homepage)\n- context (\"training\" | \"consulting\" | \"speaking\" | \"solomon-engine\")\n- order (number — controls display order, lower first)\n\nNo slug and no draft/publish state. To set `photo`, the caller must first run a `media` action to upload the image and use the id it returns.",
    toolSchema: {
      type: "object",
      properties: {
        quote: { type: "string" },
        name: { type: "string" },
        title: { type: "string" },
        company: { type: "string" },
        photo: { type: "string" },
        featured: { type: "boolean" },
        context: { type: "string", enum: ["training", "consulting", "speaking", "solomon-engine"] },
        order: { type: "number" },
      },
      required: ["quote", "name"],
    },
    fromPayloadDoc: (doc) => ({
      quote: doc.quote,
      name: doc.name,
      title: doc.title,
      company: doc.company,
      photo: typeof doc.photo === "object" ? doc.photo?.id : doc.photo,
      featured: doc.featured,
      context: doc.context,
      order: doc.order,
    }),
    toPayloadData: (state) => ({
      quote: state.quote,
      name: state.name,
      title: state.title,
      company: state.company,
      photo: state.photo || undefined,
      featured: state.featured ?? false,
      context: state.context,
      order: state.order ?? 0,
    }),
  },
};

export function getKindConfig(kind: ContentKind): KindConfig {
  return KIND_CONFIG[kind];
}

function buildSystemPrompt(kind: ContentKind): string {
  const cfg = KIND_CONFIG[kind];
  return `You are a content-drafting assistant inside The Bradbury Group's CMS admin panel.
You help editors write and revise ${cfg.label} entries by proposing the complete field state.

Editable fields for a ${cfg.label}:
${cfg.fieldsDescription}

Rules:
- Always respond conversationally in plain text explaining what you did or asking a clarifying question.
- Whenever the user asks you to draft or change this ${cfg.label}, call update_content with the COMPLETE resulting field state — not just a diff. Carry forward any existing values the user didn't ask to change.
- Only call update_content when proposing an actual change to save. If the user is just asking a question, reply with text only.
- Keep slugs lowercase, hyphenated, URL-safe.
- Brand voice: The Bradbury Group delivers AI fluency programs, executive coaching, and organizational transformation. Confident, concrete, no filler.`;
}

function buildStateContext(state: ContentState | null): string {
  if (!state) {
    return "There is no existing entry yet — the editor is creating a brand new one.";
  }
  return `Current entry state (JSON):\n${JSON.stringify(state, null, 2)}`;
}

export type AgentTurnResult = {
  reply: string;
  proposal: ContentState | null;
};

export async function runContentAgentTurn(
  kind: ContentKind,
  history: AgentChatMessage[],
  currentState: ContentState | null,
): Promise<AgentTurnResult> {
  const cfg = KIND_CONFIG[kind];
  const toolDescription = `Propose the complete new field state for this ${cfg.label}. This does not save anything — it's shown to the editor as a preview to approve.`;

  let result;
  try {
    result = await runAgentTurn(
      buildSystemPrompt(kind),
      history,
      buildStateContext(currentState),
      "update_content",
      toolDescription,
      cfg.toolSchema,
    );
  } catch (err) {
    if (err instanceof AIProviderError) {
      throw new ContentAgentError(err.message);
    }
    throw err;
  }

  const proposal: ContentState | null = result.proposal
    ? { ...(currentState ?? {}), ...result.proposal }
    : null;

  let reply = result.reply;
  if (!reply.trim()) {
    reply = proposal ? "Here's the draft — review the preview and click Apply to save." : "";
  }

  return { reply, proposal };
}
