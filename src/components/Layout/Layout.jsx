import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UlStyled } from './Layout.styled';

export const Layout = () => {
  return (
    <div>
      <UlStyled>
        <li>
          <NavLink to="/" aria-label="home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/monobank" aria-label="monobank">
            Monobank
          </NavLink>
        </li>
        <li>
          <NavLink to="/liqpay" aria-label="liqpay">
            Liqpay
          </NavLink>
        </li>
        <li>
          <NavLink to="/paypal" aria-label="paypal">
            Liqpay
          </NavLink>
        </li>
        <li>
          <NavLink to="/wayforpay" aria-label="wayforpay">
            wayforpay
          </NavLink>
        </li>
      </UlStyled>

      <Suspense fallback={<p>Loading....</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
