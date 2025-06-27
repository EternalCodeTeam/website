import React, { memo, ComponentProps } from "react";

interface CodeBlockProps extends ComponentProps<"pre"> {
  children: React.ReactNode;

  language?: string;
}

const CodeBlock = memo(({ children, language, ...props }: CodeBlockProps) => (
  <pre
    className="pre prose relative my-4 overflow-x-auto rounded-lg border border-neutral-700 bg-gray-900 bg-lightGray-200 p-4 font-mono text-sm text-neutral-200"
    role="code"
    aria-label={language ? `Code block in ${language}` : "Code block"}
    {...props}
  >
    {children}
  </pre>
));

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
