import React, { memo } from "react";

interface CodeBlockProps extends React.ComponentProps<"pre"> {
  /**
   * The content to be displayed in the code block
   */
  children: React.ReactNode;
  /**
   * Optional language identifier for syntax highlighting
   */
  language?: string;
}

const CodeBlock = memo(({ 
  children, 
  language,
  ...props 
}: CodeBlockProps) => (
  <pre
    className="prose pre rounded-lg bg-[#161b22] p-4 text-sm text-neutral-200 font-mono overflow-x-auto border border-neutral-700 my-4 relative"
    role="code"
    aria-label={language ? `Code block in ${language}` : "Code block"}
    {...props}
  >
    {children}
  </pre>
));

CodeBlock.displayName = "CodeBlock";

export { CodeBlock }; 