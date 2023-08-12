import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Layout = lazy(() => import('../Layout'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const MonobankPage = lazy(() => import('../../pages/MonobankPage'));
const LiqpayPage = lazy(() => import('../../pages/LiqpayPage'));
const PaypalPage = lazy(() => import('../../pages/PaypalPage'));
const WayforpayPage = lazy(() => import('../../pages/WayforpayPage'));

// import { DivStyled } from './App.styled';

export const App = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="monobank" element={<MonobankPage />} />
          <Route path="liqpay" element={<LiqpayPage />} />
          <Route path="paypal" element={<PaypalPage />} />
          <Route path="wayforpay" element={<WayforpayPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
