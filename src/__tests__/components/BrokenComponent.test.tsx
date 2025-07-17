import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.tsx';
import BrokenComponent from '@components/BrokenComponent/BrokenComponent.tsx';
import { describe, vi, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ErrorBoundary with BrokenComponent', (): void => {
  it('should catch render error and show fallback UI', (): void => {
    vi.spyOn(console, 'error').mockImplementation((): undefined => undefined);

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
    vi.resetAllMocks();
  });
});
