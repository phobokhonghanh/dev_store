// src/constants/paths.ts
export const PATHS = {
  // Public routes
  home: '/',
  feature1: '/feature/feature1',
  contact: '/contact',
  features_website_thach_cao_nguyen_phong: '/features/website/thach-cao-nguyen-phong',
  features_website_thach_cao_nguyen_phong_product: '/features/website/thach-cao-nguyen-phong/product',
  

  // Auth routes (dành cho người dùng chưa đăng nhập)
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',

  // Private routes (dành cho người dùng đã đăng nhập)
  dashboard: '/dashboard',
  profile: '/account/profile',
  agents: '/account/agents',

  // Admin routes (ví dụ mở rộng)
  adminDashboard: '/admin/dashboard',
};