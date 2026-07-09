import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from S3
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tbg-platform-media.s3.amazonaws.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
