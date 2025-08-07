import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import renderWithRouter from '@/__tests__/utils/renderWithRouter.tsx';

export const renderWithProviders = (
  ui: React.ReactElement,
  { path = '/', initialEntries = ['/'] } = {}
) => {
  const queryClient = new QueryClient();

  return renderWithRouter(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    { path, initialEntries }
  );
};
