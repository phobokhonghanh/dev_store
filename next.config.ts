import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://localhost:3000', 'http://100.122.90.44:3000'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Chuyển hướng vĩnh viễn (308)
      },
    ];
  },
}
export default nextConfig;
