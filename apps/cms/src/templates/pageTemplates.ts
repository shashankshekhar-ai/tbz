const emptyRichText = {
  root: {
    type: "root",
    direction: null,
    format: "",
    indent: 0,
    version: 1,
    children: [
      {
        type: "paragraph",
        direction: null,
        format: "",
        indent: 0,
        version: 1,
        children: [{ type: "text", text: "Add your content here.", format: 0, style: "", detail: 0, mode: "normal", version: 1 }],
      },
    ],
  },
};

// Preset block arrangements an editor can drop into a new page instead of
// starting from a blank layout. Keyed to match the `applyTemplate` select
// field's options in Pages.ts; consumed by the beforeChange hook there.
export const pageTemplates: Record<string, unknown[]> = {
  landing: [
    { blockType: "hero", heading: "Your headline here", subheading: "Supporting subheadline copy.", ctaText: "Get started", ctaUrl: "/contact", theme: "dark" },
    { blockType: "cardGrid", heading: "Why it works", columns: "3", cards: [
      { title: "Point one", body: "Short supporting copy." },
      { title: "Point two", body: "Short supporting copy." },
      { title: "Point three", body: "Short supporting copy." },
    ] },
    { blockType: "ctaBanner", heading: "Ready to talk?", ctaText: "Book a call", ctaUrl: "/contact", theme: "gold" },
  ],
  program: [
    { blockType: "hero", heading: "Program name", subheading: "One-line description of the program.", ctaText: "Learn more", ctaUrl: "#", theme: "dark" },
    { blockType: "richText", content: emptyRichText, maxWidth: "prose" },
    { blockType: "cardGrid", heading: "What you'll get", columns: "3", cards: [
      { title: "Module one", body: "Short description." },
      { title: "Module two", body: "Short description." },
    ] },
    { blockType: "ctaBanner", heading: "Ready to enroll?", ctaText: "Apply now", ctaUrl: "/contact", theme: "gold" },
  ],
  simple: [
    { blockType: "richText", content: emptyRichText, maxWidth: "prose" },
  ],
};
