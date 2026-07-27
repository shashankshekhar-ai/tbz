import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: "resources",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "resourceType", "gated", "status"],
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
      name: "resourceType",
      type: "select",
      required: true,
      options: [
        { label: "Guide", value: "guide" },
        { label: "Template", value: "template" },
        { label: "Checklist", value: "checklist" },
        { label: "Webinar Recording", value: "webinar" },
        { label: "Case Study", value: "case-study" },
        { label: "Tool", value: "tool" },
      ],
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "gated",
      type: "checkbox",
      defaultValue: true,
      access: {
    read: () => true,
  },
  admin: { position: "sidebar", description: "Require email capture to download" },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      access: {
    read: () => true,
  },
  admin: { condition: (data) => data.gated },
    },
    {
      name: "externalUrl",
      type: "text",
      access: {
    read: () => true,
  },
  admin: { description: "Use if resource lives outside S3" },
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text" }],
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
