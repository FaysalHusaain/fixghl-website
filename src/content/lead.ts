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
