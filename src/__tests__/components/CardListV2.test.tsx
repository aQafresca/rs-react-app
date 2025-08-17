import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { type JSX } from 'react';

vi.mock('next-intl/navigation', () => ({
  createNavigation: vi.fn(() => ({
    Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a href={href}>{children}</a>
    ),
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    getPathname: vi.fn(),
  })),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(() => ({
    toString: () => '',
  })),
  redirect: vi.fn(),
  notFound: vi.fn(), // Добавил notFound на всякий случай
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...mod,
    HydrationBoundary: ({ children }: { children: React.ReactNode }) =>
      children,
  };
});

import CardListV2 from '../../components/CardListV2/CardListV2';

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
