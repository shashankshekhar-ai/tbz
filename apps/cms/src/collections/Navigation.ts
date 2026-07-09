import type { CollectionConfig } from "payload";

export const Navigation: CollectionConfig = {
  slug: "navigation",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "href", "order", "enabled"],
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "href",
      type: "text",
      required: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "openInNewTab",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "children",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "description", type: "text" },
      ],
    },
  ],
};
