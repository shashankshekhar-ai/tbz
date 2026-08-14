import type { TocEntry } from "../cms/RichText";

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="lg:sticky lg:top-28 border border-[#D9E3E6] rounded-2xl p-5 bg-[#F7F8F9]">
      <h2 className="text-xs font-inter font-bold uppercase tracking-widest text-[#0c2940] mb-3">
        On this page
      </h2>
      <ul className="space-y-2 text-sm font-roboto">
        {toc.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${entry.id}`}
              className="text-[#60707A] hover:text-[#39918d] focus:outline-none focus:underline focus:text-[#39918d] transition-colors"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
