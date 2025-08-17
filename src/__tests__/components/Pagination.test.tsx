import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@components/Pagination/Pagination.tsx';
import { ELLIPSIS } from '@/constants/constants.ts';

vi.mock('@components/Button/Button.tsx', () => ({
  default: ({
    children,
    onClick,
    disabled,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-testid="pagination-button"
    >
      {children}
    </button>
  ),
}));

const replaceMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Pagination (Next.js)', (): void => {
  beforeEach(() => {
    replaceMock.mockReset();
  });

  it('disables prev button on first page', (): void => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons[0]).toBeDisabled();
  });

  it('enables prev button and calls router.replace on click', (): void => {
    render(<Pagination currentPage={2} totalPages={5} />);
    const buttons = screen.getAllByTestId('pagination-button');
    const prevButton = buttons[0];
    expect(prevButton).not.toBeDisabled();

    fireEvent.click(prevButton);
    expect(replaceMock).toHaveBeenCalledWith('?');
  });

  it('disables next button on last page', (): void => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons.at(-1)).toBeDisabled();
  });

  it('enables next button and calls router.replace on click', (): void => {
    render(<Pagination currentPage={4} totalPages={5} />);
    const buttons = screen.getAllByTestId('pagination-button');
    const nextButton = buttons.at(-1)!;
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(replaceMock).toHaveBeenCalledWith('?page=5');
  });

  it('calls router.replace when page number is clicked', (): void => {
    render(<Pagination currentPage={2} totalPages={5} />);
    const buttons = screen.getAllByTestId('pagination-button');
    const pageButton = buttons.find((btn) => btn.textContent === '3')!;
    fireEvent.click(pageButton);
    expect(replaceMock).toHaveBeenCalledWith('?page=3');
  });

  it('highlights current page as active', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    const activeButton = screen
      .getAllByTestId('pagination-button')
      .find((btn) => btn.className.includes('is-active'));
    expect(activeButton).toHaveTextContent('3');
  });

  it('disables ellipsis buttons and does not call router.replace', () => {
    render(<Pagination currentPage={10} totalPages={20} />);
    const ellipsisButtons = screen
      .getAllByTestId('pagination-button')
      .filter((btn) => btn.textContent === ELLIPSIS);

    for (const btn of ellipsisButtons) {
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
    }
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('handles totalPages = 1', () => {
    render(<Pagination currentPage={1} totalPages={1} />);
    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons.length).toBe(3);
    expect(buttons[0]).toBeDisabled();
    expect(buttons.at(-1)).toBeDisabled();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText(ELLIPSIS)).toBeNull();

    fireEvent.click(screen.getByText('1'));
    expect(replaceMock).toHaveBeenCalledWith('?');
  });
});
