import {
  BookOpen,
  Code2,
  Heart,
  HelpCircle,
  LifeBuoy,
  Lightbulb,
  type LucideIcon as LucideIconType,
  MessageCircle,
} from "lucide-react";

const icons: Record<string, LucideIconType> = {
  BookOpen,
  Code2,
  Heart,
  HelpCircle,
  LifeBuoy,
  Lightbulb,
  MessageCircle,
};

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
    console.warn(`Icon "${name}" not found. Add it to lucide-icon.tsx`);
    return <HelpCircle className={className} style={style} />;
  }

  return <Icon className={className} style={style} />;
}
