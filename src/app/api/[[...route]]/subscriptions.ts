import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";

import { stripe } from "@/lib/stripe";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { purchaseSubscription } from "@/features/subscriptions/api/purchase-subscription";

const app = new Hono()
  .post(
    "/checkout",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        plan: z.enum(["monthly", "yearly"]),
        callback: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { plan, callback = "/" } = c.req.valid("json");

      const price =
        plan === "monthly"
          ? process.env.STRIPE_MONTHLY_PRICE_ID!
          : process.env.STRIPE_YEARLY_PRICE_ID!;

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}${callback}/?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}${callback}/?canceled=1`,
        billing_address_collection: "auto",
        customer_email: auth.token.email || "",
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
        metadata: {
          plan,
        },
      });

      const url = session.url;
      const sessionId = session.id;

      if (!url || !sessionId) {
        return c.json({ error: "Failed to create session" }, 400);
      }

      return c.json({ data: { url, sessionId } });
    }
  )
  .post(
    "/success",
    zValidator(
      "json",
      z.object({
        sessionId: z.string().min(1, "Session ID is required"),
      })
    ),
    async (c) => {
      const { sessionId } = c.req.valid("json");

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      await purchaseSubscription({
        subscriptionID: session.subscription as string,
        customerID: session.customer as string,
        planType: session.metadata?.plan === "monthly" ? "monthly" : "yearly",
        amount: session.amount_total,
      });

      return c.json({ success: true });
    }
  );

export default app;
