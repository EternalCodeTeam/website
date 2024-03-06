import Link from "next/link";

interface Line {
  line: string;
  formatting?: string;
  special?: boolean;
  locale?: boolean;
  url?: string;
  endLine: boolean;
}

interface TerminalLineProps {
  line: Line;
  isVisible: boolean;
}

export function TerminalLine({ line, isVisible }: Readonly<TerminalLineProps>) {
  return (
    <span
      className={`line inset-x-0 bottom-0 font-mono text-sm leading-6 opacity-0 transition duration-500 ease-in-out before:opacity-0 ${
        isVisible ? "opacity-100" : ""
      } ${line.formatting}`}
    >
      {line.special && line.locale !== false ? (
        // @ts-ignore
        <Link href={line.url}>{line.line}</Link>
      ) : line.special ? (
        <a href={line.url} target="_blank">
          {line.line}
        </a>
      ) : (
        <span>{line.line}</span>
      )}
      {line.endLine && <br />}
    </span>
  );
}
