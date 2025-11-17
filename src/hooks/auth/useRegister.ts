import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';

import { RegisterRequest, RegisterResponse } from '@/models/types';
import { registerApi } from '@/services/auth/register';
import { API_ROUTES, APP_ROUTES } from '@/constants';
import { showNotification } from '@/components/layout/notification/Notification';

/**
 * Hàm fetcher cho mutation.
 * SWR sẽ truyền 'url' và một object chứa 'arg' (dữ liệu bạn gửi lên).
 */
async function call(url: string, { arg }: { arg: RegisterRequest }): Promise<RegisterResponse> {
  try {
    const response = await registerApi(arg);
    const data: RegisterResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Registration failed');
  }
}

export function useRegister() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { 
    trigger, 
    isMutating, 
    error 
  } = useSWRMutation(
    API_ROUTES.REGISTER, 
    call, 
    {
      onSuccess: () => {
        showNotification({
          type: 'success',
          title: t('registerPage.alert.success'),
          message: t('registerPage.alert.successMessage'),
        });
        router.push(APP_ROUTES.LOGIN.pattern);
      },
      onError: (error) => {
        showNotification({
          type: 'error',
          title: t('registerPage.alert.failure'),
          message: error.message || t('registerPage.alert.unknownError'),
        });
      }
    }
  );

  return {
    handleRegister: trigger,
    isLoading: isMutating,
    error
  };
}