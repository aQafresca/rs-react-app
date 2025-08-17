import SearchBar from '@components/SearchBar/SearchBar.tsx';
import * as React from 'react';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const replaceMock = vi.fn();
const searchParamsMock = {
  get: vi.fn(),
  toString: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: () => searchParamsMock,
}));

const refreshMock = vi.fn();
vi.mock('@/hooks/useCharactersRefresh.ts', () => ({
  useCharactersRefresh: () => refreshMock,
}));

// Моки для дочерних компонентов
vi.mock('@components/Button/Button.tsx', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button data-testid="mock-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('@components/Input/Input.tsx', () => ({
  default: ({
    placeholder,
    value,
    onChange,
  }: {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <input
      data-testid="mock-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParamsMock.get.mockReturnValue('');
    searchParamsMock.toString.mockReturnValue('');
  });

  it('renders input and buttons with correct placeholders/labels', (): void => {
    render(<SearchBar />);

    expect(
      screen.getByPlaceholderText('SearchBar.placeholders.search')
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-input')).toHaveValue('');

    const buttons = screen.getAllByTestId('mock-button');
    expect(buttons).toHaveLength(2);
  });

  it('updates input value on change', (): void => {
    render(<SearchBar />);

    const input = screen.getByTestId('mock-input');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(input).toHaveValue('new query');
  });

  it('calls router.replace with new query on search button click', (): void => {
    render(<SearchBar />);

    const input = screen.getByTestId('mock-input');
    const searchButton = screen.getAllByTestId('mock-button')[0];

    fireEvent.change(input, { target: { value: 'rick and morty' } });
    fireEvent.click(searchButton);

    expect(replaceMock).toHaveBeenCalledWith(
      expect.stringContaining('name=rick+and+morty')
    );
  });

  it('calls refreshCharacters when refresh button is clicked', (): void => {
    render(<SearchBar />);

    const refreshButton = screen.getAllByTestId('mock-button')[1];
    fireEvent.click(refreshButton);

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
