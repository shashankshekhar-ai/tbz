import { buildConfig, getPayload } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { Media } from "./collections/Media.js";

// One-off cleanup companion to importBrandMedia.mts — same minimal-config
// trick (see that file's comment for why: avoids the richtext-lexical
// ESM/CJS clash with tsx's `payload run`).
//
// Usage: DELETE_ID=<id> payload run src/deleteMediaById.mts
// Or:    DELETE_ALL=true payload run src/deleteMediaById.mts
const config = buildConfig({
  collections: [Media],
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI ?? "" }, push: false }),
});

const payload = await getPayload({ config });

if (process.env.DELETE_ALL === "true") {
  const all = await payload.find({ collection: "media", limit: 1000 });
  for (const doc of all.docs) {
    await payload.delete({ collection: "media", id: doc.id });
    console.log("deleted", doc.id, doc.filename);
  }
  process.exit(0);
}

const id = process.env.DELETE_ID;
if (!id) {
  console.error("Set DELETE_ID or DELETE_ALL=true");
  process.exit(1);
}
await payload.delete({ collection: "media", id });
console.log("deleted", id);
process.exit(0);
