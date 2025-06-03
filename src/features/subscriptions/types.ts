export interface Plan {
  title: string;
  description: string;
  period: string;
  price: string;
  features: string[];
}

export const BASIC_PLAN_FEATURES = [
  "Unlock 10 questions",
  "Real time suggest answers",
  "Providing helping tips",
  "Cover 10 topics in a day",
];

export const STARTER_PLAN_FEATURES = [
  "Unlock 10 questions",
  "Real time suggest answers",
  "Providing helping tips",
  "Cover 10 topics in a day",
];

export const ADVANCED_PLAN_FEATURES = [
  "Unlock 10 questions",
  "Real time suggest answers",
  "Providing helping tips",
  "Cover 10 topics in a day",
];

export const BASIC_PLAN: Plan = {
  title: "Basic Plan",
  description: "Best plans for the students",
  period: "Per month",
  price: "100 USD",
  features: BASIC_PLAN_FEATURES,
};

export const STARTER_PLAN: Plan = {
  title: "Starter Plan",
  description: "Best plans for the students",
  period: "Per month",
  price: "130 USD",
  features: STARTER_PLAN_FEATURES,
};

export const ADVANCED_PLAN: Plan = {
  title: "Advanced Plan",
  description: "Best plans for the students",
  period: "Per month",
  price: "200 USD",
  features: ADVANCED_PLAN_FEATURES,
};

export const PLANS: Plan[] = [BASIC_PLAN, STARTER_PLAN, ADVANCED_PLAN];
