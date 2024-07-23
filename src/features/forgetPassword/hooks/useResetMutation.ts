import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../../../services/axios/apiClient';
import { APIError } from '../../../../types/api';

type ResetPasswordMutationParams = {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
};

type ResetPasswordResponse = {
  success: true;
  data: [];
  errors: [];
  message: string;
  token: string;
};

const resetPassword = async (body: ResetPasswordMutationParams) => {
  return await apiClient.post<ResetPasswordResponse>('/password/reset', body);
};

export const useResetMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: AxiosError<APIError>) => void;
  onSuccess?: (data: ResetPasswordResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: ResetPasswordMutationParams) => resetPassword(params),
    onError(error) {
      onError?.(error as AxiosError<APIError>);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
