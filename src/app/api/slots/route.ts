import { isTimeZone } from "@/content/lead";
import { demoMode, demoSlots, freeSlots, ghlConfig, GhlError } from "@/lib/ghl";
import { clientIp, rateLimiter } from "@/lib/rate-limit";

// 60 availability lookups per IP per minute: enough for fast month-flicking, not for scraping.
const limited = rateLimiter({ limit: 60, windowMs: 60 * 1000 });
const DAY = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/slots?start=YYYY-MM-DD&end=YYYY-MM-DD&timezone=Area/City
// -> { timezone, days: { "YYYY-MM-DD": ["ISO start", ...] } }, dates in the requested zone.
export async function GET(request: Request) {
  if (limited(clientIp(request))) return Response.json({ message: "Too many requests. Wait a moment and try again." }, { status: 429 });

  const q = new URL(request.url).searchParams;
  const start = q.get("start") ?? "";
  const end = q.get("end") ?? "";
  const timezone = q.get("timezone") ?? "";
  if (!DAY.test(start) || !DAY.test(end) || end < start) return Response.json({ message: "Invalid date range." }, { status: 400 });
  if ((Date.parse(end) - Date.parse(start)) / 86_400_000 > 30) return Response.json({ message: "Ask for 31 days or fewer." }, { status: 400 });
  if (!isTimeZone(timezone)) return Response.json({ message: "Unknown time zone." }, { status: 400 });

  const headers = { "Cache-Control": "private, no-store" };
  const cfg = ghlConfig();
  if (!cfg) {
    if (demoMode()) return Response.json({ timezone, days: demoSlots(start, end, timezone), demo: true }, { headers });
    return Response.json({ message: "Online booking is not connected yet.", configured: false }, { status: 503, headers });
  }

  try {
    return Response.json({ timezone, days: await freeSlots(cfg, start, end, timezone) }, { headers });
  } catch (e) {
    console.error("[slots]", e instanceof GhlError ? e.message : e);
    return Response.json({ message: "We could not load the calendar." }, { status: 502, headers });
  }
}
