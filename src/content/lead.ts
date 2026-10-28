// Shared by the fallback form and the /api/lead route handler.
export const needOptions = ["Fix", "Setup", "Migration", "Automation", "SaaS / White-label", "Other"] as const;
export const urgencyOptions = ["This week", "This month", "Planning"] as const;
export const platformOptions = ["ClickFunnels", "Wix", "Kajabi", "HubSpot", "Other"] as const;

export type Lead = {
  name: string;
  email: string;
  need: (typeof needOptions)[number];
  platform?: string;
  urgency: (typeof urgencyOptions)[number];
  website?: string;
  details: string;
};

export function validateLead(input: Record<string, unknown>): { ok: true; lead: Lead } | { ok: false; errors: Record<string, string> } {
  const s = (k: string, max = 200) => (typeof input[k] === "string" ? (input[k] as string).trim().slice(0, max) : "");
  const lead = {
    name: s("name", 120),
    email: s("email", 200),
    need: s("need") as Lead["need"],
    platform: s("platform", 60) || undefined,
    urgency: s("urgency") as Lead["urgency"],
    website: s("website", 300) || undefined,
    details: s("details", 4000),
  };
  const errors: Record<string, string> = {};
  if (lead.name.length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = "Enter an email address we can reply to, like name@company.com.";
  if (!needOptions.includes(lead.need)) errors.need = "Choose what you need.";
  if (!urgencyOptions.includes(lead.urgency)) errors.urgency = "Choose how urgent this is.";
  if (lead.details.length < 10) errors.details = "Add a sentence or two about the problem or project.";
  if (lead.website && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\S*)$/i.test(lead.website)) errors.website = "Enter a web address, like yourbusiness.com.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, lead };
}

// Booking calendar (shared by the /book calendar and the /api/book route handler).
export const callNeedOptions = [
  "Fix something that's broken",
  "Set up a new GHL account",
  "Move to GHL from another platform",
  "Build automations or funnels",
  "Something else",
] as const;

export type Booking = {
  name: string;
  email: string;
  need: (typeof callNeedOptions)[number];
  details: string;
  startTime: string; // ISO 8601 with offset, exactly as GHL returned the slot
  timezone: string;
};

export function validateBooking(input: Record<string, unknown>): { ok: true; booking: Booking } | { ok: false; errors: Record<string, string> } {
  const s = (k: string, max = 200) => (typeof input[k] === "string" ? (input[k] as string).trim().slice(0, max) : "");
  const booking = {
    name: s("name", 120),
    email: s("email", 200),
    need: s("need") as Booking["need"],
    details: s("details", 4000),
    startTime: s("startTime", 40),
    timezone: s("timezone", 64),
  };
  const errors: Record<string, string> = {};
  if (booking.name.length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(booking.email)) errors.email = "Enter an email address, like name@company.com.";
  if (!callNeedOptions.includes(booking.need)) errors.need = "Choose what you need.";
  const start = Date.parse(booking.startTime);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(booking.startTime) || Number.isNaN(start)) errors.startTime = "Pick a time for the call.";
  else if (start < Date.now()) errors.startTime = "That time has passed. Pick another.";
  if (!isTimeZone(booking.timezone)) booking.timezone = "UTC";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, booking };
}

export function isTimeZone(tz: string) {
  if (!tz) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
