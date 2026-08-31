import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { Endpoint, PayloadRequest } from "payload";
import { requireAdmin } from "../lib/requireAdmin";

// Blocks SSRF to internal/cloud-metadata targets — this host is on AWS, so
// 169.254.169.254 (EC2 instance metadata, can serve IAM credentials if a
// role is ever attached) is exactly as dangerous as reaching internal
// Docker-network services (postgres, cms itself) directly. Checks the
// RESOLVED ip, not just the hostname string, so "url" can't just say
// "cms" or "postgres" (those resolve on the compose network) or an
// attacker-controlled domain that resolves to 127.0.0.1.
// Residual risk: DNS rebinding (a hostname that resolves differently
// between this check and the actual fetch) is not fully closed — accepted
// here since this endpoint requires authentication (service token or a
// logged-in session), not exposed anonymously.
function isBlockedAddress(ip: string): boolean {
  const family = isIP(ip);
  if (family === 4) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 127) return true; // loopback
    if (a === 10) return true; // private
    if (a === 172 && b >= 16 && b <= 31) return true; // private
    if (a === 192 && b === 168) return true; // private
    if (a === 169 && b === 254) return true; // link-local incl. cloud metadata
    if (a === 0) return true;
    return false;
  }
  if (family === 6) {
    const lower = ip.toLowerCase();
    if (lower === "::1") return true; // loopback
    if (lower.startsWith("fe80:") || lower.startsWith("fe8") || lower.startsWith("fc") || lower.startsWith("fd")) return true; // link-local / unique-local
    if (lower.startsWith("::ffff:")) return isBlockedAddress(lower.slice(7)); // IPv4-mapped
    return false;
  }
  return true; // not a recognizable IP — fail closed
}

async function assertUrlIsPublic(url: URL): Promise<void> {
  const hostname = url.hostname;
  if (isIP(hostname)) {
    if (isBlockedAddress(hostname)) throw new Error("url resolves to a blocked internal/private address");
    return;
  }
  const records = await lookup(hostname, { all: true });
  if (records.length === 0) throw new Error("url hostname did not resolve");
  for (const rec of records) {
    if (isBlockedAddress(rec.address)) throw new Error("url resolves to a blocked internal/private address");
  }
}

type MediaUploadBody = {
  url?: string;
  alt?: string;
  caption?: string;
};

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB — plenty for a testimonial photo / blog hero, guards against an accidental huge-file URL
// SVG deliberately excluded: it can embed <script>, and nothing here
// sanitizes it before storing/serving it back — stored-XSS risk for
// anyone who ever opens the media URL directly or it's embedded
// somewhere that doesn't sandbox it. Raster-only closes that off.
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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
    try {
      await assertUrlIsPublic(sourceUrl);
    } catch (err) {
      return Response.json({ error: String(err instanceof Error ? err.message : err) }, { status: 400 });
    }

    let res: Response;
    try {
      // redirect: "manual" — a public URL that 302s to an internal address
      // would otherwise sail straight past the check above; auto-following
      // redirects is exactly how SSRF filters get bypassed in practice.
      res = await fetch(sourceUrl.toString(), { signal: AbortSignal.timeout(15000), redirect: "manual" });
      if (res.status >= 300 && res.status < 400) {
        return Response.json({ error: "url redirected — redirects are not followed for security reasons, use the final direct URL" }, { status: 400 });
      }
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
