"use client";

import React, { useEffect, useState, useRef } from "react";

interface TableContainerProps {
  children: React.ReactNode;
  id: string;
}

export default function TableContainer({ children, id }: TableContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

 
  useEffect(() => {
    if (isVisible && containerRef.current) {
     
      const observer = new MutationObserver(() => {
        if (containerRef.current && containerRef.current.style.display === 'none') {
          containerRef.current.style.display = 'block';
        }
      });
      
      observer.observe(containerRef.current, { 
        attributes: true, 
        attributeFilter: ['style'] 
      });
      
      return () => observer.disconnect();
    }
  }, [isVisible]);

  return (
    <div 
      id={id}
      ref={containerRef} 
      style={{ 
        display: isVisible ? 'block' : 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      {children}
    </div>
  );
} 