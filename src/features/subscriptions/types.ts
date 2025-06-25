export enum SubscriptionType {
  FREE = "free",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export interface Plan {
  title: string;
  type: SubscriptionType;
  description: string;
  period?: string;
  price: string;
  features: string[];
}

export const FREE_PLAN_FEATURES = [
  "Unlock 10 questions",
  "Real time suggest answers",
  "Providing helping tips",
  "Cover 10 topics in a day",
];

export const MONTHLY_PLAN_FEATURES = [
  "Unlock 10 questions",
  "Real time suggest answers",
  "Providing helping tips",
  "Cover 10 topics in a day",
];

export const YEARLY_PLAN_FEATURES = [
  "Unlock 10 questions",
  "Real time suggest answers",
  "Providing helping tips",
  "Cover 10 topics in a day",
];

export const FREE_PLAN: Plan = {
  title: "Free Plan",
  type: SubscriptionType.FREE,
  description: "Best plans for the students",
  price: "Free",
  features: FREE_PLAN_FEATURES,
};

export const MONTHLY_PLAN: Plan = {
  title: "Monthly Plan",
  type: SubscriptionType.MONTHLY,
  description: "Best plans for the students",
  period: "Per month",
  price: "19 USD",
  features: MONTHLY_PLAN_FEATURES,
};

export const YEARLY_PLAN: Plan = {
  title: "Yearly Plan",
  type: SubscriptionType.YEARLY,
  description: "Best plans for the students",
  period: "Per year",
  price: "99 USD",
  features: YEARLY_PLAN_FEATURES,
};

export type SubscriptionVariants = "compact" | "detailed";

export const PLANS: Plan[] = [FREE_PLAN, MONTHLY_PLAN, YEARLY_PLAN];
