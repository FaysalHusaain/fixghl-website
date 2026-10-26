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
