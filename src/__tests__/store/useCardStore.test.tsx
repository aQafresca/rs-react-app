import { describe, it, expect, beforeEach } from 'vitest';
import { useCardStore } from '@/core/store/useCardStore.ts';
import { getMockCharacter } from '@/__tests__/__moks__/getMockCharacter.ts';

describe('useCardStore', (): void => {
  beforeEach(() => {
    useCardStore.setState({ selected: {} });
  });

  it('should add a character', (): void => {
    const char = getMockCharacter();
    useCardStore.getState().add(char);
    expect(useCardStore.getState().selected[1]).toEqual(char);
    expect(Object.keys(useCardStore.getState().selected).length).toBe(1);
  });

  it('should toggle a character (add if not present)', (): void => {
    const char = getMockCharacter();
    useCardStore.getState().toggle(char);
    expect(useCardStore.getState().selected[1]).toEqual(char);
    expect(Object.keys(useCardStore.getState().selected).length).toBe(1);
  });

  it('should toggle a character (remove if present)', (): void => {
    const char = getMockCharacter();
    useCardStore.setState({ selected: { [char.id]: char } });

    useCardStore.getState().toggle(char);
    expect(useCardStore.getState().selected[1]).toBeUndefined();
    expect(Object.keys(useCardStore.getState().selected).length).toBe(0);
  });

  it('should clear all characters', (): void => {
    const char1 = getMockCharacter();
    useCardStore.setState({ selected: { [char1.id]: char1 } });

    useCardStore.getState().clear();
    expect(Object.keys(useCardStore.getState().selected).length).toBe(0);
    expect(useCardStore.getState().selected).toEqual({});
  });
});
