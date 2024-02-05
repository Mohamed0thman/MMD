import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../../../services/axios/apiClient';
import { APIError } from '../../../../types/api';

type ResendCodeResponse = {
  success: boolean;
  data: [];
  errors: [];
  message: string;
  token: string;
};

const useResendCode = async () => {
  return await apiClient.post<ResendCodeResponse>('/user-verify-resend-code');
};

export const useResendCodeMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: AxiosError<APIError>) => void;
  onSuccess?: (data: ResendCodeResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: () => useResendCode(),
    onError(error) {
      onError?.(error as AxiosError<APIError>);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
