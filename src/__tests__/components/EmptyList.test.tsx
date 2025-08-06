import EmptyList from '@components/EmptyList/EmptyList.tsx';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EMPTY_LIST } from '@/constants/constants.ts';

describe('EmptyList', (): void => {
  it('renders correctly and displays the empty list message', (): void => {
    render(<EmptyList />);
    const emptyListTextElement: HTMLElement = screen.getByText(EMPTY_LIST.TEXT);
    expect(emptyListTextElement).toBeInTheDocument();
  });
});
