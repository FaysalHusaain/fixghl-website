// HighLevel's published prices, used by the cost calculator and its tables. US and Canada rates, USD.
// Checked 25 November 2026 against: gohighlevel.com/pricing, the HighLevel Pricing Guide (modified 29 Oct 2026),
// the LC Phone Pricing & Billing Guide (12 Oct 2026), A2P 10DLC Messaging Fees (10 Nov 2026) and AI Product Pricing (23 Nov 2026).
// When HighLevel changes a price, change it here and update PRICES_CHECKED.

export const PRICES_CHECKED = "2026-11-25";

export type PlanId = "starter" | "unlimited" | "founder";
export const plans: Record<PlanId, { name: string; price: number; subAccounts: number | null; note: string }> = {
  starter: { name: "Starter", price: 97, subAccounts: 3, note: "3 sub-accounts. Usage can't be rebilled." },
  unlimited: { name: "Unlimited", price: 297, subAccounts: null, note: "Unlimited sub-accounts. Rebill phone and email at cost." },
  founder: { name: "Founder", price: 497, subAccounts: null, note: "Rebilling with markup, SaaS mode and AI rebilling." },
};

export const phone = {
  localNumber: 1.15,
  tollFreeNumber: 2.15,
  sms: 0.00747, // per segment, sent or received
  carrierEstimate: 0.0045, // our estimate per segment, from HighLevel's carrier table (AT&T $0.0035, T-Mobile $0.0045, Verizon $0.0050 outbound)
  mmsOut: 0.022,
  callOut: 0.0166,
  callIn: 0.01165,
  recording: 0.0025,
  transcription: 0.024,
};

export type A2pId = "none" | "sole" | "lowvolume" | "standard";
export const a2p: Record<A2pId, { name: string; oneTime: number; monthly: number }> = {
  none: { name: "Not texting US numbers", oneTime: 0, monthly: 0 },
  sole: { name: "Sole Proprietor", oneTime: 22.5, monthly: 2 },
  lowvolume: { name: "Low Volume Standard", oneTime: 22.5, monthly: 1.5 },
  standard: { name: "High Volume Standard", oneTime: 64, monthly: 10 },
};

export const email = { per1000: 0.675, validationPer1000: 2.5 };

export type AiPlanId = "none" | "starter" | "growth" | "unlimited";
export const aiPlans: Record<AiPlanId, { name: string; price: number; note: string }> = {
  none: { name: "None", price: 0, note: "Pay per use for AI agents." },
  starter: { name: "AI Starter", price: 20, note: "AI assistants only. Founder plan only." },
  growth: { name: "AI Growth", price: 50, note: "1,000 Conversation AI replies and 100 Voice AI minutes a month." },
  unlimited: { name: "AI Unlimited", price: 97, note: "Unlimited Conversation AI and Voice AI, fair use." },
};
export const voiceAi = { low: 0.1, high: 0.2 }; // speech-to-speech models, per minute

export type AddonId = "whatsapp" | "dedicatedIp" | "clientPortal" | "seo" | "listings" | "prospecting" | "wordpress" | "whiteLabelApp" | "hipaa" | "premiumSupport";
export const addons: Record<AddonId, { name: string; price: number; per: "sub-account" | "site" | "IP" | "account"; note?: string }> = {
  whatsapp: { name: "WhatsApp", price: 10, per: "sub-account", note: "Plus WhatsApp's own conversation fees" },
  clientPortal: { name: "Branded client portal app", price: 49, per: "sub-account" },
  seo: { name: "SEO by Search Atlas", price: 79, per: "sub-account" },
  listings: { name: "Online listings", price: 30, per: "sub-account" },
  prospecting: { name: "Premium prospecting", price: 29, per: "sub-account" },
  wordpress: { name: "WordPress hosting", price: 10, per: "site", note: "Standard plan, one site each" },
  dedicatedIp: { name: "Dedicated email IP", price: 59, per: "IP", note: "Unlimited and Founder plans only" },
  whiteLabelApp: { name: "White-label mobile app", price: 497, per: "account" },
  hipaa: { name: "HIPAA compliance", price: 297, per: "account", note: "Can't be switched off once on" },
  premiumSupport: { name: "Premium support", price: 500, per: "account" },
};
export const premiumAction = 0.01; // per workflow premium action

