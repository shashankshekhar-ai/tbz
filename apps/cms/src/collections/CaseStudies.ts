import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "service", "status"],
  },
  versions: {
    drafts: { autosave: { interval: 375 } },
  },
  fields: [
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
      access: {
    read: () => true,
  },
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
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "client",
      type: "text",
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "service",
      type: "select",
      options: [
        { label: "Training", value: "training" },
        { label: "Consulting", value: "consulting" },
        { label: "The Solomon Engine", value: "solomon-engine" },
        { label: "Speaking", value: "speaking" },
      ],
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "challenge",
      type: "richText",
    },
    {
      name: "solution",
      type: "richText",
    },
    {
      name: "results",
      type: "richText",
    },
    {
      name: "metrics",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "value", type: "text" },
      ],
    },
    {
      name: "testimonial",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: false,
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
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
  ],
};
