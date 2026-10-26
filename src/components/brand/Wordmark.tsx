// Temporary text wordmark. [[TODO: final logo]]
export function Wordmark({ className = "", mono = false }: { className?: string; mono?: boolean }) {
  return (
    <span className={`font-display inline-flex items-baseline font-semibold tracking-[-0.045em] ${className}`}>
      Fix<span className={mono ? undefined : "text-gold-500"}>GHL</span>
    </span>
  );
}
