import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import path from "node:path";

const createNextConfig = (phase: string): NextConfig => ({
  /* config options here */
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /[\\/]node_modules[\\/]white-web-sdk[\\/].*\.js$/,
      use: [path.resolve("scripts/whiteboard-react-loader.cjs")],
    });
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
  turbopack: {
    rules: {
      "**/node_modules/white-web-sdk/**/*.js": {
        loaders: ["./scripts/whiteboard-react-loader.cjs"],
        as: "*.js",
      },
    },
    resolveAlias: {
      "agora-foundation": "./src/lib/agora-foundation-stub.ts",
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10gb",
    },
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
});

export default createNextConfig;
