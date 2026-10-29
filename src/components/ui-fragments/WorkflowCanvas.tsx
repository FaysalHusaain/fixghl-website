// An abstracted GHL workflow, drawn in HTML. Illustrative configuration only: no metrics.
// Mobile: vertical, like GHL's own builder. md+: horizontal, cropped by the frame edge.
type StepProps = { kind: string; title: string; detail: string; fixed?: boolean };

function Step({ kind, title, detail, fixed }: StepProps) {
  return (
    <div
      className={`relative w-full rounded-xl p-4 md:w-[15.5rem] md:shrink-0 ${
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

function Connector() {
  return (
    <span
      aria-hidden
      className="ml-8 h-5 w-[1.5px] shrink-0 bg-ink-700 md:ml-0 md:mt-[3.25rem] md:h-[1.5px] md:w-8"
    />
  );
}

export function WorkflowCanvas({ compact = false }: { compact?: boolean }) {
  if (compact) return <CompactCanvas />;
  return (
    <figure data-ui className="relative">
      <figcaption className="mb-4 grid gap-3 text-small md:mb-5 md:grid-cols-[auto_1fr_1fr_1fr] md:items-start md:gap-6">
        <span className="w-fit rounded-full bg-gold-500 px-3 py-1 font-semibold text-ink-950">Example fix</span>
        <span className="text-ink-300"><span className="font-semibold text-ink-50">Problem: </span>new leads from the consult form got no reply.</span>
        <span className="text-ink-300"><span className="font-semibold text-ink-50">Cause: </span>the workflow was watching a form that had been deleted.</span>
        <span className="text-ink-300"><span className="font-semibold text-ink-50">Fix: </span>we pointed it at the live form and tested every step.</span>
      </figcaption>
      <div className="rounded-2xl bg-ink-900 text-left md:rounded-b-none">
        <div className="flex items-center justify-between gap-4 px-4 py-3 text-[0.8125rem] text-ink-400 md:px-5">
          <span className="text-ink-200">Workflow · New inquiry to booked call</span>
          <span className="flex shrink-0 items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-gold-500" />
            Published
          </span>
        </div>
        <div className="flex flex-col px-4 pb-6 pt-2 md:flex-row md:items-start md:overflow-hidden md:px-5 md:pb-10 md:pt-4">
          <div className="flex flex-col gap-3 md:shrink-0">
            <Step kind="Trigger" title="Form submitted" detail="Filter: Free consult form" fixed />
            <p className="px-1 text-[0.8125rem] leading-snug text-gold-500 md:max-w-[15.5rem]">
              Fixed here: now watches the live consult form.
            </p>
          </div>
          <Connector />
          <Step kind="Action" title="Create or update contact" detail="Map name, email and phone" />
          <Connector />
          <div className="flex flex-col gap-3 md:shrink-0">
            <Step kind="If / else" title="Phone number exists" detail="Yes: send SMS. No: send email." />
            <div className="hidden gap-3 md:flex">
              <div className="rounded-xl bg-ink-800/70 p-3 text-[0.8125rem] text-ink-200 md:w-[7.5rem]">Send SMS confirmation</div>
              <div className="rounded-xl bg-ink-800/70 p-3 text-[0.8125rem] text-ink-200 md:w-[7.5rem]">Send email confirmation</div>
            </div>
          </div>
          <div className="hidden md:contents">
            <Connector />
            <Step kind="Wait" title="Until appointment" detail="Reminder the day before" />
            <Connector />
            <Step kind="Action" title="Move opportunity" detail="New inquiries to Booked" />
          </div>
          <p className="ml-1 mt-3 text-[0.8125rem] text-ink-400 md:hidden">+ 3 more steps: SMS or email, reminder, pipeline move</p>
        </div>
      </div>
    </figure>
  );
}

// Vertical variant for narrow columns (service pages).
function CompactCanvas() {
  const steps = [
    { kind: "Trigger", title: "Form submitted", detail: "Filter: Free consult form", fixed: true },
    { kind: "If / else", title: "Phone number exists", detail: "Yes: send SMS. No: send email." },
    { kind: "Wait", title: "Until appointment", detail: "Reminder the day before" },
    { kind: "Action", title: "Move opportunity", detail: "New inquiries to Booked" },
  ];
  return (
    <figure data-ui className="on-dark rounded-2xl bg-ink-900 text-left text-ink-50">
      <figcaption className="sr-only">Illustration of a GoHighLevel workflow with its trigger fixed.</figcaption>
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-[0.8125rem] text-ink-400 md:px-5">
        <span className="min-w-0 text-ink-200 [overflow-wrap:anywhere]">Workflow · New inquiry to booked call</span>
        <span className="flex shrink-0 items-center gap-2"><span aria-hidden className="size-2 rounded-full bg-gold-500" />Published</span>
      </div>
      <div className="flex flex-col px-4 pb-5 md:px-5">
        {steps.map((st, i) => (
          <div key={st.title} className="flex flex-col">
            {i > 0 && <span aria-hidden className="ml-8 h-4 w-[1.5px] bg-ink-700" />}
            <div className={`rounded-xl p-4 ${st.fixed ? "bg-ink-800 ring-2 ring-gold-500" : "bg-ink-800/70"}`}>
              <div className="flex items-center justify-between text-[0.8125rem] text-ink-400">
                <span>{st.kind}</span>
                {st.fixed && <span className="rounded-full bg-gold-500 px-2 py-0.5 font-medium text-ink-950">Fixed</span>}
              </div>
              <p className="mt-2 text-[0.9375rem] font-medium leading-snug">{st.title}</p>
              <p className="mt-1 text-[0.8125rem] leading-snug text-ink-300">{st.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
