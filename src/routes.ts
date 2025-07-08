import type { ID } from "@/types/globals";

type PathFn = () => string;

type PathObject<T> = {
  [K in keyof T]: T[K] extends PathFn
    ? PathFn & { [SK in keyof T[K]]: T[K][SK] extends PathFn ? PathFn : never }
    : T[K] extends object
      ? PathObject<T[K]>
      : never;
};

export function withPrefix<T extends Record<string, unknown>>(
  prefix: string,
  paths: T
): PathObject<T> {
  const result = {} as PathObject<T>;

  for (const key in paths) {
    const value = paths[key];

    if (typeof value === "function") {
      const fn = () => `${prefix}${value()}`;

      for (const subKey in value) {
        const subVal = (value as Record<string, unknown>)[subKey];
        if (typeof subVal === "function") {
          (fn as unknown as Record<string, unknown>)[subKey] = () =>
            `${prefix}${subVal()}`;
        }
      }

      result[key] = fn as unknown as PathObject<T>[typeof key];
    } else if (typeof value === "object" && value !== null) {
      result[key] = withPrefix(
        prefix,
        value as Record<string, unknown>
      ) as PathObject<T>[typeof key];
    }
  }

  return result;
}

export const paths = {
  home: Object.assign(() => "/", {
    hero: () => "/#home",
    aboutUs: () => "/#about-us",
    topics: () => "/#topics",
    pricing: () => "/#pricing",
    support: () => "/#support",
    testimonials: () => "/#testimonials",
  }),
  login: () => "/login",
  signup: () => "/signup",
  createProfile: () => "/create-profile",
  subscriptionPlans: () => "/subscription-plans",
  paymentMethod: () => "/payment-method",
  paymentComplete: () => "/payment-complete",
  forgotPassword: () => "/forgot-password",
  emailSent: () => "/email-sent",
  resetPassword: () => "/reset-password",
  passwordChanged: () => "/password-changed",
  dashboard: () => "/dashboard",
  progress: () => "/progress",
  quiz: () => "/quiz",
  accounts: withPrefix("/accounts", {
    myProfile: Object.assign(() => "/my-profile", {
      scroll: () => "/my-profile/#profile",
    }),
    billing: Object.assign(() => "/billing", {
      scroll: () => "/billing/#billing",
    }),
    settings: Object.assign(() => "/settings", {
      scroll: () => "/settings/#settings",
    }),
    editProfile: Object.assign(() => "/my-profile/edit", {
      scroll: () => "/my-profile/edit/#edit-profile",
    }),
  }),
  aboutUs: () => "/about-us",
  privacyPolicy: () => "/privacy-policy",
  termsAndConditions: () => "/terms-and-conditions",
  faq: () => "/faq",
  subjects: () => "/subjects",
  subjectDetails: (subjectId: ID) => `/subjects/${subjectId}`,
  quizDetails: (subjectId: ID) => `/quiz/${subjectId}`,
  questionBank: (subjectId: ID) => `/question-bank/${subjectId}`,
  quizBank: (subjectId: ID) => `/quiz-bank/${subjectId}`,
  quizFinished: (subjectId: ID) => `/quiz-finished/${subjectId}`,
  quizResult: (subjectId: ID) => `/quiz-result/${subjectId}`,
};

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  paths.home(),
  paths.privacyPolicy(),
  paths.termsAndConditions(),
  paths.faq(),
  paths.aboutUs(),
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the home page
 * @type {string[]}
 */
export const authRoutes: string[] = [
  paths.login(),
  paths.signup(),
  paths.forgotPassword(),
  paths.emailSent(),
  paths.resetPassword(),
  paths.passwordChanged(),
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = paths.home();
