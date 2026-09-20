import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentProps, HTMLAttributes, ReactNode } from "react";

export function DocumentationLink({
  href = "#",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} rel="noreferrer noopener" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export function DocumentationTable({ children, ...props }: ComponentProps<"table">) {
  return (
    <section aria-label="Scrollable table" className="docs-table-wrap">
      <table {...props}>{children}</table>
    </section>
  );
}

export function createHeading(level: 2 | 3 | 4 | 5 | 6) {
  const Heading = `h${level}` as const;

  return function DocumentationHeading({
    children,
    id,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Heading id={id} {...props}>
        {children}
        {id ? (
          <a aria-label="Link to this section" className="docs-heading-anchor" href={`#${id}`}>
            #
          </a>
        ) : null}
      </Heading>
    );
  };
}

export function Badge({ children }: { readonly children: ReactNode }) {
  return <span className="docs-badge">{children}</span>;
}

export function Divider() {
  return <hr className="docs-divider" />;
}
