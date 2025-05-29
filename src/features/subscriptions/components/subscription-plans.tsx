import { Subscription } from "@/features/subscriptions/components/subscription";
import { paths } from "@/routes";

export function SubscriptionPlans() {
  const BASIC_PLAN_FEATURES = [
    "Unlock 10 questions",
    "Real time suggest answers",
    "Providing helping tips",
    "Cover 10 topics in a day",
  ];

  const STARTER_PLAN_FEATURES = [
    "Unlock 10 questions",
    "Real time suggest answers",
    "Providing helping tips",
    "Cover 10 topics in a day",
  ];

  const ADVANCED_PLAN_FEATURES = [
    "Unlock 10 questions",
    "Real time suggest answers",
    "Providing helping tips",
    "Cover 10 topics in a day",
  ];

  return (
    <>
      <Subscription
        title="Basic Plan"
        description="Best plans for the students"
        period="Per month"
        price="100 USD"
        features={BASIC_PLAN_FEATURES}
        href={paths.paymentMethod()}
      />
      <Subscription
        title="Starter Plan"
        description="Best plans for the students"
        period="Per month"
        price="130 USD"
        features={STARTER_PLAN_FEATURES}
        href={paths.paymentMethod()}
      />
      <Subscription
        title="Advanced Plan"
        description="Best plans for the students"
        period="Per month"
        price="200 USD"
        features={ADVANCED_PLAN_FEATURES}
        href={paths.paymentMethod()}
      />
    </>
  );
}
