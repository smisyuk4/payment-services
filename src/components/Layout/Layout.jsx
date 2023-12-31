import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Container, UlStyled } from './Layout.styled';

export const Layout = () => {
  return (
    <>
      <header>
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
              Paypal
            </NavLink>
          </li>
          <li>
            <NavLink to="/wayforpay" aria-label="wayforpay">
              Wayforpay
            </NavLink>
          </li>
        </UlStyled>
      </header>
      <main>
        <Suspense fallback={<p>Loading....</p>}>
          <Container>
            <Outlet />
          </Container>
        </Suspense>
      </main>
      <footer></footer>
    </>
  );
};
