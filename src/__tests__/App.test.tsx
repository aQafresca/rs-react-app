import { render, screen } from '@testing-library/react';
import { describe, vi, it, expect, afterEach } from 'vitest';
import App from '@/App'; // Путь к вашему App компоненту

vi.mock('@/routes/Routes.tsx', () => ({
  default: vi.fn(() => (
    <div data-testid="mock-app-routes">Mock App Routes</div>
  )),
}));

describe('App Component', (): void => {
  afterEach((): void => {
    vi.restoreAllMocks();
  });

  it('renders BrowserRouter and AppRoutes', (): void => {
    render(<App />);

    expect(screen.getByTestId('mock-app-routes')).toBeInTheDocument();
  });
});
