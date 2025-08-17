import Card from '@components/CardList/Card/Card';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { character } from '@/constants/tests.ts';
import React from 'react';

const mockPush = vi.fn();
const mockUseSearchParams = vi.fn(() => ({
  toString: () => 'page=2',
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockUseSearchParams(),
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
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

    expect(mockPush).toHaveBeenCalledWith(`/1`);
  });
});
