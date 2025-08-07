import { type JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/Routes.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/api/queryClient.ts';
import { Toaster } from 'react-hot-toast';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position={'top-center'} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
