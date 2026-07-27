import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "tbg-platform-media.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "tbg-cms.buildwithshashank.com",
      },
    ],
  },
};

export default nextConfig;
