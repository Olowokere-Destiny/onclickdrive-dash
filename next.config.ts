import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["img.favpng.com", "thumbs.dreamstime.com"],
  },
};

export default nextConfig;
