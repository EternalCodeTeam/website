"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";

import { TerminalLine, Line } from "./TerminalLine";
import { TerminalTab } from "./TerminalTab";

export default function Terminal() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const controls = useAnimation();
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lineTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const lines: Line[] = useMemo(
    () => [
      {
        line: "> eternalcode --help",
        formatting: "dark:text-gray-100 text-black-300 text-sm font-mono",
        endLine: true,
        isCommand: true,
      },
      {
        line: "",
        endLine: true,
      },
      {
        line: "Help requested!",
        formatting: "text-slate-600 text-sm font-mono",
        endLine: true,
      },
      {
        line: [
          {
            text: "Try finding answers in our ",
            formatting: "text-slate-600 text-sm font-mono",
          },
          {
            text: "documentation!",
            formatting: "text-blue-500 text-sm font-mono hover:underline",
            special: true,
            locale: false,
            url: "https://docs.eternalcode.pl/",
          },
        ],
        endLine: true,
      },
      {
        line: "",
        endLine: true,
      },
      {
        line: "> eternalcode --tree",
        formatting: "dark:text-gray-100 text-black-300 text-sm font-mono",
        endLine: true,
        isCommand: true,
      },
      {
        line: "",
        endLine: true,
      },
      {
        line: [
          { text: "├── 📁 ", formatting: "text-slate-600 text-sm font-mono" },
          {
            text: "Home",
            formatting: "text-slate-600 text-sm font-mono",
            special: true,
            locale: true,
            url: "/",
          },
        ],
        endLine: true,
      },
      {
        line: [
          {
            text: "│   ├── 📁 ",
            formatting: "text-slate-600 text-sm font-mono",
          },
          {
            text: "Team",
            formatting: "text-blue-500 text-sm font-mono hover:underline",
            special: true,
            locale: true,
            url: "/team",
          },
        ],
        endLine: true,
      },
      {
        line: [
          {
            text: "│   ├── 📁 ",
            formatting: "text-slate-600 text-sm font-mono",
          },
          {
            text: "Projects",
            formatting: "text-blue-500 text-sm font-mono hover:underline",
            special: true,
            locale: true,
            url: "/projects",
          },
        ],
        endLine: true,
      },
      {
        line: [
          { text: "├── 📁 ", formatting: "text-slate-600 text-sm font-mono" },
          { text: "Faq", formatting: "text-slate-600 text-sm font-mono" },
        ],
        endLine: true,
      },
      {
        line: [
          {
            text: "│   │   ├── 📁 ",
            formatting: "text-slate-600 text-sm font-mono",
          },
          {
            text: "Docs",
            formatting: "text-blue-500 text-sm font-mono hover:underline",
            special: true,
            locale: false,
            url: "https://docs.eternalcode.pl/",
          },
        ],
        endLine: true,
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [completedCommands, setCompletedCommands] = useState<number[]>([]);
  const [visibleLines, setVisibleLines] = useState<
    { key: number; line: Line; isVisible: boolean }[]
  >([]);

  const resetAnimation = useCallback(() => {
    setCurrentIndex(0);
    setTypingText("");
    setIsTyping(false);
    setCurrentCommandIndex(-1);
    setCompletedCommands([]);
    setVisibleLines([]);

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (lineTimerRef.current) {
      clearTimeout(lineTimerRef.current);
      lineTimerRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const typeCommand = useCallback(
    (command: string, index: number) => {
      setIsTyping(true);
      setCurrentCommandIndex(index);
      setTypingText("");

      let charIndex = 0;
      let lastTimestamp = 0;
      const TYPING_SPEED = 50;

      const typeNextChar = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;

        if (elapsed >= TYPING_SPEED) {
          if (charIndex < command.length) {
            setTypingText(command.substring(0, charIndex + 1));
            charIndex++;
            lastTimestamp = timestamp;
          } else {
            setIsTyping(false);
            setCompletedCommands((prev) => [...prev, index]);
            const delay = lines[index].endLine ? 500 : 0;
            lineTimerRef.current = setTimeout(() => {
              setCurrentIndex((prev) => prev + 1);
            }, delay);
            return;
          }
        }

        animationFrameRef.current = requestAnimationFrame(typeNextChar);
      };

      animationFrameRef.current = requestAnimationFrame(typeNextChar);
    },
    [lines]
  );

  const processNextLine = useCallback(() => {
    if (currentIndex < lines.length) {
      const currentLine = lines[currentIndex];

      if (currentLine.isCommand) {
        if (typeof currentLine.line === "string") {
          typeCommand(currentLine.line, currentIndex);
        } else {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        const delay = currentLine.endLine ? 300 : 0;
        lineTimerRef.current = setTimeout(
          () => setCurrentIndex((prevIndex) => prevIndex + 1),
          delay
        );
      }
    }
  }, [currentIndex, lines, typeCommand]);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
      processNextLine();
    } else {
      controls.start({ opacity: 0, y: 20 });
      resetAnimation();
    }

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      if (lineTimerRef.current) {
        clearTimeout(lineTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [inView, currentIndex, controls, processNextLine, resetAnimation]);

  useEffect(() => {
    const newVisibleLines = lines.slice(0, currentIndex + 1).map((line, index) => {
      const isCommand = line.isCommand;
      const isCurrentlyTyping = index === currentCommandIndex;
      const isCompleted = completedCommands.includes(index);

      return {
        key: index,
        line:
          isCurrentlyTyping && typeof line.line === "string"
            ? { ...line, line: typingText || "" }
            : isCommand && isCompleted
              ? { ...line, line: line.line }
              : line,
        isVisible: true,
      };
    });

    setVisibleLines(newVisibleLines);
  }, [lines, currentIndex, currentCommandIndex, typingText, completedCommands]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <TerminalTab>
        <div className="scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 inset-x-0 h-80 min-h-80 overflow-y-auto bg-[#e6e7e8] pl-2 pt-2 dark:bg-[#1F2A37]">
          {visibleLines.map(({ key, line, isVisible }) => (
            <TerminalLine key={key} line={line} isVisible={isVisible} />
          ))}
        </div>
      </TerminalTab>
    </motion.div>
  );
}
