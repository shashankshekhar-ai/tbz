import { buildConfig, getPayload } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { Navigation } from "./collections/Navigation.js";

// One-off seed: Header.tsx/Footer.tsx have always rendered from a hardcoded
// fallback array because the CMS `navigation` collection was empty (0 rows,
// confirmed dev + prod) — both components already prefer CMS data and only
// fall back when it's empty, so seeding the real rows here is enough to
// flip them onto the CMS path with no code change. Same minimal-config
// trick as importBrandMedia.mts (collection-only config, skips the
// richtext-lexical import that breaks tsx's `payload run`).
const config = buildConfig({
  collections: [Navigation],
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI ?? "" }, push: false }),
});

// Exact copy of Header.tsx's fallbackNavItems.
const HEADER_ITEMS = [
  { label: "AI Fluency Cohort", href: "/ai-fluency-cohort" },
  { label: "Solomon Engine", href: "/the-solomon-engine" },
  { label: "For Organizations", href: "/for-organizations" },
  { label: "Our AI Return", href: "/our-ai-return" },
  { label: "Resources", href: "/resources" },
  { label: "For You", href: "/for-you" },
  { label: "About", href: "/about" },
];

// Exact copy of Footer.tsx's fallbackGroups, flattened with footerGroup set.
const FOOTER_ITEMS = [
  { label: "AI Fluency Cohort", href: "/ai-fluency-cohort", footerGroup: "Programs" },
  { label: "The Solomon Engine", href: "/the-solomon-engine", footerGroup: "Programs" },
  { label: "For Organizations", href: "/for-organizations", footerGroup: "Programs" },
  { label: "About", href: "/about", footerGroup: "Programs" },
  { label: "Our ROI", href: "/our-ai-return", footerGroup: "Resources" },
  { label: "Resources", href: "/resources", footerGroup: "Resources" },
  { label: "Insights", href: "/insights", footerGroup: "Resources" },
  { label: "Case Studies", href: "/resources#case-studies", footerGroup: "Resources" },
];

async function run() {
  const payload = await getPayload({ config });

  let order = 0;
  for (const item of HEADER_ITEMS) {
    const existing = await payload.find({
      collection: "navigation",
      where: { and: [{ label: { equals: item.label } }, { location: { equals: "header" } }] },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`skip (exists): header / ${item.label}`);
      order++;
      continue;
    }
    const doc = await payload.create({
      collection: "navigation",
      data: { label: item.label, href: item.href, location: "header", order, enabled: true },
    });
    console.log(`created: header / ${item.label} -> id=${doc.id}`);
    order++;
  }

  order = 0;
  for (const item of FOOTER_ITEMS) {
    const existing = await payload.find({
      collection: "navigation",
      where: { and: [{ label: { equals: item.label } }, { location: { equals: "footer" } }] },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`skip (exists): footer / ${item.label}`);
      order++;
      continue;
    }
    const doc = await payload.create({
      collection: "navigation",
      data: {
        label: item.label,
        href: item.href,
        location: "footer",
        footerGroup: item.footerGroup,
        order,
        enabled: true,
      },
    });
    console.log(`created: footer / ${item.label} -> id=${doc.id}`);
    order++;
  }

  process.exit(0);
}

await run().catch((err) => {
  console.error(err);
  process.exit(1);
});
