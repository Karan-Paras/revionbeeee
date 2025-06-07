import { Subscription } from "@/features/subscriptions/components/subscription";
import { PLANS } from "@/features/subscriptions/types";

interface SubscriptionPlansProps {
  href: string;
}

export function SubscriptionPlans({ href }: SubscriptionPlansProps) {
  return PLANS.map((plan) => (
    <Subscription key={plan.title} plan={plan} href={href} />
  ));
}
