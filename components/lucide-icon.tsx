// biome-ignore lint/performance/noNamespaceImport: Dynamic lookup
import * as LucideIcons from "lucide-react";
import { HelpCircle, type LucideIcon as LucideIconType } from "lucide-react";

const icons = LucideIcons as unknown as Record<string, LucideIconType>;

export function LucideIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = icons[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <HelpCircle className={className} style={style} />;
  }

  return <Icon className={className} style={style} />;
}
