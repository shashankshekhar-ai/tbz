import { AIProviderError, runAgentTurn } from "./aiProvider";

export const ALLOWED_BLOCK_TYPES = ["hero", "richText", "cardGrid", "ctaBanner"] as const;
export type BlockType = (typeof ALLOWED_BLOCK_TYPES)[number];

export type AgentBlock = {
  blockType: BlockType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
};

export type AgentPageState = {
  title: string;
  slug: string;
  blocks: AgentBlock[];
};

export type AgentChatMessage = { role: "user" | "assistant"; content: string };

export type AgentTurnResult = {
  reply: string;
  proposal: AgentPageState | null;
};

export class PageAgentError extends Error {}

const SYSTEM_PROMPT = `You are a page-building assistant inside The Bradbury Group's CMS admin panel.
You help editors create and customize marketing pages by proposing a full page layout made of blocks.

Available block types and their editable fields:

- hero: { heading (string, required), subheading (string), ctaText (string), ctaUrl (string), secondaryCtaText (string), secondaryCtaUrl (string), theme ("dark" | "light") }
- richText: { content (string — plain text or simple markdown-ish paragraphs, one per line), maxWidth ("prose" | "wide" | "full") }
- cardGrid: { heading (string), subheading (string), columns ("2" | "3" | "4"), cards: [{ icon (emoji or short label), title (string, required), body (string) }] }
- ctaBanner: { heading (string, required), subheading (string), ctaText (string), ctaUrl (string), theme ("gold" | "navy" | "white") }

Rules:
- Always respond conversationally in plain text explaining what you did or asking a clarifying question.
- Whenever the user asks you to create a page or change the layout, call the update_page tool with the COMPLETE resulting page state (title, slug, and the full blocks array) — not just a diff. Carry forward any existing blocks the user didn't ask to change.
- Only call update_page when you're proposing an actual change to save. If the user is just asking a question, reply with text only and do not call the tool.
- Keep slugs lowercase, hyphenated, URL-safe.
- Brand voice: The Bradbury Group delivers AI fluency programs, executive coaching, and organizational transformation. Navy/gold brand palette (theme "dark"/"gold" read as on-brand defaults).`;

function buildStateContext(state: AgentPageState | null): string {
  if (!state) {
    return "There is no existing page yet — the editor is creating a brand new one.";
  }
  return `Current page state (JSON):\n${JSON.stringify(state, null, 2)}`;
}

const UPDATE_PAGE_TOOL_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    blocks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          blockType: { type: "string", enum: [...ALLOWED_BLOCK_TYPES] },
          data: { type: "object" },
        },
        required: ["blockType", "data"],
      },
    },
  },
  required: ["title", "slug", "blocks"],
};

const UPDATE_PAGE_TOOL_DESCRIPTION =
  "Propose the complete new state of the page (title, slug, and full ordered blocks array) reflecting the requested changes. This does not save anything — it's shown to the editor as a preview to approve.";

export async function runPageAgentTurn(
  history: AgentChatMessage[],
  currentState: AgentPageState | null,
): Promise<AgentTurnResult> {
  let result;
  try {
    result = await runAgentTurn(
      SYSTEM_PROMPT,
      history,
      buildStateContext(currentState),
      "update_page",
      UPDATE_PAGE_TOOL_DESCRIPTION,
      UPDATE_PAGE_TOOL_SCHEMA,
    );
  } catch (err) {
    if (err instanceof AIProviderError) {
      throw new PageAgentError(err.message);
    }
    throw err;
  }

  let proposal: AgentPageState | null = null;
  if (result.proposal) {
    const input = result.proposal as { title?: string; slug?: string; blocks?: AgentBlock[] };
    const blocks = (input.blocks ?? []).filter((b) =>
      (ALLOWED_BLOCK_TYPES as readonly string[]).includes(b.blockType),
    );
    proposal = {
      title: input.title ?? currentState?.title ?? "Untitled page",
      slug: input.slug ?? currentState?.slug ?? "untitled-page",
      blocks,
    };
  }

  let reply = result.reply;
  if (!reply.trim()) {
    reply = proposal ? "Here's the updated page — review the preview and click Apply to save." : "";
  }

  return { reply, proposal };
}

type LexicalParagraph = {
  type: "paragraph";
  children: { type: "text"; text: string; version: 1 }[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};

export function plainTextToLexical(text: string): object {
  const paragraphs: LexicalParagraph[] = (text || "")
    .split(/\n+/)
    .filter((line) => line.trim().length > 0)
    .map((line) => ({
      type: "paragraph",
      children: [{ type: "text", text: line, version: 1 }],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    }));

  return {
    root: {
      type: "root",
      children: paragraphs.length > 0 ? paragraphs : [{ ...emptyParagraph() }],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

function emptyParagraph(): LexicalParagraph {
  return {
    type: "paragraph",
    children: [{ type: "text", text: "", version: 1 }],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractLexicalText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.text ?? "";
  if (Array.isArray(node.children)) {
    return node.children.map(extractLexicalText).join("");
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lexicalToPlainText(doc: any): string {
  const rootChildren = doc?.root?.children ?? [];
  return rootChildren.map(extractLexicalText).join("\n");
}

export function payloadLayoutToAgentBlocks(
  layout: Record<string, unknown>[] | undefined | null,
): AgentBlock[] {
  return (layout ?? []).map((raw) => {
    const { blockType, id, blockName, ...rest } = raw as Record<string, unknown> & {
      blockType: BlockType;
    };
    void id;
    void blockName;
    if (blockType === "richText" && rest.content) {
      const { content, ...others } = rest;
      return { blockType, data: { ...others, content: lexicalToPlainText(content) } };
    }
    return { blockType, data: rest };
  });
}

export function agentBlocksToPayloadLayout(blocks: AgentBlock[]): Record<string, unknown>[] {
  return blocks.map((b) => {
    if (b.blockType === "richText") {
      const { content, ...rest } = b.data;
      return { blockType: b.blockType, ...rest, content: plainTextToLexical(String(content ?? "")) };
    }
    return { blockType: b.blockType, ...b.data };
  });
}
