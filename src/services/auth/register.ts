import { RegisterRequest } from '@/models/types';
import { apiClient } from '@/utils/apiClient';
import { API_ROUTES } from '@/constants/api';

export const registerApi = async (data: RegisterRequest): Promise<Response> => {
  return apiClient(API_ROUTES.REGISTER, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};