/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://revisionbee.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,

  // Exclude pages that are auth protected or transitional
  exclude: [
    "/reset-password",
    "/password-changed",
    "/email-sent",

    "/dashboard",
    "/progress",
    "/quiz",
    "/create-profile",
    "/subscription-plans",
    "/payment-method",
    "/payment-complete",

    // Dynamic routes - exclude all under these paths
    "/question-bank",
    "/question-bank/*",
    "/quiz",
    "/quiz/*",
    "/quiz-bank",
    "/quiz-bank/*",
    "/quiz-finished",
    "/quiz-finished/*",
    "/quiz-result",
    "/quiz-result/*",

    // Account related protected pages
    "/accounts/my-profile",
    "/accounts/my-profile/*",
    "/accounts/billing",
    "/accounts/billing/*",
    "/accounts/settings",
    "/accounts/settings/*",
    "/accounts/my-profile/edit",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/reset-password",
          "/password-changed",
          "/email-sent",

          "/dashboard",
          "/progress",
          "/quiz",
          "/create-profile",
          "/subscription-plans",
          "/payment-method",
          "/payment-complete",

          "/question-bank",
          "/question-bank/*",
          "/quiz",
          "/quiz/*",
          "/quiz-bank",
          "/quiz-bank/*",
          "/quiz-finished",
          "/quiz-finished/*",
          "/quiz-result",
          "/quiz-result/*",

          "/accounts/my-profile",
          "/accounts/my-profile/*",
          "/accounts/billing",
          "/accounts/billing/*",
          "/accounts/settings",
          "/accounts/settings/*",
          "/accounts/my-profile/edit",
        ],
      },
    ],
  },
};
