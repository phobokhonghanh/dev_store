// middleware.ts (ở thư mục gốc)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Import các nhóm route và PATHS
import { PATHS } from './constants/paths';
import {
  PUBLIC_ROUTES,
  PRIVATE_ROUTES,
  AUTH_ROUTES,
  ADMIN_ROUTES
} from './config/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // // 1. Kiểm tra route yêu cầu đăng nhập (PRIVATE)
  // const isPrivateRoute = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
  // if (isPrivateRoute) {
  //   return NextResponse.redirect(new URL(PATHS.login, request.url));
  // }

  // // 2. Kiểm tra route xác thực (AUTH)
  // const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  // if (isAuthRoute) {
  //   return NextResponse.redirect(new URL(PATHS.home, request.url));
  // }
  
  // // 3. (Ví dụ) Kiểm tra route của Admin
  // const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  // if (isAdminRoute) {
  //     // Nếu không phải admin, có thể chuyển về trang chủ hoặc trang báo lỗi
  //     return NextResponse.redirect(new URL(PATHS.home, request.url));
  // }

  // 4. Nếu không thuộc các trường hợp trên, cho phép truy cập
  return NextResponse.next();
}

// Config matcher để middleware chỉ chạy trên các route cần thiết
export const config = {
  matcher: [
    /*
     * Khớp với tất cả các request path ngoại trừ những path bắt đầu bằng:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};