import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from '../../app/[locale]/error';
import { BUTTON_LABELS } from '@/constants/constants.ts';

describe('GlobalError', (): void => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  it('renders error message', () => {
    const error = new Error('Test error');
    const reset = vi.fn();

    render(<GlobalError error={error} reset={reset} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Something went wrong.'
    );
  });

  it('renders reload button', (): void => {
    const error = new Error('Test error');
    const reset = vi.fn();

    render(<GlobalError error={error} reset={reset} />);

    const button = screen.getByRole('button', { name: BUTTON_LABELS.RELOAD });
    expect(button).toBeInTheDocument();
  });

  it('calls reset function on button click', (): void => {
    const error = new Error('Test error');
    const reset = vi.fn();

    render(<GlobalError error={error} reset={reset} />);

    const button = screen.getByRole('button', { name: BUTTON_LABELS.RELOAD });
    fireEvent.click(button);

    expect(reset).toHaveBeenCalled();
  });

  it('logs error to console', (): void => {
    const error = new Error('Test error');
    const reset = vi.fn();

    render(<GlobalError error={error} reset={reset} />);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Caught by GlobalError:',
      error
    );
  });
});
