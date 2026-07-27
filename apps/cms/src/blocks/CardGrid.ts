import type { Block } from "payload";

export const CardGridBlock: Block = {
  slug: "cardGrid",
  fields: [
    { name: "heading", type: "text" },
    { name: "subheading", type: "textarea" },
    {
      name: "columns",
      type: "select",
      defaultValue: "3",
      options: [
        { label: "2 columns", value: "2" },
        { label: "3 columns", value: "3" },
        { label: "4 columns", value: "4" },
      ],
    },
    {
      name: "cards",
      type: "array",
      fields: [
        { name: "icon", type: "text", admin: { description: "Emoji or icon name" } },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
      ],
    },
  ],
};
