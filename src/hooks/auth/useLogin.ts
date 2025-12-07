// import { useRouter } from 'next/navigation';
// import { useTranslation } from 'react-i18next';
// import useSWRMutation from 'swr/mutation';

// import { API_ROUTES, APP_ROUTES } from '@/constants';
// import { useAuth } from '@/hooks/contexts/auth';
// import { loginServices } from '@/services/auth/login';
// import { showNotification } from '@/components/layout/notification/Notification';
// import { LoginRequest } from '@/types/requests';
// import { LoginResponse } from '@/types/responses';

// /**
//  * Hàm fetcher cho mutation.
//  * SWR sẽ truyền 'url' và một object chứa 'arg' (dữ liệu bạn gửi lên).
//  */
// async function call(url: string, { arg }: { arg: LoginRequest }): Promise<LoginResponse> {
//   try {
//     const data = await loginServices(arg);
//     return data;
//   } catch (error) {
//     throw new Error(error instanceof Error ? error.message : 'Login failed');
//   }
// }

// /**
//  * Custom hook for handling user login functionality.
//  * (Tối ưu với useSWRMutation)
//  */
// export function useLogin() {
//   const { login } = useAuth();
//   const router = useRouter();
//   const { t } = useTranslation('common');

//   const { 
//     trigger, 
//     isMutating, 
//     error 
//   } = useSWRMutation(
//     API_ROUTES.LOGIN, 
//     call, 
//     {
//       onSuccess: (data) => {
//         login(data);
//         router.push(APP_ROUTES.HOME.pattern);
//       },
//       onError: (error) => {
//         showNotification({
//           type: 'error',
//           title: t('loginPage.alert.failure'),
//           message: error.message || t('loginPage.alert.unknownError'),
//         });
//       }
//     }
//   );

//   return {
//     handleLogin: trigger,
//     isLoading: isMutating,
//     error
//   };
// }

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { API_ROUTES, APP_ROUTES } from '@/constants';
import { loginServices } from '@/services/auth/login';
import { showNotification } from '@/components/layout/notification/Notification';
import { LoginRequest } from '@/types/requests';
import { LoginResponse } from '@/types/responses';
import { useAuth } from '../contexts/auth';


async function loginFetcher(url: string, { arg }: { arg: LoginRequest }): Promise<LoginResponse> {
  return loginServices(arg);
}

// Định nghĩa options mở rộng để component có thể override hành vi mặc định
// Tùy chọn có redirect hay không (mặc định true)
interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: any) => void;
  shouldRedirect?: boolean;
}

export function useLogin({ onSuccess, onError, shouldRedirect = true }: UseLoginOptions = {}) {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useTranslation('common');

  // Cấu hình SWR Mutation
  const config: SWRMutationConfiguration<LoginResponse, any, string, LoginRequest> = {
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