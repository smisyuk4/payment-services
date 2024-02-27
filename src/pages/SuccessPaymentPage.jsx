import { Link } from "react-router-dom";

import { Title } from "./pagesStyles";

const SuccessPaymentPage = () => {
  // if (window.location.pathname === "/success") {
  //   // Замінити поточний запис історії на "success"
  //   window.history.replaceState(
  //     { page: "success" },
  //     "Success Page",
  //     "/success"
  //   );
  // }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <Title>congratulations</Title>
      <p style={{ marginTop: "-30px" }}>you have made a successful payment</p>

      <Link
        to={"/"}
        aria-label="home"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100px",
          padding: "10px",
          border: "1px solid red",
          borderRadius: "10px",
        }}
      >
        home
      </Link>
      <Link
        to={"https://rozetka.com.ua/ua/"}
        aria-label="shop"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100px",
          padding: "10px",
          border: "1px solid red",
          borderRadius: "10px",
        }}
      >
        shop
      </Link>
    </div>
  );
};

export default SuccessPaymentPage;
