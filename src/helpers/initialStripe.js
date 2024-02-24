import { loadStripe } from "@stripe/stripe-js";

const { VITE_STRIPE_PUBLIC_KEY } = import.meta.env;

export const stripePromise = await loadStripe(VITE_STRIPE_PUBLIC_KEY);
