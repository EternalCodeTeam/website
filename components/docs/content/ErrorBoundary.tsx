"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("MDX rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-red-800 dark:text-red-200">
            Error Rendering Content
          </h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">
            There was an error rendering this content. Please refresh the page.
          </p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
              Technical Details
            </summary>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-red-100/50 p-3 text-xs text-red-800 dark:bg-red-900/30 dark:text-red-200">
              {this.state.error?.message}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
