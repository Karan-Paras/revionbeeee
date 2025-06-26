import type { ID } from "@/types/globals";

type PathFn = Record<string, () => string>;

const withPrefix = <T extends PathFn>(prefix: string, paths: T): T => {
  const entries = Object.entries(paths).map(
    ([key, fn]) => [key, () => `${prefix}${fn()}`] as const
  );
  return Object.fromEntries(entries) as T;
};

export const paths = {
  home: () => "/",
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
    myProfile: () => "/my-profile",
    settings: () => "/settings",
    editProfile: () => "/my-profile/edit",
  }),
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
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
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
