import Card from '@components/CardList/Card/Card.tsx';
import type { TCharacter } from '@/shema/characterShema.ts';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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
  const mockCharacter: TCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    origin: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3 ',
    },
    location: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
  };
  it('renders character info correctly', (): void => {
    render(<Card {...mockCharacter} />);
    expect(
      screen.getByRole('heading', { name: mockCharacter.name })
    ).toBeInTheDocument();

    const img: HTMLImageElement = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);

    [mockCharacter.gender, mockCharacter.status, mockCharacter.species].forEach(
      (text: string): void => {
        expect(screen.getByText(text)).toBeInTheDocument();
      }
    );
  });
  it('calls navigate on card click', () => {
    render(<Card {...mockCharacter} />);
    screen.getByRole('button').click();

    expect(mockNavigate).toHaveBeenCalledWith('/1?page=2');
  });
});
