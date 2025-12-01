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
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Error Rendering Content
          </h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">
            There was an error rendering this content. Please try refreshing the page or contact
            support if the problem persists.
          </p>
          <details className="mt-4 text-sm text-red-600 dark:text-red-400">
            <summary className="cursor-pointer">Technical Details</summary>
            <pre className="mt-2 whitespace-pre-wrap rounded-md bg-red-100 p-2 dark:bg-red-900">
              {this.state.error?.message}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
