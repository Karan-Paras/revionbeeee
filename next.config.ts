import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { webpack }) {
    // white-web-sdk probes this optional local-log package at runtime and
    // safely falls back when it is unavailable. Ignoring it here prevents
    // webpack from treating that optional probe as a missing dependency.
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^agora-foundation(?:\/.*)?$/,
      })
    );
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "saurabh.parastechnologies.in",
        hostname: "ankitadev.parastechnologies.in",
        port: "",
        pathname: "/admin.revisionbee.com/storage/app/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10gb",
    },
  },
};

export default nextConfig;
