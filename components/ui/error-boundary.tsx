"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    // TODO: Report to error tracking service in production
  }

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
              Something went wrong
            </h2>
            <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
              We encountered an error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === "development" && error && (
              <pre className="mb-4 max-w-full overflow-auto rounded bg-gray-100 p-3 text-left text-red-700 text-xs dark:bg-gray-800 dark:text-red-300">
                {error.message}
              </pre>
            )}
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-600"
              onClick={() => this.setState({ hasError: false, error: null })}
              type="button"
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
