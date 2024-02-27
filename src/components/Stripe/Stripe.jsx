import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const { VITE_SERVER_PATH } = import.meta.env;
import { stripePromise } from "../../helpers/initialStripe";
import { CheckoutForm } from "./CheckoutForm";

export const Stripe = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `${VITE_SERVER_PATH}/create-payment-intent`,
          { items: 10 }
        );

        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
