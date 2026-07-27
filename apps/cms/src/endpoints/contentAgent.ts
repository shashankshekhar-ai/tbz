import type { Endpoint, PayloadRequest } from "payload";
import {
  CONTENT_KINDS,
  ContentAgentError,
  getKindConfig,
  runContentAgentTurn,
  type AgentChatMessage,
  type ContentKind,
} from "../lib/contentAgent";

async function requireAdmin(req: PayloadRequest): Promise<Response | null> {
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
      return Response.json({ error: "kind must be one of post, resource, case-study" }, { status: 400 });
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
          collection: cfg.collectionSlug as "posts" | "resources" | "case-studies",
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
      | { kind?: string; docId?: string; proposal?: Record<string, unknown> }
      | undefined;

    if (!isContentKind(body?.kind)) {
      return Response.json({ error: "kind must be one of post, resource, case-study" }, { status: 400 });
    }
    const kind = body.kind;
    const proposal = body?.proposal;
    if (!proposal) {
      return Response.json({ error: "proposal is required" }, { status: 400 });
    }

    const cfg = getKindConfig(kind);
    const data = cfg.toPayloadData(proposal);

    try {
      const doc = body?.docId
        ? await req.payload.update({
            collection: cfg.collectionSlug as "posts" | "resources" | "case-studies",
            id: body.docId,
            data,
          })
        : await req.payload.create({
            collection: cfg.collectionSlug as "posts" | "resources" | "case-studies",
            data: { ...data, status: "draft" },
          });
      return Response.json({ id: doc.id, slug: doc.slug });
    } catch (err) {
      req.payload.logger.error({ err }, "content_agent_apply_failed");
      return Response.json({ error: "Failed to save entry" }, { status: 500 });
    }
  },
};
