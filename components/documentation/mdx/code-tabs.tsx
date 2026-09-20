"use client";

import { Children, isValidElement, type ReactElement, type ReactNode, useState } from "react";

interface CodeTabProps {
  readonly children: ReactNode;
  readonly label: string;
}

export function CodeTab({ children }: CodeTabProps) {
  return <div className="docs-code-tab-panel">{children}</div>;
}

export function CodeTabs({ children }: { readonly children: ReactNode }) {
  const tabs = Children.toArray(children).filter((child): child is ReactElement<CodeTabProps> =>
    isValidElement<CodeTabProps>(child)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex] ?? tabs[0];

  return (
    <div className="docs-code-tabs">
      <div aria-label="Code examples" className="docs-code-tab-list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            aria-selected={index === activeIndex}
            className="docs-code-tab-trigger"
            key={`${tab.props.label}-${index}`}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{activeTab}</div>
    </div>
  );
}
