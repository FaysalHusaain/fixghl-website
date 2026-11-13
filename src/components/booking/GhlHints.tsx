// Same host as GHL_HOST in BookingModule (a client module, so its constants cannot be imported here).
const GHL_HOST = "https://link.codenovahq.com";

// Connection hints for the GHL embeds. Render only on pages that show a BookingModule (/book and the homepage);
// React moves these <link> tags into <head>. The iframe and form_embed.js are no-CORS requests, so they use the plain
// connection. The widgets then call HighLevel's API and static CDN, so those names are resolved early.
export function GhlHints() {
  return (
    <>
      <link rel="preconnect" href={GHL_HOST} />
      <link rel="dns-prefetch" href="https://backend.leadconnectorhq.com" />
      <link rel="dns-prefetch" href="https://stcdn.leadconnectorhq.com" />
    </>
  );
}
