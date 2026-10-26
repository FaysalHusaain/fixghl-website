import { allRoutes } from "@/lib/routes";
import { ogImage } from "@/lib/og";

// Pre-rendered OG images for every indexable route, served at /og/<path> (home is /og/home).
export function generateStaticParams() {
  return allRoutes().map((r) => ({ path: r.path === "/" ? ["home"] : r.path.slice(1).split("/") }));
}

export async function GET(_req: Request, ctx: RouteContext<"/og/[...path]">) {
  const { path } = await ctx.params;
  const p = path.join("/") === "home" ? "/" : `/${path.join("/")}`;
  const route = allRoutes().find((r) => r.path === p);
  return ogImage({ title: route?.title ?? "GoHighLevel, fixed and built right.", section: route?.section ?? "FixGHL" });
}