export type Inputs = {
  who: "own" | "agency";
  plan: PlanId;
  subAccounts: number;
  localNumbers: number;
  tollFreeNumbers: number;
  sms: number; // segments a month, sent + received
  carrierFees: boolean;
  mms: number;
  callOutMin: number;
  callInMin: number;
  recording: boolean;
  transcription: boolean;
  a2p: A2pId;
  emails: number;
  validations: number;
  aiPlan: AiPlanId;
  aiSubAccounts: number;
  voiceMin: number; // pay-per-use Voice AI minutes, only without an AI plan that includes them
  voiceRate: "low" | "high";
  addons: Partial<Record<AddonId, number>>; // quantity
  premiumActions: number;
};

export const defaults: Inputs = {
  who: "own",
  plan: "starter",
  subAccounts: 1,
  localNumbers: 1,
  tollFreeNumbers: 0,
  sms: 2000,
  carrierFees: true,
  mms: 0,
  callOutMin: 300,
  callInMin: 300,
  recording: false,
  transcription: false,
  a2p: "lowvolume",
  emails: 10000,
  validations: 0,
  aiPlan: "none",
  aiSubAccounts: 1,
  voiceMin: 0,
  voiceRate: "low",
  addons: {},
  premiumActions: 0,
};

export const presets: { id: string; name: string; line: string; inputs: Inputs }[] = [
  { id: "solo", name: "One business", line: "Your own CRM, one number, steady texting and email", inputs: defaults },
  {
    id: "agency5",
    name: "Agency, 5 clients",
    line: "Unlimited plan, a number per client, AI Growth on two",
    inputs: { ...defaults, who: "agency", plan: "unlimited", subAccounts: 5, localNumbers: 5, sms: 10000, callOutMin: 1500, callInMin: 1500, emails: 50000, aiPlan: "growth", aiSubAccounts: 2 },
  },
  {
    id: "saas20",
    name: "SaaS agency, 20 clients",
    line: "Founder plan, heavy texting, AI Unlimited on ten",
    inputs: { ...defaults, who: "agency", plan: "founder", subAccounts: 20, localNumbers: 20, sms: 60000, callOutMin: 6000, callInMin: 6000, recording: true, a2p: "standard", emails: 200000, validations: 20000, aiPlan: "unlimited", aiSubAccounts: 10, addons: { whatsapp: 5 } },
  },
];

export type Line = { label: string; detail: string; amount: number };
export type Group = { id: string; name: string; lines: Line[]; total: number };
export type Result = { groups: Group[]; monthly: number; oneTime: number; firstMonth: number; yearly: number; rebillable: number; perSubAccount: number; warnings: string[] };

// Round to the cent, half up. toFixed first removes float noise such as 33.075 being stored as 33.07499...
const toCents = (v: number) => Math.round(Number((v * 100).toFixed(6))) / 100;
const n = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
const fmtInt = (v: number) => Math.round(v).toLocaleString("en-US");

