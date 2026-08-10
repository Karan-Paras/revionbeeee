import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
