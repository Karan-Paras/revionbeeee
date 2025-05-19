import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saurabh.parastechnologies.in",
        port: "",
        pathname: "/revisionbee/storage/app/public/**",
      },
    ],
  },
};

export default nextConfig;
