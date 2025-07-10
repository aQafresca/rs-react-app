import Header from '@components/Header/Header.tsx';
import Loader from '@components/Loader/Loader.tsx';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.tsx';
import { Suspense } from 'react';
import type { JSX } from 'react';
import CardList from '@components/CardList/CardList.tsx';

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <>
        <Header />
        <main className="container">
          <Suspense fallback={<Loader />}>
            <CardList />
          </Suspense>
        </main>
      </>
    </ErrorBoundary>
  );
}

export default App;
