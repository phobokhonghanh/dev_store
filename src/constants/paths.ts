// src/constants/paths.ts
export const PATHS = {
  // Public routes
  home: '/',

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