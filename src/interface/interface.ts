import type { TCharacter } from '@/shema/characterShema.ts';

export interface ICardListState {
  loading: boolean;
  characters: TCharacter[];
  currentPage: number;
  totalPages: number;
  query: string;
}
