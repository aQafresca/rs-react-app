import Card from '@components/CardList/Card/Card.tsx';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { character } from '@/constants/tests.ts';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ search: '?page=2' }),
  };
});

describe('Card component', (): void => {
  it('renders character info correctly', (): void => {
    render(<Card {...character} />);
    expect(
      screen.getByRole('heading', { name: character.name })
    ).toBeInTheDocument();

    const img: HTMLImageElement = screen.getByRole('img');
    expect(img).toHaveAttribute('src', character.image);
    expect(img).toHaveAttribute('alt', character.name);

    [character.gender, character.status, character.species].forEach(
      (text: string): void => {
        expect(screen.getByText(text)).toBeInTheDocument();
      }
    );
  });
  it('calls navigate on card click', () => {
    render(<Card {...character} />);
    screen.getByRole('button').click();

    expect(mockNavigate).toHaveBeenCalledWith('/1?page=2');
  });
});
