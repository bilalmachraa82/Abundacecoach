/**
 * Test Utilities
 * Reusable test helpers following 2025 best practices
 */
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Custom render function with common providers
 * Best Practice: Create reusable test helpers
 */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Mock localStorage for tests
 */
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
