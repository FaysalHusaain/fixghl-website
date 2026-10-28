// GA4 event helper. Events are documented in README.md.
// Conversions: calendar_booked, form_submit. Engagement: book_call_click, affiliate_click.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}

export const CONSENT_KEY = "fixghl-consent";
// Hosts that identify AI assistants in document.referrer. Sent as a GA4 parameter (ai_source).
const AI_REFERRERS = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "gemini.google.com", "copilot.microsoft.com", "claude.ai"];

// Runs before GA loads (root layout, beforeInteractive): consent defaults from the stored choice, plus ai_source.
export const consentDefaults = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
var c=null;try{c=localStorage.getItem(${JSON.stringify(CONSENT_KEY)})}catch(e){}
gtag('consent','default',{analytics_storage:c==='granted'?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
var a=${JSON.stringify(AI_REFERRERS)}.find(function(h){return document.referrer.indexOf(h)>-1});if(a)gtag('set',{ai_source:a});`;
