import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "subheading", type: "textarea" },
    { name: "ctaText", type: "text" },
    { name: "ctaUrl", type: "text" },
    { name: "secondaryCtaText", type: "text" },
    { name: "secondaryCtaUrl", type: "text" },
    {
      name: "theme",
      type: "select",
      defaultValue: "dark",
      options: [
        { label: "Dark (navy)", value: "dark" },
        { label: "Light", value: "light" },
      ],
    },
  ],
};
