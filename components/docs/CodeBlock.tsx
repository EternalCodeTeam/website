import React from "react";

export const CodeBlock = ({ children, ...props }: React.ComponentProps<"pre">) => (
  <pre
    className="rounded-lg bg-[#161b22] p-4 text-sm text-neutral-200 font-mono overflow-x-auto border border-neutral-700 my-4"
    {...props}
  >
    {children}
  </pre>
); 