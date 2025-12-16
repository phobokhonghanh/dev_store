import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Cấu hình Allowed Origins cho Server Actions
    // serverActions: {
    //   allowedOrigins: ['localhost:3000', '100.122.90.44:3000'],
    // },
  },

  // Cấu hình Redirects (Chỉ hoạt động ở chế độ Server/SSR)
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Chuyển hướng vĩnh viễn (HTTP 308)
      },
    ];
  },
};

export default nextConfig;