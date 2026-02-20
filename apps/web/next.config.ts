import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.worf.replit.dev",
    "*.replit.dev",
    "*.replit.app",
  ],
};

export default nextConfig;
