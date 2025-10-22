// src/services/authService.ts
import apiClient from './apiClient';
import type { User } from '@/models/user';

// --- API GIẢ ---

// Hàm giả lập độ trễ mạng
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginApi = async (credentials: any): Promise<{ token: string; user: User }> => {
  await wait(1000);
  console.log('API: Đăng nhập với', credentials);
  if (credentials.email === 'error@test.com') {
    throw new Error('Tài khoản hoặc mật khẩu không chính xác.');
  }
  return {
    token: 'fake-jwt-token-string',
    user: { id: '1', name: 'User Test', email: credentials.email, role: 'user'},
  };
};

export const registerApi = async (data: any): Promise<{ message: string }> => {
  await wait(1500);
  console.log('API: Đăng ký với', data);
  if (data.email === 'exists@test.com') {
    throw new Error('Email đã tồn tại.');
  }
  return { message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực OTP.' };
};

export const verifyOtpApi = async (otp: string): Promise<{ token: string }> => {
  await wait(800);
  console.log('API: Xác thực OTP', otp);
  if (otp !== '123456') {
    throw new Error('Mã OTP không hợp lệ.');
  }
  return { token: 'verified-jwt-token-string' };
};

export const refreshOtpApi = async (): Promise<{ message: string }> => {
  await wait(500);
  console.log('API: Yêu cầu mã OTP mới');
  return { message: 'Một mã OTP mới đã được gửi.' };
}