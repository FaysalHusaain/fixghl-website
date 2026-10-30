import { Txt } from "@/components/ui/Txt";

// The intro paragraphs under a hub page's H1.
export function HubIntro({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-8 flex max-w-[64ch] flex-col gap-4 text-ink-700">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 24)}><Txt>{p}</Txt></p>
      ))}
    </div>
  );
}
