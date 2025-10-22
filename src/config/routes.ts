// src/config/routes.ts
import { PATHS } from '@/constants/paths';

/**
 * @description Các route không yêu cầu đăng nhập.
 * Bất kỳ ai cũng có thể truy cập.
 */
export const PUBLIC_ROUTES = [
    PATHS.home,
    PATHS.forgotPassword,
    PATHS.dashboard,
    PATHS.feature1,
];

/**
 * @description Các route dành riêng cho việc xác thực (login, register).
 * Nếu người dùng đã đăng nhập, sẽ bị chuyển hướng ra khỏi các route này.
 */
export const AUTH_ROUTES = [
    PATHS.login,
    PATHS.register,
];

/**
 * @description Các route yêu cầu phải đăng nhập.
 * Nếu chưa đăng nhập, sẽ bị chuyển hướng về trang login.
 */
export const PRIVATE_ROUTES = [
    //   PATHS.dashboard,
    PATHS.profile,
    PATHS.agents,
];

/**
 * @description (Ví dụ mở rộng) Các route yêu cầu quyền admin.
 */
export const ADMIN_ROUTES = [
    PATHS.adminDashboard,
];