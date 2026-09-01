import type { Endpoint, PayloadRequest } from "payload";
import {
  BlockOpError,
  PageAgentError,
  agentBlocksToPayloadLayout,
  applyBlockOps,
  payloadLayoutToAgentBlocks,
  runPageAgentTurn,
  type AgentBlock,
  type AgentChatMessage,
  type AgentPageState,
  type BlockOp,
} from "../lib/pageAgent";
import { requireAdmin } from "../lib/requireAdmin";

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
      | {
          pageId?: string;
          proposal?: Partial<AgentPageState>;
          // Alternative to proposal.blocks — a small list of deltas
          // (append/update/remove a block or a card) applied against the
          // page's CURRENT state, fetched fresh right here rather than
          // trusting whatever the caller had in context. Only valid
          // against an existing pageId. See applyBlockOps in lib/pageAgent
          // for why this exists: echoing the full array back on every edit
          // makes output size scale with PAGE size instead of EDIT size,
          // and a large page can blow a model's output token limit on a
          // one-line change — confirmed live (truncated JSON, 500).
          blockOps?: BlockOp[];
          publish?: boolean;
        }
      | undefined;
    const proposal = body?.proposal;
    const blockOps = body?.blockOps;
    if (!proposal?.blocks && !(blockOps && blockOps.length)) {
      return Response.json({ error: "proposal.blocks (full replace) or blockOps (delta) is required" }, { status: 400 });
    }
    // Default true — keeps existing behavior for callers that don't pass it.
    // false saves a new draft version without touching the live/published doc
    // (collection has versions.drafts enabled — see Pages.ts).
    const publish = body?.publish ?? true;

    let title: string | undefined = proposal?.title;
    let slug: string | undefined = proposal?.slug;
    let blocks: AgentBlock[];

    if (blockOps && blockOps.length) {
      if (!body?.pageId) {
        return Response.json({ error: "blockOps requires an existing pageId — use proposal.blocks for a brand-new page" }, { status: 400 });
      }
      let existing;
      try {
        // draft: true — reads the LATEST version (an unpublished draft if
        // one exists, else the published state), not always the published
        // row. Without this, a chain of publish:false block-ops edits each
        // silently rebuilds from the published baseline and drops every
        // prior unpublished edit — confirmed live (append then remove
        // couldn't find the just-appended card).
        existing = await req.payload.findByID({ collection: "pages", id: body.pageId, depth: 0, draft: true });
      } catch (err) {
        return Response.json({ error: `Could not load page ${body.pageId} to apply block ops` }, { status: 404 });
      }
      const currentBlocks = payloadLayoutToAgentBlocks(existing.layout as Record<string, unknown>[]);
      try {
        blocks = applyBlockOps(currentBlocks, blockOps);
      } catch (err) {
        if (err instanceof BlockOpError) {
          return Response.json({ error: err.message }, { status: 400 });
        }
        throw err;
      }
      title = title ?? existing.title;
      slug = slug ?? existing.slug;
    } else {
      blocks = proposal!.blocks!;
    }

    if (!title || !slug) {
      return Response.json({ error: "title and slug are required" }, { status: 400 });
    }

    const layout = agentBlocksToPayloadLayout(blocks);
    // `draft` (passed separately below) only controls Payload's
    // versions-drafts history — it does NOT touch this `status` select
    // field, which is what the frontend's getPageBySlug/getAllPages
    // actually filter on (where[status][equals]=published). Without
    // setting it explicitly here, publish:true still leaves status stuck
    // on "draft" forever and the page 404s on the live site no matter how
    // many times it's "published" — confirmed live, not a hypothetical.
    const data = { title, slug, layout, status: publish ? "published" : "draft" };

    try {
      const doc = body?.pageId
        ? await req.payload.update({ collection: "pages", id: body.pageId, data, draft: !publish })
        : await req.payload.create({
            collection: "pages",
            data,
            draft: !publish,
          });
      return Response.json({ id: doc.id, slug: doc.slug, title: doc.title, draft: !publish });
    } catch (err) {
      req.payload.logger.error({ err }, "page_agent_apply_failed");
      return Response.json({ error: "Failed to save page" }, { status: 500 });
    }
  },
};
