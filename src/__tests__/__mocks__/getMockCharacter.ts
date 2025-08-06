import { baseCharacter } from '@/constants/tests.ts';
import type { TCharacter } from '@/shema/characterShema.ts';

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
