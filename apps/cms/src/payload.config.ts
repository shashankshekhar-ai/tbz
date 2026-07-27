import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Resources } from "./collections/Resources";
import { FAQs } from "./collections/FAQs";
import { Testimonials } from "./collections/Testimonials";
import { CaseStudies } from "./collections/CaseStudies";
import { Navigation } from "./collections/Navigation";
import { SiteSettings } from "./globals/SiteSettings";
import { pageAgentChatEndpoint, pageAgentApplyEndpoint } from "./endpoints/pageAgent";
import { contentAgentChatEndpoint, contentAgentApplyEndpoint } from "./endpoints/contentAgent";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  onInit: async (payload) => {
    // connect() only pushes schema in dev; call drizzle-kit push directly for all envs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = payload.db as any;
    const { pushSchema } = adapter.requireDrizzleKit();
    const { apply } = await pushSchema(adapter.schema, adapter.drizzle);
    await apply();
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        pageAgent: {
          Component: "/components/PageAgentView#PageAgentView",
          path: "/page-agent",
          exact: true,
        },
        contentAgent: {
          Component: "/components/ContentAgentView#ContentAgentView",
          path: "/content-agent",
          exact: true,
        },
      },
      afterNavLinks: [
        "/components/PageAgentNavLink#PageAgentNavLink",
        "/components/ContentAgentNavLink#ContentAgentNavLink",
      ],
    },
  },
  endpoints: [pageAgentChatEndpoint, pageAgentApplyEndpoint, contentAgentChatEndpoint, contentAgentApplyEndpoint],
  cors: [
    "http://localhost:3002",
    "https://tbz-web.vercel.app",
    "https://tbg-cms.buildwithshashank.com",
  ],
  csrf: [
    "http://localhost:3002",
    "https://tbz-web.vercel.app",
    "https://tbg-cms.buildwithshashank.com",
  ],
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Resources,
    FAQs,
    Testimonials,
    CaseStudies,
    Navigation,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
    },
    push: false,
  }),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },
});
