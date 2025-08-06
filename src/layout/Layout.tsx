import { Outlet } from 'react-router';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.tsx';
import Loader from '@components/Loader/Loader.tsx';
import { Suspense } from 'react';
import Header from '@components/Header/Header.tsx';

const Layout = () => {
  return (
    <ErrorBoundary>
      <Header />
      <main className="container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </ErrorBoundary>
  );
};

export default Layout;
