import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';

import { API_ROUTES, APP_ROUTES } from '@/constants';
import { useAuth } from '@/hooks/contexts/auth';
import { loginApi } from '@/services/auth/login';
import { LoginRequest, LoginResponse } from '@/models/types';
import { showNotification } from '@/components/layout/notification/Notification';

/**
 * Hàm fetcher cho mutation.
 * SWR sẽ truyền 'url' và một object chứa 'arg' (dữ liệu bạn gửi lên).
 */
async function call(url: string, { arg }: { arg: LoginRequest }): Promise<LoginResponse > {
  try {
    const { data } = await loginApi(arg);
    return  data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Login failed');
  }
}

/**
 * Custom hook for handling user login functionality.
 * (Tối ưu với useSWRMutation)
 */
export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useTranslation('common');

  const { 
    trigger, 
    isMutating, 
    error 
  } = useSWRMutation(
    API_ROUTES.LOGIN, 
    call, 
    {
      onSuccess: (data) => {
        login(data);
        router.push(APP_ROUTES.HOME.pattern);
      },
      onError: (error) => {
        showNotification({
          type: 'error',
          title: t('loginPage.alert.failure'),
          message: error.message || t('loginPage.alert.unknownError'),
        });
      }
    }
  );

  return {
    handleLogin: trigger,
    isLoading: isMutating,
    error
  };
}