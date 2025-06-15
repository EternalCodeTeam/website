"use client";

import React, { useEffect, useState, useRef } from "react";

interface TableWrapperProps {
  children: React.ReactNode;
  id: string;
}

export default function TableWrapper({ children, id }: TableWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && wrapperRef.current) {
      const observer = new MutationObserver(() => {
        if (wrapperRef.current && wrapperRef.current.style.display === "none") {
          wrapperRef.current.style.display = "block";
        }
      });

      observer.observe(wrapperRef.current, {
        attributes: true,
        attributeFilter: ["style"],
      });

      return () => observer.disconnect();
    }
  }, [isVisible]);

  return (
    <div
      id={id}
      ref={wrapperRef}
      style={{
        display: isVisible ? "block" : "none",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}
