import { describe, it, vi, expect } from 'vitest';
import CharacterPage from '../../../../app/[locale]/[id]/page.tsx';
import * as api from '@/core/api/getCharactersById';
import * as apiAll from '@/core/api/getCharacters';
import * as nextNav from 'next/navigation';

vi.mock('@/core/api/getCharactersById');
vi.mock('@/core/api/getCharacters');
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

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
    (api.getCharacterById as any).mockResolvedValue(mockCharacter);
    (apiAll.getCharacters as any).mockResolvedValue(mockResponse);

    const params = { params: { id: '1' } };
    const result = await CharacterPage(params as any);

    expect(result).toBeTruthy();
    expect(result.props.children.props.className).toContain('home');
  });

  it('calls notFound for invalid id', async () => {
    const notFoundMock = vi.spyOn(nextNav, 'notFound');

    const params = { params: { id: 'abc' } };
    await CharacterPage(params as any);

    expect(notFoundMock).toHaveBeenCalled();
  });
});
