import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { LOGO } from "@/components/brand/logo-data";

const fontDir = path.join(process.cwd(), "node_modules/@fontsource/inter-tight/files");

// 1200x630 brand card: ink ground, large title, wordmark, gold rule of one accent only.
export async function ogImage({ title, section }: { title: string; section: string }) {
  const [semibold, medium] = await Promise.all([
    readFile(path.join(fontDir, "inter-tight-latin-600-normal.woff")),
    readFile(path.join(fontDir, "inter-tight-latin-500-normal.woff")),
  ]);
  const size = title.length > 60 ? 64 : title.length > 36 ? 76 : 92;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#08080a", padding: "72px 80px", fontFamily: "Inter Tight" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, fontWeight: 500, color: "#a8a59f" }}>
          <svg width={LOGO.width * 1.05} height={LOGO.height * 1.05} viewBox={`0 0 ${LOGO.width} ${LOGO.height}`}>
            <rect x={LOGO.pill.x} y={LOGO.pill.y} width={LOGO.pill.w} height={LOGO.pill.h} rx={LOGO.pill.r} fill="none" stroke="#ffffff" strokeWidth={LOGO.pill.stroke} />
            {LOGO.ticks.x.map((x) => (
              <line key={x} x1={x} y1={LOGO.ticks.y1} x2={x} y2={LOGO.ticks.y2} stroke="#ffffff" strokeWidth={LOGO.ticks.stroke} strokeOpacity={0.4} />
            ))}
            <circle cx={LOGO.bubble.cx} cy={LOGO.bubble.cy} r={LOGO.bubble.r} fill="#ffde59" />
            <path d={LOGO.word} fill="#ffffff" />
          </svg>
          <div style={{ display: "flex" }}>{section}</div>
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.04em", color: "#faf9f8", maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, fontWeight: 500, color: "#cfcdc9" }}>
          <div style={{ display: "flex", width: 56, height: 8, borderRadius: 8, background: "#ffde59" }} />
          Specialist GoHighLevel studio · 7+ years · 100+ projects
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" },
      fonts: [
        { name: "Inter Tight", data: semibold, weight: 600, style: "normal" },
        { name: "Inter Tight", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
