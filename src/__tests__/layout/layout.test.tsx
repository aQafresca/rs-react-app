import { render, screen } from '@testing-library/react';
import { describe, vi, it, expect, afterEach } from 'vitest';
import * as React from 'react';
import { createMockComponent } from '@/__tests__/__mocks__/createMockComponent.tsx';
import Layout from '@/layout/Layout.tsx';

let shouldErrorBoundaryThrow = false;

vi.mock('@/components/CardList/CardList.tsx', () => ({
  default: React.lazy(() =>
    Promise.resolve({
      default: createMockComponent('mock-cardList', 'Mock Card List'),
    })
  ),
}));

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

describe('App Component (simplified)', (): void => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  afterEach((): void => {
    consoleErrorSpy?.mockRestore();
    shouldErrorBoundaryThrow = false;
  });

  it('renders header', (): void => {
    render(<Layout />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders error boundary fallback on error', async (): Promise<void> => {
    consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((): void => {
        vi.fn();
      });
    shouldErrorBoundaryThrow = true;

    render(<Layout />);
    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-cardList')).not.toBeInTheDocument();
  });
});
