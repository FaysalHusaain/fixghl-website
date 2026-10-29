// Affiliate trial prompt for guides. The link goes through /try-ghl and carries the disclosure next to it.
export function TryGhl({ location, line = "Want to try it yourself? HighLevel offers a 14-day free trial on every plan." }: { location: string; line?: string }) {
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
