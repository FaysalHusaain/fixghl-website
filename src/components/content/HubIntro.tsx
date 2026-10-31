import { Txt } from "@/components/ui/Txt";

// The intro under a hub page's H1, with an optional question heading. [label](/path) becomes a link.
export function HubIntro({ paragraphs, heading }: { paragraphs: string[]; heading?: string }) {
  return (
    <div className="mt-8 flex max-w-[64ch] flex-col gap-4 text-ink-700">
      {heading && <h2 className="h-sub text-ink-950">{heading}</h2>}
      {paragraphs.map((p) => (
        <p key={p.slice(0, 24)}><Txt>{p}</Txt></p>
      ))}
    </div>
  );
}
