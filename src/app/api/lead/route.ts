import { validateLead } from "@/content/lead";
import { clientIp, rateLimiter } from "@/lib/rate-limit";

// 5 submissions per IP per 10 minutes.
const limited = rateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  if (limited(clientIp(request))) return Response.json({ ok: false, message: "Too many submissions. Wait a few minutes and try again." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "We could not read that submission. Refresh the page and try again." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field. Pretend success so bots learn nothing.
  if (typeof body.company_site === "string" && body.company_site.trim() !== "") return Response.json({ ok: true });

  const result = validateLead(body);
  if (!result.ok) return Response.json({ ok: false, errors: result.errors }, { status: 422 });

  const webhook = process.env.GHL_FORM_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] GHL_FORM_WEBHOOK_URL not set. Lead received in development:", result.lead);
      return Response.json({ ok: true, delivered: false });
    }
    return Response.json({ ok: false, message: "The form is not connected yet. Book a call instead, or try again later." }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...result.lead, source: "fixghl.com /book form", submitted_at: new Date().toISOString() }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return Response.json({ ok: false, message: "Your message did not go through. Try again, or book a call instead." }, { status: 502 });
  }
  return Response.json({ ok: true, delivered: true });
}
