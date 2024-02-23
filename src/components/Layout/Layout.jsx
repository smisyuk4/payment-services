import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Container, UlStyled } from "./Layout.styled";

const links = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/monobank",
    text: "Monobank",
  },
  {
    path: "/liqpay",
    text: "Liqpay",
  },
  {
    path: "/paypal",
    text: "Paypal",
  },
  {
    path: "/wayforpay",
    text: "Wayforpay",
  },
  {
    path: "/stripe",
    text: "Stripe",
  },
];

export const Layout = () => {
  return (
    <>
      <header>
        <UlStyled>
          {links.map(({ path, text }, idx) => (
            <li key={idx}>
              <NavLink to={path} aria-label={text}>
                {text}
              </NavLink>
            </li>
          ))}
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
