import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
  // PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [paymentRequest, setPaymentRequest] = useState(null);

  // useEffect(() => {
  //   if (stripe) {
  //     const pr = stripe.paymentRequest({
  //       country: "US",
  //       currency: "usd",
  //       total: {
  //         label: "Demo total",
  //         amount: 1099,
  //       },
  //       requestPayerName: true,
  //       requestPayerEmail: true,
  //     });
  //   }
  // }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = stripe.createPaymentMethod(
      "card"
      //   {
      //   type: "card",
      //   card: elements.getElement(CardElement),
      // }
    );

    if (!error) {
      const { id } = paymentMethod;

      try {
        const response = await axios.post(
          "https://app-6gvochmura-uc.a.run.app/api/charge",
          { id, amount: 1099 }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay button
      </button>
      {/* Show error message to your customers */}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
    </form>
  );
};

// if (elements == null) {
//   return;
// }

// // Trigger form validation and wallet collection
// const { error: submitError } = await elements.submit();
// if (submitError) {
//   // Show error to your customer
//   setErrorMessage(submitError.message);
//   return;
// }

// // Create the PaymentIntent and obtain clientSecret from your server endpoint
// const res = await fetch("/create-intent", {
//   method: "POST",
// });

// const { client_secret: clientSecret } = await res.json();

// const { error } = await stripe.confirmPayment({
//   //`Elements` instance that was used to create the Payment Element
//   elements,
//   clientSecret,
//   confirmParams: {
//     return_url: "https://example.com/order/123/complete",
//   },
// });

// if (error) {
//   // This point will only be reached if there is an immediate error when
//   // confirming the payment. Show error to your customer (for example, payment
//   // details incomplete)
//   setErrorMessage(error.message);
// } else {
//   // Your customer will be redirected to your `return_url`. For some payment
//   // methods like iDEAL, your customer will be redirected to an intermediate
//   // site first to authorize the payment, then redirected to the `return_url`.
// }
// };

// // if (paymentRequest) {
// //   return <PaymentRequestButtonElement options={{ paymentRequest }} />;
// // }
