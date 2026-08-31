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

type MediaUploadBody = {
  url?: string;
  alt?: string;
  caption?: string;
};

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB — plenty for a testimonial photo / blog hero, guards against an accidental huge-file URL
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

// There is no chat file-attach UI (yet) — AIwebmaster proposes this action
// with a URL the user pasted/referenced, and this endpoint fetches it
// server-side and hands the bytes to Payload's Local API `file` param
// (which bypasses the REST upload route's own access control, same as
// every other *Agent.ts endpoint uses payload.create/update directly).
export const mediaAgentUploadEndpoint: Endpoint = {
  path: "/media-agent/upload",
  method: "post",
  handler: async (req: PayloadRequest) => {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;

    const body = (await req.json?.()) as MediaUploadBody | undefined;
    if (!body?.url || !body?.alt) {
      return Response.json({ error: "url and alt are required" }, { status: 400 });
    }

    let sourceUrl: URL;
    try {
      sourceUrl = new URL(body.url);
    } catch {
      return Response.json({ error: "url is not a valid URL" }, { status: 400 });
    }
    if (sourceUrl.protocol !== "https:" && sourceUrl.protocol !== "http:") {
      return Response.json({ error: "url must be http(s)" }, { status: 400 });
    }

    let res: Response;
    try {
      res = await fetch(sourceUrl.toString(), { signal: AbortSignal.timeout(15000) });
    } catch (err) {
      return Response.json({ error: `Failed to fetch url: ${String(err)}` }, { status: 502 });
    }
    if (!res.ok) {
      return Response.json({ error: `Source url returned ${res.status}` }, { status: 502 });
    }

    const contentType = res.headers.get("content-type")?.split(";")[0]?.trim() ?? "";
    if (!ALLOWED_TYPES.has(contentType)) {
      return Response.json(
        { error: `Unsupported content-type '${contentType}' — must be one of: ${[...ALLOWED_TYPES].join(", ")}` },
        { status: 415 },
      );
    }

    const contentLength = Number(res.headers.get("content-length") ?? "0");
    if (contentLength && contentLength > MAX_BYTES) {
      return Response.json({ error: `File too large (${contentLength} bytes, max ${MAX_BYTES})` }, { status: 413 });
    }

    const arrayBuffer = await res.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_BYTES) {
      return Response.json({ error: `File too large (${arrayBuffer.byteLength} bytes, max ${MAX_BYTES})` }, { status: 413 });
    }
    const buffer = Buffer.from(arrayBuffer);

    const filename = sourceUrl.pathname.split("/").filter(Boolean).pop() || "upload";

    try {
      const doc = await req.payload.create({
        collection: "media",
        data: { alt: body.alt, caption: body.caption },
        file: {
          data: buffer,
          mimetype: contentType,
          name: filename,
          size: buffer.byteLength,
        },
      });
      return Response.json({ id: doc.id, url: doc.url, alt: doc.alt, filename: doc.filename });
    } catch (err) {
      req.payload.logger.error({ err }, "media_agent_upload_failed");
      return Response.json({ error: "Failed to save media" }, { status: 500 });
    }
  },
};
