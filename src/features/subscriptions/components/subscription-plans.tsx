import { Subscription } from "@/features/subscriptions/components/subscription";
import {
  PLANS,
  SubscriptionType,
  type SubscriptionVariants,
} from "@/features/subscriptions/types";

interface SubscriptionProps {
  href?: string;
  variant?: SubscriptionVariants;
  activePlan?: SubscriptionType;
  callback?: string;
  display?: boolean;
}

export function SubscriptionPlans({
  href,
  variant,
  activePlan,
  callback,
  display,
}: SubscriptionProps) {
  return PLANS.map((plan) => (
    <Subscription
      key={plan.title}
      plan={plan}
      href={href}
      variant={variant}
      activePlan={activePlan}
      callback={callback}
      display={display}
    />
  ));
}
