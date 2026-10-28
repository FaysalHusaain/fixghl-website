import { LOGO } from "./logo-data";

// FixGHL lockup: spirit-level mark + outlined wordmark. Colours come from currentColor; the bubble is always gold.
// `tone="light"` uses the deeper gold that holds up on white grounds; `quiet` dims the bubble for decorative use.
export function Logo({
  className = "",
  tone = "dark",
  title = "FixGHL",
  quiet = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  title?: string | null;
  quiet?: boolean;
}) {
  const { pill: p, ticks: t, bubble: b } = LOGO;
  return (
    <svg
      viewBox={`0 0 ${LOGO.width} ${LOGO.height}`}
      className={`block h-auto ${className}`}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={p.r} fill="none" stroke="currentColor" strokeWidth={p.stroke} />
      {t.x.map((x) => (
        <line key={x} x1={x} y1={t.y1} x2={x} y2={t.y2} stroke="currentColor" strokeWidth={t.stroke} strokeOpacity={0.4} />
      ))}
      <circle cx={b.cx} cy={b.cy} r={b.r} fill={tone === "light" ? "#E8C33A" : "#FFDE59"} fillOpacity={quiet ? 0.2 : 1} />
      <path d={LOGO.word} />
    </svg>
  );
}
