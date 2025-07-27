import { type JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/Routes.tsx';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
