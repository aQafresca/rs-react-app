import Layout from '@/layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/constants.ts';
import { lazy } from 'react';
import CardDetailPanel from '@components/CardList/Card/Detail/Panel/Panel.tsx';

const HomePage = lazy(() => import('@components/pages/Home/Home'));
const AboutPage = lazy(() => import('@components/pages/About/About.tsx'));
const NotFoundPage = lazy(() => import('@components/pages/NotFound/NotFound'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />}>
          <Route path=":id" element={<CardDetailPanel />} />
        </Route>
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      </Route>
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
