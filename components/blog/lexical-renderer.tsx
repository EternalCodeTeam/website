import Image from "next/image";
import type React from "react";

// Advanced Rich Text Renderer for Lexical
// biome-ignore lint/suspicious/noExplicitAny: Content from Lexical is loosely typed
const LexicalRenderer = ({ content }: { content: any }) => {
  if (!content?.root?.children) {
    return null;
  }

  // biome-ignore lint/suspicious/noExplicitAny: Lexical nodes are dynamic structured objects
  const serialize = (children: any[]): React.ReactNode[] =>
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Rich text parser requires many cases for different node types
    children?.map((node, index) => {
      if (node.type === "text") {
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Lexical handles sanitization, safe to render known text nodes
        // biome-ignore lint/suspicious/noArrayIndexKey: Order is static from content structure
        let text = <span dangerouslySetInnerHTML={{ __html: node.text }} key={index} />;

        // biome-ignore lint/suspicious/noBitwiseOperators: Lexical uses bitmasks for formatting flags
        if (node.format & 1) {
          // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
          text = <strong key={index}>{text}</strong>;
        }
        // biome-ignore lint/suspicious/noBitwiseOperators: Lexical uses bitmasks for formatting flags
        if (node.format & 2) {
          // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
          text = <em key={index}>{text}</em>;
        }
        // biome-ignore lint/suspicious/noBitwiseOperators: Lexical uses bitmasks for formatting flags
        if (node.format & 4) {
          text = (
            // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
            <s className="line-through" key={index}>
              {text}
            </s>
          );
        }
        // biome-ignore lint/suspicious/noBitwiseOperators: Lexical uses bitmasks for formatting flags
        if (node.format & 8) {
          text = (
            // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
            <u key={index}>{text}</u>
          );
        }
        // biome-ignore lint/suspicious/noBitwiseOperators: Lexical uses bitmasks for formatting flags
        if (node.format & 16) {
          text = (
            <code
              className="rounded bg-gray-800 px-1 py-0.5 text-blue-400 dark:bg-gray-700"
              // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
              key={index}
            >
              {text}
            </code>
          );
        }

        return text;
      }

      if (!node) {
        return null;
      }

      switch (node.type) {
        case "heading": {
          const HeadingTag = node.tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
          const headingSizes = {
            h1: "text-3xl font-bold md:text-4xl",
            h2: "text-2xl font-bold md:text-3xl",
            h3: "text-xl font-bold md:text-2xl",
            h4: "text-lg font-bold",
            h5: "text-base font-bold",
            h6: "text-sm font-bold",
          };
          return (
            <HeadingTag
              className={`my-6 text-gray-900 dark:text-white ${headingSizes[HeadingTag]}`}
              // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
              key={index}
            >
              {serialize(node.children)}
            </HeadingTag>
          );
        }

        case "paragraph":
          return (
            <p
              className="mb-6 text-gray-700 text-lg leading-relaxed dark:text-gray-300"
              // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
              key={index}
            >
              {serialize(node.children)}
            </p>
          );

        case "list": {
          const ListTag = node.tag === "ol" ? "ol" : "ul";
          return (
            <ListTag
              className={`mb-6 pl-6 text-gray-700 dark:text-gray-300 ${node.tag === "ol" ? "list-decimal" : "list-disc"}`}
              // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
              key={index}
            >
              {serialize(node.children)}
            </ListTag>
          );
        }

        case "listitem":
          return (
            <li
              className="mb-2 pl-1"
              // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
              key={index}
            >
              {serialize(node.children)}
            </li>
          );

        case "quote":
          return (
            <blockquote
              className="my-6 rounded-r-lg border-blue-500 border-l-4 bg-blue-50 p-4 text-gray-700 italic dark:bg-blue-900/20 dark:text-gray-300"
              // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
              key={index}
            >
              {serialize(node.children)}
            </blockquote>
          );

        case "link":
          return (
            <a
              className="text-blue-600 underline decoration-2 underline-offset-4 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              href={node.fields.url}
              // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
              key={index}
              // biome-ignore lint/nursery/noLeakedRender: undefined is valid for optional attributes
              rel={node.fields.newTab ? "noopener noreferrer" : undefined}
              target={node.fields.newTab ? "_blank" : "_self"}
            >
              {serialize(node.children)}
            </a>
          );

        case "upload":
          if (node.value && typeof node.value === "object" && node.value.url) {
            return (
              <div
                className="relative my-8 aspect-video w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg dark:border-gray-700"
                // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
                key={index}
              >
                <Image
                  alt={node.value.alt || "Blog image"}
                  className="object-cover"
                  fill
                  src={node.value.url}
                />
              </div>
            );
          }
          return null;

        default:
          // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
          return <span key={index}>{serialize(node.children)}</span>;
      }
    }) || [];

  return <div className="rich-text">{serialize(content.root.children)}</div>;
};

export default LexicalRenderer;
