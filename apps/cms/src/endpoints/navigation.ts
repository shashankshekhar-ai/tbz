import type { Endpoint, PayloadRequest } from "payload";

// Accepts either a logged-in Payload admin session, or the shared service
// token AIwebmaster authenticates with (it has no Payload session).
async function requireAdmin(req: PayloadRequest): Promise<Response | null> {
  const serviceToken = process.env.CMS_SERVICE_TOKEN;
  const header = req.headers.get("x-service-token");
  if (serviceToken && header === serviceToken) return null;
  if (!req.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

type NavUpsertBody = {
  label?: string;
  href?: string;
  location?: "header" | "footer";
  footerGroup?: string;
  order?: number;
  enabled?: boolean;
  openInNewTab?: boolean;
};

export const navigationUpsertEndpoint: Endpoint = {
  path: "/nav-link/upsert",
  method: "post",
  handler: async (req: PayloadRequest) => {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;

    const body = (await req.json?.()) as NavUpsertBody | undefined;
    if (!body?.label || !body?.href || !body?.location) {
      return Response.json({ error: "label, href, and location are required" }, { status: 400 });
    }

    const data = {
      label: body.label,
      href: body.href,
      location: body.location,
      footerGroup: body.footerGroup,
      order: body.order ?? 0,
      enabled: body.enabled ?? true,
      openInNewTab: body.openInNewTab ?? false,
    };

    try {
      const existing = await req.payload.find({
        collection: "navigation",
        where: { and: [{ label: { equals: data.label } }, { location: { equals: data.location } }] },
        limit: 1,
      });

      const doc = existing.docs[0]
        ? await req.payload.update({ collection: "navigation", id: existing.docs[0].id, data })
        : await req.payload.create({ collection: "navigation", data });

      return Response.json({ id: doc.id, label: doc.label, href: doc.href, location: doc.location });
    } catch (err) {
      req.payload.logger.error({ err }, "navigation_upsert_failed");
      return Response.json({ error: "Failed to save navigation entry" }, { status: 500 });
    }
  },
};
