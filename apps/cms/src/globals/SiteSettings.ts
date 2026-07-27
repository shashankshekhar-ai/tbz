import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: { read: () => true },
  admin: { group: "Global" },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "The Bradbury Group",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Stop Implementing AI Tools. Start Architecting Human Performance.",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "defaultSeo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "linkedin", type: "text" },
        { name: "twitter", type: "text" },
        { name: "youtube", type: "text" },
      ],
    },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "email", type: "email" },
        { name: "bookingUrl", type: "text", admin: { description: "Google Calendar booking link" } },
        { name: "speakerPacketUrl", type: "text" },
      ],
    },
    {
      name: "hubspotPortalId",
      type: "text",
      admin: { description: "HubSpot portal ID for form embeds" },
    },
    {
      name: "announcementBar",
      type: "group",
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: false },
        { name: "text", type: "text" },
        { name: "linkLabel", type: "text" },
        { name: "linkHref", type: "text" },
      ],
    },
  ],
};
