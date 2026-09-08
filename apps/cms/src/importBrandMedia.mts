import fs from "node:fs";
import path from "node:path";
import { buildConfig, getPayload } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { Media } from "./collections/Media.js";

// One-off import: the real logo/hero/credential files sit as static assets
// in apps/web/public/brand, never uploaded to the CMS media library, so
// AIwebmaster's Media tab (and Payload admin) had nothing to show. Run via
// `payload run src/importBrandMedia.mts` from a container that actually has
// `src/` (the runtime `cms` image is a pruned production build without it —
// this only runs from the `builder` stage, one-off, not part of the app).
//
// Deliberately NOT importing the real payload.config.ts: it wires in
// `@payloadcms/richtext-lexical` (ESM-only, top-level await), which clashes
// with tsx's CJS-mode `payload run` loader (no "type":"module" in this
// package.json) — ERR_REQUIRE_ASYNC_MODULE. This script only ever touches
// the `media` collection/table (already created by the real app's schema
// push), so a minimal config with just Media + the same DB avoids that
// whole dependency graph. `push: false` below means it never alters schema.
const BRAND_DIR = process.env.BRAND_DIR ?? "/brand-assets";

const config = buildConfig({
  collections: [Media],
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? "" },
    push: false,
  }),
});

const ALT_OVERRIDES: Record<string, string> = {
  "logo-primary.png": "The Bradbury Group — primary logo",
  "logo-white.png": "The Bradbury Group — logo, white",
  "White-Monochrome-Text.png": "The Bradbury Group — logo, white monochrome text",
  "hero-bg.jpeg": "Homepage hero background",
  "hero-bg-2.jpeg": "Homepage hero background, alternate",
  "hero-image-bg.png": "Hero image background",
  "hero-illustration-v2.png": "Hero illustration",
  "paige-headshot.jpg": "Paige — headshot",
  "website-about-page.png": "About page image",
  "Intelligence.png": "Intelligence graphic",
  "credential-ibm.png": "Credential — IBM",
  "credential-ltem.png": "Credential — LTEM",
  "credential-sweet.png": "Credential — Sweet",
};

function altFor(filename: string): string {
  return ALT_OVERRIDES[filename] ?? filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

async function run() {
  const payload = await getPayload({ config });

  const files = fs
    .readdirSync(BRAND_DIR)
    .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .sort();

  console.log(`Found ${files.length} files in ${BRAND_DIR}`);

  for (const filename of files) {
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
    });

    const filePath = path.join(BRAND_DIR, filename);
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    const mimetype =
      ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : ext === ".gif" ? "image/gif" : "image/jpeg";

    try {
      if (existing.docs.length > 0) {
        // Backfill, don't skip: a prior run of this script may have created
        // the DB row from a throwaway container whose filesystem (and thus
        // the actual file bytes) no longer exists — re-`update`-ing with the
        // file is a no-op if the file is already there, and self-heals if not.
        const doc = existing.docs[0];
        await payload.update({
          collection: "media",
          id: doc.id,
          data: {},
          file: { data: buffer, mimetype, name: filename, size: buffer.byteLength },
        });
        console.log(`backfilled: ${filename} -> id=${doc.id}`);
      } else {
        const doc = await payload.create({
          collection: "media",
          data: { alt: altFor(filename) },
          file: { data: buffer, mimetype, name: filename, size: buffer.byteLength },
        });
        console.log(`imported: ${filename} -> id=${doc.id}`);
      }
    } catch (err) {
      console.error(`FAILED: ${filename}`, err);
    }
  }

  process.exit(0);
}

// Top-level await, not a floating promise: `payload run`'s bin wrapper calls
// process.exit(0) the instant this module's own dynamic import() resolves —
// a fire-and-forget `run()` here gets killed before it ever logs anything.
await run().catch((err) => {
  console.error(err);
  process.exit(1);
});
