import { LoginRequest, LoginResponse } from '@/models/types';
import { API_ROUTES } from '@/constants';
import { apiClient } from '@/utils/apiClient';

export const loginApi = async (credentials: LoginRequest): Promise<{ data: LoginResponse }> => {
  return apiClient(API_ROUTES.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};