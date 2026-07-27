import type { CollectionConfig } from "payload";

export const Navigation: CollectionConfig = {
  slug: "navigation",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "href", "location", "footerGroup", "order", "enabled"],
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
      name: "location",
      type: "select",
      required: true,
      defaultValue: "header",
      options: [
        { label: "Header", value: "header" },
        { label: "Footer", value: "footer" },
      ],
      access: {
        read: () => true,
      },
      admin: { position: "sidebar" },
    },
    {
      name: "footerGroup",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Footer column heading (e.g. 'Programs', 'Company'). Only used when Location is Footer.",
        condition: (data) => data.location === "footer",
      },
      access: {
        read: () => true,
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "openInNewTab",
      type: "checkbox",
      defaultValue: false,
      access: {
    read: () => true,
  },
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
