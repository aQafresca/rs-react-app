import { describe, it, vi, expect } from 'vitest';

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
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  redirect: vi.fn(),
  notFound: vi.fn(),
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

import CharacterPage from '../../../../app/[locale]/[id]/page.tsx';
import * as api from '@/core/api/getCharactersById';
import * as apiAll from '@/core/api/getCharacters';
import * as nextNav from 'next/navigation';

vi.mock('@/core/api/getCharactersById');
vi.mock('@/core/api/getCharacters');

describe('CharacterPage', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: '',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
  };

  const mockResponse = {
    info: { count: 1, pages: 1, next: null, prev: null },
    results: [mockCharacter],
  };

  it('renders correctly with valid id', async () => {
    vi.spyOn(api, 'getCharacterById').mockResolvedValue(mockCharacter);
    vi.spyOn(apiAll, 'getCharacters').mockResolvedValue(mockResponse);

    const params: { params: { id: string } } = { params: { id: '1' } };
    const result = await CharacterPage(params);

    expect(result).toBeTruthy();
    expect(result.props.children.props.className).toContain('home');
  });

  it('calls notFound for invalid id', async () => {
    const notFoundMock = vi.spyOn(nextNav, 'notFound');

    const params = { params: { id: 'abc' } };
    await CharacterPage(params);

    expect(notFoundMock).toHaveBeenCalled();
  });
});
