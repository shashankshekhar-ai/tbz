import type { SiteSettings } from "./jsonLd";

// Was previously fetched from Payload's site-settings global; hardcoded here
// now that content changes go through code, not a CMS. Values captured from
// the live CMS export before it was removed.
export const SITE_SETTINGS: SiteSettings = {
  siteName: "The Bradbury Group",
  tagline: "Stop Implementing AI Tools. Start Architecting Human Performance.",
};
