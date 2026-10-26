// An abstracted GHL workflow, drawn in HTML. Illustrative configuration only: no metrics.
type Node = { kind: string; title: string; detail: string; fixed?: boolean };

function Step({ kind, title, detail, fixed }: Node) {
  return (
    <div
      className={`relative w-[15.5rem] shrink-0 rounded-xl p-4 ${
        fixed ? "bg-ink-800 ring-2 ring-gold-500" : "bg-ink-800/70"
      }`}
    >
      <div className="flex items-center justify-between text-[0.8125rem] text-ink-400">
        <span>{kind}</span>
        {fixed && <span className="rounded-full bg-gold-500 px-2 py-0.5 font-medium text-ink-950">Fixed</span>}
      </div>
      <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-ink-50">{title}</p>
      <p className="mt-1 text-[0.8125rem] leading-snug text-ink-300">{detail}</p>
    </div>
  );
}

function Link() {
  return <span aria-hidden className="mt-[3.25rem] h-[1.5px] w-8 shrink-0 bg-ink-700" />;
}

export function WorkflowCanvas() {
  return (
    <figure data-ui className="relative">
      <figcaption className="sr-only">
        Illustration of a GoHighLevel workflow after a fix: a form trigger, a contact update, an if/else branch for SMS
        or email confirmation, a wait step and a pipeline move.
      </figcaption>
      <div className="rounded-t-2xl bg-ink-900 text-left">
        <div className="flex items-center justify-between px-5 py-3 text-[0.8125rem] text-ink-400">
          <span className="text-ink-200">Workflow · New enquiry to booked call</span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-gold-500" />
            Published
          </span>
        </div>
        <div className="flex items-start gap-0 overflow-hidden px-5 pb-10 pt-4">
          <div className="flex shrink-0 flex-col gap-3">
            <Step kind="Trigger" title="Form submitted" detail="Filter: Free consult form" fixed />
            <p className="max-w-[15.5rem] px-1 text-[0.8125rem] leading-snug text-gold-500">
              The trigger pointed at a form that had been deleted, so nothing fired. Now it does.
            </p>
          </div>
          <Link />
          <Step kind="Action" title="Create or update contact" detail="Map name, email and phone" />
          <Link />
          <div className="flex shrink-0 flex-col gap-3">
            <Step kind="If / else" title="Phone number exists" detail="Yes: send SMS. No: send email." />
            <div className="flex gap-3">
              <div className="w-[7.5rem] rounded-xl bg-ink-800/70 p-3 text-[0.8125rem] text-ink-200">Send SMS confirmation</div>
              <div className="w-[7.5rem] rounded-xl bg-ink-800/70 p-3 text-[0.8125rem] text-ink-200">Send email confirmation</div>
            </div>
          </div>
          <Link />
          <Step kind="Wait" title="Until appointment" detail="Reminder the day before" />
          <Link />
          <Step kind="Action" title="Move opportunity" detail="New enquiries to Booked" />
        </div>
      </div>
    </figure>
  );
}
