import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { showNotification } from '@/components/layout/notification/Notification';
import { API_ROUTES, APP_ROUTES } from '@/constants';
import { registerServices } from '@/services/auth/register';
import { RegisterRequest } from '@/types/requests';
import { RegisterResponse } from '@/types/responses';
import { ApiError } from '@/utils/apiClient';

/**
 * Fetcher function cho SWR Mutation
 */
async function registerFetcher(url: string, { arg }: { arg: RegisterRequest }): Promise<RegisterResponse> {
  return registerServices(arg);
}

// Interface cho options tùy chỉnh
interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: ApiError) => void;
  shouldRedirect?: boolean; // Cho phép tắt redirect nếu dùng trong Modal/Multi-step form
}

export function useRegister({ onSuccess, onError, shouldRedirect = true }: UseRegisterOptions = {}) {
  const router = useRouter();
  const { t } = useTranslation('common');

  const config: SWRMutationConfiguration<RegisterResponse, ApiError, string, RegisterRequest> = {
    onSuccess: (data) => {
      // 1. Luôn hiển thị thông báo thành công (Core UX)
      showNotification({
        type: 'success',
        title: t('registerPage.alert.success'),
        message: t('registerPage.alert.successMessage'),
      });

      // 2. Chạy logic tùy chỉnh từ component (nếu có)
      if (onSuccess) {
        onSuccess(data);
      }

      // 3. Redirect về trang Login (nếu được phép)
      if (shouldRedirect) {
        router.push(APP_ROUTES.LOGIN.pattern);
      }
    },
    onError: (err) => {
      // 1. Ưu tiên logic xử lý lỗi tùy chỉnh
      if (onError) {
        onError(err);
        return;
      }

      // 2. Fallback: Hiển thị thông báo lỗi mặc định
      showNotification({
        type: 'error',
        title: t('registerPage.alert.failure'),
        message: err?.message || t('registerPage.alert.unknownError'),
      });
    },
  };

  const { 
    trigger, 
    isMutating, 
    error,
    reset 
  } = useSWRMutation(
    API_ROUTES.REGISTER, 
    registerFetcher, 
    config
  );

  return {
    handleRegister: trigger,
    isLoading: isMutating,
    error,
    reset // Expose reset để clear error state khi user nhập lại form
  };
}