// The promises shown in <Promises> on the homepage and /pricing. Owner's copy: keep it word for word.
export type PromiseItem = { name: string; text: string };

export const promises = {
  fixedPrice: { name: "Fixed price.", text: "The number in your quote is the number you pay. If the scope changes, we agree the new price with you first." },
  fixedOrRefunded: { name: "Fixed, or refunded.", text: "If we can't solve a Quick Fix issue, you get all of it back." },
  builtToLast: {
    name: "Built to last.",
    text: "If anything we built breaks within 90 days of launch, we repair it free. This covers our work as delivered, not new requests or changes made after handover by you, your team or HighLevel.",
  },
  accountStaysYours: { name: "Your account stays yours.", text: "You add us as a user. There's no password sharing, and you can remove us the day the job is done." },
  approveFirst: { name: "You approve first.", text: "On setups and migrations, the second 50% is due only when the work is live and you've said yes." },
} satisfies Record<string, PromiseItem>;
