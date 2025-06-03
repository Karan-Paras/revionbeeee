import { ID } from "@/types/globals";

const withPrefix = (prefix: string, paths: Record<string, () => string>) => {
  return Object.fromEntries(
    Object.entries(paths).map(([key, fn]) => [key, () => `${prefix}${fn()}`])
  );
};

export const paths = {
  home() {
    return "/";
  },
  login() {
    return "/login";
  },
  signup() {
    return "/signup";
  },
  createProfile() {
    return "/create-profile";
  },
  subscriptionPlans() {
    return "/subscription-plans";
  },
  paymentMethod() {
    return "/payment-method";
  },
  paymentComplete() {
    return "/payment-complete";
  },
  forgotPassword() {
    return "/forgot-password";
  },
  emailSent() {
    return "/email-sent";
  },
  resetPassword() {
    return "/reset-password";
  },
  passwordChanged() {
    return "/password-changed";
  },
  dashboard() {
    return "/dashboard";
  },
  progress() {
    return "/progress";
  },
  quiz() {
    return "/quiz";
  },
  accounts: withPrefix("/accounts", {
    myProfile() {
      return "/my-profile";
    },
    subscription() {
      return "/subscription";
    },
    settings() {
      return "/settings";
    },
    editProfile() {
      return "/my-profile/edit";
    },
  }),
  privacyPolicy() {
    return "/privacy-policy";
  },
  termsAndConditions() {
    return "/terms-and-conditions";
  },
  faq() {
    return "/faq";
  },
  subjects() {
    return "/subjects";
  },
  subjectDetails(subjectId: ID) {
    return `/subjects/${subjectId}`;
  },
  questionBank(subjectId: ID) {
    return `/question-bank/${subjectId}`;
  },
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
