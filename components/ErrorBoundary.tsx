"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="max-w-2xl px-4">
            <h2 className="mb-4 text-2xl font-bold text-red-500">
              Oops! Something went wrong
            </h2>
            <pre className="mb-4 whitespace-pre-wrap text-sm text-gray-500">
              {this.state.error?.message}
            </pre>
            <Button
              onClick={() => this.setState({ hasError: false })}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface WithErrorBoundaryProps {
  error: Error;
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<WithErrorBoundaryProps>,
): React.ComponentType<P> {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary
        fallback={
          FallbackComponent && (props as WithErrorBoundaryProps).error ? (
            <FallbackComponent
              error={(props as WithErrorBoundaryProps).error}
            />
          ) : undefined
        }
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
