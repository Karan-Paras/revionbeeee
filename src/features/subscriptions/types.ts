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

export const FEATURES = [
  "Access to all quizzes with progress tracking",
  "Access to full question bank",
  "Video explanations of key topics",
  "Video solutions with helpful hints",
];

export const FREE_PLAN: Plan = {
  title: "Free Plan",
  type: SubscriptionType.FREE,
  description: "Try the full platform with no limitations for 3 days!",
  price: "Free",
  features: FEATURES,
};

export const MONTHLY_PLAN: Plan = {
  title: "Monthly Plan",
  type: SubscriptionType.MONTHLY,
  description: "Ideal for focused, short-term study",
  period: "Per month",
  price: "19 USD",
  features: FEATURES,
};

export const YEARLY_PLAN: Plan = {
  title: "Yearly Plan",
  type: SubscriptionType.YEARLY,
  description: "Best value for long-term success",
  period: "Per year",
  price: "99 USD",
  features: FEATURES,
};

export type SubscriptionVariants = "compact" | "detailed";

export const PLANS: Plan[] = [FREE_PLAN, MONTHLY_PLAN, YEARLY_PLAN];
