import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "job-kerja-pilot.s3.ap-southeast-2.amazonaws.com",
        pathname: "/uploads/**",
      },
    ],
    domains: [
      "images.unsplash.com",
      "randomuser.me",
      "dummyimage.com",
      "job-kerja-pilot.s3.ap-southeast-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
