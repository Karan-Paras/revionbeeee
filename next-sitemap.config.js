/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://revisionbee.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,

  exclude: [
    // Auth transitional pages (not useful for SEO)
    "/email-sent",
    "/reset-password",
    "/password-changed",

    // Protected app routes
    "/dashboard",
    "/progress",
    "/quiz",
    "/create-profile",
    "/subscription-plans",
    "/payment-method",
    "/payment-complete",
    "/subjects",

    // Dynamic content
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

    // Account-related (private)
    "/accounts",
    "/accounts/*",

    // API routes
    "/api/*",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/email-sent",
          "/reset-password",
          "/password-changed",
          "/dashboard",
          "/progress",
          "/quiz",
          "/create-profile",
          "/subscription-plans",
          "/payment-method",
          "/payment-complete",
          "/subjects",
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
          "/accounts",
          "/accounts/*",
          "/api/*",
        ],
      },
    ],
  },
};
