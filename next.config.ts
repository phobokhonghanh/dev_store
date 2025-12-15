import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Lưu ý: Đã xóa "output: 'export'" để kích hoạt tính năng Server (Redirects, Image Optimization).
    Khi deploy Netlify, hãy đặt Publish directory là ".next".
  */

  experimental: {
    // Key 'allowedDevOrigins' gây lỗi build "Unrecognized key" ở phiên bản Next.js hiện tại.
    // Nếu bạn cần cấu hình Allowed Origins cho Server Actions, hãy dùng cấu hình dưới đây:
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