import type { Block } from "payload";

export const CtaBannerBlock: Block = {
  slug: "ctaBanner",
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "subheading", type: "textarea" },
    { name: "ctaText", type: "text" },
    { name: "ctaUrl", type: "text" },
    {
      name: "theme",
      type: "select",
      defaultValue: "gold",
      options: [
        { label: "Gold", value: "gold" },
        { label: "Navy", value: "navy" },
        { label: "White", value: "white" },
      ],
    },
  ],
};
