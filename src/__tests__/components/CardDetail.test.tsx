import { render, screen } from '@testing-library/react';
import CardDetail from '@components/CardList/Card/Detail/Detail';
import { describe, it, expect, vi } from 'vitest';
import { character } from '@/constants/tests.ts';

vi.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: string): string =>
      key,
}));

describe('CardDetail', () => {
  it('renders character name if provided', (): void => {
    render(<CardDetail {...character} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(character.name);
  });

  it('renders origin label and value if provided', (): void => {
    render(<CardDetail {...character} />);
    expect(screen.getByText('char.origin')).toBeInTheDocument();
    expect(screen.getByText(character.origin.name)).toBeInTheDocument();
  });

  it('renders location label and value if provided', (): void => {
    render(<CardDetail {...character} />);
    expect(screen.getByText('char.location')).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
  });

  it('renders safely without props', (): void => {
    render(<CardDetail />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('');

    const originLabel = screen.getByText('char.origin');
    expect(originLabel).toBeInTheDocument();

    const locationLabel = screen.getByText('char.location');
    expect(locationLabel).toBeInTheDocument();
  });
});
