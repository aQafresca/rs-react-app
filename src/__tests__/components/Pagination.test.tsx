import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
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
      type={'button'}
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-testid="pagination-button"
    >
      {children}
    </button>
  ),
}));

describe('Pagination', (): void => {
  it('renders correct number of pagination buttons', (): void => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(): void => {
          vi.fn();
        }}
      />
    );
    const buttons: HTMLElement[] = screen.getAllByTestId('pagination-button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('disables prev button on first page', (): void => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(): void => {
          vi.fn();
        }}
      />
    );
    const buttons: HTMLElement[] = screen.getAllByTestId('pagination-button');
    expect(buttons[0]).toBeDisabled();
  });

  it('enables prev button on pages other than first and calls onPageChange', (): void => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    const prevButton: HTMLElement =
      screen.getAllByTestId('pagination-button')[0];
    expect(prevButton).not.toBeDisabled();

    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(onPageChange).toHaveBeenCalledTimes(1);
  });

  it('disables next button on last page', (): void => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={(): void => {
          vi.fn();
        }}
      />
    );
    const buttons: HTMLElement[] = screen.getAllByTestId('pagination-button');
    expect(buttons.at(-1)).toBeDisabled();
  });

  it('enables next button on pages other than last and calls onPageChange', (): void => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={4} totalPages={5} onPageChange={onPageChange} />
    );

    const buttons: HTMLElement[] = screen.getAllByTestId('pagination-button');

    expect(buttons.length).toBeGreaterThan(0);

    const nextButton: HTMLElement = buttons[buttons.length - 1];

    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(5);
    expect(onPageChange).toHaveBeenCalledTimes(1);
  });

  it('calls onPageChange when page number is clicked', (): void => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    const buttons: HTMLElement[] = screen.getAllByTestId('pagination-button');

    const pageButton: HTMLElement | undefined = buttons.find(
      (btn: HTMLElement): boolean => btn.textContent === '3'
    );
    fireEvent.click(pageButton!);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('highlights current page as active', (): void => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={(): void => {
          vi.fn();
        }}
      />
    );
    const activeButton: HTMLElement | undefined = screen
      .getAllByTestId('pagination-button')
      .find((btn: HTMLElement): boolean =>
        btn.className?.includes('is-active')
      );

    expect(activeButton).toHaveTextContent('3');
  });

  it('disables ellipsis buttons and does not call onPageChange when clicked', (): void => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        onPageChange={onPageChange}
      />
    );
    const ellipsisButtons: HTMLElement[] = screen
      .getAllByTestId('pagination-button')
      .filter((btn: HTMLElement): boolean => btn.textContent === ELLIPSIS);

    expect(ellipsisButtons.length).toBeGreaterThan(0);
    for (const btn of ellipsisButtons) {
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
    }
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('handles totalPages = 1: shows only one page, disables both arrows', (): void => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
    );

    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons.length).toBe(3);
    expect(buttons[0]).toBeDisabled();
    expect(buttons.at(-1)).toBeDisabled();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText(ELLIPSIS)).toBeNull();

    fireEvent.click(screen.getByText('1'));
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(onPageChange).toHaveBeenCalledTimes(1);
  });
});
