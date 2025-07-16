import { render, screen } from '@testing-library/react';
import { describe, vi, it, expect, afterEach } from 'vitest';
import * as React from 'react';
import { createMockComponent } from '@/__tests__/__mocks__/createMockComponent.tsx';

let shouldErrorBoundaryThrow = false;

vi.mock('@/components/CardList/CardList.tsx', () => {
  return {
    default: React.lazy(() =>
      Promise.resolve({
        default: createMockComponent('mock-cardList', 'Mock Card List'),
      })
    ),
  };
});

vi.mock('@/components/Header/Header.tsx', () => ({
  default: createMockComponent('mock-header', 'Mock Header'),
}));

vi.mock('@/components/Loader/Loader.tsx', () => ({
  default: createMockComponent('mock-loader', 'Mock Loader'),
}));

vi.mock('@/components/ErrorBoundary/ErrorBoundary.tsx', () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    shouldErrorBoundaryThrow ? (
      <div data-testid="error-fallback">Something went wrong!</div>
    ) : (
      <>{children}</>
    ),
}));

import App from '@/App';

describe('App Component (simplified)', (): void => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    consoleErrorSpy?.mockRestore();
    shouldErrorBoundaryThrow = false;
  });

  it('renders header and loader', (): void => {
    render(<App />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
  });

  it('renders error boundary fallback on error', async (): Promise<void> => {
    consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((): void => {
        vi.fn();
      });
    shouldErrorBoundaryThrow = true;

    render(<App />);
    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-cardList')).not.toBeInTheDocument();
  });
});
