import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to handle table visibility with animation and protection against unwanted hiding
 * 
 * @param delay - Delay in milliseconds before showing the table
 * @returns Object containing visibility state and ref for the table wrapper
 */
export function useTableVisibility(delay: number = 1500) {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Show the table after the specified delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Ensure the table remains visible even if other scripts try to hide it
  useEffect(() => {
    if (!isVisible || !wrapperRef.current) return;
    
    const observer = new MutationObserver(() => {
      if (wrapperRef.current?.style.display === "none") {
        wrapperRef.current.style.display = "block";
      }
    });

    observer.observe(wrapperRef.current, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, [isVisible]);

  return { isVisible, wrapperRef };
} 