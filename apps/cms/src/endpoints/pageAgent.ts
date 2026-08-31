import type { Endpoint, PayloadRequest } from "payload";
import {
  PageAgentError,
  agentBlocksToPayloadLayout,
  payloadLayoutToAgentBlocks,
  runPageAgentTurn,
  type AgentChatMessage,
  type AgentPageState,
} from "../lib/pageAgent";

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

export const pageAgentChatEndpoint: Endpoint = {
  path: "/page-agent/chat",
  method: "post",
  handler: async (req: PayloadRequest) => {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;

    const body = (await req.json?.()) as
      | { pageId?: string; messages?: AgentChatMessage[] }
      | undefined;
    const messages = body?.messages ?? [];
    if (messages.length === 0) {
      return Response.json({ error: "messages is required" }, { status: 400 });
    }

    let currentState: AgentPageState | null = null;
    if (body?.pageId) {
      try {
        const doc = await req.payload.findByID({
          collection: "pages",
          id: body.pageId,
          depth: 0,
        });
        currentState = {
          title: doc.title,
          slug: doc.slug,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          blocks: payloadLayoutToAgentBlocks(doc.layout as any),
        };
      } catch {
        currentState = null;
      }
    }

    try {
      const result = await runPageAgentTurn(messages, currentState);
      return Response.json(result);
    } catch (err) {
      if (err instanceof PageAgentError) {
        return Response.json({ error: err.message }, { status: 503 });
      }
      req.payload.logger.error({ err }, "page_agent_chat_failed");
      return Response.json({ error: "Agent request failed" }, { status: 500 });
    }
  },
};

export const pageAgentApplyEndpoint: Endpoint = {
  path: "/page-agent/apply",
  method: "post",
  handler: async (req: PayloadRequest) => {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;

    const body = (await req.json?.()) as
      | { pageId?: string; proposal?: AgentPageState; publish?: boolean }
      | undefined;
    const proposal = body?.proposal;
    if (!proposal) {
      return Response.json({ error: "proposal is required" }, { status: 400 });
    }
    // Default true — keeps existing behavior for callers that don't pass it.
    // false saves a new draft version without touching the live/published doc
    // (collection has versions.drafts enabled — see Pages.ts).
    const publish = body?.publish ?? true;

    const layout = agentBlocksToPayloadLayout(proposal.blocks);
    // `draft` (passed separately below) only controls Payload's
    // versions-drafts history — it does NOT touch this `status` select
    // field, which is what the frontend's getPageBySlug/getAllPages
    // actually filter on (where[status][equals]=published). Without
    // setting it explicitly here, publish:true still leaves status stuck
    // on "draft" forever and the page 404s on the live site no matter how
    // many times it's "published" — confirmed live, not a hypothetical.
    const data = { title: proposal.title, slug: proposal.slug, layout, status: publish ? "published" : "draft" };

    try {
      const doc = body?.pageId
        ? await req.payload.update({ collection: "pages", id: body.pageId, data, draft: !publish })
        : await req.payload.create({
            collection: "pages",
            data,
            draft: !publish,
          });
      return Response.json({ id: doc.id, slug: doc.slug, draft: !publish });
    } catch (err) {
      req.payload.logger.error({ err }, "page_agent_apply_failed");
      return Response.json({ error: "Failed to save page" }, { status: 500 });
    }
  },
};
