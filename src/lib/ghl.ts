// Server-only GoHighLevel API v2 client for the booking calendar. Never import from a client component:
// it reads GHL_TOKEN. Endpoints and Version headers follow HighLevel's published OpenAPI specs
// (github.com/GoHighLevel/highlevel-api-docs): calendars 2021-04-15, contacts 2021-07-28.
import type { Booking } from "@/content/lead";

const API = "https://services.leadconnectorhq.com";
export const CALL_MINUTES = 30;

export type GhlConfig = { token: string; locationId: string; calendarId: string };

export function ghlConfig(): GhlConfig | null {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const calendarId = process.env.GHL_CALENDAR_ID;
  return token && locationId && calendarId ? { token, locationId, calendarId } : null;
}

// Sample availability so the flow can be reviewed before GHL is connected. Never on the live site:
// only local development and Vercel preview deployments, and only while the GHL variables are unset.
export const demoMode = () => !ghlConfig() && (process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview");

export class GhlError extends Error {
  constructor(public status: number, public body: string) {
    super(`GHL ${status}: ${body.slice(0, 300)}`);
  }
}

async function ghl<T>(cfg: GhlConfig, path: string, version: "2021-04-15" | "2021-07-28", init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Version: version,
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
  const text = await res.text();
  if (!res.ok) throw new GhlError(res.status, text);
  return (text ? JSON.parse(text) : {}) as T;
}

// ---- Time zone helpers (no dependencies) ----

function offsetMs(at: number, tz: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .formatToParts(at)
      .map((p) => [p.type, p.value])
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(at / 1000) * 1000;
}

// Epoch ms of local midnight on `date` (YYYY-MM-DD) in `tz`.
export function zonedMidnight(date: string, tz: string) {
  const [y, m, d] = date.split("-").map(Number);
  const guess = Date.UTC(y, m - 1, d);
  const first = guess - offsetMs(guess, tz);
  return guess - offsetMs(first, tz); // second pass settles DST edges
}

// ---- Availability ----

export type Slots = Record<string, string[]>; // YYYY-MM-DD (in the requested zone) -> ISO start times

export async function freeSlots(cfg: GhlConfig, start: string, end: string, tz: string): Promise<Slots> {
  const startMs = Math.max(zonedMidnight(start, tz), Date.now());
  const endMs = zonedMidnight(end, tz) + 86_400_000 - 1;
  const q = new URLSearchParams({ startDate: String(startMs), endDate: String(endMs), timezone: tz });
  const data = await ghl<Record<string, { slots?: string[] } | unknown>>(cfg, `/calendars/${cfg.calendarId}/free-slots?${q}`, "2021-04-15");
  const out: Slots = {};
  for (const [key, value] of Object.entries(data)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || key < start || key > end) continue; // drops traceId and edge days
    const slots = (value as { slots?: string[] }).slots ?? [];
    const future = slots.filter((s) => Date.parse(s) > Date.now());
    if (future.length) out[key] = future;
  }
  return out;
}

export function demoSlots(start: string, end: string, tz: string): Slots {
  const out: Slots = {};
  const d = new Date(`${start}T12:00:00Z`);
  for (let i = 0; i < 31; i++, d.setUTCDate(d.getUTCDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    if (key > end) break;
    const dow = d.getUTCDay();
    if (dow === 0 || dow === 6 || (d.getUTCDate() * 7) % 5 === 0) continue; // weekdays, a few days fully booked
    const midnight = zonedMidnight(key, tz);
    const times: string[] = [];
    for (let h = 9; h < 17; h++) for (const m of [0, 30]) if ((h * 3 + m + d.getUTCDate()) % 4 !== 0) times.push(new Date(midnight + (h * 60 + m) * 60_000).toISOString());
    const future = times.filter((t) => Date.parse(t) > Date.now() + 3 * 3_600_000);
    if (future.length) out[key] = future;
  }
  return out;
}

// ---- Booking ----

export async function bookCall(cfg: GhlConfig, b: Booking) {
  const [firstName, ...rest] = b.name.split(/\s+/);
  const { contact } = await ghl<{ contact: { id: string } }>(cfg, "/contacts/upsert", "2021-07-28", {
    method: "POST",
    body: JSON.stringify({ locationId: cfg.locationId, name: b.name, firstName, lastName: rest.join(" ") || undefined, email: b.email, timezone: b.timezone, source: "fixghl.com booking calendar" }),
  });

  const answers = `What do you need?\n${b.need}\n\nWhat's going on?\n${b.details || "(not answered)"}\n\nBooked on fixghl.com/book · visitor time zone ${b.timezone}`;
  const startMs = Date.parse(b.startTime);

  // No meeting location fields: the appointment uses the calendar's own location settings, so a calendar
  // set to Google Meet generates its Meet link exactly as a booking through GHL's widget would.
  const appointment = await ghl<{ id: string; address?: string }>(cfg, "/calendars/events/appointments", "2021-04-15", {
    method: "POST",
    body: JSON.stringify({
      calendarId: cfg.calendarId,
      locationId: cfg.locationId,
      contactId: contact.id,
      startTime: new Date(startMs).toISOString(),
      endTime: new Date(startMs + CALL_MINUTES * 60_000).toISOString(),
      title: `Free 30-minute call: ${b.name}`,
      description: answers,
      appointmentStatus: "confirmed",
      toNotify: true, // runs the calendar's confirmation and reminder automations
      ignoreDateRange: false,
      ignoreFreeSlotValidation: false, // GHL rejects the booking if the slot was taken in the meantime
    }),
  });

  // Keep the answers on the contact record as well. A failed note never fails a confirmed booking.
  await ghl(cfg, `/contacts/${contact.id}/notes`, "2021-07-28", { method: "POST", body: JSON.stringify({ title: "Call booking answers", body: answers }) }).catch(
    (e) => console.error("[book] note failed", e)
  );

  const meet = typeof appointment.address === "string" && /meet\.google\.com/.test(appointment.address);
  if (!meet) console.warn("[book] appointment has no Google Meet link. Check the calendar's meeting location.", { id: appointment.id, address: appointment.address });
  return { id: appointment.id, meet };
}
