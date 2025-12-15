import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { showNotification } from '@/components/layout/notification/Notification';
import { API_ROUTES, APP_ROUTES } from '@/constants';
import { loginServices } from '@/services/auth/login';
import { LoginRequest } from '@/types/requests';
import { LoginResponse } from '@/types/responses';
import { useAuth } from '../contexts/auth';
import { ApiError } from '@/utils/apiClient';


async function loginFetcher(url: string, { arg }: { arg: LoginRequest }): Promise<LoginResponse> {
  return loginServices(arg);
}

// Định nghĩa options mở rộng để component có thể override hành vi mặc định
// Tùy chọn có redirect hay không (mặc định true)
interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: ApiError) => void;
  shouldRedirect?: boolean;
}

export function useLogin({ onSuccess, onError, shouldRedirect = true }: UseLoginOptions = {}) {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useTranslation('common');

  // Cấu hình SWR Mutation
  const config: SWRMutationConfiguration<LoginResponse, ApiError, string, LoginRequest> = {
    onSuccess: (data) => {
      // 1. Cập nhật Auth Context
      login(data);

      // 2. Chạy custom success handler nếu có
      if (onSuccess) {
        onSuccess(data);
      }

      // 3. Mặc định redirect về trang chủ nếu được phép
      if (shouldRedirect) {
        router.push(APP_ROUTES.HOME.pattern);
      }
    },
    onError: (err) => {
      // 1. Chạy custom error handler nếu có
      if (onError) {
        onError(err);
        return;
      }

      // 2. Mặc định hiển thị notification
      showNotification({
        type: 'error',
        title: t('loginPage.alert.failure'),
        message: err?.message || t('loginPage.alert.unknownError'),
      });
    },
  };

  const { trigger, isMutating, error, reset } = useSWRMutation(
    API_ROUTES.LOGIN,
    loginFetcher,
    config
  );

  return {
    handleLogin: trigger,
    isLoading: isMutating,
    error,
    reset, // Expose reset clear error state
  };
}