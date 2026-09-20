import { ExternalLink, File, Folder, Terminal } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function Command({
  children,
  command,
}: {
  readonly children?: ReactNode;
  readonly command?: string;
  readonly theme?: string;
  readonly variant?: string;
}) {
  return (
    <div className="docs-command">
      <Terminal aria-hidden="true" size={16} />
      <code>{command ?? children}</code>
    </div>
  );
}

export function FileTree({ children }: { readonly children: ReactNode }) {
  return <div className="docs-file-tree">{children}</div>;
}

export function FileTreeItem({
  children,
  name,
  type = "file",
}: {
  readonly children?: ReactNode;
  readonly name: string;
  readonly type?: "file" | "folder";
}) {
  const Icon = type === "folder" ? Folder : File;
  return (
    <div className="docs-file-tree-item">
      <span>
        <Icon aria-hidden="true" size={15} /> {name}
      </span>
      {children ? <div>{children}</div> : null}
    </div>
  );
}

export function LinkPreview({
  children,
  href,
  title,
}: {
  readonly children?: ReactNode;
  readonly href: string;
  readonly title?: string;
}) {
  return (
    <Link className="docs-link-preview" href={href}>
      <span>{title ?? children ?? href}</span>
      <ExternalLink aria-hidden="true" size={16} />
    </Link>
  );
}

export function BeforeAfter({ children }: { readonly children: ReactNode }) {
  return <div className="docs-before-after">{children}</div>;
}

export function BeforeAfterItem({
  children,
  label,
}: {
  readonly children: ReactNode;
  readonly label?: string;
  readonly title?: string;
}) {
  return (
    <div className="docs-before-after-item">
      {label ? <strong>{label}</strong> : null}
      {children}
    </div>
  );
}