export function calculate(i: Inputs): Result {
  const warnings: string[] = [];
  const subs = Math.max(1, Math.round(n(i.subAccounts)));
  const plan = plans[i.plan];
  if (plan.subAccounts && subs > plan.subAccounts) warnings.push(`Starter includes ${plan.subAccounts} sub-accounts. For ${subs}, you need Unlimited or Founder.`);

  const planLines: Line[] = [{ label: `${plan.name} plan`, detail: "per month", amount: plan.price }];

  const phoneLines: Line[] = [];
  const add = (arr: Line[], label: string, detail: string, amount: number) => { const cents = toCents(amount); if (cents > 0) arr.push({ label, detail, amount: cents }); };
  add(phoneLines, "Local numbers", `${fmtInt(n(i.localNumbers))} × $${phone.localNumber}`, n(i.localNumbers) * phone.localNumber);
  add(phoneLines, "Toll-free numbers", `${fmtInt(n(i.tollFreeNumbers))} × $${phone.tollFreeNumber}`, n(i.tollFreeNumbers) * phone.tollFreeNumber);
  add(phoneLines, "SMS", `${fmtInt(n(i.sms))} segments × $${phone.sms}`, n(i.sms) * phone.sms);
  if (i.carrierFees) add(phoneLines, "Carrier fees (estimate)", `${fmtInt(n(i.sms))} × ~$${phone.carrierEstimate}`, n(i.sms) * phone.carrierEstimate);
  add(phoneLines, "MMS sent", `${fmtInt(n(i.mms))} × $${phone.mmsOut}`, n(i.mms) * phone.mmsOut);
  add(phoneLines, "Outbound calls", `${fmtInt(n(i.callOutMin))} min × $${phone.callOut}`, n(i.callOutMin) * phone.callOut);
  add(phoneLines, "Inbound calls", `${fmtInt(n(i.callInMin))} min × $${phone.callIn}`, n(i.callInMin) * phone.callIn);
  const minutes = n(i.callOutMin) + n(i.callInMin);
  if (i.recording) add(phoneLines, "Call recording", `${fmtInt(minutes)} min × $${phone.recording}`, minutes * phone.recording);
  if (i.transcription) add(phoneLines, "Transcription", `${fmtInt(minutes)} min × $${phone.transcription}`, minutes * phone.transcription);
  const a = a2p[i.a2p];
  add(phoneLines, "A2P campaign fee", a.name, a.monthly);

  const emailLines: Line[] = [];
  add(emailLines, "LC Email", `${fmtInt(n(i.emails))} emails × $${email.per1000}/1,000`, (n(i.emails) / 1000) * email.per1000);
  add(emailLines, "Email validation", `${fmtInt(n(i.validations))} checks × $${email.validationPer1000}/1,000`, (n(i.validations) / 1000) * email.validationPer1000);

  const aiLines: Line[] = [];
  const aiSubs = Math.min(Math.max(0, Math.round(n(i.aiSubAccounts))), subs);
  if (i.aiPlan === "starter" && i.plan !== "founder") warnings.push("AI Starter is only available on the Founder plan.");
  if (i.aiPlan !== "none") add(aiLines, aiPlans[i.aiPlan].name, `${aiSubs} sub-account${aiSubs === 1 ? "" : "s"} × $${aiPlans[i.aiPlan].price}`, aiSubs * aiPlans[i.aiPlan].price);
  const voicePaid = i.aiPlan === "none" || i.aiPlan === "starter";
  if (voicePaid) add(aiLines, "Voice AI, pay per use", `${fmtInt(n(i.voiceMin))} min × $${voiceAi[i.voiceRate].toFixed(2)}`, n(i.voiceMin) * voiceAi[i.voiceRate]);

  const addonLines: Line[] = [];
  for (const [id, qty] of Object.entries(i.addons) as [AddonId, number][]) {
    const q = Math.max(0, Math.round(n(qty)));
    if (!q) continue;
    const ad = addons[id];
    if (id === "dedicatedIp" && i.plan === "starter") warnings.push("A dedicated email IP needs the Unlimited or Founder plan.");
    add(addonLines, ad.name, ad.per === "account" ? "per month" : `${q} ${ad.per}${q === 1 ? "" : "s"} × $${ad.price}`, (ad.per === "account" ? 1 : q) * ad.price);
  }
  add(addonLines, "Workflow premium actions", `${fmtInt(n(i.premiumActions))} × $${premiumAction}`, n(i.premiumActions) * premiumAction);

  const r2 = toCents;
  const group = (id: string, name: string, lines: Line[]): Group => ({ id, name, lines, total: r2(lines.reduce((s, l) => s + l.amount, 0)) });
  const groups = [group("plan", "Plan", planLines), group("phone", "Phone and SMS", phoneLines), group("email", "Email", emailLines), group("ai", "AI", aiLines), group("addons", "Add-ons", addonLines)];
  const monthly = r2(groups.reduce((s, g) => s + g.total, 0));
  const oneTime = a.oneTime;
  const usageRebill = i.plan === "starter" ? 0 : groups.find((g) => g.id === "phone")!.total + groups.find((g) => g.id === "email")!.total;
  const aiRebill = i.plan === "founder" ? groups.find((g) => g.id === "ai")!.total : 0;

  return {
    groups,
    monthly,
    oneTime,
    firstMonth: r2(monthly + oneTime),
    yearly: r2(monthly * 12 + oneTime),
    rebillable: r2(usageRebill + aiRebill),
    perSubAccount: r2(monthly / subs),
    warnings,
  };
}

export const usd = (v: number, digits = 2) => v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: digits });
