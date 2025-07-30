import { createRoot } from 'react-dom/client';
import { describe, it } from 'vitest';
import { act } from 'react';
import App from '@/App';

describe('App main test', (): void => {
  it('App must be rendered without crashing', (): void => {
    const root: HTMLDivElement = document.createElement('div');
    act((): void => {
      createRoot(root).render(<App />);
    });
  });
});
