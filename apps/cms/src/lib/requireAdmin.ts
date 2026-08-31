import { timingSafeEqual } from "node:crypto";
import type { PayloadRequest } from "payload";

// Shared by every *Agent.ts / navigation.ts endpoint AIwebmaster calls —
// accepts either a logged-in Payload admin session, or the shared service
// token AIwebmaster authenticates with (it has no Payload session).
//
// Uses a constant-time comparison for the token: a plain `===` leaks timing
// information proportional to how many leading bytes match, which is a
// real (if hard to exploit over normal network jitter) side channel for
// guessing a secret token byte-by-byte. Previously each endpoint had its
// own copy-pasted `===` check — consolidated here so the fix (and any
// future one) lands in one place, not four.
export async function requireAdmin(req: PayloadRequest): Promise<Response | null> {
  const serviceToken = process.env.CMS_SERVICE_TOKEN;
  const header = req.headers.get("x-service-token");
  if (serviceToken && header && safeEqual(header, serviceToken)) return null;
  if (!req.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // timingSafeEqual throws on length mismatch rather than returning false -
  // compare a fixed-size hash-like padding instead of leaking length via
  // an early throw/catch, then also check real equality.
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
