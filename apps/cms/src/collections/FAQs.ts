import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "category", "order"],
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "richText",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "General", value: "general" },
        { label: "Training", value: "training" },
        { label: "Consulting", value: "consulting" },
        { label: "Assessment", value: "assessment" },
        { label: "The Solomon Engine", value: "solomon-engine" },
        { label: "Ethics & Compliance", value: "ethics" },
      ],
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
  ],
};
