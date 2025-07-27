import Button from '@components/Button/Button.tsx';
import { describe, expect, it, vi } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';

describe('ButtonElement', (): void => {
  it('renders with text content', (): void => {
    render(<Button></Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('calls onClick handler', (): void => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}></Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('respect disabled prop', (): void => {
    render(<Button disabled></Button>);
    const button: HTMLElement = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
