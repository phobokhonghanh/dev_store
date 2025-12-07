// import { useRouter } from 'next/navigation';
// import { useTranslation } from 'react-i18next';
// import useSWRMutation from 'swr/mutation';

// import { registerServices } from '@/services/auth/register';
// import { API_ROUTES, APP_ROUTES } from '@/constants';
// import { showNotification } from '@/components/layout/notification/Notification';
// import { RegisterRequest } from '@/types/requests';
// import { RegisterResponse } from '@/types/responses';

// /**
//  * Hàm fetcher cho mutation.
//  * SWR sẽ truyền 'url' và một object chứa 'arg' (dữ liệu bạn gửi lên).
//  */
// async function call(url: string, { arg }: { arg: RegisterRequest }): Promise<RegisterResponse> {
//   try {
//     const data = await registerServices(arg);
//     return data;
//   } catch (error) {
//     throw new Error(error instanceof Error ? error.message : 'Registration failed');
//   }
// }

// export function useRegister() {
//   const router = useRouter();
//   const { t } = useTranslation('common');

//   const { 
//     trigger, 
//     isMutating, 
//     error 
//   } = useSWRMutation(
//     API_ROUTES.REGISTER, 
//     call, 
//     {
//       onSuccess: () => {
//         showNotification({
//           type: 'success',
//           title: t('registerPage.alert.success'),
//           message: t('registerPage.alert.successMessage'),
//         });
//         router.push(APP_ROUTES.LOGIN.pattern);
//       },
//       onError: (error) => {
//         showNotification({
//           type: 'error',
//           title: t('registerPage.alert.failure'),
//           message: error.message || t('registerPage.alert.unknownError'),
//         });
//       }
//     }
//   );

//   return {
//     handleRegister: trigger,
//     isLoading: isMutating,
//     error
//   };
// }
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { registerServices } from '@/services/auth/register';
import { API_ROUTES, APP_ROUTES } from '@/constants';
import { showNotification } from '@/components/layout/notification/Notification';
import { RegisterRequest } from '@/types/requests';
import { RegisterResponse } from '@/types/responses';

/**
 * Fetcher function cho SWR Mutation
 */
async function registerFetcher(url: string, { arg }: { arg: RegisterRequest }): Promise<RegisterResponse> {
  return registerServices(arg);
}

// Interface cho options tùy chỉnh
interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: any) => void;
  shouldRedirect?: boolean; // Cho phép tắt redirect nếu dùng trong Modal/Multi-step form
}

export function useRegister({ onSuccess, onError, shouldRedirect = true }: UseRegisterOptions = {}) {
  const router = useRouter();
  const { t } = useTranslation('common');

  const config: SWRMutationConfiguration<RegisterResponse, any, string, RegisterRequest> = {
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