import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase.config";
import {
  addOrder,
  authSignUpProvider,
  authSignOutUser,
} from "../firebase/services";
import { Stripe } from "../components/Stripe";
import { Title } from "./pagesStyles";

const StripePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!auth) {
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser((prev) => user);
      }
    });
  }, [auth]);

  const handleClickOrderButton = async () => {
    const result = await addOrder({
      product: "potato",
      weight: 10,
      cost: 3.3,
    });

    console.log(result);
    if (result?.status) {
      alert("send");
    }
  };

  const handleGoogleSignUp = async () => {
    await authSignUpProvider();
  };

  const handleSignOut = async () => {
    const result = await authSignOutUser();

    if (result?.status) {
      setUser((prev) => {});
    }
  };

  return (
    <>
      <Title>StripePage</Title>

      {user?.uid ? (
        <button
          onClick={handleSignOut}
          type="button"
          aria-label="logout button"
        >
          logout
        </button>
      ) : (
        <button
          onClick={handleGoogleSignUp}
          type="button"
          aria-label="sign google button"
        >
          login google
        </button>
      )}

      {user?.uid && <p>{user.email}</p>}

      <div style={{ margin: "20px 0", border: "1px solid black" }}></div>

      <Stripe />
    </>
  );
};

export default StripePage;
