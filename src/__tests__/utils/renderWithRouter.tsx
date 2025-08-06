import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

interface RenderWithRouterOptions {
  initialEntries?: string[];
  path?: string;
}

const renderWithRouter = (
  ui: ReactNode,
  { initialEntries = ['/'], path = '/' }: Partial<RenderWithRouterOptions> = {}
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

export default renderWithRouter;
