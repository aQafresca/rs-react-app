import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx';
import { BUTTON_LABELS } from '@/constants/constants.ts';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', (): void => {
  it('renders children when no error', (): void => {
    render(
      <ErrorBoundary>
        <div>All good</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders fallback UI when error is thrown in children', (): void => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((): void => {
        vi.fn();
      });

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BUTTON_LABELS.RELOAD })
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('reload button calls window.location.reload', (): void => {
    const originalLocation = window.location;

    const mockLocation = {
      ...originalLocation,
      reload: vi.fn(),
    };

    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: mockLocation,
    });

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((): void => {
        vi.fn();
      });

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const reloadButton: HTMLElement = screen.getByRole('button', {
      name: BUTTON_LABELS.RELOAD,
    });
    fireEvent.click(reloadButton);

    expect(mockLocation.reload).toHaveBeenCalled();

    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation,
    });

    consoleErrorSpy.mockRestore();
  });
});
