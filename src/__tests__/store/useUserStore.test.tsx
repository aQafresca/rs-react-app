import { useUserStore } from '@components/core/store/useIUserStore.ts';
import { describe, it, expect } from 'vitest';

describe('useUserStore', () => {
  it('initial state is null', () => {
    const state = useUserStore.getState();

    expect(state.userData).toBeNull();
  });

  it('setUserData updates the store', () => {
    const { setUserData } = useUserStore.getState();

    setUserData({ email: 'test@example.com', name: 'John' });

    const state = useUserStore.getState();

    expect(state.userData).toEqual({ email: 'test@example.com', name: 'John' });
  });

  it('setUserData merges data with existing state', () => {
    const { setUserData } = useUserStore.getState();

    setUserData({ age: '30' });

    const state = useUserStore.getState();

    expect(state.userData).toEqual({ email: 'test@example.com', name: 'John', age: '30' });
  });

  it('clearUserData resets the store to null', () => {
    const { clearUserData } = useUserStore.getState();

    clearUserData();

    const state = useUserStore.getState();

    expect(state.userData).toBeNull();
  });
});
