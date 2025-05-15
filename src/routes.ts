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
};

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [paths.home()];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [paths.login(), paths.signup()];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = paths.home();
