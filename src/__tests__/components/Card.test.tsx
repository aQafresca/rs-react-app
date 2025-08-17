import Card from '@components/CardList/Card/Card';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { character } from '@/constants/tests.ts';

const mockPush = vi.fn();
const mockUseSearchParams = vi.fn(() => ({
  toString: () => 'page=2',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockUseSearchParams(),
  useLocale: () => 'en',
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} alt={character.name} />;
  },
}));

describe('Card component', (): void => {
  beforeEach((): void => {
    mockPush.mockClear();
  });

  it('renders character info correctly', (): void => {
    render(<Card {...character} />);

    expect(
      screen.getByRole('heading', { name: character.name })
    ).toBeInTheDocument();

    const img: HTMLImageElement = screen.getByRole('img');
    expect(img).toHaveAttribute('src', character.image);
    expect(img).toHaveAttribute('alt', character.name);

    [character.gender, character.status, character.species].forEach(
      (text): void => {
        expect(screen.getByText(text)).toBeInTheDocument();
      }
    );
  });

  it('calls router.push on card click', (): void => {
    render(<Card {...character} />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockPush).toHaveBeenCalledWith(`/${'en'}/${character.id}?page=2`);
  });
});
