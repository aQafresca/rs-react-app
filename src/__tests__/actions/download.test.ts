import { describe, it, expect } from 'vitest';
import { createCsv } from '@/actions/download.ts';

import type { TCharacter } from '@/scheme/characterScheme';

async function blobToString(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });
}

describe('createCsv', () => {
  it('creates a CSV from an array of characters', async () => {
    const characters: TCharacter[] = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://example.com/rick.png',
        origin: { name: 'Earth (C-137)', url: 'https://example.com/earth' },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://example.com/earth-replacement',
        },
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://example.com/morty.png',
        origin: { name: 'Earth (C-137)', url: 'https://example.com/earth' },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://example.com/earth-replacement',
        },
      },
    ];

    const blob = await createCsv(characters);

    expect(blob).toBeInstanceOf(Blob);

    const text = await blobToString(blob);

    expect(text).toContain('"ID","Name","Status","Species","Gender"');
    expect(text).toContain('Rick Sanchez');
    expect(text).toContain('Morty Smith');
  });
});
