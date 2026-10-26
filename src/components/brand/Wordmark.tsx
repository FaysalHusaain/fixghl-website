// Temporary text wordmark. [[TODO: final logo]]
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-semibold tracking-[-0.04em] ${className}`}>
      Fix<span className="text-gold-500">GHL</span>
    </span>
  );
}
