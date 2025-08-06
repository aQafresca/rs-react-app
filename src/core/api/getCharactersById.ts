import { CharacterSchema, type TCharacter } from '@/shema/characterShema.ts';
import { API_URL } from '@/constants/constants.ts';

export const getCharacterById = async (id: number): Promise<TCharacter> => {
  const response = await fetch(`${API_URL.ID}${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Character with ID ${id} not found.`);
    }

    throw new Error(
      `Network response was not ok: ${response.statusText} (Status: ${response.status})`
    );
  }

  const data: unknown = await response.json();

  return CharacterSchema.parse(data);
};
