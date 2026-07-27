import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedAt", "status"],
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
      name: "publishedAt",
      type: "date",
      access: {
    read: () => true,
  },
  admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "author",
      type: "text",
      defaultValue: "Paige Bradbury",
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
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "content",
      type: "richText",
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
        { name: "ogImage", type: "upload", relationTo: "media" },
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
