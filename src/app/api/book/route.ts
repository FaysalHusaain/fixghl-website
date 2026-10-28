import { validateBooking } from "@/content/lead";
import { bookCall, demoMode, ghlConfig, GhlError } from "@/lib/ghl";
import { clientIp, rateLimiter } from "@/lib/rate-limit";

// 5 booking attempts per IP per 10 minutes.
const limited = rateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  if (limited(clientIp(request))) return Response.json({ ok: false, message: "Too many attempts. Wait a few minutes and try again." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "We could not read that booking. Refresh the page and try again." }, { status: 400 });
  }

  // Honeypot: people never fill this hidden field. Pretend success so bots learn nothing.
  if (typeof body.company_site === "string" && body.company_site.trim() !== "") return Response.json({ ok: true });

  const result = validateBooking(body);
  if (!result.ok) return Response.json({ ok: false, errors: result.errors }, { status: 422 });

  const cfg = ghlConfig();
  if (!cfg) {
    if (demoMode()) return Response.json({ ok: true, demo: true });
    return Response.json({ ok: false, message: "Online booking is not connected yet. Email hello@fixghl.com and we will set up the call." }, { status: 503 });
  }

  try {
    const { meet } = await bookCall(cfg, result.booking);
    return Response.json({ ok: true, meet });
  } catch (e) {
    console.error("[book]", e instanceof GhlError ? e.message : e);
    // GHL answers 4xx when the slot is no longer free (taken, or inside the minimum notice window).
    if (e instanceof GhlError && e.status >= 400 && e.status < 500 && /slot|available|time/i.test(e.body)) {
      return Response.json({ ok: false, code: "slot_taken", message: "That time was just taken. Pick another time." }, { status: 409 });
    }
    return Response.json({ ok: false, message: "We could not confirm the booking. Try again, or email hello@fixghl.com." }, { status: 502 });
  }
}
