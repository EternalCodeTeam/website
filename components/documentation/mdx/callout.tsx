import { AlertCircle, CircleAlert, CircleCheck, Info, Lightbulb, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type CalloutType =
  | "danger"
  | "example"
  | "important"
  | "info"
  | "note"
  | "success"
  | "tip"
  | "warning";

interface CalloutProps {
  readonly children: ReactNode;
  readonly title?: string;
  readonly type?: CalloutType;
}

const CALLOUT_ICONS = {
  danger: AlertCircle,
  example: Sparkles,
  important: CircleAlert,
  info: Info,
  note: Info,
  success: CircleCheck,
  tip: Lightbulb,
  warning: CircleAlert,
} as const;

export function Callout({ children, title, type = "note" }: CalloutProps) {
  const Icon = CALLOUT_ICONS[type];

  return (
    <aside className="docs-callout" data-callout-type={type} role="note">
      <Icon aria-hidden="true" className="docs-callout-icon" size={18} />
      <div>
        {title ? <p className="docs-callout-title">{title}</p> : null}
        <div className="docs-callout-content">{children}</div>
      </div>
    </aside>
  );
}

export const AlertBox = Callout;
