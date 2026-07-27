import Link from "next/link";

type Block = {
  blockType: string;
  id?: string;
  [key: string]: unknown;
};

type Props = {
  blocks: Block[];
};

export function BlockRenderer({ blocks }: Props) {
  if (!blocks?.length) return null;
  return (
    <div>
      {blocks.map((block, i) => (
        <BlockSwitch key={(block.id as string) ?? i} block={block} />
      ))}
    </div>
  );
}

function BlockSwitch({ block }: { block: Block }) {
  switch (block.blockType) {
    case "hero":
      return <HeroBlock block={block as HeroData} />;
    case "richText":
      return <RichTextBlockComponent block={block as RichTextData} />;
    case "cardGrid":
      return <CardGridBlock block={block as CardGridData} />;
    case "ctaBanner":
      return <CtaBannerBlock block={block as CtaBannerData} />;
    default:
      return process.env.NODE_ENV === "development" ? (
        <div className="p-4 border border-dashed border-gray-300 text-sm text-gray-500 my-4">
          Unknown block: <code>{block.blockType}</code>
        </div>
      ) : null;
  }
}

// ── typed block shapes ────────────────────────────────────────────────────────

type HeroData = {
  blockType: "hero";
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  theme?: "dark" | "light";
};

type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
};

type RichTextData = {
  blockType: "richText";
  content: { root: { children: LexicalNode[] } };
  maxWidth?: "prose" | "wide" | "full";
};

type CardData = { icon?: string; title: string; body?: string };

type CardGridData = {
  blockType: "cardGrid";
  heading?: string;
  subheading?: string;
  columns?: "2" | "3" | "4";
  cards: CardData[];
};

type CtaBannerData = {
  blockType: "ctaBanner";
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaUrl?: string;
  theme?: "gold" | "navy" | "white";
};

// ── block components ──────────────────────────────────────────────────────────

function HeroBlock({ block }: { block: HeroData }) {
  const isDark = block.theme !== "light";
  return (
    <section
      className={`py-24 px-6 text-center ${
        isDark ? "bg-[#0A1628] text-white" : "bg-white text-[#0A1628]"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {block.heading}
        </h1>
        {block.subheading && (
          <p className="text-lg md:text-xl mb-10 opacity-80 max-w-2xl mx-auto">
            {block.subheading}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          {block.ctaText && block.ctaUrl && (
            <Link
              href={block.ctaUrl}
              className="bg-[#C9A84C] text-[#0A1628] px-8 py-3 rounded font-semibold hover:bg-[#b8943f] transition-colors"
            >
              {block.ctaText}
            </Link>
          )}
          {block.secondaryCtaText && block.secondaryCtaUrl && (
            <Link
              href={block.secondaryCtaUrl}
              className={`border px-8 py-3 rounded font-semibold transition-colors ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-[#0A1628]"
                  : "border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
              }`}
            >
              {block.secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function SerializedLexical({ nodes }: { nodes: LexicalNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
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
            <p key={i}>
              <SerializedLexical nodes={node.children ?? []} />
            </p>
          );
        }
        if (node.type === "heading") {
          const Tag = (node.tag ?? "h2") as "h1" | "h2" | "h3" | "h4";
          return (
            <Tag key={i}>
              <SerializedLexical nodes={node.children ?? []} />
            </Tag>
          );
        }
        if (node.type === "list") {
          const Tag = node.listType === "number" ? "ol" : "ul";
          return (
            <Tag key={i}>
              <SerializedLexical nodes={node.children ?? []} />
            </Tag>
          );
        }
        if (node.type === "listitem") {
          return (
            <li key={i}>
              <SerializedLexical nodes={node.children ?? []} />
            </li>
          );
        }
        if (node.type === "link") {
          return (
            <a key={i} href={node.url ?? "#"}>
              <SerializedLexical nodes={node.children ?? []} />
            </a>
          );
        }
        return node.children?.length ? (
          <SerializedLexical key={i} nodes={node.children} />
        ) : null;
      })}
    </>
  );
}

function RichTextBlockComponent({ block }: { block: RichTextData }) {
  const widthClass =
    block.maxWidth === "wide"
      ? "max-w-5xl"
      : block.maxWidth === "full"
      ? "max-w-none"
      : "max-w-2xl";

  if (!block.content?.root?.children?.length) return null;

  return (
    <section className="py-16 px-6">
      <div className={`${widthClass} mx-auto prose prose-lg prose-slate`}>
        <SerializedLexical nodes={block.content.root.children} />
      </div>
    </section>
  );
}

function CardGridBlock({ block }: { block: CardGridData }) {
  const cards = block.cards ?? [];
  const cols =
    block.columns === "2"
      ? "grid-cols-1 md:grid-cols-2"
      : block.columns === "4"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-16 px-6 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto">
        {block.heading && (
          <h2 className="text-3xl font-bold text-[#0A1628] text-center mb-3">
            {block.heading}
          </h2>
        )}
        {block.subheading && (
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            {block.subheading}
          </p>
        )}
        <div className={`grid ${cols} gap-6`}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              {card.icon && <div className="text-3xl mb-3">{card.icon}</div>}
              <h3 className="text-lg font-semibold text-[#0A1628] mb-2">{card.title}</h3>
              {card.body && (
                <p className="text-slate-600 text-sm leading-relaxed">{card.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBannerBlock({ block }: { block: CtaBannerData }) {
  const bgClass =
    block.theme === "navy"
      ? "bg-[#0A1628] text-white"
      : block.theme === "white"
      ? "bg-white text-[#0A1628] border border-slate-200"
      : "bg-[#C9A84C] text-[#0A1628]";

  return (
    <section className={`py-16 px-6 ${bgClass}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{block.heading}</h2>
        {block.subheading && (
          <p className="text-lg mb-8 opacity-90">{block.subheading}</p>
        )}
        {block.ctaText && block.ctaUrl && (
          <Link
            href={block.ctaUrl}
            className={`inline-block px-8 py-3 rounded font-semibold transition-colors ${
              block.theme === "gold" || block.theme === "white"
                ? "bg-[#0A1628] text-white hover:bg-[#152240]"
                : "bg-[#C9A84C] text-[#0A1628] hover:bg-[#b8943f]"
            }`}
          >
            {block.ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
