import Card from '@components/CardList/Card/Card.tsx';
import type { TCharacter } from '@/shema/characterShema.ts';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Card component', (): void => {
  const mockCharacter: TCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
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
});
