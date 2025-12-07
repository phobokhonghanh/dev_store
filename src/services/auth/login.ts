import { LoginRequest } from '@/types/requests';
import { LoginResponse } from '@/types/responses';
import { API_ROUTES } from '@/constants';
import { callAPI } from '@/utils/apiClient';

export const loginServices = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return callAPI(API_ROUTES.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};