import { RegisterRequest } from '@/types/requests';
import { RegisterResponse } from '@/types/responses';
import { callAPI } from '@/utils/apiClient';
import { API_ROUTES } from '@/constants/api';

export const registerServices = async (data: RegisterRequest): Promise<RegisterResponse> => {
  return callAPI(API_ROUTES.REGISTER, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};