import type { QA } from "./services";

export type ArticleMeta = {
  slug: string;
  title: string; // H1
  metaTitle: string; // <= 60 chars
  description: string; // <= 155 chars
  summary: string; // one line for hubs and llms.txt
  published: string; // ISO date
  updated: string; // ISO date
  faqs: QA[];
  related: { href: string; label: string }[];
  ctaLine?: string; // inline booking prompt; defaults to the troubleshooting line
  kind?: "fix" | "migration"; // sidebar and closing banner wording; unmarked articles use the set-up wording
};

export type TermMeta = {
  slug: string;
  term: string;
  metaTitle: string;
  description: string;
  definition: string; // 1-2 sentences, shown on cards and in DefinedTerm schema
  updated: string;
  related: { href: string; label: string }[];
};
