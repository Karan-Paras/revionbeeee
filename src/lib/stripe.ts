import Stripe from "stripe";

let stripe: Stripe | undefined;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  stripe ??= new Stripe(secretKey, {
    apiVersion: "2025-08-27.basil",
    typescript: true,
  });

  return stripe;
}
