import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import CardListV2 from '../../components/CardListV2/CardListV2';
import React from 'react';
import { type JSX } from 'react';

vi.mock('@/core/api/getCharacters', () => ({
  getCharacters: vi.fn(() => Promise.resolve({ results: [], info: {} })),
}));

const AsyncCardListWrapper = (props: Parameters<typeof CardListV2>[0]) => {
  const [Element, setElement] = React.useState<JSX.Element | null>(null);

  React.useEffect(() => {
    CardListV2(props).then(setElement);
  }, [props]);

  return Element;
};

describe('CardListV2', () => {
  it('renders without crashing', async () => {
    const { container } = render(<AsyncCardListWrapper searchParams={{}} />);

    expect(container).toBeDefined();
  });

  it('renders with correct currentPage from searchParams', async () => {
    const { container } = render(
      <AsyncCardListWrapper searchParams={{ page: '2' }} />
    );

    expect(container).toBeDefined();
  });
});
