import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "randomuser.me", "dummyimage.com"],
  },
};

export default nextConfig;
