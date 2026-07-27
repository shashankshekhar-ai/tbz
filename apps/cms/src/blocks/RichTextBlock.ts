import type { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const RichTextBlock: Block = {
  slug: "richText",
  fields: [
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: "maxWidth",
      type: "select",
      defaultValue: "prose",
      options: [
        { label: "Prose (700px)", value: "prose" },
        { label: "Wide (1200px)", value: "wide" },
        { label: "Full", value: "full" },
      ],
    },
  ],
};
