import type { ReactNode } from "react";

export function Steps({ children }: { readonly children: ReactNode }) {
  return <div className="docs-steps">{children}</div>;
}

export function Step({
  children,
  title,
}: {
  readonly children: ReactNode;
  readonly icon?: string;
  readonly title: string;
}) {
  return (
    <section className="docs-step">
      <div aria-hidden="true" className="docs-step-marker" />
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}
