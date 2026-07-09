import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "featured"],
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "company",
      type: "text",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Show on homepage" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "context",
      type: "select",
      options: [
        { label: "Training", value: "training" },
        { label: "Consulting", value: "consulting" },
        { label: "Speaking", value: "speaking" },
        { label: "The Solomon Engine", value: "solomon-engine" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
