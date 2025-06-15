import { motion } from "framer-motion";
import Link from "next/link";

export interface LineFragment {
  text: string;
  formatting?: string;
  special?: boolean;
  locale?: boolean;
  url?: string;
}

export interface Line {
  line: string | LineFragment[];
  formatting?: string;
  special?: boolean;
  locale?: boolean;
  url?: string;
  endLine: boolean;
  isCommand?: boolean;
}

interface TerminalLineProps {
  line: Line;
  isVisible: boolean;
}

export function TerminalLine({ line, isVisible }: Readonly<TerminalLineProps>) {
  const renderContent = () => {
    if (Array.isArray(line.line)) {
      return line.line.map((fragment, idx) => {
        if (fragment.special && fragment.locale !== false && fragment.url) {
          return (
            <Link
              key={idx}
              href={fragment.url}
              className={fragment.formatting || "inline-block whitespace-nowrap"}
            >
              {fragment.text}
            </Link>
          );
        } else if (fragment.special && fragment.url) {
          return (
            <a
              key={idx}
              href={fragment.url}
              target="_blank"
              rel="noopener noreferrer"
              className={fragment.formatting || "inline-block whitespace-nowrap"}
            >
              {fragment.text}
            </a>
          );
        } else {
          return (
            <span key={idx} className={fragment.formatting || "inline-block whitespace-nowrap"}>
              {fragment.text}
            </span>
          );
        }
      });
    } else {
      if (line.special && line.locale !== false) {
        return (
          <Link href={line.url || ""} className="inline-block whitespace-nowrap">
            {line.line}
          </Link>
        );
      } else if (line.special) {
        return (
          <a
            href={line.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap"
          >
            {line.line}
          </a>
        );
      } else {
        return <span className="inline-block whitespace-nowrap">{line.line}</span>;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex min-h-[24px] items-center"
    >
      <span className={`font-mono text-sm leading-6 ${line.formatting}`}>{renderContent()}</span>
      {line.endLine && <br />}
    </motion.div>
  );
}
