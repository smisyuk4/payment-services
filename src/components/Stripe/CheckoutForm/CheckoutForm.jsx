import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  // CardElement,
  // PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
// import axios from "axios";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://www.codewars.com/",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js hasn't yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   const result = await stripe.confirmPayment({
  //     //`Elements` instance that was used to create the Payment Element
  //     elements,
  //     confirmParams: {
  //       return_url: "https://www.netflix.com/browse",
  //     },
  //   });

  //   if (result.error) {
  //     // Show error to your customer (for example, payment details incomplete)
  //     console.log(result.error.message);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //   }

  //   // const { error, paymentMethod } = stripe.createPaymentMethod(
  //   //   "card"
  //   //   //   {
  //   //   //   type: "card",
  //   //   //   card: elements.getElement(CardElement),
  //   //   // }
  //   // );

  //   // if (!error) {
  //   //   const { id } = paymentMethod;

  //   //   try {
  //   //     const response = await axios.post(
  //   //       "https://app-6gvochmura-uc.a.run.app/api/charge",
  //   //       { id, amount: 1099 }
  //   //     );
  //   //     console.log(response);
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //   }
  //   // }
  // };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button type="submit" disabled={isLoading || !stripe || !elements}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
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
