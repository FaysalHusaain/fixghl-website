import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { TryGhl } from "@/components/content/TryGhl";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", ...props }) =>
      href.startsWith("/") ? (
        <Link href={href} {...props} />
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      ),
    table: (props) => (
      <div className="table-wrap" role="region" aria-label="Table" tabIndex={0}>
        <table {...props} />
      </div>
    ),
    TryGhl,
    ...components,
  };
}
