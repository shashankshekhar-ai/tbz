export type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
};

export type LexicalContent = { root: { children: LexicalNode[] } } | null | undefined;

export type TocEntry = { id: string; text: string; level: 2 | 3 };

function nodeText(node: LexicalNode): string {
  if (node.type === "text") return node.text ?? "";
  return (node.children ?? []).map(nodeText).join("");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Walks rich-text content and returns H2/H3 headings for a table of contents, matching the ids RichText renders. */
export function extractToc(content: LexicalContent): TocEntry[] {
  const nodes = content?.root?.children ?? [];
  const seen = new Map<string, number>();
  const toc: TocEntry[] = [];
  for (const node of nodes) {
    if (node.type !== "heading") continue;
    const tag = node.tag ?? "h2";
    if (tag !== "h2" && tag !== "h3") continue;
    const text = nodeText(node);
    if (!text) continue;
    let id = slugify(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    toc.push({ id, text, level: tag === "h3" ? 3 : 2 });
  }
  return toc;
}

function renderNodes(nodes: LexicalNode[], headingSlugCounts: Map<string, number>): React.ReactNode[] {
  return nodes.map((node, i) => {
    if (node.type === "text") {
      let text: React.ReactNode = node.text ?? "";
      if (node.format && node.format & 1) text = <strong key={i}>{text}</strong>;
      else if (node.format && node.format & 2) text = <em key={i}>{text}</em>;
      else if (node.format && node.format & 8) text = <u key={i}>{text}</u>;
      else text = <span key={i}>{text}</span>;
      return text;
    }
    if (node.type === "paragraph") {
      return (
        <p key={i}>{renderNodes(node.children ?? [], headingSlugCounts)}</p>
      );
    }
    if (node.type === "heading") {
      const Tag = (node.tag ?? "h2") as "h1" | "h2" | "h3" | "h4";
      let idProp: { id?: string } = {};
      if (Tag === "h2" || Tag === "h3") {
        const text = nodeText(node);
        let id = slugify(text);
        const count = headingSlugCounts.get(id) ?? 0;
        headingSlugCounts.set(id, count + 1);
        if (count > 0) id = `${id}-${count}`;
        idProp = { id };
      }
      return (
        <Tag key={i} {...idProp} className="scroll-mt-28">
          {renderNodes(node.children ?? [], headingSlugCounts)}
        </Tag>
      );
    }
    if (node.type === "list") {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return <Tag key={i}>{renderNodes(node.children ?? [], headingSlugCounts)}</Tag>;
    }
    if (node.type === "listitem") {
      return <li key={i}>{renderNodes(node.children ?? [], headingSlugCounts)}</li>;
    }
    if (node.type === "link") {
      return (
        <a key={i} href={node.url ?? "#"}>
          {renderNodes(node.children ?? [], headingSlugCounts)}
        </a>
      );
    }
    return node.children?.length ? (
      <>{renderNodes(node.children, headingSlugCounts)}</>
    ) : null;
  });
}

export function RichText({ content }: { content: LexicalContent }) {
  const nodes = content?.root?.children;
  if (!nodes?.length) return null;
  return <>{renderNodes(nodes, new Map())}</>;
}
