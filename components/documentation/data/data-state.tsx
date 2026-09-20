"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

export function ReferenceErrorState({ label }: { readonly label: string }) {
  return (
    <div className="docs-reference-error" role="alert">
      <TriangleAlert aria-hidden="true" size={19} />
      <div>
        <strong>{label} are temporarily unavailable.</strong>
        <p>The guide still works; only live reference data could not be loaded.</p>
      </div>
      <button onClick={() => window.location.reload()} type="button">
        <RefreshCw aria-hidden="true" size={15} /> Retry
      </button>
    </div>
  );
}
