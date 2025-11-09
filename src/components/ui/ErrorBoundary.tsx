import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Algo correu mal</h2>
            <p className="mb-6 text-gray-600">
              Pedimos desculpa pelo inconveniente. Por favor, tente recarregar a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
