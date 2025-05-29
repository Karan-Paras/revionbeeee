import { Subscription } from "@/features/subscriptions/components/subscription";
import { PLANS } from "@/features/types";
import { paths } from "@/routes";

export function SubscriptionPlans() {
  return PLANS.map((plan) => (
    <Subscription
      key={plan.title}
      plan={plan}
      href={paths.subscriptionPlans()}
    />
  ));
}
