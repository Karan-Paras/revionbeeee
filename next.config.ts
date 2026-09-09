import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const createNextConfig = (phase: string): NextConfig => ({
  /* config options here */
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
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
});

export default createNextConfig;
