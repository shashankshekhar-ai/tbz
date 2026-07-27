import type { CollectionConfig } from "payload";
import { HeroBlock } from "../blocks/Hero";
import { RichTextBlock } from "../blocks/RichTextBlock";
import { CardGridBlock } from "../blocks/CardGrid";
import { CtaBannerBlock } from "../blocks/CtaBanner";
import { pageTemplates } from "../templates/pageTemplates";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
    preview: (doc) =>
      `${process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000"}/${doc?.slug ?? ""}`,
  },
  versions: {
    drafts: { autosave: { interval: 375 } },
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const template = data.applyTemplate;
        const hasLayout = Array.isArray(data.layout) && data.layout.length > 0;
        if (template && template !== "blank" && !hasLayout && pageTemplates[template]) {
          data.layout = pageTemplates[template];
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "applyTemplate",
      type: "select",
      virtual: true,
      defaultValue: "blank",
      admin: {
        position: "sidebar",
        description:
          "Pick a starting layout and save — it fills the Layout blocks below (only if Layout is still empty). Doesn't overwrite existing blocks.",
      },
      options: [
        { label: "Blank", value: "blank" },
        { label: "Landing page (Hero + Cards + CTA)", value: "landing" },
        { label: "Program page (Hero + Text + Cards + CTA)", value: "program" },
        { label: "Simple content page (Text only)", value: "simple" },
      ],
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
        {
          name: "aiSummary",
          type: "textarea",
          admin: {
            description:
              "GEO: a direct, quotable 2-3 sentence summary for AI answer engines (ChatGPT, Perplexity, Gemini) to cite. Separate from the meta description — write it to be extracted verbatim, not to entice a click.",
          },
        },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [HeroBlock, RichTextBlock, CardGridBlock, CtaBannerBlock],
    },
  ],
};
