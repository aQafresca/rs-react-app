import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/[locale]/page.tsx';

vi.mock('@components/SearchBar/SearchBar.tsx', () => ({
  default: () => <div data-testid="mock-searchbar">SearchBar</div>,
}));

vi.mock('@components/CardListV2/CardListV2.tsx', () => ({
  default: ({
    searchParams,
  }: {
    searchParams: { page?: string; name?: string };
  }) => (
    <div data-testid="mock-cardlist">
      CardListV2 - {JSON.stringify(searchParams)}
    </div>
  ),
}));

describe('Home page', () => {
  it('renders SearchBar and CardListV2 with empty searchParams', async () => {
    const searchParams = {};
    const { container } = render(await Home({ searchParams }));

    expect(screen.getByTestId('mock-searchbar')).toBeInTheDocument();

    expect(screen.getByTestId('mock-cardlist')).toHaveTextContent(
      'CardListV2 - {}'
    );

    expect(container).toBeTruthy();
  });

  it('renders CardListV2 with given searchParams', async () => {
    const searchParams = { page: '2', name: 'rick' };
    const { container } = render(await Home({ searchParams }));

    expect(screen.getByTestId('mock-cardlist')).toHaveTextContent(
      'CardListV2 - {"page":"2","name":"rick"}'
    );
    expect(container).toBeTruthy();
  });
});
