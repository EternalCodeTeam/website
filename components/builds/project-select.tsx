"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Package } from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { easeOut } from "@/lib/animations/variants";
import type { Project } from "@/lib/builds/projects";

interface ProjectSelectProps {
  projects: Project[];
  activeProject: Project;
  onProjectChange: (projectId: string) => void;
}

export function ProjectSelect({ projects, activeProject, onProjectChange }: ProjectSelectProps) {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const activeIndex = Math.max(
    projects.findIndex((project) => project.id === activeProject.id),
    0
  );
  const [highlightedIndex, setHighlightedIndex] = useState(activeIndex);

  const optionId = (projectId: string) => `${listboxId}-option-${projectId}`;

  const openMenu = useCallback(
    (index?: number) => {
      setHighlightedIndex(index ?? activeIndex);
      setOpen(true);
    },
    [activeIndex]
  );

  const closeMenu = useCallback((focusTrigger = false) => {
    setOpen(false);
    if (focusTrigger) {
      triggerRef.current?.focus();
    }
  }, []);

  const selectProject = useCallback(
    (projectId: string) => {
      onProjectChange(projectId);
      closeMenu(true);
    },
    [onProjectChange, closeMenu]
  );

  const moveHighlight = useCallback(
    (delta: number) => {
      setHighlightedIndex((index) => (index + delta + projects.length) % projects.length);
    },
    [projects.length]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, closeMenu]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const option = listRef.current?.querySelector(`[data-index="${highlightedIndex}"]`);
    option?.scrollIntoView({ block: "nearest" });
  }, [open, highlightedIndex]);

  const handleClosedKey = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(projects.length - 1);
    }
  };

  const handleNavigationKey = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveHighlight(1);
      return true;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(-1);
      return true;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setHighlightedIndex(0);
      return true;
    }
    if (event.key === "End") {
      event.preventDefault();
      setHighlightedIndex(projects.length - 1);
      return true;
    }
    return false;
  };

  const handleSelectionKey = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const project = projects[highlightedIndex];
      if (project) {
        selectProject(project.id);
      }
      return true;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return true;
    }
    if (event.key === "Tab") {
      closeMenu();
      return true;
    }
    return false;
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (!open) {
      handleClosedKey(event);
      return;
    }
    if (!handleNavigationKey(event)) {
      handleSelectionKey(event);
    }
  };

  return (
    <div className="builds-project-select" ref={rootRef}>
      <button
        aria-activedescendant={open ? optionId(projects[highlightedIndex]?.id ?? "") : undefined}
        aria-autocomplete="none"
        aria-controls={open ? listboxId : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="builds-project-trigger"
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        ref={triggerRef}
        role="combobox"
        type="button"
      >
        <span>{activeProject.name}</span>
        <ChevronDown aria-hidden="true" className={open ? "is-open" : undefined} />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="builds-project-menu"
            data-lenis-prevent
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            id={listboxId}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
            ref={listRef}
            role="listbox"
            transition={{ ...easeOut, duration: 0.18 }}
          >
            {projects.map((project, index) => {
              const active = project.id === activeProject.id;
              return (
                <div
                  aria-selected={active}
                  data-highlighted={index === highlightedIndex}
                  data-index={index}
                  id={optionId(project.id)}
                  key={project.id}
                  role="option"
                  tabIndex={-1}
                >
                  <button
                    onClick={() => selectProject(project.id)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    tabIndex={-1}
                    type="button"
                  >
                    <Package aria-hidden="true" />
                    <span>{project.name}</span>
                    {active && <Check aria-hidden="true" className="builds-project-check" />}
                  </button>
                </div>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
