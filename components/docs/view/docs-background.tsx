import { FacadePattern } from "@/components/ui/facade-pattern";

export function DocsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      <div className="absolute top-[20%] -left-[10%] h-125 w-125 rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="absolute top-[50%] -right-[10%] h-125 w-125 rounded-full bg-blue-500/10 blur-[100px]" />
    </div>
  );
}
