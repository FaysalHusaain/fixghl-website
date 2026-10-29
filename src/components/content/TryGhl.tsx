// Affiliate trial prompt for guides. /try-ghl lands on HighLevel's bootcamp page, which carries the 30-day trial.
export function TryGhl({ location, line = "Start a 30-day free trial through our link (HighLevel's standard trial is 14 days)." }: { location: string; line?: string }) {
  return (
    <div className="not-prose flex flex-col gap-4 rounded-[1.5rem] bg-ink-100 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <p className="max-w-[44ch] text-[1.125rem] leading-snug text-ink-950">{line}</p>
        <p className="mt-2 text-small text-ink-600">We may earn a commission if you sign up through our link. You pay the same price.</p>
      </div>
      <a href="/try-ghl" rel="sponsored nofollow" data-track="affiliate_click" data-track-location={location} className="btn btn-ink shrink-0">
        Start the free trial
      </a>
    </div>
  );
}
