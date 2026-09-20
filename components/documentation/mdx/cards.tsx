import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function CardGroup({ children }: { readonly children: ReactNode }) {
  return <div className="docs-card-group">{children}</div>;
}

export function Card({
  children,
  href,
  icon,
  title,
}: {
  readonly children: ReactNode;
  readonly href?: string;
  readonly icon?: ReactNode;
  readonly title: string;
}) {
  const content = (
    <>
      <span className="docs-card-title">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        {title}
      </span>
      <span className="docs-card-content">{children}</span>
      {href ? <ArrowUpRight aria-hidden="true" className="docs-card-arrow" size={17} /> : null}
    </>
  );

  return href ? (
    <Link className="docs-card" href={href}>
      {content}
    </Link>
  ) : (
    <div className="docs-card">{content}</div>
  );
}
