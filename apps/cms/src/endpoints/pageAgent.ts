import type { Endpoint, PayloadRequest } from "payload";
import {
  PageAgentError,
  agentBlocksToPayloadLayout,
  payloadLayoutToAgentBlocks,
  runPageAgentTurn,
  type AgentChatMessage,
  type AgentPageState,
} from "../lib/pageAgent";

async function requireAdmin(req: PayloadRequest): Promise<Response | null> {
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

    const body = (await req.json?.()) as { pageId?: string; proposal?: AgentPageState } | undefined;
    const proposal = body?.proposal;
    if (!proposal) {
      return Response.json({ error: "proposal is required" }, { status: 400 });
    }

    const layout = agentBlocksToPayloadLayout(proposal.blocks);
    const data = { title: proposal.title, slug: proposal.slug, layout };

    try {
      const doc = body?.pageId
        ? await req.payload.update({ collection: "pages", id: body.pageId, data })
        : await req.payload.create({
            collection: "pages",
            data: { ...data, status: "draft" },
          });
      return Response.json({ id: doc.id, slug: doc.slug });
    } catch (err) {
      req.payload.logger.error({ err }, "page_agent_apply_failed");
      return Response.json({ error: "Failed to save page" }, { status: 500 });
    }
  },
};
