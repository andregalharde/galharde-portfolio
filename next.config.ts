import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.15.2"],
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
