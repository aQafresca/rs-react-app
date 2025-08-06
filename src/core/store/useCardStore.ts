import { create } from 'zustand/react';
import type { TCharacter } from '@/shema/characterShema.ts';

interface ICardState {
  selected: Record<number, TCharacter>;
  add: (char: TCharacter) => void;
  remove: (id: number) => void;
  toggle: (char: TCharacter) => void;
  clear: () => void;
}

export const useCardStore = create<ICardState>((set, get) => ({
  selected: {},

  add: (char): void => {
    set((state) => ({
      selected: { ...state.selected, [char.id]: char },
    }));
  },

  remove: (id): void => {
    set((state) => {
      const updated = { ...state.selected };
      delete updated[id];
      return { selected: updated };
    });
  },

  toggle: (char): void => {
    const selected = get().selected;
    if (selected[char.id]) {
      get().remove(char.id);
    } else {
      get().add(char);
    }
  },

  clear: (): void => set({ selected: {} }),
}));
