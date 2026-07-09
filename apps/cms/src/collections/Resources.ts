import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: "resources",
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
      admin: { position: "sidebar" },
    },
    {
      name: "gated",
      type: "checkbox",
      defaultValue: true,
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
      admin: { condition: (data) => data.gated },
    },
    {
      name: "externalUrl",
      type: "text",
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
      ],
    },
  ],
};
