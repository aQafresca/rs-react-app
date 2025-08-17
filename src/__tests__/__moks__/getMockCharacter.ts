import { baseCharacter } from '@/constants/tests.ts';
import type { TCharacter } from '@/scheme/characterScheme.ts';

export const getMockCharacter = (
  overrides: Partial<TCharacter> = {}
): TCharacter => {
  return {
    ...baseCharacter,
    ...overrides,
    origin: {
      ...baseCharacter.origin,
      ...(overrides.origin ?? {}),
    },
    location: {
      ...baseCharacter.location,
      ...(overrides.location ?? {}),
    },
  };
};
