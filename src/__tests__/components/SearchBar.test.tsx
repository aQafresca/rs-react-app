import SearchBar from '@components/SearchBar/SearchBar.tsx';
import * as React from 'react';
import { vi, it, describe, beforeEach, afterEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PLACEHOLDERS, LOCALSTORAGE_KEYS } from '@/constants/constants.ts';

vi.mock('@components/BrokenComponent/BrokenComponent.tsx', () => ({
  default: () => <div data-testid="mock-broken-component">Broken!</div>,
}));

vi.mock('@components/Button/Button.tsx', () => ({
  default: ({
    children,

    onClick,
  }: {
    children: React.ReactNode;

    onClick: () => void;
  }) => (
    <button type="button" onClick={onClick} data-testid="mock-button">
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

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string): string | null => store[key] || null),

    setItem: vi.fn((key: string, value: string): void => {
      store[key] = value;
    }),

    clear: vi.fn((): void => {
      store = {};
    }),

    removeItem: vi.fn((key: string): void => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('SearchBar', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();

    localStorageMock.clear();
  });

  afterEach((): void => {
    vi.restoreAllMocks();
  });

  it('renders input and buttons with correct placeholders/labels', (): void => {
    render(<SearchBar />);

    expect(
      screen.getByPlaceholderText(PLACEHOLDERS.SEARCH)
    ).toBeInTheDocument();

    expect(screen.getByTestId('mock-input')).toHaveValue('');

    const searchButton: HTMLElement = screen.getAllByTestId('mock-button')[0];

    expect(searchButton).toBeInTheDocument();
  });

  it('loads saved search query from localStorage on mount', (): void => {
    const savedQuery = 'rick and morty';

    localStorageMock.setItem(LOCALSTORAGE_KEYS.SEARCH_QUERY, savedQuery);

    render(<SearchBar />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(
      LOCALSTORAGE_KEYS.SEARCH_QUERY
    );

    expect(screen.getByTestId('mock-input')).toHaveValue(savedQuery);
  });

  it('updates input value on change without trimming', (): void => {
    render(<SearchBar />);

    const inputElement: HTMLElement = screen.getByTestId('mock-input');

    fireEvent.change(inputElement, { target: { value: ' new query ' } });

    expect(inputElement).toHaveValue(' new query ');
  });

  it('saves query to localStorage on search button click', (): void => {
    render(<SearchBar />);

    const inputElement: HTMLElement = screen.getByTestId('mock-input');

    const searchButton: HTMLElement = screen.getAllByTestId('mock-button')[0];

    fireEvent.change(inputElement, { target: { value: 'test search' } });

    fireEvent.click(searchButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      LOCALSTORAGE_KEYS.SEARCH_QUERY,

      'test search'
    );
  });
});
