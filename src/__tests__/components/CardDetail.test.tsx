import { render, screen } from '@testing-library/react';
import CardDetail from '@components/CardList/Card/Detail/Detail.tsx';
import { CHAR } from '@/constants/constants';
import { expect, it, describe } from 'vitest';
import { character } from '@/constants/tests.ts';

describe('CardDetail', (): void => {
  it('renders character name', (): void => {
    render(<CardDetail {...character} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      character.name
    );
  });

  it('renders origin label and value', (): void => {
    render(<CardDetail {...character} />);
    expect(screen.getByText(CHAR.ORIGIN)).toBeInTheDocument();
    expect(screen.getByText(character.origin.name)).toBeInTheDocument();
  });

  it('renders location label and value', (): void => {
    render(<CardDetail {...character} />);
    expect(screen.getByText(CHAR.LOCATION)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
  });

  it('renders without crashing when optional props are missing', (): void => {
    render(<CardDetail />);
    expect(screen.queryByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
