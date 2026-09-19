import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["preview.thebradburygroup.net"],
  async redirects() {
    return [
      { source: "/for-organizations", destination: "/organisation", permanent: true },
      { source: "/for-organizations/:path*", destination: "/organisation", permanent: true },
      { source: "/our-ai-return", destination: "/roi", permanent: true },
      { source: "/the-solomon-engine", destination: "/leaders", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
