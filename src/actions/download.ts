'use server';

import type { TCharacter } from '@/scheme/characterScheme.ts';
import { HEADER_CSV } from '@/constants/constants.ts';

export async function createCsv(characters: TCharacter[]): Promise<Blob> {
  const rows = characters.map((char: TCharacter): (string | number)[] => [
    char.id,
    char.name,
    char.status,
    char.species,
    char.gender,
  ]);

  const csvContent: string = [HEADER_CSV, ...rows]
    .map((row: (string | number)[]): string =>
      row.map((cell: string | number): string => `"${cell}"`).join(',')
    )
    .join('\n');
  return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
}
