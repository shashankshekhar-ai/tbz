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
      required: true,
      access: {
    read: () => true,
  },
  admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Leadership", value: "leadership" },
        { label: "Organizational Strategy", value: "organizational-strategy" },
        { label: "Workplace Culture", value: "workplace-culture" },
        { label: "Talent and Teams", value: "talent-and-teams" },
        { label: "Research and Trends", value: "research-and-trends" },
      ],
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "contentType",
      type: "select",
      defaultValue: "article",
      options: [
        { label: "Article", value: "article" },
        { label: "Guide", value: "guide" },
        { label: "Research", value: "research" },
        { label: "Perspective", value: "perspective" },
      ],
      access: {
    read: () => true,
  },
  admin: { position: "sidebar" },
    },
    {
      name: "readingTime",
      type: "number",
      admin: { position: "sidebar", description: "Estimated reading time, in minutes." },
    },
    {
      name: "author",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true, defaultValue: "Paige Bradbury" },
        { name: "role", type: "text" },
        { name: "bio", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "profileUrl", type: "text" },
      ],
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      minLength: 120,
      maxLength: 220,
      admin: { description: "120–220 characters. Used as the card summary and listing preview." },
    },
    {
      name: "content",
      type: "richText",
      required: true,
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
        { name: "title", type: "text", maxLength: 60 },
        { name: "description", type: "textarea", maxLength: 160 },
        { name: "canonicalUrl", type: "text" },
        { name: "noIndex", type: "checkbox", defaultValue: false },
        { name: "ogImage", type: "upload", relationTo: "media" },
        {
          name: "aiSummary",
          type: "textarea",
          admin: {
            description:
              "GEO: a direct, quotable 2-3 sentence summary for AI answer engines (ChatGPT, Perplexity, Gemini) to cite. Separate from the meta description — write it to be extracted verbatim, not to entice a click. Rendered on-page as the article's \"Key takeaway\" box.",
          },
        },
      ],
    },
  ],
};
