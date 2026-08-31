import type { Endpoint, PayloadRequest } from "payload";
import {
  CONTENT_KINDS,
  ContentAgentError,
  getKindConfig,
  runContentAgentTurn,
  type AgentChatMessage,
  type ContentKind,
} from "../lib/contentAgent";

// Accepts either a logged-in Payload admin session, or the shared service
// token AIwebmaster authenticates with (it has no Payload session).
async function requireAdmin(req: PayloadRequest): Promise<Response | null> {
  const serviceToken = process.env.CMS_SERVICE_TOKEN;
  const header = req.headers.get("x-service-token");
  if (serviceToken && header === serviceToken) return null;
  if (!req.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function isContentKind(value: unknown): value is ContentKind {
  return typeof value === "string" && (CONTENT_KINDS as readonly string[]).includes(value);
}

export const contentAgentChatEndpoint: Endpoint = {
  path: "/content-agent/chat",
  method: "post",
  handler: async (req: PayloadRequest) => {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;

    const body = (await req.json?.()) as
      | { kind?: string; docId?: string; messages?: AgentChatMessage[] }
      | undefined;

    if (!isContentKind(body?.kind)) {
      return Response.json(
        { error: "kind must be one of post, resource, case-study, faq, testimonial" },
        { status: 400 },
      );
    }
    const kind = body.kind;
    const messages = body?.messages ?? [];
    if (messages.length === 0) {
      return Response.json({ error: "messages is required" }, { status: 400 });
    }

    const cfg = getKindConfig(kind);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentState: Record<string, any> | null = null;
    if (body?.docId) {
      try {
        const doc = await req.payload.findByID({
          collection: cfg.collectionSlug as "posts" | "resources" | "case-studies" | "faqs" | "testimonials",
          id: body.docId,
          depth: 0,
        });
        currentState = cfg.fromPayloadDoc(doc);
      } catch {
        currentState = null;
      }
    }

    try {
      const result = await runContentAgentTurn(kind, messages, currentState);
      return Response.json(result);
    } catch (err) {
      if (err instanceof ContentAgentError) {
        return Response.json({ error: err.message }, { status: 503 });
      }
      req.payload.logger.error({ err }, "content_agent_chat_failed");
      return Response.json({ error: "Agent request failed" }, { status: 500 });
    }
  },
};

export const contentAgentApplyEndpoint: Endpoint = {
  path: "/content-agent/apply",
  method: "post",
  handler: async (req: PayloadRequest) => {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;

    const body = (await req.json?.()) as
      | { kind?: string; docId?: string; proposal?: Record<string, unknown>; publish?: boolean }
      | undefined;

    if (!isContentKind(body?.kind)) {
      return Response.json(
        { error: "kind must be one of post, resource, case-study, faq, testimonial" },
        { status: 400 },
      );
    }
    const kind = body.kind;
    const proposal = body?.proposal;
    if (!proposal) {
      return Response.json({ error: "proposal is required" }, { status: 400 });
    }
    // Default true (existing behavior). false = save a draft version instead
    // of touching the live doc — only meaningful for collections with
    // versions.drafts enabled (posts, case-studies); resources has no drafts
    // concept, so this is a no-op there regardless of the flag.
    const publish = body?.publish ?? true;
    const supportsDrafts = kind === "post" || kind === "case-study";
    // faq/testimonial have no `status` field at all (unlike post/resource/
    // case-study) — setting it on create would just be silently ignored by
    // Payload, but keep the intent explicit rather than relying on that.
    const hasStatusField = kind !== "faq" && kind !== "testimonial";

    const cfg = getKindConfig(kind);
    const data = cfg.toPayloadData(proposal);
    type ContentCollection = "posts" | "resources" | "case-studies" | "faqs" | "testimonials";

    try {
      const doc = body?.docId
        ? await req.payload.update({
            collection: cfg.collectionSlug as ContentCollection,
            id: body.docId,
            data,
            ...(supportsDrafts ? { draft: !publish } : {}),
          })
        : await req.payload.create({
            collection: cfg.collectionSlug as ContentCollection,
            data: hasStatusField ? { ...data, status: "draft" } : data,
            ...(supportsDrafts ? { draft: !publish } : {}),
          });
      return Response.json({ id: doc.id, slug: doc.slug, draft: supportsDrafts && !publish });
    } catch (err) {
      req.payload.logger.error({ err }, "content_agent_apply_failed");
      return Response.json({ error: "Failed to save entry" }, { status: 500 });
    }
  },
};
