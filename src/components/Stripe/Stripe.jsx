import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "../../helpers/initialStripe";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutPage } from "./CheckoutPage";

export const Stripe = () => {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret:
  //     "sk_test_51OnGV5JF21XZFnxLrOxbGhBFs5YQ1VSUjyR3OZwDtgLzRL9uzIFsAYXTZiocKbrHYTChBd0oyHzysJiSx9Jh3bCb00izspcyFt",
  // };

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {/* <CheckoutForm /> */}
      <CheckoutPage />
    </Elements>
  );
};
